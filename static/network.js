////////////////////////////////////
var myVideo;
var videoMuted = true;
var audioMuted = true;
var media_options = {
    audio: false,
    video: false
};
var max_level_L = 0;
var old_level_L = 0;
var G_peerid;
var local_str = null;
var peer_calls = {}
var peer_list = {}
var cam = false;
var audioContextlist = {}
document.addEventListener("DOMContentLoaded", (event) => {
    myVideo = document.getElementById("local_video");
    myVideo.onloadeddata = () => { console.log("W,H: ", myVideo.videoWidth, ", ", myVideo.videoHeight); };
    var mic_btn = document.getElementById("micbtn");
    var vid_btn = document.getElementById("vidbtn");

    mic_btn.addEventListener("click", (event) => {
        setAudioState(!audioMuted);
        setservercon()
    });
    vid_btn.addEventListener("click", (event) => {
        setVideoState(!videoMuted);
        setservercon()
    });
    //startCamera(media_options);
});

var adbars = `<div class="bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>`

function adduservideo(vid_strm, user_name, call, user_id) {
    let vid_div = document.createElement("div");
    let video = document.createElement("video");
    let audiobar = document.createElement("span");
    let insideaudio = document.createElement("span");
    let name_span = document.createElement("span");
    let speaker = document.createElement("i");

    vid_div.id = "div_" + user_id;
    video.id = "vid_" + user_id;
    vid_div.className = "uservid";
    name_span.className = "username_vid";
    audiobar.className = 'audio-bar'
    speaker.className = 'material-icons ma ma-2x speaker'
    name_span.innerText = user_name;
    speaker.innerText = 'volume_up';
    vid_div.appendChild(speaker);
    vid_div.appendChild(name_span);
    vid_div.appendChild(video);
    audiobar.appendChild(insideaudio)
    vid_div.appendChild(audiobar);
    video.srcObject = vid_strm

    if (vid_strm.getAudioTracks().length == 0) {
        if (call.peer in audioContextlist) {
            $('.audio-bar span').css('height', '100%')
            delete audioContextlist[call.peer]
        }
    } else {
        checkvoice(vid_strm, call)
    }

    if (vid_strm.getVideoTracks().length == 0) {
        setTimeout(function() {
            $('#' + "div_" + user_id + " .bars").remove()
            $('#' + "vid_" + user_id).css('height', '0px');
            $('#' + "div_" + user_id).append(adbars)
        }, 1000)
    } else {
        if (vid_strm.getAudioTracks().length) {
            $('#' + "div_" + user_id + " .bars").remove()
            $('#' + "vid_" + user_id).css('height', '0px')
            $('#' + "div_" + user_id).append(adbars)
        }
    }


    video.addEventListener('loadedmetadata', () => {
        setTimeout(function() { video.play() }, 2000);
    })
    call.on('close', () => {
        video.remove()
        vid_div.remove()
    })
    document.querySelector('.callbar').appendChild(vid_div)
}

function removeuservideo(user_id) {
    let vid = document.getElementById("vid_" + user_id);
    if (vid.srcObject) {
        vid.srcObject.getTracks().forEach(track => track.stop());
    }
    vid.removeAttribute("srcObject");
    vid.removeAttribute("src");
    document.getElementById("div_" + user_id).remove();
}

function setAudioState(flag) {
    if (flag) {
        myVideo.srcObject.getAudioTracks().forEach((track) => {
            media_options.audio = false
            track.enabled = !flag;
            track.muted = true;
            track.stop()
            audioMuted = true;
            myVideo.srcObject.removeTrack(track)
            document.getElementById("micic").innerText = "mic_off";
            createcall(myVideo.srcObject)
        });
    } else {
        media_options.audio = true;
        startCamera(media_options, 'a');
    }
}

function setVideoState(flag) {
    if (flag) {
        myVideo.srcObject.getVideoTracks().forEach((track) => {
            track.enabled = !flag;
            media_options.video = false;
            track.muted = true;
            track.stop()
            videoMuted = true;
            myVideo.srcObject.removeTrack(track)
            document.getElementById("vidicm").innerText = "videocam_off";
            createcall(myVideo.srcObject)
        });
    } else {
        media_options.video = { height: 360 };
        startCamera(media_options, 'v')
    }
}

function startCamera(media_options, typ) {
    navigator.mediaDevices.getUserMedia(media_options)
        .then((stream) => {
            myVideo.srcObject = stream;
            local_str = stream
            cam = true
            if (typ == 'v') {
                videoMuted = false;
                document.getElementById("vidicm").innerText = "videocam";
            } else {
                audioMuted = false;
                document.getElementById("micic").innerText = "mic";
            }
            createcall(stream)
        })
        .catch((e) => {
            console.log("Error! ", e);
            if (typ == 'v') { media_options.video = false; } else { media_options.audio = false; }
            alert("Unable to access Cam or Mic! ");
            cam = false
            document.getElementById("vidicm").innerText = (videoMuted) ? "videocam_off" : "videocam";
            document.getElementById("micic").innerText = (audioMuted) ? "mic_off" : "mic";
        });
    return cam;
}

peer.on('open', function(id) {
    socket.emit('join-room', v_room, peer.id)
});

socket.on("share-peers", userId => {
    socket.emit('send-peer', { data: [v_room, peer.id, user_n] })
})

socket.on("store-peers", data => {
    console.log("STORE PEER")
    let ud = data['data']
    peer_list[ud[1]] = ud[2]
    if (cam && !(ud[1] in peer_calls)) {
        peer.call(ud[1], myVideo.srcObject)
    }
    console.log('new-user')
})

function createcall(stream) {
    for (let x in peer_list) {
        var call = peer.call(x, stream)
    }
}


peer.on('call', call => {
    call.answer()
    call.on('stream', userVideoStream => {
        $('#div_' + call.peer).remove()
        adduservideo(userVideoStream, peer_list[call.peer], call, call.peer)
    })
    peer_calls[call.peer] = call
})

socket.on("vpeer-disconnect", peerid => {
    console.log('vpeer-disconnect ', peerid)
    try {
        peer_calls[peerid].close()
        delete peer_calls[peerid]
    } catch (err) {}
    delete peer_list[peerid]
})

socket.on("stop-call", data => {
    try { peer_calls[data.peerid].close() } catch { console.log('Already Closed') }
})


function setservercon() {
    if (audioMuted && videoMuted) {
        cam = false
        socket.emit("stop-call", { "room_id": v_room, 'name': user_n, 'peerid': peer.id });
    }
}

function checkvoice(stream, call) {
    var audioContext = new AudioContext();
    var microphone = audioContext.createMediaStreamSource(stream);
    var javascriptNode = audioContext.createScriptProcessor(1024, 1, 1);
    microphone.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);
    audioContextlist[call.peer] = audioContext
    javascriptNode.onaudioprocess = function(event) {
        var inpt_L = event.inputBuffer.getChannelData(0);
        var instant_L = 0.0;
        var sum_L = 0.0;
        for (var i = 0; i < inpt_L.length; ++i) {
            sum_L += inpt_L[i] * inpt_L[i];
        }
        instant_L = Math.sqrt(sum_L / inpt_L.length);
        max_level_L = Math.max(max_level_L, instant_L);
        instant_L = Math.max(instant_L, old_level_L - 0.008);
        old_level_L = instant_L;
        let volume = parseInt((100 - 20) * (instant_L / max_level_L))
        $("#div_" + call.peer + ' .audio-bar span').css('height', (100 - volume) + '%')
        $("#div_" + call.peer + ' .bars').css('height', (35 * volume) / 100 + '%')
        if (!call.open || !(call.peer in audioContextlist)) {
            try { audioContext.close() } catch {}
        }
    }
}