// 向服务器端发送请求 获取文章列表数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        var html = template('postsTpl',response); 
        $('#postsBox').html(html);
        var page = template('pageTpl',response);
        $('#pageBox').html(page);
    }
});

// 处理日期格式
function formateDate(date) { 
   date =  new Date(date);
   return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
 }
// 分页功能
 function changePage(page){
    $.ajax({
        type: "get",
        url: "/posts",
        data:{
            page:page
        },
        success: function (response) {
            var html = template('postsTpl',response); 
            $('#postsBox').html(html);
            var page = template('pageTpl',response);
            $('#pageBox').html(page);
        }
    });
 }

// 分类列表
 $.ajax({
     type: "get",
     url: "/categories",
     success: function (response) {
         var html = template('categoryTpl',{data:response});
         $('#categoriesBox').html(html);
     }
 });

//  筛选
$('#formSelect').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            var html = template('postsTpl',response); 
            $('#postsBox').html(html);
            var page = template('pageTpl',response);
            $('#pageBox').html(page);
        }
    });
    return false
})

// 删除
$('#formBox').on('click','.del',function(){
    var id = $(this).attr('data-id');
   $.ajax({
       type: "delete",
       url: "/posts/"+id,
       success: function (response) {
           location.reload()
       }
   });
})