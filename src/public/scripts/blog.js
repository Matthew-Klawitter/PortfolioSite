$(document).ready(function () {
    $.ajax({
        url: '/blog/list',
        complete: (data) => {
            var html = "";

            for (var i = 0; i < data.responseJSON.length; i++) {
                html += "<div class=\"post\"><a href=\"/blog/post?id=" + data.responseJSON[i] + "\">" + data.responseJSON[i] + "</a></h2></div>";
            }
            $('#node').html(html);
        }
    });
});