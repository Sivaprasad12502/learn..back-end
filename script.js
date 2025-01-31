// const  fs= require('fs')
// const textIn=fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)


//10 reding and wirting Files Asynchronously

// Blocking , synchrounous way 
// const fs=require('fs')
// const textIn = fs.readFileSync('/home/vonnue/Desktop/Siva/back-end/complete-node-bootcamp/1-node-farm/starter/txt/output.txt','utf-8')
// console.log(textIn)
// const textOut=`This is what we know: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('/home/vonnue/Desktop/Siva/back-end/complete-node-bootcamp/1-node-farm/starter/txt/output.txt',textOut)
// console.log('File written!')


// Non-blocking asynchronous way
// const fs=require('fs')
// fs.readFile('/home/vonnue/Desktop/Siva/back-end/complete-node-bootcamp/1-node-farm/starter/txt/read-this.txt','utf-8', (err,data1)=>{
//     if(err)return console.log('Error!')
//     console.log(data1)
//     fs.readFile(`/home/vonnue/Desktop/Siva/back-end/complete-node-bootcamp/1-node-farm/starter/txt/read-this.txt`, 'utf-8', (err,data2)=>{
//         // console.log(data2)
//         fs.readFile(`/home/vonnue/Desktop/Siva/back-end/complete-node-bootcamp/1-node-farm/starter/txt/append.txt`, 'utf-8', (err,data3)=>{
//             // console.log(data3);
//             fs.writeFile('/home/vonnue/Desktop/Siva/back-end/complete-node-bootcamp/1-node-farm/starter/txt/final.txt', `${data2}\n${data3}`,'utf-8',err=>{
//                 console.log('your file has been written ')

//             })
//       })
//   })
// })

// console.log('will read file!')

/////////////////////////////////////////////////////////////////////////////////////////////////
const fs=require('fs')
const http=require('http')
const url=require('url')
const replaceTemplate= require('/home/vonnue/Desktop/Siva/back-end/complete-node-bootcamp/1-node-farm/starter/modules/replaceTemplate.js')


/////////////
///SERVER



const tempOveriew=fs.readFileSync('/home/vonnue/Desktop/Siva/back-end/complete-node-bootcamp/1-node-farm/starter/templates/template-overview.html','utf-8',)
const tempcard=fs.readFileSync('/home/vonnue/Desktop/Siva/back-end/complete-node-bootcamp/1-node-farm/starter/templates/template-card-html','utf-8',)
const tempProduct=fs.readFileSync('/home/vonnue/Desktop/Siva/back-end/complete-node-bootcamp/1-node-farm/starter/templates/template-product.html','utf-8')

const data=fs.readFileSync('/home/vonnue/Desktop/Siva/back-end/complete-node-bootcamp/1-node-farm/starter/dev-data/data.json','utf-8',)
const dataObj=JSON.parse(data)


const server=http.createServer((req,res)=>{
    const {query, pathname}=url.parse(req.url,true)

    //Overview Page
    if(pathname === '/'|| pathname=== '/overview'){

        res.writeHead(200,{'Content-type':'text/html'})

       const cardsHtml= dataObj.map(el=>replaceTemplate(tempcard,el)).join('')
        const output=tempOveriew.replace('{%PRODUCT_CARDS%}',cardsHtml)
        res.end(output)

    //Product page
    }else if(pathname==='/product'){
        res.writeHead(200,{'Content-type':'text/html'})
        
        const product=dataObj[query.id]
        const output=replaceTemplate(tempProduct,product)
        res.end(output)
    }

    //API
    else if(pathname==='/api'){
            res.writeHead(200,{'Content-type':'application/json'})
            res.end(data)


        
        

        

        



    }
    //Not found
    else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        })
        res.end('<h1>page not found!</h1>')
    }
})
server.listen(8121,'127.0.0.1',()=>{
    console.log('Listening to requests on port 8000')
})


