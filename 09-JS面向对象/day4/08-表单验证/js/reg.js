window.onload = function () {
    var regtel = /1[34578]\d{9}/;//手机号码校验规则   或者 /1[3|4|5|7|8]\d{9}/ 也可以
    var regqq = /^[1-9]\d{4,}$/; //10000 qq号校验规则
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/; //昵称校验规则 第一个汉字到最后一个汉字
    var regmsg = /^\d{6}$/;//验证码校验规则
    var regpw = /^[a-zA-Z0-9_-]{6,16}$/;//密码校验规则
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var nc = document.querySelector('#nc');
    var msg = document.querySelector('#msg');
    var pw = document.querySelector('#pwd');
    var surepwd = document.querySelector('#surepwd');
    regexp(tel, regtel);//手机号码
    regexp(qq, regqq);//qq
    regexp(nc, regnc);//昵称
    regexp(msg, regmsg);//验证码
    regexp(pw, regpw);//密码
    //封装正则规则校验函数
    function regexp(ele, reg) {
        ele.addEventListener('blur', function () {
            if (reg.test(this.value)) {
                // console.log('正确的');
                // 修改下一个兄弟节点的类名
                this.nextElementSibling.className = 'success';
                // 修改下一个兄弟节点的内容
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您输入正确'
            } else {
                // console.log('错误的');
                // 修改下一个兄弟节点的类名
                this.nextElementSibling.className = 'error';
                // 修改下一个兄弟节点的内容
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确，请重新输入';
            }
        })
    }
    // 二次确认密码
    surepwd.addEventListener('blur', function () {
        if (surepwd.value == pw.value) {
            // 修改下一个兄弟节点的类名
            this.nextElementSibling.className = 'success';
            // 修改下一个兄弟节点的内容
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您输入正确'
        } else {
            // 修改下一个兄弟节点的类名
            this.nextElementSibling.className = 'error';
            // 修改下一个兄弟节点的内容
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>两次密码输入不一致';
        }
    })
} 