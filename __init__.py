from flask import Flask,render_template,request,Blueprint,redirect,session
from pi7db import pi7db
from flask_socketio import SocketIO
from datetime import datetime
import random
from engineio.payload import Payload
from flask_socketio import SocketIO, send,emit,join_room, leave_room,close_room, rooms, disconnect

#Payload.max_decode_packets = 300

#Payload.max_decode_packets = 500
sessionsc = {}
active = {}
app = Flask(__name__)

app.secret_key = "O?awgfdikjgorueg8nszjfoipfgjspak[fgce!"
app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

socketio = SocketIO(app,path='collab.io', cors_allowed_origins='*')
collab = pi7db('Collab','DATABASE')
collab.write('pads','startingofcollab',{1:1})

# @app.route('/',methods = ['GET'])
# def collab_index():
#     return render_template('collab_index.html')

@app.route('/',methods = ['GET'])
def collab_new():
    return render_template('collab_new.html',data={})

def createnewur(st,avails):
    newur = st+str(random.randint(0,999))
    if newur in avails:return createnewur(newur,avails)
    else:return newur

@app.route('/setup',methods = ["POST"])
def collab_setup():
    avails = list(collab.status()['pads']['Doc_Name'])
    ur = ''.join(e for e in request.form['name'] if e.isalnum())
    if ur in avails:ur = createnewur(ur,avails)
    collab.write('pads',ur,{'clbuid':request.form['clbuid'],'name':request.form['name'],'uri':ur,'created':datetime.now()})
    return ur

@app.route('/<pad>',methods = ['GET','POST'])
def collab_pad(pad):
    if request.method == 'POST':
        try:data = collab.read('pads',pad)['data'][0]
        except:return redirect('/collab-edit/start')
        sessionsc[data['uri']] = {'admin':data['clbuid']}
        return render_template('collab_new.html',data=data,organiser=data['uri'])
    else:
        try:data = collab.read('pads',pad)['data'][0]
        except:return redirect('/collab-edit/start')
        sessionsc[data['uri']] = {'admin':data['clbuid']}
        return render_template('collab_new.html',data=data,newus='true')

@socketio.on('getfornew')
def getfornew(data):
    emit('getfornew',data, broadcast=True,to=session.c_uri)

@socketio.on('message')
def handleMessage(msg):
    if session.c_uri not in sessionsc:
        sessionsc[session.c_uri] = {}

    if 'adminup' in msg:
        sessionsc[msg['uri']] = {'admin':msg['clbuid'],'clients':[]}
        send(msg, broadcast=True,to=session.c_uri)
    else:
        if 'admin' not in sessionsc[msg['c_name']]:sessionsc[msg['c_name']]['admin'] = msg['uid']
        msg['admin'] = sessionsc[msg['c_name']]['admin']
        send(msg, broadcast=True,to=session.c_uri)

@socketio.on('usercon')
def userconnected(data):
    session.uid = data['uid'][0]
    session.uname = data['uid'][1]
    session.c_uri = data['uid'][2]
    session[data['uid'][2]] = {"name": data['uid'][1], "mute_audio":'0', "mute_video":'0'}
    join_room(session.c_uri)
    if data['uid'][2] not in active:
        active[data['uid'][2]] = {'cls':{data['uid'][0]:data['uid'][1]}}
    else:
        active[data['uid'][2]]['cls'].update({data['uid'][0]:data['uid'][1]})
    emit('usercon', active[data['uid'][2]], broadcast=True,to=session.c_uri)

@socketio.on('langchange')
def langchange(data):
    emit('langchange', data, broadcast=True,to=session.c_uri)

@socketio.on('superuser')
def superuserchange(data):
    active[data['val'][1]]['superuser'] = data['val'][0]
    emit('superuser', data, broadcast=True,to=session.c_uri)

@socketio.on('admin_Change')
def admin_Change(data):
    emit('admin_Change', data, broadcast=True,to=session.c_uri)

def flushmem():
    for x in active:
        if not active[x]['cls']:
            try:
                del active[x]
                del sessionsc[x]
            except:pass
            # collab.trash('pads',x)

#VIDEO CALL

@app.errorhandler(404) 
def not_found(e):
  return "Opps! 404 Page Not Found",410

@app.errorhandler(500) 
def server_error(e):
     return "Opps! 500 Server Error!",500


@socketio.on("start-stream")
def startstream(roomId,userId):
    emit("video-connected", userId, broadcast=True, include_self=False, to=roomId)

@socketio.on("send-peer")
def sendpeer(data):
    emit("store-peers", data, broadcast=True, include_self=False, to=data['data'][0])

@socketio.on("stop-call")
def stop_call(data):
    emit("stop-call", data, broadcast=True, include_self=False, to=data['room_id'])

@socketio.on("join-room")
def on_join_vid_room(roomId, userId):
    join_room(roomId)
    session.peerid = userId
    session.roomid = roomId
    emit("share-peers", userId, broadcast=True, to=roomId)

@socketio.on('disconnect')
def disconnect():
    emit("vpeer-disconnect", session.peerid, broadcast=True, to=session.roomid)
    global active
    try:leave_room(session.c_uri)
    except:pass
    try:active[session.c_uri]['cls'].pop(session.uid);flushmem()
    except:pass
    try:
        if session.c_uri in active:emit('usercon', active[session.c_uri], broadcast=True,to=session.c_uri)
    except:pass
