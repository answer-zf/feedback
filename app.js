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
var fs = require('fs')
var http = require('http')
var url = require('url')
var template = require('art-template')
http
  .createServer(function(req, res) {
    var pathObj = url.parse(req.url, true)
    var pathname = pathObj.pathname
    if (pathname === '/') {
      fs.readFile('./view/index.html', function(err, data) {
        if (err) {
          return res.end('Not Found 404')
        }
        data = template.render(data.toString(), {
          comments: comments
        })
        res.end(data)
      })
    } else if (pathname === '/post') {
      fs.readFile('./view/post.html', function(err, data) {
        if (err) {
          return res.end('Not Found 404')
        }
        res.end(data)
      })
    } else if (pathname === '/comment') {
      var query = pathObj.query
      query.dataTime = '2019-01-12 12:30:30'
      comments.unshift(query)
      res.statusCode = 302
      res.setHeader('location', '/')
      res.end()
    } else if (pathname.indexOf('/public/') === 0) {
      fs.readFile('.' + pathname, function(err, data) {
        if (err) {
          return res.end('Not Found 404')
        }
        res.end(data)
      })
    } else {
      fs.readFile('./view/404.html', function(err, data) {
        if (err) {
          return res.end('Not Found 404')
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function() {
    console.log('Server is running')
  })
