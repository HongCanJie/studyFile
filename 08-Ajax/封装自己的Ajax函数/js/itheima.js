function resolveData(data) {
    var arr = [];
    for (var k in data) {
        var str = k + '=' + data[k];
        arr.push(str);
    }
    return arr.join('&');
}

// var str = resolveData({ name: 'ken', age: 21 });
// console.log(str);

function itheima(options) {
    var xhr = new XMLHttpRequest();

    // 把外界传递过来的参数对象，转化为查询字符
    var qs = resolveData(options.data);
    // 判断传过来的是get请求还是post请求
    if (options.method.toUpperCase() === 'GET') {
        // 创建请求
        xhr.open(options.method, options.url + '?' + qs);
        // 发送请求
        xhr.send();
    } else if (options.method.toUpperCase() === 'POST') {
        // 创建请求
        xhr.open(options.method, options.url);
        // 设置Content-Type 属性（固定写法）将查询字符编码
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // 发送请求
        xhr.send(qs);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            // 返回成功后的回调函数处理返回成功的数据
            options.success(result);
        }
    }

}

