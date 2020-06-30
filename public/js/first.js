const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msgg1=document.querySelector('#msg1')
const msgg2=document.querySelector('#msg2')
const msgg3=document.querySelector('#msg3')
const msgg4=document.querySelector('#msg4')
const msgg5=document.querySelector('#msg5')
const msgg6=document.querySelector('#msg6')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= search.value
    msgg1.textContent='Loading...'
    msgg2.textContent=''
    msgg3.textContent='' 
    msgg4.textContent='' 
    msgg5.textContent='' 
    msgg6.textContent=''     

    fetch("/weather?address="+location).then((response)=>{
response.json().then((data)=>{
    if(data.error){
        msgg1.textContent=data.error
    }
    else{
        msgg1.textContent=data.location
        msgg2.textContent=data.temperature
        msgg3.textContent=data.fl
        msgg4.textContent=data.humidity
        msgg5.textContent=data.wind_speed
        msgg6.textContent=data.clouds
    }
})
})

})