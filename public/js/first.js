const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msgg1=document.querySelector('#msg1')
const msgg2=document.querySelector('#msg2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= search.value
    msgg1.textContent='Loading...'
    msgg2.textContent=''
     
 fetch("/weather?address="+location).then((response)=>{
response.json().then((data)=>{
    if(data.error){
        msgg1.textContent=data.error
    }
    else{
        msgg1.textContent=data.location
        msgg2.textContent=data.forecast
      
    }
})
})

})