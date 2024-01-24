$(document).ready(function() {
    start()
});

function start() {

    const nodejs = document.getElementById('nodejs');
    const java = document.getElementById('java');
    const swift = document.getElementById('swift');
    const git = document.getElementById('git');
    const info = document.getElementById('info');

    // console.log(nodejs.childElementCount);
    // console.log(java.childElementCount);
    // console.log(swift.childElementCount);
    // console.log(git.childElementCount);
    // console.log(info.childElementCount);

    $("label[for='nodeCt']").text(`(${nodejs.childElementCount})`);
    $("label[for='javaCt']").text(`(${java.childElementCount})`);
    $("label[for='swiftCt']").text(`(${swift.childElementCount})`);
    $("label[for='gitCt']").text(`(${git.childElementCount})`);
    $("label[for='infoCt']").text(`(${info.childElementCount})`);
}