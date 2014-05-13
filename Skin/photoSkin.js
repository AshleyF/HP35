function skin() {
    var html = '<img src="face.png" width="320" height="480" />';
    function button(key, title, left, top, width, height) {
        var x1 = left * 2;
        var y1 = top * 2;
        var x2 = x1 + width * 2;
        var y2 = y1 + height * 2;
        html += '<span class="button" title="' + title + '" onmousedown="setkey(' + key + ')" style="left:' + left + 'px;top:' + top + 'px;width:' + width + 'px;height:' + height + 'px"></span>';
    }
    button(6,  "^",         55,  115, 42, 40);
    button(4,  "G",         97,  115, 42, 40);
    button(3,  "L",         140, 115, 42, 40);
    button(2,  "E",         182, 115, 42, 40);
    button(0, "SPACEBAR",   224, 115, 42, 40);
    button(46, "Q",         55,  157, 42, 40);
    button(44, "A",         97,  157, 42, 40);
    button(43, "S",         140, 157, 42, 40);
    button(42, "C",         182, 157, 42, 40);
    button(40, "T",         224, 157, 42, 40);
    button(14, "F",         55,  200, 42, 40);
    button(12, "W",         97,  200, 42, 40);
    button(11, "R",         140, 200, 42, 40);
    button(10, ">",         182, 200, 42, 40);
    button(8,  "<",         224, 200, 42, 40);
    button(62, "ENTER",     55,  241, 84, 40);
    button(59, "~ (tilde)", 140, 241, 42, 40);
    button(58, "X",         182, 241, 42, 40);
    button(56, "BACKSPACE", 224, 241, 42, 40);
    button(54, "-",         53,  284, 41, 40);
    button(52, "7",         95,  284, 60, 40);
    button(51, "8",         154, 284, 60, 40);
    button(50, "9",         212, 284, 60, 40);
    button(22, "+",         53,  327, 41, 40);
    button(20, "4",         95,  327, 60, 40);
    button(19, "5",         154, 327, 60, 40);
    button(18, "6",         212, 327, 60, 40);
    button(30, "*",         53,  371, 41, 40);
    button(28, "1",         95,  371, 60, 40);
    button(27, "2",         154, 371, 60, 40);
    button(26, "3",         212, 371, 60, 40);
    button(38, "/",         53,  415, 41, 40);
    button(36, "0",         95,  415, 60, 40);
    button(35, ".",         154, 415, 60, 40);
    button(34, "P",         212, 415, 60, 40);
    html += '<img id="power" class="button" src="switchoff.png" style="display:none;position:absolute;left:85px;top:92px" width="36" height="17" />';
    html += '<span class="button" title="O" onmousedown="powerToggle()" style="position:absolute;left:75px;top:84px;width:56px;height:30px"></span>';
    html += '<div style="position:absolute;left:69px;top:34px">'
    for (var d = 0; d < 15; d++)
        html += '<img id="dig' + d + '" src="digoff.png" width="12" height="15" />';
    html += '</div>';
    document.getElementById("calc").innerHTML = html;
    mode(); mode(); // switch to regular mode
}

function disp() {
    var d = 0;
    function digit(num) {
        document.getElementById("dig" + d++).src = "dig" + num + ".png";
    }
    if (power && display) { // TODO: on/off flag passed in
        for (var i = 14 - 1; i >= 0; i--) {
            if (b[i] >= 8)
                digit("off");
            else if (i == 2 || i == 13)
                digit(a[i] >= 8 ? "neg" : "off");
            else
                digit(a[i]);
            if (b[i] == 2)
                digit("dot");
        }
    }
    else {
        for (var i = 0; i < 15; i++)
            digit("off");
    }
}

function powerToggle() {
    power = !power;
    document.getElementById("power").style.display = (power ? "none" : "");
    if (power) setkey(0); else disp();
}

function regs(init) {
    /* NYI */
}