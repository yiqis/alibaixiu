


// 获取浏览器中的categoryId参数
var categoryId = getUrlParams('id');
$.ajax({
    type: "get",
    url: "/posts/category/"+categoryId,
    success: function (response) {
       var html = template('listTpl',{data:response})
    $('#listBox').html(html);
    }
});

// 根据id获取分类信息
$.ajax({
    type: "get",
    url: "/categories/"+categoryId,
    success: function (response) {
       $('#categoryTitle').html(response.title)
    }
});