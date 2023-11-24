// 由于js文件是引入的，所以需要页面加载完毕后再执行js文件
window.addEventListener('load', function () {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1.鼠标经过preview_img就把mask和big显示出来
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    // 2.鼠标经过preview_img就把mask和big隐藏起来
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    // 3.鼠标在图片中移动的时候遮挡层要跟着走
    preview_img.addEventListener('mousemove', function (e) {
        // (1)计算鼠标在盒子中的坐标(由于盒子的父元素都没有定位，因此可以直接拿到盒子到body的距离)
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // maskX和maskY就是盒子到父盒子的距离（绝对定位）
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // 小细节：当盒子左侧或右侧贴在父盒子上的时候，盒子就不能移动
        // 遮挡层的最大移动距离：由于遮挡层是正方形，所以宽高相同，只拿宽度即可
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        // (2)减去盒子宽高的一半就是鼠标在盒子中间的时候盒子要移动的距离(注意单位一定要加px)
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 大图片的移动距离 = 遮挡层的移动距离 * 大图片的最大移动距离 / 遮挡层的最大移动距离
        var bigImg = document.querySelector('.bigImg');
        // 大图片的最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        // 注意：这里由于大图得反着走所以必须加负值
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})