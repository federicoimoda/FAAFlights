
exports.log = function (str) {

    console.log("");
    console.log(str);

}

function localLog (str) {

    console.log("");
    console.log(str);

}

exports.logTime = function () {

    var date = new Date();
    var horas = date.getHours();
    var min = date.getMinutes();
    var seg = date.getSeconds();

    if (min.length == 1) { min = "0" + min;}
    if (seg.length == 1) {seg = "0" + seg;}

    var time = horas + ":" + min + ":" + seg;

    localLog(time);

}

exports.sleep = function (ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    });
  }