function getCookie(b) {
    var c = document.cookie.split("; ");
    for (var d = 0; d < c.length; d++) {
        c[d] = c[d].split("=");
        if (c[d][0] == b) return c[d][1];
    }
}
function setCookie() {
    for(var d of arguments){
        document.cookie = d + "; expires=Thu, 18 Dec 2043 12:00:00 GMT";
    }
}
var wdj = [], tim = 0, jshi;
if (!document.cookie) {
    setCookie("theme=false", "win=0,0,0,0", "total=0,0,0,0", "record=Infinity,Infinity,Infinity,Infinity", "lju=0,0,0,0", "zlju=0,0,0,0", "expires=Thu, 18 Dec 2043 12:00:00 GMT", "game=9x9", "mask=000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "sved=false");
}
cthe(getCookie("theme") == "true");
if (location.hash == "#custom") {
    document.getElementsByClassName("main")[0].style.display = "none";
    document.getElementsByClassName("cust")[0].style.display = "flex";
} else if (location.hash == "#theme") {
    document.getElementsByClassName("main")[0].style.display = "none";
    document.getElementsByClassName("them")[0].style.display = "flex";
    document.getElementsByClassName("game")[0].style.display = "none";
    for (var r = 0; r <= 3; r++) {
        document.getElementsByClassName("winn")[r].innerText = getCookie("win").split(",")[r];
        document.getElementsByClassName("total")[r].innerText = getCookie("total").split(",")[r];
        document.getElementsByClassName("lju")[r].innerText = getCookie("lju").split(",")[r];
        document.getElementsByClassName("zlju")[r].innerText = getCookie("zlju").split(",")[r];
        document.getElementsByClassName("per")[r].innerText = (Number(getCookie("win").split(",")[r]) / Number(getCookie("total").split(",")[r]) * 100).toFixed(2) + "%";
        if (getCookie("record").split(",")[r] != "Infinity") document.getElementsByClassName("record")[r].innerText = getCookie("record").split(",")[r] + "s";
        if (getCookie("total").split(",")[r] == "0") document.getElementsByClassName("per")[r].innerText = "0.00%";
    }
} else if (location.hash == "#err") {
    document.getElementsByClassName("main")[0].style.display = "none";
    document.getElementsByClassName("err")[0].style.display = "flex";
} else if (location.hash == "#continue") {
    document.getElementsByClassName("main")[0].style.display = "none";
    if (getCookie("sved") == "true") {
        document.getElementsByClassName("game")[0].style.display = "block";
        var ginf = getCookie("game").split(", ");
        var list = [ginf[0].split("x")[0], ginf[0].split("x")[0], ginf.length - 1], lei = list[2];
        for (var a = 0; a < Number(ginf[0].split("x")[0]); a++) {
            for (var b = 0; b < Number(ginf[0].split("x")[1]); b++) {
                document.getElementById("boar").innerHTML += "<div class='grid a" + a + " b" + b + "' onclick='cheq(this)' data-a='" + a +
                    "' data-b='" + b + "' onmousedown='biao(this,event)'></div>";
            }
            document.getElementById("boar").innerHTML += "<br />";
        }
        for (var w = 1; w < ginf.length; w++) {
            ginf[w] = ginf[w].split("&");
            document.getElementsByClassName("a" + ginf[w][0] + " b" + ginf[w][1])[0].classList.add("mine");
        }
        lei = ginf.length - 1;
        document.getElementById("syls").innerText = lei;
        var msk = getCookie("mask").split("");
        for (var v = 0; v < msk.length; v++) {
            if (msk[v] == "1") {
                cheq(document.getElementsByClassName("grid")[v]);
            } else if (msk[v] == "2") {
                document.getElementsByClassName("grid")[v].innerText = "?";
            }
        }
    } else {
        document.getElementsByClassName("err")[1].style.display = "flex";
    }
} else if (location.hash != "#" && location.hash != "") {
    var list = location.hash.replace("#", "").split(","), lei = list[2];
    if (list[0] < 9 || list[0] > 40 || list[1] < 9 || list[1] > 40 || list[2] > list[0] * list[1]) {
        chas("err");
    }
    document.getElementsByClassName("main")[0].style.display = "none";
    document.getElementsByClassName("cust")[0].style.display = "none";
    document.getElementsByClassName("game")[0].style.display = "block";
    for (var a = 0; a < Number(list[0]); a++) {
        for (var b = 0; b < Number(list[1]); b++) {
            document.getElementById("boar").innerHTML += "<div class='mine grid a" + a + " b" + b + "' onclick='cheq(this)' data-a='" + a +
                "' data-b='" + b + "' onmousedown='biao(this,event)'></div>";
        }
        document.getElementById("boar").innerHTML += "<br />";
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
    if (a && a.innerText != "?") {
        if (a.classList.contains("mine") && document.getElementById("over").style.display != "block") {
            a.className += " cfed";
            a.innerText = "X";
            jshi = clearInterval(jshi);
            document.getElementById("over").style.display = "block";
            setCookie("total=" + (Number(getCookie("total")) + 1), "lju=0");
            if (location.hash == "#continue") setCookie("sved=false");
        } else if (arou(Number(a.dataset.a), Number(a.dataset.b))) {
            a.style.backgroundColor = "#E6C460";
            a.style.color = "black";
            a.innerText = arou(Number(a.dataset.a), Number(a.dataset.b));
        } else {
            a.style.backgroundColor = "white";
            for (var lsc = -1; lsc <= 1; lsc++) {
                for (var lsd = -1; lsd <= 1; lsd++) {
                    var pd = true;
                    for(var lse of wdj){
                        if (lse == document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0]) pd = false;
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
        for (var lswi = 0; lswi < document.getElementById("boar").getElementsByTagName("div").length; lswi++) {
            if (!document.getElementById("boar").getElementsByTagName("div")[lswi].classList.contains("mine") && !document.getElementById(
                "boar").getElementsByTagName("div")[lswi].style.backgroundColor) ckwi = false;
        }
        if (ckwi) {
            document.getElementById("win").style.display = "block";
            jshi = clearInterval(jshi);
            var q;
            if (location.hash == "#10,10,10" || (location.hash == "#continue" && list == [10, 10, 10])) {
                q = 0;
            } else if (location.hash == "#20,20,20" || (location.hash == "#continue" && list == [10, 10, 10])) {
                q = 1;
            } else if (location.hash == "#30,30,40" || (location.hash == "#continue" && list == [10, 10, 10])) {
                q = 2;
            } else {
                q = 3;
            }
            setCookie("win=" + (Number(getCookie("win").split(",")[q]) + 1), "total=" + (Number(getCookie("total").split(",")[q]) + 1), "sved=false");
            if (Number(getCookie("record").split(",")[q]) > Number(document.getElementById("time").innerText.replace("s", ""))) {
                setCookie("record=" + document.getElementById("time").innerText.replace("s", ""));
                document.getElementsByTagName("p")[0].style.display = "block";
            }
            var lju = getCookie("lju").split(",");
            lju[q] = Number(lju[q]) + 1;
            setCookie("lju=" + lju.join(","));
            if ((Number(getCookie("lju")[q]) + 1) > Number(getCookie("zlju")[q])) setCookie("zlju=" + getCookie("lju"));
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

function qdmi(a) {
    document.getElementById("mine").max = Number(document.getElementById("len").value) * Number(document.getElementById("wdt").value);
    if (Number(a.value) > Number(a.max) || Number(a.value) < Number(a.min) || Number(document.getElementById("mine").value) < 0 || Number(document.getElementById(
        "mine").value) > Number(document.getElementById("len").value) * Number(document.getElementById("wdt").value)) {
        a.parentNode.parentNode.classList.add("cfed");
    } else {
        a.parentNode.parentNode.classList.remove("cfed");
    }
}

function biao(a, event) {
    if (event.which == 3 && a.id == "warn") {
        setCookie("total=" + (Number(getCookie("total")) + 1), "game=9x9");
        chas("");
        return;
    }
    if (event.which == 3 && !a.innerText) {
        a.innerText = "?";
        lei--;
    } else if (event.which == 3 && a.innerText == "?") {
        a.innerText = "";
        lei++;
    } else if (event.which == 2) {
        if (a.innerText == "?") return;
        event.preventDefault();
        cheq(a);
        for (var lsc = -1; lsc <= 1; lsc++) {
            for (var lsd = -1; lsd <= 1; lsd++) {
                var pd = true;
                for (var lse of wdj){
                    if (lse == document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0]) pd = false;
                }
                if (document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0] && document.getElementsByClassName(
                    "a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0].innerText == "?") pd = false;
                if (document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0] && document.getElementsByClassName(
                    "a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0].style.backgroundColor != "white" && document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0].style.backgroundColor != "#E6C460" && document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0].innerText != "X" && pd) wdj[wdj.length] = document.getElementsByClassName("a" + (Number(a.dataset.a) + lsc) + " b" + (Number(a.dataset.b) + lsd))[0];
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
        setCookie("theme=true");
    } else {
        document.getElementsByTagName("html")[0].classList.remove("green");
        document.getElementsByTagName("html")[0].classList.add("blue");
        setCookie("theme=false");
    }
}

function clea() {
    setCookie("win=0,0,0,0", "total=0,0,0,0", "record=Infinity", "lju=0,0,0,0", "zlju=0,0,0,0");
    for (var e = 0; e <= 4; e++) {
        document.getElementsByClassName("winn")[e].innerText = 0;
        document.getElementsByClassName("total")[e].innerText = 0;
        document.getElementsByClassName("per")[e].innerText = "0.00%";
        document.getElementsByClassName("record")[e].innerText = "0s";
        document.getElementsByClassName("lju")[e].innerText = 0;
        document.getElementsByClassName("zlju")[e].innerText = 0;
    }
}

function gmfh(a) {
    if (document.getElementById("time").innerText != "0s") {
        document.getElementById("warn").style.display = "block";
        setTimeout(function () {
            document.getElementById("warn").style.display = "none";
        }, 3000)
    } else if (a) chas("");
    else {
        if (location.hash == "#continue") chas("10,10,10");
        history.go(0);
    }
}

function save() {
    var leil = [], str = "";
    for (var i of document.getElementsByClassName("mine")) {
        leil[leil.length] = i.dataset.a + "&" + i.dataset.b;
    }
    for (var j of document.getElementsByClassName("grid")) {
        if (j.innerText == "?") str += "2";
        else if (!j.style.backgroundColor && !j.innerText) str += "0";
        else str += "1";
    }
    if (getCookie("sved") == "true" && location.hash != "#continue") {
        setCookie("total=" + (Number(getCookie("total")) + 1), "lju=0");
    }
    setCookie("game=" + list[0] + "x" + list[1] + ", " + leil.join(", "), "mask=" + str, "sved=true");
    chas("");
}

function kdow(event) {
    event.preventDefault();
    if (event.key == "Escape") {
        if (location.hash == "#" || !location.hash) {
            location.href = 'about:blank';
        } else {
            chas("");
        }
    }
    if (event.key == "Enter" && location.hash == "#custom") {
        goto(document.getElementById('len').value, document.getElementById('wdt').value, document.getElementById('mine').value);
    }
    if (event.altKey) {
        if (location.hash == "#" || !location.hash) {
            switch (event.key) {
                case "e":
                    chas("10,10,10");
                    break;
                case "m":
                    chas("20,20,40");
                    break;
                case "h":
                    chas("30,40,120");
                    break;
                case "c":
                    chas("custom");
                    break;
                case "s":
                    chas("theme");
                    break;
                case "o":
                    chas("continue");
                    break;
                case "v":
                    location.href = "https://github.com/yblui/yblui-g";
            }
        } else if (location.hash == "#theme") {
            switch (event.key) {
                case "b":
                    cthe(false);
                    break;
                case "g":
                    cthe(true);
                    break;
                case "l":
                    clea();
            }
        } else {
            if (event.key == "n") gmfh(false);
        }
    }
}