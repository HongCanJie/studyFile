$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui();
  // 为发送按钮绑定点击事件
  $('#btnSend').on('click', function () {
    var text = $('#ipt').val().trim();
    if (text.length <= 0) {
      // 如果用户没有输入内容或输入为空格，就把输入框清空
      return $('#ipt').val('');
    }
    // 如果用户输入了内容，则将聊天内容追加到页面上显示
    $('#talk_list').append('<li class="right_word"><img src="img/person02.png"><span>' + text + '</span></li>')
    $('#ipt').val('');
    // 重置滚动条的位置
    resetui();
    getMsg(text);
  })


  // 获取聊天机器人发送回来的消息
  function getMsg(text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken: text
      },
      success: function (res) {
        // console.log(res);
        if (res.message == 'success') {
          // 接受返回的信息
          var msg = res.data.info.text;
          $('#talk_list').append('<li class="left_word"><img src="img/person01.png"/> <span>' + msg + '</span></li>')
          // 重置滚动条
          resetui();
          // 调用getVoice函数，把文本转化为语音
          getVoice(msg);
        }
      }
    })
  }



  // 聊天内容转化为语音
  function getVoice(text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: text
      },
      success: function (res) {
        // console.log(res);
        if (res.status === 200) {
          // 播放语音
          $('#voice').attr('src', res.voiceUrl);
        }
      }
    })
  }



  // 为文本框绑定回车事件
  $('#ipt').on('keyup', function (e) {
    // console.log(e.keyCode);
    if (e.keyCode === 13) {
      // console.log('用户弹起回车键');
      // 让按钮执行发送功能
      $('#btnSend').click();
    }
  })
})