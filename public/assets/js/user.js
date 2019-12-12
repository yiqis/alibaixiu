// 当表单发生提交submit事件
$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        // 添加用户请求成功
        success: function (response) {
            location.reload()
        },
        // 添加用户请求失败
        error: function (response) {
            alert('用户添加失败')
        }
    });
    // 阻止表单默认提交
    return false
})

// 当用户头像发生onchange事件
$('#avatar').on('change', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉ajax不要解析请求参数
        processData: false,
        // 告诉ajax不要设置请求参数类型
        contentType: false,
        success: function (response) {
            // 实现头像预览功能
            $('#preview').attr('src',response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
})