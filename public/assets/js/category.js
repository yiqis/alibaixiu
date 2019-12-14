// 当添加分类表单发生提交行为的时候

$('#addCategory').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    // 阻止表单默认提交事件
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

// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function () {
    // 获取要修改数据的id
    var id = $(this).attr('data-id');
    // 根据id获取分类数据的详细数据
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function (response) {
           var html = template('modifyCategoryTpl',response);
           $('#formBox').html(html);
        }
    });
})

// 为删除按钮添加点击事件
$('#categoryBox').on('click','.del',function(){
    if(confirm('你真的要执行删除操作吗')){
        // 获取要删除的分类数据id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求 删除分类数据
        $.ajax({
            type: "delete",
            url: "/categories/"+id,
            success: function (response) {
                location.reload();
            }
        });
    }
   
})