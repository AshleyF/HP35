var pageNames = [
    null,       "Front",
    "FoldLeft", "FoldRight",
    "Inside",   "Title",
    "Forward",  "PageI",
    "PageII",   "PageIII",
    null,       "Contents",
    "Intro",    "Page1",
    "Page2",    "Page3",
    "Page4",    "Page5",
    "Page6",    "Page7",
    "Page8",    "Page9",
    "Page10",   "Page11",
    "Page12",   "Page13",
    "Page14",   "Page15",
    "Page16",   "Page17",
    "Page18",   "Page19",
    null,       "Page21",
    "Page22",   "Page23",
    "Page24",   "Page25",
    "Page26",   "Page27",
    "Page28",   "Page29",
    "Page30",   "Page31",
    "Page32",   "Page33",
    "Page34",   "Page35",
    "Page36",   null,
    "Back",     null ];

var facingPages = [
    { name: "Front",        description: "Front Cover" },
    { name: "Foldout",      description: "Foldout" },
    { name: "Inside.Title", description: "Title Page" },
    { name: "Forward.I",    description: "Shirt Pocket Power" },
    { name: "II.III",       description: "Forward (Parts II & III)" },
    { name: "Contents",     description: "Table of Contents" },
    { name: "Intro.1",      description: "Instant Arithmetic" },
    { name: "2.3",          description: "Serial Calculations" },
    { name: "4.5",          description: "Sums of Products / Products of Sums" },
    { name: "6.7",          description: "The Operational Stack" },
    { name: "8.9",          description: "Simple Problems" },
    { name: "10.11",        description: "Problems in Finance" },
    { name: "12.13",        description: "Big and Little Numbers" },
    { name: "14.15",        description: "Negative Numbers / More Memory" },
    { name: "16.17",        description: "Rearranging the Stack / Logs and Trig" },
    { name: "18.19",        description: "Logarithms and Trigonometry Continued" },
    { name: "20.21",        description: "Operating Limits / Accuracy" },
    { name: "22.23",        description: "Overflow & Underflow / Scientific Notation" },
    { name: "24.25",        description: "Recharging / A.C. Operation" },
    { name: "26.27",        description: "Accessories" },
    { name: "28.29",        description: "Servicing / Warranty" },
    { name: "30.31",        description: "Sample Problems" },
    { name: "32.33",        description: "Solutions" },
    { name: "34.35",        description: "An Algorithm" },
    { name: "36.37",        description: "An Algorithm (continued)" },
    { name: "Back",         description: "Back Cover" } ];

var page = 0;

function flip(num) {
    var current = Math.floor(page / 2);
    var facing = Math.floor(num / 2);
    page = num;
    document.getElementById("contents" + current).className = "";
    document.getElementById("contents" + facing).className = "highlighted";
    document.getElementById("browse").src = "Browse/" + facingPages[facing].name + ".png";
}

function full(num) {
    flip(num)
    page = num;
    if (pageNames[page] == null) // skip blank
        page++;
}

function load() {
    var contents = "<table><tr><td>";
    for (var i in facingPages) {
        contents += '<li id="contents' + i + '"><img src="Thumb/' + facingPages[i].name + '.png" width="23" height="18" /><a href="javascript:flip(' + (i * 2) + ')">' + facingPages[i].description + '</a></li>'
        if (i == 12)
            contents += "</td><td>";
    }
    document.getElementById("contents").innerHTML = contents + "</td></tr></table>";
    var qs = window.location.search;
    page = (qs.length == 0 ? 0 : parseInt(qs.substr(1)));
    full(page);
    if (qs.length > 0)
        showFull();
    document.body.style.display = "";
}

function showFull() {
    document.getElementById("page").src = "Full/" + pageNames[page] + ".png";
    document.getElementById("pagebox").style.display = "";
}

function onFlipClick() {
    if (event.offsetX > 550) { // page right
        if (page < pageNames.length - 2)
            flip(page + (page % 2 == 0 ? 2 : 1));
        return;
    }
    if (event.offsetX < 50) { // page left
        if (page > 1)
            flip(page - (page % 2 == 0 ? 1 : 2));
        return;
    }
    // otherwise expand
    if (event.offsetX > 300 && page % 2 == 0) // right
        page++;
    if (event.offsetX < 300 && page % 2 != 0) // left
        page--;
    if (pageNames[page] != null)
        showFull();
}

function onPageClick() {
    if (event.offsetX < 50) { // left
        if (page > 1) {
            full(page - (pageNames[page - 1] == null ? 2 : 1));
            showFull();
        }
        return;
    }
    if (event.offsetX > 550) { // right
        if (page < pageNames.length - 2) {
            full(page + (pageNames[page + 1] == null ? 2 : 1));
            showFull();
        }
        return;
    }
    // center
    document.getElementById("pagebox").style.display = "none";
}