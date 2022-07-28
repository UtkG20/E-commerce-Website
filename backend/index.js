
const http=require('http')
const app= require('./app')
// const cors= require('cors')
// const studentRoute=require('./api/routes/students')
// const server=http.createServer((req,res,app)=>{
//     if(req.url =="/")
//     res.end("hello");
//     else if(req.url=="/contact")
//     res.end('contact us');
//     else if(req.url=="/about")
//     res.end('about us');
//     else{
//         res.writeHead(404,{"content-type":"text/html"})
//         res.end('Error 404. Page not found');
//     }
// })
const server=http.createServer(app);


// app.use('/students',studentRoute)

server.listen(4000,"localhost",()=>{
    console.log("listening to port 4000")
})




// app.listen(3000,()=>{
//     console.log('server running confirm');
// })