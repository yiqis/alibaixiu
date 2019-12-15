// 退出登录
$("#logout").on('click',function(){
    var isconfirm = confirm('确认是否退出');
    if(isconfirm){
      $.ajax({
        type: "post",
        url: "/logout",
        // 退出登录成功
        success: function (response) {
          location.href = 'login.html';
        },
        // 退出登录失败
        error:function(response){
          alert('退出失败')
        }
      });
    }
  })

  // 处理日期格式
function formateDate(date) { 
  date =  new Date(date);
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
}