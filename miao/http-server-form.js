
const net = require('net')
const querystring = require('querystring')

const server = net.createServer()//创建tcp服务端

const msgs = []//所有用户的留言信息

server.on('connection', conn => {//有连接建立成功时回调

  console.log(conn.remoteAddress, conn.remotePort, ' connected...')

  conn.on('data', data => {//连接上发来数据时回调
    var str = data.toString()//假设浏览器是一次性把请求的报文发过来的
    var lines = str.split('\r\n')
    var firstLine = lines.shift()
    var [method, path] = firstLine.split(' ')
    console.log(method, path)
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(str)
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')

    if (method == "GET" && path == '/') {
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type: text/html; charset=UTF-8\r\n')
      conn.write('\r\n')
      conn.write(`
        <form method="POST" action="/" >
          Name: <input name="name" /> <br>
          Message: <input name="msg" /> <br>
          <button>Submit</button>
        </form>
      `)//可以分开写
      for (let msg of msgs) {
        conn.write(`
          <fieldset>
            <legend>${msg.name}</legend>
            <small>${msg.time}</small>
            <p>${msg.msg}</p>
          </fieldset>
        `)
      }
      conn.end()
    }

    if (method == 'POST' && path == '/') {//首页
      var lastline = lines.pop()
      var info = querystring.parse(lastline)// {name: 'zs', msg: 'hello'}
      console.log('MSG:', info)
      info.time = new Date().toString()// {name: 'zs', msg: 'hello', time: '2021.....'}
      msgs.unshift(info)

      conn.write('HTTP/1.1 302 Moved Termperewre\r\n')
      conn.write('Location: /\r\n')
      conn.write('\r\n')
      conn.end()
    }


  })


})

const PORT = 8081

server.listen(PORT, '127.0.0.1', (成功后的回调函数) => {//开始监听
  console.log('成功在' + PORT + '端口监听...')
})
