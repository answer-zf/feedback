// 模拟数据
var comments = [
  {
    name: 'zhangsan',
    message: 'fine too',
    dataTime: '2019-02-23'
  },
  {
    name: 'zhangsan2',
    message: 'fine too',
    dataTime: '2019-02-23'
  },
  {
    name: 'zhangsan3',
    message: 'fine too',
    dataTime: '2019-02-23'
  },
  {
    name: 'zhangsan4',
    message: 'fine too',
    dataTime: '2019-02-23'
  }
]

var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

http
  .createServer(function(req, res) {
    var path = url.parse(req.url, true)
    var pathName = path.pathname
    if (pathName === '/') {
      fs.readFile('./view/index.html', function(err, data) {
        if (err) {
          res.end('404 Not Found')
          return
        }
        data = template.render(data.toString(), {
          comments: comments
        })
        res.end(data)
      })
    } else if (pathName === '/post') {
      fs.readFile('./view/post.html', function(err, data) {
        if (err) {
          res.end('404 Not Found')
          return
        }
        res.end(data)
      })
    } else if (pathName === '/comment') {
      var commentData = path.query
      commentData.dataTime = '2019-03-13 17:30:30'
      comments.unshift(commentData)
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    } else if (pathName.indexOf('/public/') === 0) {
      fs.readFile('.' + pathName, function(err, data) {
        if (err) {
          res.end('404 Not Found')
          return
        }
        res.end(data)
      })
    } else {
      fs.readFile('./view/404.html', function(err, data) {
        if (err) {
          res.end('404 Not Found')
          return
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function() {
    console.log('Server is running')
  })
