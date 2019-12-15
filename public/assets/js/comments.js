$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        var html = template('commentsTpl',response);
        $('#commentsBox').html(html);
        console.log(response);
        // 分页
        $('#pageBox').twbsPagination({
            totalPages: response.pages,
            visiblePages: 7,
            first:'首页',
            prev:'上一页',
            next:'下一页',
            last:'尾页',
            onPageClick: function (event, page) {
             changePage(page)
            }
          });
    }
});

// 分页
function changePage(page){
    $.ajax({
        type: "get",
        url: "/comments",
        data:{
            page:page
        },
        success: function (response) {
            var html = template('commentsTpl',response);
            $('#commentsBox').html(html);
        }
    });
}

// 审核评论状态
$('#commentsBox').on('click','.status',function(){
    var status = $(this).attr('data-status');
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/comments/"+id,
        data: {
          state:  status==0?1:0
        },
        success: function (response) {
            location.reload()
        }
    });
})

// 删除评论
$('#commentsBox').on('click','.delete',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type: "delete",
        url: "/comments/"+id,
        success: function (response) {
            location.reload()
        }
    });
})