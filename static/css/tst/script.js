"use strict";
$('#menu').css("right", "-300px");
$('.menu_icon').on('click', function() {
    if ($('#vid_cion').hasClass('open')) {
        $('#vid_cion').removeClass('open');
        $('#vid_cion').animate({ "right": "100px", "background-position": "0px" }, 180);
        $('#vid_cion').animate({ "right": "300px", "background-position": "-40px" }, 180);
        $('.menu_icon').animate({ "right": "100px", "background-position": "0px" }, 180);
        $('.menu_icon').animate({ "right": "300px", "background-position": "-40px" }, 180);
        $('#vidcon').animate({ "right": "-306px" });
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
            // editor.resize()
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
            // editor.resize()
        $('#maincon').animate({
            "right": "306px",
        });
    }
});

$('#vidcon').css("right", "-300px");
$('.vid_cion').on('click', function() {
    if ($('.menu_icon').hasClass('open')) {
        $('.menu_icon').removeClass('open');
        $('#vid_cion').animate({ "right": "100px", "background-position": "0px" }, 180);
        $('#vid_cion').animate({ "right": "300px", "background-position": "-40px" }, 180);
        $('.menu_icon').animate({ "right": "100px", "background-position": "0px" }, 180);
        $('.menu_icon').animate({ "right": "300px", "background-position": "-40px" }, 180);
        $('#menu').animate({ "right": "-306px" });
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
            //editor.resize()
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
            //editor.resize()
        $('#maincon').animate({
            "right": "306px",
        });
    }
});