// 向服务器端发送请求,获取文章分类数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryTpl', {
            data: response
        });
        // console.log(html)
        $('#category').html(html);
    }
});
// 当管理员选择文件的时候 触发事件
$('#feature').on('change', function () {
    // 获取管理员获取到的文件
    var file = this.files[0];
    // 创建formData对象,实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到的文件追加到formData对象中
    formData.append('cover',file);
    // 实现文章封面上传工作
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉ajax请求不要处理data属性对应的参数
        processData:false,
        // 告诉ajax请求不要设置参数类型
        contentType:false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover)
        }
    });
})
// 当添加文章表单提交的时候
$("#addForm").on('submit',function(){
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize()
    console.log(formData);
    // 向服务器端发送请求 实现添加文章功能
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            // 文章添加成功跳转到文章列表页面
            location.href = '/admin/posts.html'
            // console.log(response)
        }
    });
    // 阻止表单默认提交
    return false;
})