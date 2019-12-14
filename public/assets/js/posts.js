// 向服务器端发送请求 获取文章列表数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        var html = template('postsTpl',{data:response}); 
        $('#postsBox').html(html);
    }
});

// 处理日期格式
function formateDate(date) { 
   date =  new Date(date);
   return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
 }