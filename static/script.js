var bodyElement = document.getElementsByTagName("BODY")[0];
let swidth = screen.width;
var maincon = document.querySelector('#maincon');
var modes = ['abap', 'abc', 'actionscript', 'ada', 'alda', 'apache_conf', 'apex', 'applescript', 'aql', 'asciidoc', 'asl', 'assembly_x86', 'autohotkey', 'batchfile', 'c9search', 'c_cpp', 'cirru', 'clojure', 'cobol', 'coffee', 'coldfusion', 'crystal', 'csharp', 'csound_document', 'csound_orchestra', 'csound_score', 'csp', 'css', 'curly', 'd', 'dart', 'diff', 'django', 'dockerfile', 'dot', 'drools', 'edifact', 'eiffel', 'ejs', 'elixir', 'elm', 'erlang', 'forth', 'fortran', 'fsharp', 'fsl', 'ftl', 'gcode', 'gherkin', 'gitignore', 'glsl', 'gobstones', 'golang', 'graphqlschema', 'groovy', 'haml', 'handlebars', 'haskell', 'haskell_cabal', 'haxe', 'hjson', 'html', 'html_elixir', 'html_ruby', 'ini', 'io', 'ion', 'jack', 'jade', 'java', 'javascript', 'json', 'json5', 'jsoniq', 'jsp', 'jssm', 'jsx', 'julia', 'kotlin', 'latex', 'latte', 'less', 'liquid', 'lisp', 'livescript', 'logiql', 'logtalk', 'lsl', 'lua', 'luapage', 'lucene', 'makefile', 'markdown', 'mask', 'matlab', 'maze', 'mediawiki', 'mel', 'mips', 'mixal', 'mushcode', 'mysql', 'nginx', 'nim', 'nix', 'nsis', 'nunjucks', 'objectivec', 'ocaml', 'partiql', 'pascal', 'perl', 'pgsql', 'php', 'php_laravel_blade', 'pig', 'plain_text', 'powershell', 'praat', 'prisma', 'prolog', 'properties', 'protobuf', 'puppet', 'python', 'qml', 'r', 'raku', 'razor', 'rdoc', 'red', 'redshift', 'rhtml', 'rst', 'ruby', 'rust', 'sac', 'sass', 'scad', 'scala', 'scheme', 'scrypt', 'scss', 'sh', 'sjs', 'slim', 'smarty', 'smithy', 'snippets', 'soy_template', 'space', 'sparql', 'sql', 'sqlserver', 'stylus', 'svg', 'swift', 'tcl', 'terraform', 'tex', 'text', 'textile', 'toml', 'tsx', 'turtle', 'twig', 'typescript', 'vala', 'vbscript', 'velocity', 'verilog', 'vhdl', 'visualforce', 'wollok', 'xml', 'xquery', 'yaml', 'zeek']
var themes = ['nord_dark', 'vibrant_ink', 'twilight', 'tomorrow_night_blue', 'kr_theme', 'textmate', 'merbivore_soft', 'crimson_editor', 'tomorrow_night_eighties', 'dracula', 'sqlserver', 'eclipse', 'tomorrow_night_bright', 'clouds_midnight', 'iplastic', 'chaos', 'mono_industrial', 'dreamweaver', 'gob', 'merbivore', 'dawn', 'one_dark', 'chrome', 'monokai', 'gruvbox', 'github', 'tomorrow', 'ambiance', 'cobalt', 'pastel_on_dark', 'xcode', 'solarized_dark', 'terminal', 'clouds', 'tomorrow_night', 'solarized_light', 'kuroir', 'katzenmilch', 'idle_fingers']
maincon.style.width = swidth - 101 + "px"
maincon.style.fontSize = '20px';
maincon.style.padding = '10px';
var user_n, already_user, donow, rapid_user_call;
var suser = 'true';
var dynamic_lang = false;
var firstdis = false;

var guid = function() { return Date.now().toString(36) + Math.random().toString(36).substr(2); }

if (localStorage.hasOwnProperty('clbuid')) {
    uid = localStorage.getItem('clbuid')
} else {
    uid = guid();
    localStorage.setItem('clbuid', uid)
}

"use strict";
$('#menu').css("right", "-300px");
$('.menu_icon').on('click', function(e) {
    if ($('.popup').hasClass('open')) { e.preventdefault(); return false; }

    if ($('#vid_cion').hasClass('open')) {
        $('#vid_cion').removeClass('open');
        $('#vid_cion').animate({ "right": "100px", "background-position": "0px" }, 180);
        $('#vid_cion').animate({ "right": "300px", "background-position": "-40px" }, 180);
        $('.menu_icon').animate({ "right": "100px", "background-position": "0px" }, 180);
        $('.menu_icon').animate({ "right": "300px", "background-position": "-40px" }, 180);
        $('#vidcon').animate({ "right": "-306px" });
        $('#maincon').width($('#maincon').width() + 302)
        editor.resize()
    }
    if ($('.menu_icon').hasClass('open')) {
        $(this).removeClass('open');
        $(this).animate({
            "right": "0px",
            "background-position": "0px"
        });
        $('#menu').animate({ "right": "-306px" });
        $('#maincon').animate({
            "right": "5px"
        });
        $('#vid_cion').animate({
            "right": "0px",
            "background-position": "0px"
        });
        $('#maincon').width($('#maincon').width() + 302)
        editor.resize()
    } else {
        $(this).addClass('open');
        $(this).animate({
            "right": "300px",
            "background-position": "-40px"
        });
        $('#vid_cion').animate({
            "right": "300px",
            "background-position": "-40px"
        });
        $('#menu').animate({ "right": "0px" });
        $('#maincon').width($('#maincon').width() - 302)
        editor.resize()
        $('#maincon').animate({
            "right": "306px",
        });
    }
});

$('#vidcon').css("right", "-300px");
$('.vid_cion').on('click', function() {
    if ($('.popup').hasClass('open')) { e.preventdefault(); return false; }
    if ($('.menu_icon').hasClass('open')) {
        $('.menu_icon').removeClass('open');
        $('#vid_cion').animate({ "right": "100px", "background-position": "0px" }, 180);
        $('#vid_cion').animate({ "right": "300px", "background-position": "-40px" }, 180);
        $('.menu_icon').animate({ "right": "100px", "background-position": "0px" }, 180);
        $('.menu_icon').animate({ "right": "300px", "background-position": "-40px" }, 180);
        $('#menu').animate({ "right": "-306px" });
        $('#maincon').width($('#maincon').width() + 302)
        editor.resize()
    }
    if ($('.vid_cion').hasClass('open')) {
        $(this).removeClass('open');
        $(this).animate({
            "right": "0px",
            "background-position": "0px"
        });
        $('#vidcon').animate({ "right": "-306px" });
        $('#maincon').animate({
            "right": "5px"
        });
        $('.menu_icon').animate({
            "right": "0px",
            "background-position": "0px"
        });
        $('#maincon').width($('#maincon').width() + 302)
        editor.resize()
    } else {
        $(this).addClass('open');
        $(this).animate({
            "right": "300px",
            "background-position": "-40px"
        });
        $('.menu_icon').animate({
            "right": "300px",
            "background-position": "-40px"
        });
        $('#vidcon').animate({ "right": "0px" });
        $('#maincon').width($('#maincon').width() - 302)
        editor.resize()
        $('#maincon').animate({
            "right": "306px",
        });
    }
});

function openFullscreen() {
    if (document.body.requestFullscreen) {
        scrrentoggle('full');
        document.body.requestFullscreen();
    } else if (document.body.webkitRequestFullscreen) { /* Safari */
        scrrentoggle('full');
        document.body.webkitRequestFullscreen();
    } else if (document.body.msRequestFullscreen) { /* IE11 */
        scrrentoggle('full');
        document.body.msRequestFullscreen();
    }
}


function closeFullscreen() {
    if (document.exitFullscreen) {
        scrrentoggle('exit');
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        scrrentoggle('exit');
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        scrrentoggle('exit');
        document.msExitFullscreen();
    }
}

function scrrentoggle(typ) {
    if (typ == 'full') {
        $('#fullscr').hide();
        $('#exitscr').show();
    } else {
        $('#fullscr').show();
        $('#exitscr').hide();
    }
}


function closepopu() {
    $(".popup").removeClass("open");
    $(".popup").not(":animated").animate({
        "top": -$(".popup").outerHeight(true),
        "right": 20
    }, 300, function() {
        $(this).hide();
    });
}

function popupSet() {
    var popupH = $(".popup").outerHeight(true);
    if (!$(".popup").hasClass("open")) {
        $(".popup").addClass("open");
        $(".popup").not(":animated").animate({
            "top": -popupH,
            "right": 20
        }, 100, function() {
            $(this).show().not(":animated").animate({
                "top": 20
            }, 300);
        });

    }
}

function createsetup() {
    var inp = $('.email_insert input').val().trim();
    if (inp == '') {
        alert('Please Enter Your Name In Input Box')
    } else {
        $.post("/setup", { name: inp, clbuid: localStorage.getItem('clbuid') }, function(data) {
            $('<form action="/' + data + '" enctype="multipart/form-data" method="POST"><input name="uri" value="' + data + '"></form>').appendTo('body').submit();
        });
    }
}

$('#startcollab').click(function() {
    createsetup()
});

function createuserpop() {
    $('.popup h2').html('Join ' + c_name + ' Collab Pad')
    $('.popup p').html('Please Enter Your Name For Join Collab Pad.')
    $('#startcollab').hide()
    $('#joincollab').show()
}

function setuser() {
    $('#username').html(localStorage.getItem('uname'));
    $('.hidelink').show('normal')
    if (v_room) socket.emit('join-room', v_room, peer.id)

}
$('#usernameedit').click(function() {
    createuserpop();
    popupSet();
})


$('#nameinp').keypress(function(e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
        createsetup()
    }
});

function copy_to_clip() {
    var copyText = document.getElementById("link_inp");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Link Copied: " + copyText.value);
}

function create_custom_dropdowns() {
    $('select').each(function(i, select) {
        if (!$(this).next().hasClass('dropdown-select')) {
            $(this).after('<div id="' + $(this).attr('id') + 'm" class="dropdown-select wide ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
            var dropdown = $(this).next();
            var options = $(select).find('option');
            var selected = $(this).find('option:selected');
            dropdown.find('.current').html(selected.data('display-text') || selected.text());
            options.each(function(j, o) {
                var display = $(o).data('display-text') || '';
                dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
            });
        }
    });

    $('.dropdown-select ul').before('<div class="dd-search"><input placeholder="Search ..."" autocomplete="off" onkeyup="filter(this)" class="dd-searchbox" type="text"></div>');
}

// Event listeners

// Open/close
$(document).on('click', '.dropdown-select', function(event) {
    if ($(event.target).hasClass('dd-searchbox')) {
        return;
    }
    $('.dropdown-select').not($(this)).removeClass('open');
    $(this).toggleClass('open');
    if ($(this).hasClass('open')) {
        $(this).find('.option').attr('tabindex', 0);
        $(this).find('.selected').focus();
    } else {
        $(this).find('.option').removeAttr('tabindex');
        $(this).focus();
    }
});

// Close when clicking outside
$(document).on('click', function(event) {
    if ($(event.target).closest('.dropdown-select').length === 0) {
        $('.dropdown-select').removeClass('open');
        $('.dropdown-select .option').removeAttr('tabindex');
    }
    event.stopPropagation();
});

function autocomp(val) {
    editor.setOptions({
        enableBasicAutocompletion: val,
        enableSnippets: val,
        enableLiveAutocompletion: val
    });
}

$("#autocomp").change(function() {
    if (this.checked) {
        autocomp(true)
        localStorage.setItem('autoc', 'true')
    } else {
        autocomp(false)
        localStorage.setItem('autoc', 'false')
    }
});
$("#wraptext").change(function() {
    if (this.checked) {
        editor.session.setUseWrapMode(true);
        localStorage.setItem('twrap', 'true')
    } else {
        editor.session.setUseWrapMode(false);
        localStorage.setItem('twrap', 'false')
    }
});

function filter(e) {
    var valThis = e.value;
    $(e).parent().parent().parent().find('ul > li').each(function() {
        var text = $(this).text();
        (text.toLowerCase().indexOf(valThis.toLowerCase()) > -1) ? $(this).show(): $(this).hide();
    });
};
// Search

// Option click
$(document).on('click', '.dropdown-select .option', function(event) {
    $(this).closest('.list').find('.selected').removeClass('selected');
    $(this).addClass('selected');
    var text = $(this).data('display-text') || $(this).text();
    $(this).closest('.dropdown-select').find('.current').text(text);
    $(this).closest('.dropdown-select').prev('select').val($(this).data('value')).trigger('change');
});

// Keyboard events
$(document).on('keydown', '.dropdown-select', function(event) {
    var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
    // Space or Enter
    //if (event.keyCode == 32 || event.keyCode == 13) {
    if (event.keyCode == 13) {
        if ($(this).hasClass('open')) {
            focused_option.trigger('click');
        } else {
            $(this).trigger('click');
        }
        return false;
        // Down
    } else if (event.keyCode == 40) {
        if (!$(this).hasClass('open')) {
            $(this).trigger('click');
        } else {
            focused_option.next().focus();
        }
        return false;
        // Up
    } else if (event.keyCode == 38) {
        if (!$(this).hasClass('open')) {
            $(this).trigger('click');
        } else {
            var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
            focused_option.prev().focus();
        }
        return false;
        // Esc
    } else if (event.keyCode == 27) {
        if ($(this).hasClass('open')) {
            $(this).trigger('click');
        }
        return false;
    }
});

function title(str) {
    return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}


$('#themesl').change(function() {
    editor.setTheme("ace/theme/" + $(this).val());
    localStorage.setItem('c_theme', $(this).val())
})
var ss = '';

$(document).ready(function() {

    for (x in modes) {
        $('#modesl').append('<option value="' + modes[x] + '">' + title(modes[x]) + '</option>')
    }
    for (x in themes) {
        $('#themesl').append('<option value="' + themes[x] + '">' + title(themes[x]) + '</option>')
    }
    if ('c_theme' in localStorage) {
        editor.setTheme("ace/theme/" + localStorage.getItem('c_theme'));
        $('#themesl').val(localStorage.getItem('c_theme')).change()
    }
    if ('c_mode' in localStorage && localStorage.c_mode !== 'null') {
        editor.session.setMode("ace/mode/" + localStorage.getItem('c_mode'));
        $('#modesl').val(localStorage.getItem('c_mode')).change()
    } else {
        $('#modesl').val('plain_text').change()
    }
    if ('twrap' in localStorage && localStorage.getItem('twrap') == 'true') {
        $('#wraptext').prop('checked', true);
        editor.session.setUseWrapMode(true);
    }
    if ('autoc' in localStorage && localStorage.getItem('autoc') == 'false') {
        $('#autocomp').prop('checked', false);
        autocomp(false)
    }

    create_custom_dropdowns();

    socket.on('getfornew', function(data) {
        if (donow == undefined) {
            editor.setValue(data.value);
            $('#modesl').val(data.lang).change();
            timer1.settime(data.time[0], data.time[1])

        }
        donow = true;
    })

    socket.on('connect', function() {
        if (orgtab) {
            socket.emit('usercon', { uid: [uid, user_n, c_uri] });
            timer1.starttimer();
        }
        if (already_user) {
            socket.emit('usercon', { uid: [uid, user_n, c_uri] });
            timer1.starttimer();
        }
        if (firstdis) {
            peer = new Peer(uid);
            peer.on('open', function(id) {
                socket.emit('join-room', v_room, peer.id)
            });
        }
        shownotification('success', 'Connected To Pi7 Collab')
    });
    socket.on('disconnect', function() {
        shownotification('error', 'Collab Is Disconnected From Server. Please Check Your Internet.')
    })

    $('#joincollab').click(function() {
        var inp = $('.email_insert input').val().trim();
        if (inp == '') {
            alert('Please Enter Your Name In Input Box')
        } else {
            localStorage.setItem('uname', inp);
            user_n = localStorage.getItem('uname');
            setuser();
            socket.emit('usercon', { uid: [uid, user_n, c_uri] });
            timer1.starttimer();
            closepopu();
        }
    });

    socket.on('admin_Change', function(data) {
        admin = data['admin']
        $('.act-user').remove()
        $('#' + admin).append('<span class="act-user"><i class="material-icons ma ma-2x">swap_horizontal_circle</i></span>')
    });

    socket.on('superuser', function(data) {
        suser = data.val[0]
    });

    socket.on('usercon', function(data) {
        suser = data['superuser']
        update_user_list(data['cls'])
        var uis_ar = Object.keys(data['cls'])
        if (!firstdis && uis_ar[0] == uid) uis_ar.shift()
        if (uis_ar.length > 0 && uis_ar[0] == uid) {
            socket.emit('getfornew', { value: editor.getValue(), lang: $('#modesl').val(), time: [timer1.min, timer1.sec] });
        }
        firstdis = true
    })

    socket.on('langchange', function(data) {
        if (data.uid !== uid) {
            dynamic_lang = true;
            $('#modesl').val(data.lang).change();
            $('.option[data-value="' + data.lang.toLowerCase() + '"]').click()
        }
    })

    socket.on('message', function(delta) {
        if ('adminup' in delta) {
            admin = delta['clbuid']
        } else {
            if (uid !== admin) {
                editor.session.doc.applyDelta(delta);
                admin = delta['admin']
                editor.blur()
            }
        }
    });
    $('.linksh').on('click', '#modeslm', function(e) {
        if (!dynamic_lang && uid != admin) {
            e.stopPropagation()
            shownotification('info', "Only Editor Can Change Languge.")
        } else {
            if (dynamic_lang) {
                setTimeout(function() {
                    $('#modeslm').removeClass('open');
                }, 200);
            }
            dynamic_lang = false;
        }
    })
    $('#modesl').change(function() {
        if (uid == admin) {
            socket.emit('langchange', { lang: $('#modesl').val(), uid: uid });
        }
        editor.session.setMode("ace/mode/" + $(this).val());
        localStorage.setItem('c_mode', $(this).val())
    })
    var mm = 0
    editor.on('change', function(delta) {
        delta['uid'] = uid;
        delta['c_name'] = c_name;
        if (uid == admin) {
            if (donow == true) {
                socket.send(delta);
            }
        }
    })


    editor.on("focus", function() {
        if (suser == 'true' || suser == undefined) {
            if (uid != admin) {
                editor.blur();
                $('#popup1').addClass('showedit_overlay');
            }
        } else if (suser == 'false' && uid != orga_id) {
            shownotification('error', 'You Dont Have Permission To Edit This Collab')
            editor.blur();
        }
    })

    $('#editon').click(function() {
        socket.send({ uri: c_name, clbuid: localStorage.getItem('clbuid'), adminup: 'true' });
        $('#popup1').removeClass('showedit_overlay');
        socket.emit('admin_Change', { admin: localStorage.getItem('clbuid') });
    })

    $('#popup1 .close').click(function() {
        $('#popup1').removeClass('showedit_overlay');
    })
    if (localStorage.getItem('orga') == c_name) {
        $('.hidep').removeClass('hidep')
    }
    $("#superedit").change(function() {
        if (this.checked) {
            socket.emit('superuser', { val: ['true', c_uri] });
        } else {
            socket.emit('superuser', { val: ['false', c_uri] });
        }
    });
});

$('#downloatext').click(function() {
    download('pi7_collab', editor.getValue())
})

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function update_user_list(data) {

    $('#user_list').html('');
    for (x in data) {
        $('#user_list').append(`<p id="` + x + `" class="sub-span"><i class="material-icons ma ma-2x">account_circle</i> ` + data[x] + `</p>`)
    }
    $('.act-user').remove()
    $('#' + admin).append('<span class="act-user"><i class="material-icons activaeuser ma ma-2x">swap_horizontal_circle</i></span>')
}

function shownotification(type, msg) {
    if (type == 'error') {
        $('#snackbar').html('<i class="material-icons ma ma-2x">warning</i> ' + msg)
        $('#snackbar').css('background-color', '#f44336')
    }
    if (type == 'success') {
        $('#snackbar').html('<i class="material-icons ma ma-2x">supervised_user_circle</i> ' + msg)
        $('#snackbar').css('background-color', 'green')
    }
    if (type == 'info') {
        $('#snackbar').html('<i class="fa fa-exclamation-circle"></i> ' + msg)
        $('#snackbar').css('background-color', '#ff5722')
    }
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 6000);
}

var body = document.getElementsByTagName("BODY")[0];
var width = body.offsetWidth;

if (window.addEventListener) { // all browsers except IE before version 9
    window.addEventListener("resize", onResizeEvent, true);
} else {
    if (window.attachEvent) { // IE before version 9
        window.attachEvent("onresize", onResizeEvent);
    }
}

function onResizeEvent() {
    newWidth = bodyElement.offsetWidth;
    if (newWidth != width) {
        width = newWidth;
        $('#menu_cion.open').click()
        $('#maincon').width(width - 85)
        editor.resize()
    }
}

function close_window() {
    if (confirm("Close Pi7 Collab?")) {
        window.location.href = 'https://collab.pi7.org'
    }
}

class timer {
    constructor(timer_id) {
        this.timer = document.getElementById(timer_id)
        this.sec = 0;
        this.min = 0;
        this.intervalID = null;
    }
    settime(min, sec) {
        this.sec = sec;
        this.min = min;
    }
    gnerate_time(self) {
        var s = self.sec;
        var m = self.min;
        if (self.sec < 10) s = "0" + s;
        if (self.sec == 59) {
            self.min += 1;
            self.sec = 0;
        }
        if (self.min < 10) m = "0" + m;
        return m + ":" + s
    }
    starttimer() {
        var self = this;
        clearInterval(self.intervalID)
        self.intervalID = setInterval(function() {
            self.sec += 1
            this.timer.innerHTML = self.gnerate_time(self);
        }, 1000);
    }
}

let timer1 = new timer("timer");

$('#caller_list').on('click', '.uservid', function() {
    if ($(this).hasClass('fullvideo')) {
        $(this).removeClass('fullvideo')
    } else { $(this).addClass('fullvideo') }
})
$('#caller_list').on('click', '.speaker', function(e) {
    let vid = $(this).parent().find('video')
    console.log(vid.attr('muted'))
    if (vid.attr('muted')) {
        $(this).html('volume_up')
        vid.removeAttr('muted')
    } else {
        $(this).html('volume_off')
        vid.attr('muted', 'true')
    }
    throw 'stop'
})