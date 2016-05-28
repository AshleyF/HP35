function info() {
    document.getElementById("info").innerHTML =
        '<p>This is a microcode-level emulation of the HP-35 running the original <a href="javascript:switchRom(2)">v2 ROM</a> (from <a href="http://www.pmonta.com/calculators/hp-35/">Peter Monta</a>) complete <a href="http://www.classiccmp.org/calcmuseum/HP35errata.txt">with known bugs</a> such as exp(ln(2.02)) = 2. You can <a href="javascript:switchRom(4)">switch to v4</a> if you like. For wonderfuly detailed information about the internals of the HP-35, check out <a href="http://www.jacques-laporte.org">Jacques Laporte\'s site</a>.</p>' +
        '<p>From your iPhone, tap [+] and "Add to Home Screen". When launched from there it will run full screen and fits nicely.</p>' +
        '<p>From a desktop machine, keyboard shortcuts are available (hover the mouse over a key for a hint).</p>' +
        '<p>For more info on how it was made, <a href="http://blogs.msdn.com/b/ashleyf/archive/tags/hpcalcs/">check out my blog</a>. Please send bug reports to <a href="mailto:ashleyf@microsoft.com?subject=HP%20Microcode%20Emulator">AshleyF</a></p>' +
        '<p>Here\'s the <a href="http://ashleyf.github.io/HP35/Skin/Manual">Operating Manual</a>.</p>';
}
