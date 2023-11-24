$(function () {
    function getCommentList() {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/cmtlist',
            success: function (res) {
                // console.log(res);
                // 如果失败了
                if (res.status !== 200)
                    return alert('数据获取失败!');
                // 如果成功了
                // console.log('数据获取成功!');
                var rows = [];
                $.each(res.data, function (i, item) {
                    var str = '<li class="list-group-item"><span class="badge" style="background-color: #EFAC4B;">' + item.time + '</span><span class="badge" style="background-color: #5FBFD8;">' + item.username + '</span>' + item.content + '</li>'
                    rows.push(str);
                })
                $('#cmt-list').empty().append(rows.join(""));
            }
        })
    }
    getCommentList();


    $('#formAddCmt').on('submit', function (e) {
        // 阻止默认跳转页面的行为
        e.preventDefault();
        // 获取表单中元素的数据（返回的是一个字符串）
        var data = $(this).serialize();
        // console.log(data);
        $.ajax({
            method: 'post',
            url: 'http://www.liulongbin.top:3006/api/addcmt',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 201) return alert('发布失败！');
                getCommentList();
                // 清空表单
                // 把jQuery转化为DOM元素就用  [0]
                // reset是原生DOM中的操作函数
                $('#formAddCmt')[0].reset();
            }
        })
    })
})
