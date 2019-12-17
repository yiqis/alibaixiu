var key = getUrlParams('key');

// 搜索结果
$.ajax({
    type: "get",
    url: "/posts/search/"+key,
    success: function (response) {
        var html = template('searchTpl',{data:response})
        console.log(html);
        $('#listBox').html(html);
    }
});
