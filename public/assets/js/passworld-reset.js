// 当修改密码表单发生提交行为的时候
$('#modifyForm').on('submit', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    console.log(formData);
    // 调用接口实现密码修改功能
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function (response) {
            location.href = '/admin/login.html'
        },
        error: function (xhr) {
            console.log(xhr)
        }
    });
    // 阻止表单默认提交行为
    return false
})