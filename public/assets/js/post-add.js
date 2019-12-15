// 向服务器端发送请求,获取文章分类数据


$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryTpl', {
            data: response
        });
        $('#category').html(html);
    }
});

// 当管理员选择文件的时候 触发事件
$('#formBox').on('change','#feature',function () { 
    var formData = new FormData();
    formData.append('cover', this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover);
            $('#preview').attr('src', response[0].cover).show();
        }
    });
 });

// 当添加文章表单提交的时候
$('#addForm').on('submit', function () {
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

var id = getUrlParams('id');
if(id!=-1){
    $.ajax({
        type: "get",
        url: "/posts/"+id,
        success: function (response) {
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (category) {
                    response.categories = category;
                    var html = template('modifyTpl',response)
                    $('#formBox').html(html);
                }
            });
        }
    });
}
// 获取浏览器地址栏中的参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}

$('formBox').on('submit','#modifyForm',function(){
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
		url: '/posts/' + id,
		data: formData,
		success: function () {
			location.href = '/admin/posts.html';
		}
    });
    return false;
})