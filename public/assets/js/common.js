// 退出登录
$("#logout").on('click',function(){
    var isconfirm = confirm('确认是否退出');
    if(isconfirm){
      $.ajax({
        type: "post",
        url: "/logout",
        success: function (response) {
          location.href = 'login.html';
        },
        error:function(response){
          alert('退出失败')
        }
      });
    }
  })