$(function () {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $('.checkall').change(function () {
        // console.log($(this).prop('checked'));
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        if ($(this).prop('checked')) {
            // 让所有的商品都添加check-cart-item类名  注意不需要类名前面不需要加点.
            $('.cart-item').addClass('check-cart-item');
        } else {
            // 移除check-cart-item类名
            $('.cart-item').removeClass('check-cart-item');
        }

    });
    // 2.如果小复选框的被选中的个数等于3，就把全选按钮选上，否则全选按钮不选。
    $('.j-checkbox').change(function () {
        // if (被选中的小复选框 == 3) {
        //     // 就要选中全选按钮
        // } else {
        //     // 不要选中全选按钮
        // }
        // 注意： :checked可以返回选中的复选框
        // console.log($('.j-checkbox:checked').length);
        // $('.j-checkbox').length这个是所有的小复选框的数量
        if ($('.j-checkbox:checked').length == $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        if ($(this).prop('checked')) {
            // 让当前的商品添加check-cart-item类名  注意不需要类名前面不需要加点.
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            // 移除check-cart-item类名
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    })
    // 3.增减商品数量模块,首先声明一个变量,当我们点击+(increment),就让这个值++,然后赋值给文本框
    $('.increment').click(function () {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings('.itxt').val();
        // console.log(n);
        n++;
        $(this).siblings('.itxt').val(n);
        // 计算商品小计模块  根据文本框的值 乘以 当前商品的价格  就是商品的小计
        // var p = $(this).parent().parent().siblings('.p-price').html();
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        // console.log(p);
        // 截取字符串
        p = p.substr(1);
        // console.log(p);
        // toFixed(2)是保留两位小数
        var price = (p * n).toFixed(2);
        // 小计模块
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        getSum();
    })

    $('.decrement').click(function () {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings('.itxt').val();
        // console.log(n);
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n);
        // 计算商品小计模块  根据文本框的值 乘以 当前商品的价格  就是商品的小计
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        // console.log(p);
        // 截取字符串
        p = p.substr(1);
        // console.log(p);
        var price = (p * n).toFixed(2);
        // 小计模块
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        getSum();
    })
    // 4.用户修改文本框的值  计算  小计模块
    $('.itxt').change(function () {
        // 获取文本框输入的数值
        var n = $(this).val();
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        getSum();
    })
    // 5.计算总计和总额模块
    getSum();
    function getSum() {
        var count = 0;//计算总件数
        var money = 0;//计算总价钱
        $('.itxt').each(function (i, ele) {
            count += parseInt($(ele).val());
        })
        $('.amount-sum em').text(count);

        $('.p-sum').each(function (i, ele) {
            money += parseInt($(ele).text().substr(1));
        })
        $('.price-sum em').text('￥' + money.toFixed(2));
    }
    // 6.删除商品模块
    // （1）商品后面的删除按钮
    $('.p-action a').click(function () {
        $(this).parents('.cart-item').remove();
        getSum();
    });
    // (2)删除选中的商品
    $('.remove-batch').click(function () {
        // :checked 是选择器
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getSum();
    })
    // (3)清空购物车中的商品
    $('.clear-all').click(function () {
        $('.cart-item').remove();
        getSum();
    })
})