var automationDelay = 200; // allow VM to keep up

function unitTests() {
    trace = false;
    fastmode = true;
    document.getElementById("calc").className = "calculator fast";
    var keys = [];
    var verify = null;
    var success = true;
    var suite = null;
    function simkeys() {
        var k = keys.shift();
        setkey(k);
        if (keys.length > 0)
            window.setTimeout(simkeys, automationDelay); // next key
        else if (suite.length > 0) {
            window.setTimeout(verify, automationDelay);
            window.setTimeout(runSuite, automationDelay); // next test
        }
        else {
            window.setTimeout(verify, automationDelay);
            if (success)
                window.setTimeout("alert('All tests passed.')", automationDelay);
        }
    }
    function runTest(sequence, expected, name, ver) {
        if (ver == null || ver == rom.version) {
            keys = sequence;
            verify = function () {
                var d = document.getElementById("disp").innerText.replace(/_/gi, "");
                if (d != expected) {
                    success = false;
                    prompt("Failure: " + name + " Expected '" + expected + "'", d);
                }
            }
        }
        else { // skip this test (not meant for this ROM version)
            keys = [];
            verify = function () { }
        }
        keys.unshift(kClr);
        simkeys();
    }
    function runSuite() {
        var t = suite.shift();
        runTest(t.sequence, t.expected, t.name, t.version);
    }
    /* key codes:
    *     0 = 36      - = 54    LN   = 3
    *     1 = 28      + = 22    LOG  = 4
    *     2 = 27      * = 30    e^x  = 2
    *     3 = 26      / = 38    x^y  = 6
    *     4 = 20     pi = 34    sqrt = 46
    *     5 = 19    CHS = 59    1/x  = 14
    *     6 = 18    CLR = 0     x<>y = 12
    *     7 = 52    EEX = 58    roll = 11
    *     8 = 51    ARC = 44    STO  = 10
    *     9 = 50    SIN = 43    RCL  = 8
    *     . = 35    COS = 42    CLX  = 56
    * ENTER = 62    TAN = 40
    */
    var k0 = 36;
    var k1 = 28;
    var k2 = 27;
    var k3 = 26;
    var k4 = 20;
    var k5 = 19;
    var k6 = 18;
    var k7 = 52;
    var k8 = 51;
    var k9 = 50;
    var kDot = 35;
    var kEnter = 62;
    var kSub = 54;
    var kAdd = 22;
    var kMult = 30;
    var kDiv = 38;
    var kPi = 34;
    var kChs = 59;
    var kClr = 0;
    var kClx = 56;
    var kEex = 58;
    var kArc = 44;
    var kSin = 43;
    var kCos = 42;
    var kTan = 40;
    var kLn = 3;
    var kLog = 4;
    var kExp = 2;
    var kPow = 6;
    var kSqrt = 46;
    var kRecip = 14;
    var kSwap = 12;
    var kRoll = 11;
    var kSto = 10;
    var kRcl = 8;

    suite = [
            {
                name: "Add",
                sequence: [k2, kEnter, k3, kAdd],
                expected: "5."
            },
            {
                name: "Subtract",
                sequence: [k3, kEnter, k2, kSub],
                expected: "1."
            },
            {
                name: "Multiply",
                sequence: [k3, kEnter, k2, kMult],
                expected: "6."
            },
            {
                name: "Divide",
                sequence: [k3, kEnter, k2, kDiv],
                expected: "1.5"
            },
            {
                name: "Reciprocal",
                sequence: [k4, kRecip],
                expected: ".25"
            },
            {
                name: "Power",
                sequence: [k9, kEnter, k2, kPow],
                expected: "512.",
                version: 2
            },
            {
                name: "Power",
                sequence: [k9, kEnter, k2, kPow],
                expected: "511.9999999",
                version: 4
            },
            {
                name: "Square Root",
                sequence: [k2, k5, kSqrt],
                expected: "5."
            },
            {
                name: "Log",
                sequence: [kPi, kLog],
                expected: ".4971498728"
            },
            {
                name: "Ln",
                sequence: [kPi, kLn],
                expected: "1.144729886"
            },
            {
                name: "Exp",
                sequence: [kPi, kExp],
                expected: "23.14069264"
            },
            {
                name: "Sin",
                sequence: [kPi, kSin],
                expected: ".054803665"
            },
            {
                name: "Cos",
                sequence: [kPi, kCos],
                expected: ".9984971498"
            },
            {
                name: "Tan",
                sequence: [kPi, kTan],
                expected: ".0548861507"
            },
            {
                name: "Sin-1",
                sequence: [kPi, kLog, kArc, kSin],
                expected: "29.81161556"
            },
            {
                name: "Cos-1",
                sequence: [kPi, kLog, kArc, kCos],
                expected: "60.18838444"
            },
            {
                name: "Tan-1",
                sequence: [kPi, kArc, kTan],
                expected: "72.34321286"
            },
            {
                name: "Stack",
                sequence: [k1, kEnter, k2, kEnter, k3, kEnter, k4, kEnter, kSwap, kRoll, kRoll, kRoll],
                expected: "2."
            },
            {
                name: "Memory",
                sequence: [k1, k2, k3, kSto, k4, k5, k6, kEnter, kClx, kRcl],
                expected: "123."
            },
            {
                name: "Calculator Forensics Result (v2 ROM)",
                sequence: [k9, kSin, kCos, kTan, kArc, kTan, kArc, kCos, kArc, kSin],
                expected: "9.002983113",
                version: 2
            },
            {
                name: "Calculator Forensics Result (v4 ROM)",
                sequence: [k9, kSin, kCos, kTan, kArc, kTan, kArc, kCos, kArc, kSin],
                expected: "9.004076901",
                version: 4
            },
            {
                name: "Final Entry",
                sequence: [kChs, k1, kDot, k2, k3, k4, k5, k6, k7, k8, k0, k9, kEex, kChs, k3, k5],
                expected: "-1.234567809-35"
            },
        ];
        runSuite();
}
