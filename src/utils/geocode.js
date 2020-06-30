const request=require('request')
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1Ijoicm9yb3dhZGkiLCJhIjoiY2tia3Q4d2lnMTJoNDJubHR3NzFuMGpscyJ9.SaBABZqAhU0_CSpBu4_qgA"
    request({ url: url,json:true }, (error, response) => {
        if(error)
        {
            callback("error in connecting",undefined)
        }
        else if(response.body.features.length===0)
        {callback("unable to find location",undefined)}
        
        else
        {   callback(undefined,{latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location:response.body.features[0].place_name
            })}
    
    })


}

module.exports=geocode

