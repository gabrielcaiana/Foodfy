const express = require('express')
const nunjucks = require('nunjucks')
const server = express()
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.use(express.static('public'))

server.get('/', function(req, res){
    return res.render('index')
})

server.listen(2000, function(){
    console.log('Server running')
})