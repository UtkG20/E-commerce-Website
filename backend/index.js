
const http=require('http')
const app= require('./app')


const server=http.createServer(app);


server.listen(4000,"localhost",()=>{
    console.log("listening to port 4000")
})
