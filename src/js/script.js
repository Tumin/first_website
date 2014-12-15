// re-read http://www.linuxtoys.org/simpleAJAX/simpleAJAX.html if you
// forget the basics of how this works
document.addEventListener('DOMContentLoaded', function(){
    GetAsyncData();
});
/*
// These functions implement a text change event
// on a timer and when the DOM content finishes loading
function ChangeText() {
	document.getElementById("demo").innerHTML = "Hello World!";
}

var myVar = setInterval(function() {myTimer()}, 1000);

function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
*/
var req_data;

// GetAsyncData sends a request to read the fifo.
function GetAsyncData() {

    url = "cgi/cgi.pl";

    // branch for native XMLHttpRequest object
    if (window.XMLHttpRequest) {
      req_data = new XMLHttpRequest();
      req_data.abort();
      req_data.onreadystatechange = GotAsyncData;
      req_data.open("PUSH", url, true);
      req_data.send(null);
    // branch for IE/Windows ActiveX version
    } else if (window.ActiveXObject) {
      req_data = new ActiveXObject("Microsoft.XMLHTTP");
      if (req_data) {
        req_data.abort();
        req_data.onreadystatechange = GotAsyncData;
        req_data.open("PUSH", url, true);
        req_data.send();
      }
    }
}

function GotAsyncData() {
    if (req_data.readyState != 4 || req_data.status != 200) {
      return;
    }
    document.getElementById("demo").innerHTML = req_data.responseText;

    setTimeout("GetAsyncData()", 100);
    return;
}