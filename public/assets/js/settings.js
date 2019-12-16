$('#logo').on('change', function () {
    var formData = new FormData();
    formData.append('logo', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#hiddenLogo').val(response[0].logo)
            // 将logo图片显示在页面中
            $('#preview').attr('src', response[0].logo)
        }
    })
});

// 当网络设置表单发生提交行为后
$('#settingsForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function () {
            location.reload();
        }
    })
    // 阻止表单默认提交
    return false;
});
// 向服务器端发送请求,索要网站设置数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function(response){
        console.log(response);
        if(response){
            $('#hiddenLogo').val(response.logo)
            $('#preview').attr('src',response.logo);
            $('input[name="title"]').attr('value',response.title);
            $('input[name="comment"]').prop('checked',response.comment);
            $('input[name="review"]').prop('checked',response.review)
        }
    }
})