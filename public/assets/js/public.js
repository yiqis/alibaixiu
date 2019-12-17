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
// 向服务器端发送请求,索要最随机文章数据
$.ajax({
    type: "get",
    url: "/posts/random",
    success: function (response) {
        var randomTpl = ` 
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.comments}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
      {{/each}}`;
        var html = template.render(randomTpl, {
            data: response
        });
        $('#randomBox').html(html)
    }
});
// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }
// 向服务器端发送请求,索要最新评论数据
$.ajax({
    type: "get",
    url: "/comments/lasted",
    success: function (response) {
        var commentsTpl =`
        {{each data}}
        <li>
        <a href="javascript:;">
          <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="">
          </div>
          <div class="txt">
            <p>
              <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.author.createTime)}}说:
            </p>
            <p>{{$value.content}}</p>
          </div>
        </a>
      </li>
      {{/each}}
        `;
        var html = template.render(commentsTpl,{data:response});
        $('#commentsBox').html(html);
    }
});
// 向服务器端发送请求索要文章列表数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var navTpl = `
        {{each data}}
        <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `
        var html = template.render(navTpl,{data:response})
        $('#navBox').html(html);
        $('#topNavBox').html(html)
    }
});

// 搜索 
$('.search form').on('submit',function(){
  var key = $(this).find('.keys').val();
  location.href = '/search.html?key='+key
	// 阻止表单默认提交
	return false
})