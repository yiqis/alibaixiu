// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 添加分类
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    // 阻止表单默认提交
    return false;
})

// 发送ajax请求,向服务器发送所有用户列表的请求
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryListTpl', {
            data: response
        });
        $('#categoryBox').html(html);
    }
});