// 要点1：移入轮播图，显示左右按钮，并暂停自动播放。移出则隐藏，并开启自动轮播。
// 要点2：点击按钮，左右翻动轮播图，且小圆圈样式对应改变
// 要点3：移入小圆圈，轮播图片
// 要点4：通过节流阀实现 前一次轮播动画执行完后才能再次轮播动画
// 要点5：无缝滚动的实现：
// 在最后的位置添加第一张的图片，使其成为‘最后一张图片’。
// 当向右滚动到‘最后一张图片’时，将显示的位置设置为实际的第一张图片。
// 当向左滚动到‘第一张图片’时，将显示的位置设置为实际的最后一张图片。

// ❤ 核心算法：ul移动的距离等于索引号乘以图片的宽度

// 节流阀原理：
// 在执行之前，先判断flag的值，满足条件则立即修改flag的值，防止本次动画结束前再次被调用。
// 执行完毕后，在回调函数中修改flag的值，使其可以再次被调用。
// ♥ 其实质相当于同步锁的概念，A一执行则立即将锁拿住，执行结束后再放锁。


// ♥ 自动播放的实现：在定时器中调用右击函数

window.addEventListener('load', function () {
    // 1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2.鼠标经过后左右按钮显示
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 鼠标经过就停止定时器
        clearInterval(timer);
        timer = null;//清除定时器变量
    })
    // 鼠标离开后左右按钮隐藏
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 手动调用点击事件
        timer = setInterval(function () {
            // 手动调用点击事件  调用左侧的点击事件
            arrow_r.click();
        }, 2000);
    })
    // 3.动态生成小圆圈  有几张图片，就能生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建小li
        var li = document.createElement('li');
        // 创建小圆圈的时候顺便设置索引号 通过自定义属性
        li.setAttribute('index', i);
        // 插入到ol中
        ol.appendChild(li);
        // 为每一个小li绑定点击事件，使用排他思想
        li.addEventListener('click', function () {
            // 先干掉所有人
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己 谁点击了这个小li，谁调用函数
            this.className = 'current';
            // 5.点击小圆圈移动图片
            // ul的移动距离就是小圆圈的索引号乘以图片的宽度
            // 当我们点击了某个小li就获取那个小li的索引号
            var index = this.getAttribute('index');
            // 点击小圆点把索引号给图片num值
            num = index;
            // 点击小圆点把索引号给小圆点circle
            circle = index;
            animate(ul, - index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为current
    ol.children[0].className = 'current';
    // 6.克隆第一张图片 放在ul里面 深拷贝为true 浅拷贝为false  
    // 注意：由于index在克隆之前已经设置好了，所以最后一张图片没有index
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击右侧按钮，图片向右滑动一张
    // 图片的位置
    var num = 0;
    // 小圆点的位置
    var circle = 0;
    // flag节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 图片到最后一张后就回到第一张图片(在num++前先判断才可以实现无缝滚动)
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            // 滑动到下一张图片
            animate(ul, -num * focusWidth, function () {
                flag = true;//打开节流阀
            });
            circle++;
            // 如果小圆点到了最后一个，就回到第一个
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })
    // 8.点击左侧按钮，图片向左滑动一张
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 图片到第一张后就回到最后一张图片(在num--前先判断才可以实现无缝滚动)
            // 注意这里一定要用==，因为是在第一次点击的时候就需要跳到最后一张
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            // 滑动到下一张图片
            animate(ul, -num * focusWidth, function () {
                // 打开节流阀
                flag = true;
            });
            circle--;
            // 如果小圆点到了最后一个，就回到第一个
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    })
    // 排他思想，移动小圆点
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            // 干掉所有小圆点 排他思想
            ol.children[i].className = '';
            // 给下一个小圆点加css
            ol.children[circle].className = 'current';
        }
    }
    // 自动播放轮播图
    var timer = setInterval(function () {
        // 手动调用点击事件  调用左侧的点击事件
        arrow_r.click();
    }, 2000);
})
