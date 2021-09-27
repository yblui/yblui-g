function getCookie(gb) {
    var c = document.cookie.split("; ");
    for (var d = 0; d < c.length; d++) {
        c[d] = c[d].split("=");
        if (c[d][0] == gb) return c[d][1];
    }
}

function setCookie() {
    for (var d of arguments) document.cookie = d + "; expires=Thu, 18 Dec 2043 12:00:00 GMT";
}

function $($a) {
    if (document.querySelectorAll($a).length <= 1) return document.querySelector($a);
    else return document.querySelectorAll($a);
}

var wdj = [], tim = 0, jshi, a, b, list, lei;
if (!document.cookie) {
    setCookie("theme=false", "win=0,0,0,0", "total=0,0,0,0", "record=Infinity,Infinity,Infinity,Infinity", "lju=0,0,0,0", "zlju=0,0,0,0",
        "expires=Thu, 18 Dec 2043 12:00:00 GMT", "game=9x9", "mask=000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "sved=false");
}
cthe(getCookie("theme") == "true");
if (location.hash == "#custom") {
    $(".main").style.display = "none";
    $(".cust").style.display = "flex";
} else if (location.hash == "#theme") {
    $(".main").style.display = "none";
    $(".them").style.display = "flex";
    $(".game").style.display = "none";
    for (var r = 0; r <= 3; r++) {
        $(".winn")[r].innerText = getCookie("win").split(",")[r];
        $(".total")[r].innerText = getCookie("total").split(",")[r];
        $(".lju")[r].innerText = getCookie("lju").split(",")[r];
        $(".zlju")[r].innerText = getCookie("zlju").split(",")[r];
        $(".per")[r].innerText = (Number(getCookie("win").split(",")[r]) / Number(getCookie("total").split(",")[r]) * 100).toFixed(2) + "%";
        if (getCookie("record").split(",")[r] != "Infinity") $(".record")[r].innerText = getCookie("record").split(",")[r] + "s";
        if (getCookie("total").split(",")[r] == "0") $(".per")[r].innerText = "0.00%";
    }
} else if (location.hash == "#err") {
    $(".main").style.display = "none";
    $(".err")[0].style.display = "flex";
} else if (location.hash == "#continue") {
    $(".main").style.display = "none";
    if (getCookie("sved") == "true") {
        $(".game").style.display = "block";
        var ginf = getCookie("game").split(", ");
        list = [ginf[0].split("x")[0], ginf[0].split("x")[0], ginf.length - 1];
        lei = list[2];
        for (a = 0; a < Number(ginf[0].split("x")[0]); a++) {
            for (b = 0; b < Number(ginf[0].split("x")[1]); b++) {
                $("#boar").innerHTML += "<div class='grid a" + a + " b" + b + "' onclick='cheq(this)' data-a='" + a +
                    "' data-b='" + b + "' onmousedown='biao(this,event)'></div>";
            }
            $("#boar").innerHTML += "<br />";
        }
        for (var w = 1; w < ginf.length; w++) {
            ginf[w] = ginf[w].split("&");
            $(".a" + ginf[w][0] + ".b" + ginf[w][1]).classList.add("mine");
        }
        lei = ginf.length - 1;
        $("#syls").innerText = lei;
        var msk = getCookie("mask").split("");
        for (var v = 0; v < msk.length; v++) {
            if (msk[v] == "1") cheq($(".grid")[v]);
            else if (msk[v] == "2") $(".grid")[v].innerText = "?";
        }
    } else $(".err")[1].style.display = "flex";
} else if (location.hash != "#" && location.hash != "") {
    list = location.hash.replace("#", "").split(",");
    lei = list[2];
    if (list[0] < 9 || list[0] > 40 || list[1] < 9 || list[1] > 40 || list[2] > list[0] * list[1]) chas("err");
    $(".main").style.display = "none";
    $(".cust").style.display = "none";
    $(".game").style.display = "block";
    for (a = 0; a < Number(list[0]); a++) {
        for (b = 0; b < Number(list[1]); b++) {
            $("#boar").innerHTML += "<div class='mine grid a" + a + " b" + b + "' onclick='cheq(this)' data-a='" + a +
                "' data-b='" + b + "' onmousedown='biao(this,event)'></div>";
        }
        $("#boar").innerHTML += "<br />";
    }
    while ($(".mine").length != Number(list[2])) {
        var tem = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296 * $(".mine").length);
        $(".mine")[tem].className = $(".mine")[tem].className.replace("mine", "");
    }
    $("#syls").innerText = lei;
}
setInterval(() => {
    cheq(wdj[0]);
    wdj.shift();
}, 10);
var goto = (oa, ob, oc) => chas(oa + "," + ob + "," + oc);

function chas(ca) {
    location.hash = "#" + ca;
    history.go(0);
}

function cheq(ha) {
    if (ha && ha.innerText != "?") {
        if (ha.classList.contains("mine") && $("#over").style.display != "block") {
            ha.className += " cfed";
            ha.innerText = "X";
            jshi = clearInterval(jshi);
            $("#over").style.display = "block";
            setCookie("total=" + (Number(getCookie("total")) + 1), "lju=0");
            if (location.hash == "#continue") setCookie("sved=false");
        } else if (arou(Number(ha.dataset.a), Number(ha.dataset.b))) {
            ha.style.backgroundColor = "#E6C460";
            ha.style.color = "black";
            ha.innerText = arou(Number(ha.dataset.a), Number(ha.dataset.b));
        } else {
            ha.style.backgroundColor = "white";
            for (var lsc = -1; lsc <= 1; lsc++) {
                for (var lsd = -1; lsd <= 1; lsd++) {
                    var pd = true;
                    for (var lse of wdj) {
                        if (lse == $(".a" + (Number(ha.dataset.a) + lsc) + ".b" + (Number(ha.dataset.b) + lsd))) pd = false;
                    }
                    if ($(".a" + (Number(ha.dataset.a) + lsc) + ".b" + (Number(ha.dataset.b) + lsd)) && $(".a" + (Number(ha.dataset.a) + lsc) +
                        ".b" + (Number(ha.dataset.b) + lsd)).style.backgroundColor != "white" && $(".a" + (Number(ha.dataset.a) + lsc) + ".b" +
                            (Number(ha.dataset.b) + lsd)).style.backgroundColor != "#E6C460" && $(".a" + (Number(ha.dataset.a) + lsc) + ".b" +
                                (Number(ha.dataset.b) + lsd)).innerText != "X" && pd) wdj[wdj.length] = $(".a" + (Number(ha.dataset.a) + lsc) + ".b" +
                                    (Number(ha.dataset.b) + lsd));
                }
            }
        }
        if (!jshi && $("#over").style.display != "block" && $("#win").style.display != "block") {
            jshi = setInterval(() => {
                tim++;
                $("#time").innerText = tim + "s";
            }, 1000);
        }
        var ckwi = true;
        for (var lswi of $("#boar div")) {
            if (!lswi.classList.contains("mine") && !lswi.style.backgroundColor) ckwi = false;
        }
        if (ckwi) {
            $("#win").style.display = "block";
            jshi = clearInterval(jshi);
            var q;
            if (location.hash == "#10,10,10" || (location.hash == "#continue" && list == [10, 10, 10])) q = 0;
            else if (location.hash == "#20,20,20" || (location.hash == "#continue" && list == [10, 10, 10])) q = 1;
            else if (location.hash == "#30,30,40" || (location.hash == "#continue" && list == [10, 10, 10])) q = 2;
            else q = 3;
            setCookie("win=" + (Number(getCookie("win").split(",")[q]) + 1), "total=" + (Number(getCookie("total").split(",")[q]) + 1), "sved=false");
            if (Number(getCookie("record").split(",")[q]) > Number($("#time").innerText.replace("s", ""))) {
                setCookie("record=" + $("#time").innerText.replace("s", ""));
                $("p")[0].style.display = "block";
            }
            var lju = getCookie("lju").split(",");
            lju[q] = Number(lju[q]) + 1;
            setCookie("lju=" + lju.join(","));
            if ((Number(getCookie("lju")[q]) + 1) > Number(getCookie("zlju")[q])) setCookie("zlju=" + getCookie("lju"));
        }
    }
}

function arou(aa, ab) {
    var coun = 0;
    for (var lsc = -1; lsc <= 1; lsc++) {
        for (var lsd = -1; lsd <= 1; lsd++) {
            if ($(".a" + (aa + lsc) + ".b" + (ab + lsd)) && $(".a" + (aa + lsc) + ".b" + (ab + lsd)).classList.contains("mine")) coun++;
        }
    }
    return coun;
}

function qdmi(qa) {
    $("#mine").max = Number($("#len").value) * Number($("#wdt").value);
    if (Number(qa.value) > Number(qa.max) || Number(qa.value) < Number(qa.min) || Number($("#mine").value) < 0 || Number($("#mine").value) >
        Number($("#len").value) * Number($("#wdt").value)) {
        qa.parentNode.parentNode.classList.add("cfed");
    } else qa.parentNode.parentNode.classList.remove("cfed");
}

function biao(ba, event) {
    if (event.which == 3 && ba.id == "warn") {
        setCookie("total=" + (Number(getCookie("total")) + 1), "game=9x9");
        chas("");
        return;
    }
    if (event.which == 3 && !ba.innerText) {
        ba.innerText = "?";
        lei--;
    } else if (event.which == 3 && ba.innerText == "?") {
        ba.innerText = "";
        lei++;
    } else if (event.which == 2) {
        if (ba.innerText == "?") return;
        event.preventDefault();
        cheq(ba);
        for (var lsc = -1; lsc <= 1; lsc++) {
            for (var lsd = -1; lsd <= 1; lsd++) {
                var pd = true;
                for (var lse of wdj) {
                    if (lse == $(".a" + (Number(ba.dataset.a) + lsc) + ".b" + (Number(ba.dataset.b) + lsd))) pd = false;
                }
                if ($(".a" + (Number(ba.dataset.a) + lsc) + ".b" + (Number(ba.dataset.b) + lsd)) && $(
                    ".a" + (Number(ba.dataset.a) + lsc) + ".b" + (Number(ba.dataset.b) + lsd)).innerText == "?") pd = false;
                if ($(".a" + (Number(ba.dataset.a) + lsc) + ".b" + (Number(ba.dataset.b) + lsd)) && $(
                    ".a" + (Number(ba.dataset.a) + lsc) + ".b" + (Number(ba.dataset.b) + lsd)).style.backgroundColor != "white" && $(".a" +
                        (Number(ba.dataset.a) + lsc) + ".b" + (Number(ba.dataset.b) + lsd)).style.backgroundColor != "#E6C460" && $(".a" +
                            (Number(ba.dataset.a) + lsc) + ".b" + (Number(ba.dataset.b) + lsd)).innerText != "X" && pd) wdj[wdj.length] = $(".a" +
                                (Number(ba.dataset.a) + lsc) + ".b" + (Number(ba.dataset.b) + lsd));
            }
        }
    }
    $("#syls").innerText = lei;
    return false;
}

function cthe(ca) {
    if (ca) {
        $("html").classList.add("green");
        $("html").classList.remove("blue");
    } else {
        $("html").classList.remove("green");
        $("html").classList.add("blue");
    }
    setCookie("theme=" + ca.toString());
}

function clea() {
    setCookie("win=0,0,0,0", "total=0,0,0,0", "record=Infinity,Infinity,Infinity,Infinity", "lju=0,0,0,0", "zlju=0,0,0,0");
    for (var e = 0; e <= 4; e++) {
        $(".winn")[e].innerText = 0;
        $(".total")[e].innerText = 0;
        $(".per")[e].innerText = "0.00%";
        $(".record")[e].innerText = "0s";
        $(".lju")[e].innerText = 0;
        $(".zlju")[e].innerText = 0;
    }
}

function gmfh(ga) {
    if ($("#time").innerText != "0s") {
        $("#warn").style.display = "block";
        setTimeout(() => $("#warn").style.display = "none", 3000);
    } else if (ga) chas("");
    else {
        if (location.hash == "#continue") chas("10,10,10");
        history.go(0);
    }
}

function save() {
    var leil = [], str = "";
    for (var i of $(".mine")) leil[leil.length] = i.dataset.a + "&" + i.dataset.b;
    for (var j of $(".grid")) {
        if (j.innerText == "?") str += "2";
        else if (!j.style.backgroundColor && !j.innerText) str += "0";
        else str += "1";
    }
    if (getCookie("sved") == "true" && location.hash != "#continue") setCookie("total=" + (Number(getCookie("total")) + 1), "lju=0");
    setCookie("game=" + list[0] + "x" + list[1] + ", " + leil.join(", "), "mask=" + str, "sved=true");
    chas("");
}

function kdow(event) {
    event.preventDefault();
    if (event.key == "Escape") {
        if (location.hash == "#" || !location.hash) location.href = 'about:blank';
        else chas("");
    }
    if (event.key == "Enter" && location.hash == "#custom") {
        goto($('#len').value, $('#wdt').value, $('#mine').value);
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
        } else if (event.key == "n") gmfh(false);
    }
}
