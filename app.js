const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./src/utils/forecast')
const geocode=require('./src/utils/geocode')
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
        title: 'About Me',
        name: 'Rohit Wadichor'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title:'help',
        helpText: 'This is some helpful text.',
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
                 temperature:foredata.temp,
                 fl:foredata.fl,
                 humidity:foredata.humidity,
                 wind_speed:foredata.wind_speed,
                 clouds:foredata.clouds
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

