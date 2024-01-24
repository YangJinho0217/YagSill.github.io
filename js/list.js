$(document).ready(function() {
    start()
});

function start() {
    const post = document.getElementById('postList');
    $("label[for='postCt']").text(`(${post.childElementCount})`);
}