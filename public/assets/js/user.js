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
});

// 当用户头像发生onchange事件
$('#modify').on('change', '#avatar', function () {
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
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
});

// 向服务器发送索要用户列表
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        // 显示用户列表
        var html = template('userTpl', {
            data: response
        });
        $('#userBox').html(html)
    }
});

//通过事件委托实现用户编辑
$('#userBox').on('click', '.edit', function () {
    // 获取被点击用户的id值
    var id = $(this).attr('data-id');
    // 根据用户id获取用户详细信息
    $.ajax({
        type: "get",
        url: "/users/" + id,
        // 显示用户修改页面 
        success: function (response) {
            var html = template('modifyTpl', response);
            $('#modify').html(html)
        }
    });
});
// 通过事件委托实现用户删除(单个)
$('#userBox').on('click', '.del', function () {
    if (confirm('您确定要删除这个用户?')) {
        // 获取将要删除的用户id
        var id = $(this).attr('data-id');
        // 向服务器发送删除单个用户的请求
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function (response) {
                location.reload()
            }
        });
    }

})

// 为修改表单添加表单提交事件
$('#modify').on('submit', '#modifyForm', function () {
    // 获取用户在表单中修改的内容
    var formData = $(this).serialize();
    // 获取用户的id
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        // 表单提交成功后执行
        success: function (response) {
            location.reload()
        }
    });
    // 阻止表单默认提交
    return false
})