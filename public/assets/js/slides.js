// 图片上传
$('#file').on('change',function(){
    var formData = new FormData();
    formData.append('image',this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData:false,
        contentType:false,
        success: function (response) {
            $('#image').val(response[0].image);
            $('#preview').attr('src',response[0].image).show();
        }
    });
})
// 当轮播图表单发生提交的时候
$('#slidesForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    // 阻止表单默认提交
    return false;
})

// 轮播图片展示
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        var html = template('slidesTpl',{data:response})
        $('#slidesBox').html(html);
    }
});

// 轮播图删除
$('#slidesBox').on('click','.del',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type: "delete",
        url: "/slides/"+id,
        success: function (response) {
            location.reload();
        }
    });
})