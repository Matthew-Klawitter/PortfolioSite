$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    $.ajax({
        url: '/blog/file?id=' + blogId,
        async: false, // find out how to load async
        complete: (data) => {
            var converter = new showdown.Converter(),
                text = data.responseText,
                html = converter.makeHtml(text);
            blog_html = html;
            $('#node').html(html);
        }
    });
});