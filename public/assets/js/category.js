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
        var html = template('categoryListTpl',{
            data:response
        });
        $('#categoryBox').html(html);
    }
});


// 为编辑按钮添加点击事件
$('#categoryBox').on('click','.edit',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: "/categories/"+id,
        success: function (response) {
            var html = template('modifyCategoryTpl',response);
            $('#formBox').html(html);
        }
    });
})
// 根据id修改分类
$('#formBox').on('submit','#modifyCategory',function(){
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/categories/"+id,
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
})

// 为删除按钮添加点击事件
$('#categoryBox').on('click','.del',function(){
    if(confirm('你真的要执行删除分类操作吗?')){
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/categories/"+id,
            success: function (response) {
                location.reload()
            }
        });
    }
})