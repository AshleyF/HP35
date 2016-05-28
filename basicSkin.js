function skin() {
    var html =
        '<div id="internals" onmousedown="mode()"><span id="regs" class="registers"></span></div>' +
        '<span id="disp" title="Click to cycle through Tracing, Fast and Normal modes." class="display" onmousedown="mode()"></span>' +
        '<span class="keys">';
    function button(key, cls, title, label) {
        html += '<span class="' + cls + '" title="' + title + '" onclick="setkey(' + key + ')">' + label + '</span>';
    }
    button(6,  "black super",         "^",         "x<sup>y</sup>");
    button(4,  "black",               "G",         "LOG");
    button(3,  "black",               "L",         "LN");
    button(2,  "black super",         "E",         "e<sup>x</sup>");
    button(0,  "blue",                "SPACEBAR",  "CLR");
    button(46, "black",               "Q",         "&radic;x");
    button(44, "gray",                "A",         "ARC");
    button(43, "gray",                "S",         "SIN");
    button(42, "gray",                "C",         "COS");
    button(40, "gray",                "T",         "TAN");
    button(14, "black super",         "F",         "<sup>1</sup>/<sub>x</sub>");
    button(12, "black super",         "W",         "x&harr;y");
    button(11, "black",               "R",         "R&darr;");
    button(10, "black",               ">",         "STO");
    button(8,  "black",               "<",         "RCL");
    button(62, "blue enter",          "ENTER",     "ENTER&uarr;");
    button(59, "blue",                "~ (tilde)", "CHS");
    button(58, "blue",                "X",         "EEX");
    button(56, "blue",                "BACKSPACE", "CLX");
    button(54, "blue operator super", "-",         "-");
    button(52, "white",               "7",         "7");
    button(51, "white",               "8",         "8");
    button(50, "white",               "9",         "9");
    button(22, "blue operator",       "+",         "+");
    button(20, "white",               "4",         "4");
    button(19, "white",               "5",         "5");
    button(18, "white",               "6",         "6");
    button(30, "blue operator",       "*",         "&times;");
    button(28, "white",               "1",         "1");
    button(27, "white",               "2",         "2");
    button(26, "white",               "3",         "3");
    button(38, "blue operator",       "/",         "&divide;");
    button(36, "white",               "0",         "0");
    button(35, "white",               ".",         ".");
    button(34, "white",               "P",         "&pi;");
    html += '</span>';
    document.getElementById("calc").innerHTML = html;
    document.getElementById("info").innerHTML = 
    '<p>Tap the display to cycle through Tracing, Fast (green) and Normal (red) modes. Tracing shows internal registers and instructions while Fast mode executes at full speed. Also, have a look at <a href="Skin/">the photorealistic skin</a>.</p>' +
    document.getElementById("info").innerHTML +
    '<p id="unittests"><a href="javascript:unitTests()">Run Unit Tests</a></p>';
}

function regs(init) {
    if (trace) {
        if (init) {
            document.getElementById("regs").innerHTML = "Tracing is on<br/>Press a key...";
        }
        else {
            function printreg(r, name) {
                var p = "";
                for (var j = 0; j < 14; j++)
                    p = r[j] + p;
                return "<span>" + name + "=" + p + "</span>";
            }
            var regs = "";
            regs += printreg(a,"A");
            regs += printreg(b,"B");
            regs += printreg(c,"C");
            regs += printreg(d,"D");
            regs += printreg(e,"E");
            regs += printreg(f,"F");
            regs += printreg(m, "M");
            regs += "<span>S=";
            for (var j = 0; j < 12; j++)
                regs += s[j];
            regs += "</span><span>P=" + p + "</span>";
            document.getElementById("regs").innerHTML = regs;
        }
    }
}

function disp() {
    var spacer = '<span class="spacer">_</span>';
    var dstr = "";
    if (power && display) {
        for (var i = 14 - 1; i >= 0; i--) {
            if (b[i] >= 8)
                dstr += spacer;
            else if (i == 2 || i == 13)
                dstr += (a[i] >= 8 ? "-" : spacer);
            else
                dstr += a[i];
            if (b[i] == 2)
                dstr += ".";
        }
    }
    else {
        dstr = spacer;
    }
    if (dstr != lastdstr) {
        lastdstr = dstr;
        document.getElementById("disp").innerHTML = dstr;
    }
}

function powerToggle() {
    power = !power;
    disp();
}
