//指定DON元素
var todoInfo = document.getElementById('todo-info')
var send = document.querySelector('.send-btn')
var list = document.querySelector('.list')
var data = JSON.parse(localStorage.getItem('listData')) || []
// 如果有資料,取出listdata這個key的資料,如果沒有則為空陣列

// 監聽事件
todoInfo.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        addData();
    }
})
send.addEventListener('click', addData)
list.addEventListener('click', delData)
updateList(data)
// 更新資料內容


//事件
function addData(e) {
    newinfo = document.querySelector('.todo-info').value

    if (newinfo == '') {
        alert('請填寫代辦內容')
        return
    }

    var Today = new Date();
    var date = Today.getDate();
    var month = Today.getMonth()
    var year = Today.getFullYear()
    var time = year + '-' + month + '-' + date

    var todo = {
        content: newinfo,
        time: time
    }
    data.push(todo)
    localStorage.setItem('listData', JSON.stringify(data))
    document.querySelector('.todo-info').value = ''
    updateList(data)

}
// 更新網頁畫面
function updateList(items) {
    str = ''
    var len = items.length
    for (var i = 0; i < len; i++) {
        str += '<li><span>' + items[i].content + '</span><span>' + items[i].time + '</span><i class="material-icons" data-index=' + i + '>clear</i></li>'
    }
    list.innerHTML = str
}
// 刪除代辦事項
function delData(e) {
    e.preventDefault()
    if (e.target.nodeName !== 'I') {
        return
    }
    var index = e.target.dataset.index
    data.splice(index, 1)
    localStorage.setItem('listData', JSON.stringify(data))
    updateList(data)
}