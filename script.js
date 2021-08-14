if (location.hash == "#custom") {
    document.getElementsByClassName("main")[0].style.display = "none";
    document.getElementsByClassName("cust")[0].style.display = "block";
}
function chas(a) {
    location.hash = "#" + a;
    history.go(0);
}