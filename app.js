
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
    let loc = abc.value;
console.log(loc);
        const latapi = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=LaIFm8AwisCeRGwdpD6PVGfh7ql739Ya&q=${loc}`;
        console.log(latapi); 
        fetch(latapi)
        .then(res =>{
            return res.json();
        })
        
        .then(res =>{
           let key = res["0"].Key;
        const locapi =`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=LaIFm8AwisCeRGwdpD6PVGfh7ql739Ya&details=true`;
        fetch(locapi)
        .then(respo =>{
            return respo.json();
        })
        .then(respo =>{
            console.log(respo);
            const temp = respo.DailyForecasts["0"].Temperature.Minimum.Value;
            const summary = respo.DailyForecasts["0"].Day.ShortPhrase;
            console.log(temp,summary);
            tempno.textContent = temp+" F";
            tempdes.textContent= summary;
            city.textContent = res["0"].EnglishName;
            er.textContent=" ";
         
        })
        })
        .catch( er.innerHTML = "Please Enter a Valid City !");
    
  });
