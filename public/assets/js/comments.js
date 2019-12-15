$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        var html = template('commentsTpl',response);
        $('#commentsBox').html(html);
    }
});