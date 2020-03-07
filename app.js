
let lat ;
let log;
const form = document.querySelector(".anv");
const tempdes = document.querySelector(".temp-des");
 const tempno = document.querySelector(".temp-no");
 const er = document.getElementById("message");
  const city = document.querySelector(".city-name");
  var abc = document.getElementById("city");


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
                        return respo.json();
                         })
                        .then(respo =>{
                            const temp = respo.DailyForecasts["0"].Temperature.Minimum.Value;
                            const summary = respo.DailyForecasts["0"].Day.ShortPhrase;
                            tempno.textContent = temp+" F";
                            tempdes.textContent= summary;
                            city.textContent = res["0"].EnglishName;
                            er.textContent=" ";
                        })
                    } 
                //to catch if invalid city name is given
                catch{
                         er.textContent="Something Went Wrong Try Again!!!!"; 
                         tempno.textContent = "0 F";
                         tempdes.textContent= "Weather";
                         city.textContent = "City";
                        }
    
            });    
});
