const formJS = $(".top-banner form")[0];
const formJQ = $(".top-banner form").eq(0);
const formjq2 = $(".top-banner form").first();

const inputJS = $(".top-banner input")[0];
const inputJQ = $(".top-banner input").eq(0);
const inputJQ2 = $(".top-banner input").first();

const msg = $(".top-banner span").eq(0);
const list = $(".cities").eq(0);

$(window).on("load", () => {
  console.log("loaded");
  localStorage.setItem("apiKey", "0537372aba4139f7473dcfe1b09200a6");
});

$(document).ready(() => {
  console.log("blabla");
  localStorage.setItem("apiKey", "0537372aba4139f7473dcfe1b09200a6");
});

formJQ.on("submit", (e) => {
  //alert("form submitted")
  e.preventDefault();
  getApi();
});

const getApi = () => {
  let apiKey = localStorage.getItem("apiKey");
  let inputVal = inputJQ.val();
  let units = "metric";
  let lang = "tr";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=${units}&lang=${lang}`;
  $.ajax({
      url:url,
      type:"GET",
      dataType : "json",
      success :(response)=>{
          const cityListItem = list.find(".city");
          const cityArray = Array.from(cityListItem);
          if(cityArray.lenght>0){
              const filter = cityArray.filter((card)=>{
                  $(card).find("city-name span").text()==name;
              })
              if(filter.length>0){
                  nsg.text("Eroor")
                  msg.css("color","yellow")
                  setTimeout(() => {
                      msg.text("")
                  }, 5000);
                  formJS.reset();
                  inputJS.focus() 
                  return;
              }
          }
          console.log(cityArray)
          const {main,name,sys,weather} = response;
          const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

          const createdLi = $(document.createElement("li"));
          createdLi.addClass("city");
          createdLi.html(`
          <h2 class="city-name" data-name="${name}, ${sys.country}">
              <span>${name}</span>
              <sup>${sys.country}</sup>
          </h2>
          <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
          <figure>
              <img class="city-icon" src="${iconUrl}">
              <figcaption>${weather[0].description}</figcaption>
          </figure>`)

          list.prepend(createdLi)
          formJS.reset();
          inputJQ.focus();
         
          
     

      },

      beforeSend :(requset) =>{
          //header data to API

      },

      complete:() =>{
          //ajx completed
      },

      error : (XMLHttpRequest)=>{
          console.log(XMLHttpRequest);
          msg.text(XMLHttpRequest.status +" " + XMLHttpRequest.statusText)
          setTimeout(() => {
            msg.text("")
        }, 5000);
        formJS.reset();
        inputJS.focus() 
        return;
      }
  })
};
  
