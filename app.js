const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./src/utils/forecast')
const geocode=require('./src/utils/geocode')
const { isAbsolute } = require('path')
const app=express()
const index_add=path.join(__dirname,'public')
const views_path=path.join(__dirname,'templates/views')
const partial_path=path.join(__dirname,'templates/partial')
const port=process.env.PORT || 3000
app.set('view engine','hbs')
app.set('views',views_path)
hbs.registerPartials(partial_path)
app.use(express.static(index_add))
app.get('', (req, res) => {
    res.render('index1', {
        title: 'Weather',
        name: 'Rohit Wadichor'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        detail: 'My name is Rohit Wadichor.I did my schooling in DPS Nacharam.Currently I am pursuing Btech in CMR College of Engineering and Technology.',
        name: 'Rohit Wadichor'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        helpText: 'Just type the location of the place and know the weather details.Make sure you have your internet up and running',
        name:'Rohit Wadichor'
    })
})
app.get('/help/*', (req, res) => {
    res.render('error',{
        text:'Help article not found',
        name:'Rohit Wadichor'
    })
})

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error)
          return res.send("no such place")
         else{
    forecast(data.latitude,data.longitude,(error,foredata)=>{
            if(error)
            return res.send("error")
            else{
                 res.send({
                 location:data.location,
                 forecast:foredata
            })}
            
            })}
    
    })
})
app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
       return res.send({
            error:'You must provide a search term'
        })
    }

    res.send({
        products:[]
    })

})
app.get('*',(req,res)=>
{
    res.render('error',{
        text:'page not found',
        name:"Rohit Wadichor"
    })
}) 
app.listen(port,()=>{
    console.log("server is up")
})

