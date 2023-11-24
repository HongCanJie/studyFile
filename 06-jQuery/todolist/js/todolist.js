$(function () {
    // 1.按下回车 把完整的数据 存储到本地存储里面
    // 存储的数据格式是对象数组型
    // 页面打开后加载
    load();
    $('#title').on('keydown', function (event) {
        if (event.keyCode == 13) {
            if ($(this).val() == '') {
                alert('请输入您要的操作');
            } else {
                // 先读取本地存储获取过来的数据
                var local = getData();
                // console.log(local);
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数据local存储到本地存储中
                saveData(local);
                // 渲染加载数据
                load();
                // 清空输入框中的内容
                $(this).val('');
            }
        }
    })

    // 2.todolist 删除事件
    // 事件委派
    $('ol,ul').on('click', 'a', function () {
        var data = getData();
        // console.log(data);
        // 修改数据
        // 获取自定义属性
        var index = $(this).attr('id');
        // console.log(index);
        // splice(从哪个位置开始删除, 删除几个元素)
        data.splice(index, 1);
        // 保存到本地
        saveData(data);
        // 重新渲染页面
        load();
    })

    // 3.todolist 正在进行和已完成选项操作
    // 事件委托
    $('ol,ul').on('click', 'input', function () {
        // 获取本地存储的数据
        var data = getData();
        // 修改本地存储的数据
        var index = $(this).siblings('a').attr('id');
        // console.log(index);
        // 注意：固有属性通过prop获取   自定义属性通过attr获取
        data[index].done = $(this).prop('checked');
        // console.log(data);
        // 保存到本地存储
        saveData(data);
        // 渲染页面
        load();
    })

    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem('todolist');
        if (data != null) {
            // 把本地存储的字符串格式的数据转化为对象格式的数据
            return JSON.parse(data);
        } else {
            return [];
        }

    }
    // 保存本地存储数据
    function saveData(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }
    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getData();
        // 遍历之前先把ol清空
        $('ol,ul').empty();
        var tudoCount = 0;//正在进行的个数
        var doneCount = 0;//已完成的个数
        // 遍历数据
        $.each(data, function (index, ele) {
            // console.log(ele);
            if (ele.done) {
                $('ul').prepend('<li><input type="checkbox" checked="checked"><p>' + ele.title + '</p><a href="javascript:;"id=' + index + '></a></li>');
                doneCount++;
            } else {
                $('ol').prepend('<li><input type="checkbox" ><p>' + ele.title + '</p><a href="javascript:;"id=' + index + '></a></li>');
                tudoCount++;
            }
        })
        $('#todocount').html(tudoCount);
        $('#donecount').html(doneCount);
    }


})