window.addEventListener('load', function () {
    // 1.获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    // 获取focus的宽度
    var w = focus.offsetWidth;
    // 利用定时器实现自动播放
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translateX = -index * w;
        // 2D平移（带单位px）
        ul.style.transform = 'translateX(' + translateX + 'px)';
        // 过渡动画(带单位s)
        ul.style.transition = 'all .3s';
    }, 2000);
    // 等待过渡完成之后再做判断，监听过渡完成的事件是transitionend
    ul.addEventListener('transitionend', function () {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // 去掉动画过渡效果
            ul.style.transition = 'none';
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
        // 小圆点跟随变化
        // 将ol中有current的小li选出来后去掉类名
        ol.querySelector('.current').classList.remove('current');
        // 给当前的索引号的小li加上current类名
        ol.children[index].classList.add('current');
    });
    // 手指初始的X坐标
    var startX = 0;
    // 手指滑动的距离
    var moveX = 0;
    // 判读是否要做移动计算
    var flag = false;
    // 4.手指滑动轮播图
    ul.addEventListener('touchstart', function (e) {
        // 获取第一只手指触摸的X坐标
        startX = e.targetTouches[0].pageX;
        // 手指触摸就停止定时器,来停止自动播放
        clearInterval(timer);
    })
    // 计算手指滑动的距离，并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        // 计算手指滑动的距离
        moveX = e.targetTouches[0].pageX - startX;
        // 盒子移动的距离  盒子原来的距离 + 手指滑动的距离
        var translateX = -index * w + moveX;
        // 取消过渡动画
        ul.style.transition = 'none';
        // 移动
        ul.style.transform = 'translateX(' + translateX + 'px)'
        // 手指移动了才能赋值为true
        flag = true;
        // 阻止屏幕默认滚动的行为
        e.preventDefault();
    })
    ul.addEventListener('touchend', function (e) {
        if (flag) {
            // 如果移动距离大于50px,图片就播放上一张或者下一张
            // 注意:Math.abs()是对一个数取绝对值
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    // 如果是右滑,moveX一定是个正值
                    index--;
                } else {
                    // x如果是左滑,moveX一定是个负值
                    index++;
                }
                // 移动动画
                var translateX = -index * w;
                ul.style.transition = 'all  .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            } else {
                // 如果距离小于50px就回弹回去
                var translateX = -index * w;
                ul.style.transition = 'all  .1s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
            // 手指离开就要重新开启定时器
            timer = setInterval(function () {
                index++;
                var translateX = -index * w;
                // 2D平移（带单位px）
                ul.style.transform = 'translateX(' + translateX + 'px)';
                // 过渡动画(带单位s)
                ul.style.transition = 'all .3s';
            }, 2000);
        }
    })
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    })
    goBack.addEventListener('click', function () {
        window.scroll(0, 0);
    })

})