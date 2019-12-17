// 从地址栏中获取文章id
var postId = getUrlParams('id');
// 评论是否经过审核
var review;
// 根据文章id获取文章详细信息
$.ajax({
    type: "get",
    url: "/posts/" + postId,
    success: function (response) {
        var html = template('postTpl', response);
        $('#postBox').html(html);
    }
});
// 点赞功能
$('#postBox').on('click', '#like', function () {
    $.ajax({
        type: "post",
        url: "/posts/fabulous/" + postId,
        success: function (response) {
            alert('点赞成功')
        }
    });
});

// 获取网站的配置信息
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        review = response.review;
        // 判断管理员是否开启了评论功能
        if (response.comment) {
            // 渲染评论模板
            var html = template('commentTpl');
            $('#comment').html(html);
        }
    }
});

// 当评论表单发生提交行为的时候
$('#comment').on('submit', 'form', function () {
    var content = $(this).find('textarea').val();
    var state;
    if (review) {
        state = 0;
        // 需要经过人工审核
    } else {
        // 不需要经过人工审核
        state = 1
    }
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            content: content,
            post: postId,
            state: state
        },

        success: function (response) {
            alert('评论成功')
            location.reload()
        },
        error: function () {
            alert('评论失败')
        }
    });
    // 阻止表单默认提交
    return false;
})