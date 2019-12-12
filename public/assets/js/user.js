// 当表单发生提交时间
$('#userForm').on('submit',function(){
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
        error:function(){
            alert('用户添加失败')
        }
    });
    // 阻止表单默认提交
    return false
})