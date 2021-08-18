function getCookie(a, b) {
    var c = a.split("; ");
    for (var d = 0; d < c.length; d++) {
        c[d] = c[d].split("=");
        if (c[d][0] == b) return c[d][1];
    }
}
var wdj = [], tim = 0, jshi;
if (!document.cookie) document.cookie = "theme=false; win=0; total=0; record=0; expires=Thu, 18 Dec 2043 12:00:00 GMT";
cthe(getCookie(document.cookie, "theme") == "true");
if (location.hash == "#custom") {
    document.getElementsByClassName("main")[0].style.display = "none";
    document.getElementsByClassName("cust")[0].style.display = "flex";
} else if (location.hash == "#theme") {
    document.getElementsByClassName("main")[0].style.display = "none";
    document.getElementsByClassName("them")[0].style.display = "flex";
    document.getElementsByClassName("game")[0].style.display = "none";
    document.getElementById("win").innerText = getCookie(document.cookie, "win");
    document.getElementById("total").innerText = getCookie(document.cookie, "total");
    document.getElementById("per").innerText = Number(getCookie(document.cookie, "win")) / Number(getCookie(document.cookie, "total")) * 100 + "%";
    document.getElementById("record").innerText = getCookie(document.cookie, "record");
    if (getCookie(document.cookie, "total") == "0") document.getElementById("per").innerText = "0%";
} else if (location.hash != "#" && location.hash != "") {
    document.getElementsByClassName("main")[0].style.display = "none";
    document.getElementsByClassName("cust")[0].style.display = "none";
    document.getElementsByClassName("game")[0].style.display = "block";
    var list = location.hash.replace("#", "").split(","), lei = list[2];
    for (var a = 0; a < Number(list[0]); a++) {
        for (var b = 0; b < Number(list[1]); b++) {
            document.getElementsByClassName("game")[0].innerHTML += "<div class='mine grid a" + a + " b" + b + "' onclick='cheq(this)' data-a='" + a +
                "' data-b='" + b + "' onmousedown='biao(this,event)'></div>";
        }
        document.getElementsByClassName("game")[0].innerHTML += "<br />";
    }
    while (document.getElementsByClassName("mine").length != Number(list[2])) {
        var tem = Math.floor(Math.random() * document.getElementsByClassName("mine").length);
        document.getElementsByClassName("mine")[tem].className = document.getElementsByClassName("mine")[tem].className.replace("mine", "");
    }
    document.getElementById("syls").innerText = lei;
}
setInterval(() => {
    cheq(wdj[0]);
    wdj.shift();
}, 10);
function chas(a) {
    location.hash = "#" + a;
    history.go(0);
}
function goto(a, b, c) {
    chas(a + "," + b + "," + c);
}
function cheq(a) {
    if (a) {
        if (a.classList.contains("mine")) {
            a.className += " cfed";
            a.innerText = "X";
            jshi = clearInterval(jshi);
            document.getElementById("over").style.display = "block";
            document.cookie = "total=" + Number(getCookie(document.cookie, "total")) + 1;
        } else if (arou(Number(a.dataset.a), Number(a.dataset.b))) {
            a.style.backgroundColor = "#E6C460";
            a.innerText = arou(Number(a.dataset.a), Number(a.dataset.b));
        } else {
            a.style.backgroundColor = "white";
            for (var lsc = -1; lsc <= 1; lsc++) {
                for (var lsd = -1; lsd <= 1; lsd++) {
                    var pd = true;
                    for (var lse = 0; lse < wdj.length; lse++) {
                        if (wdj[lse] == document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0]) pd = false;
                    }
                    if (document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0] && document
                        .getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0].style.backgroundColor !=
                        "white" && document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0].style.backgroundColor
                        != "#E6C460" && document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0].innerText
                        != "X" && pd) wdj[wdj.length] = document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0];
                }
            }
        }
        if (!jshi && document.getElementById("over").style.display != "block" && document.getElementById("win").style.display != "block") {
            jshi = setInterval(function () {
                tim++;
                document.getElementById("time").innerText = tim + "s";
            }, 1000)
        }
        var ckwi = true;
        for (var lswi = 7; lswi < document.getElementsByClassName("game")[0].getElementsByTagName("div").length; lswi++) {
            if (!document.getElementsByClassName("game")[0].getElementsByTagName("div")[lswi].classList.contains("mine") && !document.getElementsByClassName(
                "game")[0].getElementsByTagName("div")[lswi].style.backgroundColor) ckwi = false;
        }
        if (ckwi) {
            document.getElementById("win").style.display = "block";
            jshi = clearInterval(jshi);
            document.cookie = "win=" + Number(getCookie(document.cookie, "win")) + 1;
            document.cookie = "total=" + Number(getCookie(document.cookie, "total")) + 1;
            if (Number(getCookie(document.cookie, "record")) > Number(document.getElementById("time").innerText.replace("s", ""))) {
                document.cookie = "record=" + document.getElementById("time").innerText.replace("s", "");
                document.getElementsByTagName("p")[0].style.display = "block";
            }
        }
    }
}
function arou(a, b) {
    var coun = 0;
    for (var lsc = -1; lsc <= 1; lsc++) {
        for (var lsd = -1; lsd <= 1; lsd++) {
            if (document.getElementsByClassName("a" + (a + lsc) + " b" + (b + lsd))[0] && document.getElementsByClassName("a" + (a + lsc) + " b" + (b +
                lsd))[0].classList.contains("mine")) coun++;
        }
    }
    return coun;
}
function qdmi() {
    document.getElementById("mine").max = Number(document.getElementById("len").value) * Number(document.getElementById("wdt").value);
}
function biao(a, event) {
    if (event.which == 3 && !a.innerText) {
        a.innerText = "?";
        lei--;
    } else if (event.which == 3 && a.innerText == "?") {
        a.innerText = "";
        lei++;
    } else if (event.which == 2) {
        event.preventDefault();
        cheq(a);
        for (var lsc = -1; lsc <= 1; lsc++) {
            for (var lsd = -1; lsd <= 1; lsd++) {
                var pd = true;
                for (var lse = 0; lse < wdj.length; lse++) {
                    if (wdj[lse] == document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0]) pd = false;
                }
                if (document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0] && document.getElementsByClassName(
                    "a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0].innerText == "?") pd = false;
                if (document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0] && document.getElementsByClassName(
                    "a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0].style.backgroundColor != "white" && document.getElementsByClassName("a"
                    + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0].style.backgroundColor != "#E6C460" && document.getElementsByClassName("a"
                    + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0].innerText != "X" && pd) wdj[wdj.length] = document.getElementsByClassName("a"
                    + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0];
            }
        }
    }
    document.getElementById("syls").innerText = lei;
    return false;
}
function cthe(a) {
    if (a) {
        document.getElementsByTagName("html")[0].classList.add("green");
        document.getElementsByTagName("html")[0].classList.remove("blue");
        document.cookie = "theme=true";
    } else {
        document.getElementsByTagName("html")[0].classList.remove("green");
        document.getElementsByTagName("html")[0].classList.add("blue");
        document.cookie = "theme=false";
    }
}
function clea() {
    document.cookie = "win=0; total=0; record=0";
    document.getElementById("win").innerText = 0;
    document.getElementById("total").innerText = 0;
    document.getElementById("per").innerText = "0%";
    document.getElementById("record").innerText = "0s";
}