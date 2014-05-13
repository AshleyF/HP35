var s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var rom, keybuf, lastkey, keyflagtests, trace, updateTrace, suspended, power, display, lastdstr, fastmode;

function mode() {
    var style = "";
    if (fastmode) {
        fastmode = false;
    }
    else if (trace) {
        trace = false;
        fastmode = true;
        style = "fast";
    }
    else {
        trace = true;
        style = "trace";
        regs(true);
    }
    document.getElementById("calc").className = "calculator " + style;
}

function boot() {
    keybuf = [];
    lastkey = 0;
    keyflagtests = 0;
    updateTrace = true;
    suspended = false;
    power = true;
    display = false;
    lastdstr = "";
    trace = false;
    fastmode = false;
    rom = (window.location.search.indexOf("v=4") != -1 ? romV4 : romV2);
    info();
    skin();
    start();
    mode();
}

function switchRom(rom) {
    alert("Switching to ROM v" + rom);
    document.location = "?v=" + rom;
}

function keyStatusFlagTestInstructionHit() {
    keyflagtests++
    if (updateTrace)
        updateTrace = false; // stop gathering after first s[0] test to avoid capturing (uninteresting) IO polling loop
}

function keyToRomInstructionHit() {
    updateTrace = true;
}

function step() {
    disp();
    if (keyflagtests > 0) {
        if (s[0] == 0 && keybuf.length > 0) {
            keyflagtests = 0;
            lastkey = keybuf.pop();
            s[0] = 1; // signal key entry
        }
        else if (display && keyflagtests > 10) {
            suspended = true;
            return;
        }
    }
    for (var i = 0; i < (trace ? 1 : (fastmode ? 10000 : 100)); i++) { // multiple instructions per clock cycle to speed up
        prevCarry = carry;
        carry = 0;
        if (trace && updateTrace)
            regs(false);
        rom[offset + pc++]();
        pc %= 256; // wrap back to beginning of the ROM
    }
    window.setTimeout(step, (trace ? 0 : 25));
}

function start() {
    window.setTimeout(step, (trace ? 0 : 25));
}

function setkey(key) {
    keybuf.push(key);
    if (suspended) {
        suspended = false;
        start();
    }
}

function keydown(e) {
    var key = (e && e.which ? e.which : event.keyCode);
    if (key == 8) // BACKSPACE
    {
        setkey(56); // CLX
        event.returnValue = false; // disable paging down
        if (e) e.preventDefault(); // Firefox
    }
}

function keypress(e) {
    function intercept(key) {
        switch (key) {
            case 48: // 0
                setkey(36);
                return true;
            case 49: // 1
                setkey(28);
                return true;
            case 50: // 2
                setkey(27);
                return true;
            case 51: // 3
                setkey(26);
                return true;
            case 52: // 4
                setkey(20);
                return true;
            case 53: // 5
                setkey(19);
                return true;
            case 54: // 6
                setkey(18);
                return true;
            case 55: // 7
                setkey(52);
                return true;
            case 56: // 8
                setkey(51);
                return true;
            case 57: // 9
                setkey(50);
                return true;
            case 46: // .
                setkey(35);
                return true;
            case 13: // ENTER
                setkey(62);
                return true;
            case 45: // -
                setkey(54);
                return true;
            case 43: // +
                setkey(22);
                return true;
            case 42: // *
                setkey(30);
                return true;
            case 47: // /
                setkey(38);
                return true;
            case 112: // P
            case 80: // p
                setkey(34);
                return true;
            case 126: // ~
                setkey(59); // CHS
                return true;
            case 32: // SPACE
                setkey(0); // CLR
                return true;
            case 120: // x
            case 88: // X
                setkey(58); // EEX
                return true;
            case 97: // a
            case 65: // A
                setkey(44); // ARC
                return true;
            case 115: // s
            case 83: // S
                setkey(43); // SIN
                return true;
            case 99: // c
            case 67: // C
                setkey(42); // COS
                return true;
            case 116: // t
            case 84: // T
                setkey(40); // TAN
                return true;
            case 108: // l
            case 76: // L
                setkey(3); // LN
                return true;
            case 103: // g
            case 71: // G
                setkey(4); // LOG
                return true;
            case 101: // e
            case 69: // E
                setkey(2); // e^x
                return true;
            case 94: // ^
                setkey(6); // x^y
                return true;
            case 113: // q
            case 81: // Q
                setkey(46); // sqrt
                return true;
            case 102: // f
            case 70: // F
                setkey(14); // 1/x
                return true;
            case 119: // w
            case 87: // W
                setkey(12); // x<>y
                return true;
            case 114: // r
            case 82: // R
                setkey(11); // roll
                return true;
            case 62: // >
                setkey(10); // STO
                return true;
            case 60: // <
                setkey(8); // RCL
                return true;
            case 111: // o
            case 79: // O
                powerToggle(); // sqrt
                return true;
            //default: 
            //    alert(event.keyCode); 
            //    return false; 
        }
        return false;
    }
    if (intercept(e && e.which ? e.which : event.keyCode)) {
        if (e) e.preventDefault(); // Firefox
        else event.returnValue = false; // disable paging down
    }
}

if (window.addEventListener) {
    document.addEventListener("keydown", keydown, false);
    document.addEventListener("keypress", keypress, false);
}
else { // IE
    document.onkeydown = keydown;
    document.onkeypress = keypress;
}