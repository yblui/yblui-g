if (location.hash == "#custom") {
    document.getElementsByClassName("main")[0].style.display = "none";
    document.getElementsByClassName("cust")[0].style.display = "block";
    document.getElementsByClassName("game")[0].style.display = "none";
}else if(location.hash!="#"&&location.hash!=""){
    document.getElementsByClassName("main")[0].style.display = "none";
    document.getElementsByClassName("cust")[0].style.display = "none";
    document.getElementsByClassName("game")[0].style.display = "block";
}
function chas(a) {
    location.hash = "#" + a;
    history.go(0);
}
function goto(a, b, c) {
    chas(a + "," + b + "," + c);
}