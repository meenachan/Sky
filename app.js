
let lat ;
let log;
const form = document.querySelector(".anv");
const tempdes = document.querySelector(".temp-des");
var tempno = document.querySelector(".temp-no");
const er = document.getElementById("message");
const city = document.querySelector(".city-name");
var abc = document.getElementById("city");
var changetemp = document.getElementById("changetemp");

window.addEventListener("load",()=>{
    let lat , long ;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const geop = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=LaIFm8AwisCeRGwdpD6PVGfh7ql739Ya&q=${lat}%2C${long}`;
            fetch(geop)
            .then(res =>{
                return res.json();
            })
            .then(res =>{
                try{
                    let key = res.Key;
                    //api call to fetch temperature details using city code 
                     const locapi =`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=LaIFm8AwisCeRGwdpD6PVGfh7ql739Ya&details=true`;
                    //fetching the temperater details    
                     fetch(locapi)
                        .then(respo =>{
                        return respo.json();
                         })
                        .then(respo =>{
                            const temp1 = respo.DailyForecasts["0"].Temperature.Minimum.Value;
                            const temp2 = respo.DailyForecasts["0"].Temperature.Maximum.Value;
                            const summary = respo.DailyForecasts["0"].Day.ShortPhrase;
                            tempno.textContent = temp2+"/"+temp1;
                            tempdes.textContent= summary;
                            city.textContent = res.ParentCity.EnglishName;
                            er.textContent=" ";
                            
                            changetemp.addEventListener("click",()=>{
                                flag=0;
                                cel =0;
                                fah = temp;
                                if(flag==0){
                                    cel = Math.floor((fah-32)*5/9);
                                    tempno.textContent=cel;
                                }
                            });
                        })
                    } 
                //to catch if invalid city name is given
                catch{
                         er.textContent="Try Again!"; 
                         tempno.textContent = "0";
                         tempdes.textContent= "Weather";
                         city.textContent = "City";
                        }
    
            }); 
       
       
        });
    }
});
form.addEventListener("submit",e=> {
    e.preventDefault();
    //city-name
    let loc = abc.value;  
        //api call using the city name as the parameter to fetch the city code 

        const latapi = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=LaIFm8AwisCeRGwdpD6PVGfh7ql739Ya&q=${loc}`;
        fetch(latapi)
            .then(res =>{
                return res.json();
            })
            .then(res =>{
                try{
                    let key = res["0"].Key;
                    //api call to fetch temperature details using city code 
                     const locapi =`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=LaIFm8AwisCeRGwdpD6PVGfh7ql739Ya&details=true`;
                    //fetching the temperater details    
                     fetch(locapi)
                        .then(respo =>{
                            console.log(locapi);
                        return respo.json();
                        
                         })
                        .then(respo =>{
                            const temp1 = respo.DailyForecasts["0"].Temperature.Minimum.Value;
                            const temp2 = respo.DailyForecasts["0"].Temperature.Maximum.Value;
                            const summary = respo.DailyForecasts["0"].Day.ShortPhrase;
                            tempno.textContent = temp2+"-"+temp1;
                            tempdes.textContent= summary;
                            city.textContent = res["0"].EnglishName;
                            er.textContent=" ";
                            
                            // changetemp.addEventListener("click",()=>{
                            //     flag=0;
                            //     cel =0;
                            //     fah = temp;
                            //     if(flag==0){
                            //         cel = Math.floor((fah-32)*5/9);
                            //         tempno.textContent=cel;
                            //     }
                            // });
                        })
                    } 
                //to catch if invalid city name is given
                catch{
                         er.textContent="Try Again!"; 
                         tempno.textContent = "0";
                         tempdes.textContent= "Weather";
                         city.textContent = "City";
                        }
    
            }); 
            
});

