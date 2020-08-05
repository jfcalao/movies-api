const express= require('express')
const app= express()

const {config}= require('./config/index')
const moviesApi= require('./routes/movies')

//body parser
app.use(express.json())

moviesApi(app)
// SOME BASIC EXAMPLES THAT I PROBABLY WILL USE:
/* app.get('/', function(req, res){
  res.send('hello people')
})
app.get('/json', function(req, res){
  res.json({hello: "world"})
}) */
app.listen(config.port, function(){
  console.log(`listening http://localhost:${config.port}`)
})

