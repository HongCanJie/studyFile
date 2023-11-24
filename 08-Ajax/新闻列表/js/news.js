$(function () {
    // 给时间补零
    function padZero(n) {
        if (n < 10) {
            return '0' + n;
        } else {
            return n;
        }
    }

    // 定义格式化时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr);
        var y = dt.getFullYear();
        // 由于月份从零开始，所以要加一
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());

        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }


    // 获取新闻列表
    function getNewList() {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/news',
            data: {},
            success: function (res) {
                if (res.status !== 200) return alert('获取失败');
                // console.log(res.data);
                for (var i = 0; i < res.data.length; i++) {
                    // 把每一项的tags从字符串转化为数组的形式
                    res.data[i].tags = res.data[i].tags.split(',')
                }
                console.log(res);
                var htmlStr = template('tpl-news', res);
                $('#news-list').html(htmlStr);
            }
        })
    }

    getNewList();
})