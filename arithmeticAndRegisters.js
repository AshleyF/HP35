var a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var p = 0;
var pc = 0;
var ret = 0;
var offset = 0;
var carry = 0;
var prevCarry = 0;

// helper functions

function doCarry(res) {
    carry = (res > 9 || res < 0) ? 1 : 0;
    return (res + 10) % 10;
}

function doAdd(x, y) { return doCarry(x + y + carry); }

function doSub(x, y) { return doCarry((x - y) - carry); }

function field(val) { return val == -1 ? p : val; }

// any instructions taking arguments return a closure of no args

function keyrom() { keyToRomInstructionHit(); pc = lastkey; } // keys -> rom address
function disptoggle() { display = !display; } // display toggle
function dispoff() { display = false; } // display off
function goto(addr) { return function () { if (prevCarry != 1) pc = addr; }; } // go to @addr
function jsb(addr) { return function () { ret = pc; pc = addr; }; } // jsb @addr
function retn() { pc = ret; }
function sets(num, val) { return function () { s[num] = val; }; } // val -> s#
function tests(num) { return function () { if (num == 0) keyStatusFlagTestInstructionHit(); carry = s[num]; }; } // if s# = 0
function setp(val) { return function () { p = val; }; } // # -> p
function testp(num) { return function () { carry = (p == num ? 1 : 0); }; } // if p # 11
function incp() { p = (p + 1) & 0xf; } // p + 1 -> p
function decp() { p = (p - 1) & 0xf; } // p - 1 -> p
function setrom(num) { return function () { offset = num * 256; }; } // select rom #
function zeroreg(reg, first, last) { return setreg(reg, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], first, last); } // 0 -> r[f]
function negc(first, last) { return negcdec(first, last, 0); } // 0 - c -> c[f]
function negsubc(first, last) { return negcdec(first, last, 1); } // 0 - c - 1 -> c[f]
function nop() { }

function stacka() { // stack -> a
    for (var i = 0; i < 14; i++) {
        a[i] = d[i];
        d[i] = e[i];
        e[i] = f[i];
    }
}

function setreg(r1, r2, first, last) { // r2 -> r1[f]
    return function () {
        var f = field(first), l = field(last);
        carry = 0;
        for (var i = f; i <= l; i++)
            r1[i] = r2[i];
    };
}

function increg(reg, first, last) {
    return function () {
        var f = field(first), l = field(last);
        carry = 1;
        for (var i = f; i <= l; i++)
            reg[i] = doAdd(reg[i], 0);
    };
}

function decreg(reg, first, last) {
    return function () {
        var f = field(first), l = field(last);
        carry = 1;
        for (var i = f; i <= l; i++)
            reg[i] = doSub(reg[i], 0);
    };
}

function exchreg(a, b, first, last) {
    return function () {
        var f = field(first), l = field(last);
        carry = 0;
        for (var i = f; i <= l; i++) {
            var t = a[i]; a[i] = b[i]; b[i] = t;
        }
    };
}

function negcdec(first, last, dec) {
    return function () {
        var f = field(first), l = field(last);
        carry = dec;
        for (var i = f; i <= l; i++)
            c[i] = doSub(0, c[i]);
    };
}

function downrot() { // down rotate
    var t;
    for (var i = 0; i < 14; i++) {
        t = c[i];
        c[i] = d[i];
        d[i] = e[i];
        e[i] = f[i];
        f[i] = t;
    }
};

function clearregs() {
    for (var i = 0; i < 14; i++)
        a[i] = b[i] = c[i] = d[i] = e[i] = f[i] = m[i] = 0;
}

function clears() {
    for (var i = 0; i < 12; i++)
        s[i] = 0;
}

function shiftl(reg, first, last) {
    return function () { // shift left r[f]
        var f = field(first), l = field(last);
        carry = 0;
        for (var i = l; i >= f; i--)
            reg[i] = (i == f) ? 0 : reg[i - 1];
    };
}

function shiftr(reg, first, last) {
    return function () { // shift right r[f]
        var f = field(first), l = field(last);
        carry = 0;
        for (var i = f; i <= l; i++)
            reg[i] = (i == l) ? 0 : reg[i + 1];
    };
}

function cstack() {
    for (var i = 0; i < 14; i++) {
        f[i] = e[i];
        e[i] = d[i];
        d[i] = c[i];
    }
}

function ifregzero(reg, first, last) {
    return function () { // if r[f] = 0
        var f = field(first), l = field(last);
        for (var i = f; i <= l; i++)
            carry |= (reg[i] != 0) ? 1 : 0;
    };
}

function sub(a, b, c, first, last) { // b - c -> a[f] or a[f] = b - c
    return function () {
        var f = field(first), l = field(last);
        carry = 0;
        for (var i = f; i <= l; i++)
            a[i] = doSub(b[i], c[i]);
    };
}

function add(a, b, c, first, last) { // b + c -> a[f] of a[f] = b + c
    return function () {
        var f = field(first), l = field(last);
        carry = 0;
        for (var i = f; i <= l; i++)
            a[i] = doAdd(b[i], c[i]);
    };
}

function regsgte(a, b, first, last) {
    return function () { // if a >= c[f]
        var f = field(first), l = field(last);
        carry = 0;
        for (var i = f; i <= l; i++)
            doSub(a[i], b[i]); // called for side effect of setting carry bit
    };
}

function regsgte1(reg, first, last) {
    return function () { // if a[f] >= 1
        var f = field(first), l = field(last);
        carry = 1;
        for (var i = f; i <= l; i++)
            carry &= (reg[i] == 0) ? 1 : 0;
    };
}

function loadconst(num) { return function () { c[p] = num; p = (p - 1) & 0xf; }; }

function cdata() { alert("NYI: cdata"); } // not used by HP-35
function cdataaddr() { alert("NYI: cdataaddr"); } // not used by HP-35
function datac() { alert("NYI: datac"); } // not used by HP-35
