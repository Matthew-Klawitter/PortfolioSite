$.ajax({
    url: '/blog/list',
    complete: (data) => {
        for (var i = 0; i < data.responseJSON.length; i++){
            document.write("<p>Blog: <a href='/blog/post?id=" + data.responseJSON[i] + "'>" + data.responseJSON[i] + "</a></p>");
        }    
    }
});