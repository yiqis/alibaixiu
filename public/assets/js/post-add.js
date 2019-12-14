// 向服务器端发送请求,获取文章分类数据


$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryTpl',{data:response});
        $('#category').html(html);
    }
});

// 当管理员选择文件的时候 触发事件
$('#feature').on('change',function(){
    var formData = new FormData();
    formData.append('cover',this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData:false,
        contentType:false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover);
            $('#preview').attr('src',response[0].cover).show();
        }
    });
})

// 当添加文章表单提交的时候
$('#addForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            location.href = '/admin/posts.html';
        }
    });
    return false;
})
