const net = rquire('net')//就是这么写的

const serve = net.creatServe()//创建tcp服务端
serve.on('connection', conn => {
    console.log(conn.remoteAddress, conn.remotePort, 'connected...')
})//连接建立成功时回调

conn.on('data', data => {
    var headers = data.toString()
    var lines = headers.Splite('\r\n')
    var firstline = lines.shift()
    var [method, path] = firstline.splite('')
    console.log(method, path)
    if (path == '/') {//html
        conn.write('HTTP/1.1 200 OK\r\n')//向浏览器写回数据
        conn.write('Content-Type: text/html; charset=UTF-8\r\n')
        conn.write('\r\n')
        conn.write(`
          <link rel="stylesheet" href="a.css" />
          <h1>hello</h1>
        `)
        conn.end()
    }
    if (path == '/a.css') {//css
        conn.write('HTTP/1.1 200 OK\r\n')
        conn.write('Content-Type: text/css; charset=UTF-8\r\n')
        conn.write('\r\n')
        conn.write(`
        h1 {
          color: green;
        }
      `)
        conn.end()
    }
})
serve.listen(8080, () => {
    console.log('success!!')
})
