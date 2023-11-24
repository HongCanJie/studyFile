$(function () {
    // 当我们点击小li的时候不需要执行页面滚动事件里面的小li添加current这个方法
    // 使用节流阀和互斥锁解决问题
    var flag = true;
    // 1.显示和隐藏电梯导航
    var toolTop = $('.recommend').offset().top;
    toggleTool();
    // 封装函数可以解决页面初始化的时候打开的位置没有电梯导航的问题
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    };
    $(window).scroll(function () {
        toggleTool();
        // 3.页面滚动到某一个内容区域，左侧的电梯导航小li就添加和删除current类名
        if (flag) {
            $('.floor .w').each(function (index, ele) {
                // 如果被卷去的头部大于等于获取过来的某个offsetTop值，就把这个内容输出出来
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // console.log(index);
                    $('.fixedtool li').eq(index).addClass('current').siblings('li').removeClass();
                }
            })
        }
    });
    // 2.点击电梯导航页面就可以滚动到相应的区域
    $('.fixedtool li').click(function () {
        flag = false;
        // 当前点击的模块的索引号
        // console.log($(this).index());
        // 选出对应索引号内容的位置 计算他的offset().top的值
        var current = $('.floor .w').eq($(this).index()).offset().top;
        // 页面滚动效果
        // 通过回调函数,当页面滚动动画结束之后打开互斥锁
        $('html,body').stop().animate({
            scrollTop: current + 1
        }, function () {
            flag = true;
        });
        // 点击了之后给当前的小li添加current类名，兄弟移除current类名
        $(this).addClass('current').siblings().removeClass();
    });
}) 