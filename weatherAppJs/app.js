'use strict';
let body = document.getElementsByClassName('body');
let locationWeather = document.querySelector('.location-weather');
let tempsNow = document.querySelectorAll('.temp-now');
let descriptionsNow = document.querySelectorAll('.descriptions-now');
let timesNow = document.querySelectorAll('.time-now');
let datesNow = document.querySelectorAll('.date-now');
let humidityWindSpeed = document.querySelectorAll('.humidity-windSpeed');
let images = document.querySelectorAll('.parent-weather-icon>img');
let containerLoading = document.querySelector('.container-loading');
const inputSearch = document.querySelector('.input-search')
const btnSearch = document.querySelector('.btn-search')

let day;
let cityName;
let country;
let response;
let dates = [];
let times = [];
let temps = [];
let tempMin = [];
let tempMax = [];
let windSpeed = [];
let humidity = [];
let descriptions = [];
let icons = [];
var valSearch;

inputSearch.addEventListener('keydown', function (element) {

  if (element.key === 'Enter') {
    element.preventDefault();
    valSearch = inputSearch.value;
    inputSearch.value = '';
    document.querySelector('.parent-main-search').style.opacity = 0;
    document.querySelector('.parent-main-search').style.visibility = 'hidden';
    let weather = new XMLHttpRequest();
    weather.open('GET', `https://api.openweathermap.org/data/2.5/forecast?q=${valSearch}&appid=9b017c504d9f2c19bc949947cf34719c`);
    weather.send();

    weather.onreadystatechange = function () {
      // console.log(this);
      if (this.readyState == 4 && this.status == 200) {
        containerLoading.style.opacity = 0;
        containerLoading.style.visibility = 'hidden';
        response = JSON.parse(this.response);
        result(response.list, response.city.name, response.city.country, response.list);

      } else {
        containerLoading.style.opacity = 1;
        containerLoading.style.visibility = 'visible';
      };
    };

    function result(list, cityName, country) {
      cityName = cityName;
      country = country;
      // console.log(response, cityName);
      // console.log(cityName);
      // console.log(country);
      list.forEach(item => {
        dates.push(item.dt_txt.substr(0, 10));
        times.push(item.dt_txt.substr(11, 8));
        temps.push((parseInt(item.main.temp - 273)));
        tempMin.push((parseInt(item.main.temp_min - 273)));
        tempMax.push((parseInt(item.main.temp_max - 273)));
        windSpeed.push(item.wind.speed);
        humidity.push(item.main.humidity);
        descriptions.push(item.weather[0].description);
        icons.push(item.weather[0].icon);
      });
      // console.log(dates);
      // console.log(times);
      // console.log(temps);
      // console.log(tempMin);
      // console.log(tempMax);
      // console.log(windSpeed);
      // console.log(humidity);
      // console.log(descriptions);
      console.log(icons);
      // console.log(tempsNow)
      locationWeather.innerHTML = `<i class="bi bi-geo-alt-fill"></i> ${cityName}, ${country}`;

      for (var i = 0; i <= tempsNow.length; i++) {

        images[i].src = `https://github.com/JavadRafieii/worldweather/tree/master/weatherImage/${icons[i]}.png`;

        tempsNow[i].innerHTML = `<span class="temp-min-now"><i class="bi bi-arrow-down"></i>
        ${tempMin[i]}°C</span> ${temps[i]}°C <span class="temp-max-now">${tempMax[i]}°C <i class="bi bi-arrow-up"></i>
        </sapn>`;

        descriptionsNow[i].textContent = `${descriptions[i]}`;

        timesNow[i].textContent = `${times[i]}`;

        datesNow[i].textContent = `${dates[i]}`;

        humidityWindSpeed[i].innerHTML = `<i class="bi bi-droplet-half"></i>
      ${humidity[i]} % <i class="bi bi-wind"></i> 
      ${windSpeed[i]} km/h`;

      };

    };
  }

});


btnSearch.addEventListener('click', function () {
  document.querySelector('.parent-main-search').style.opacity = 1;
  document.querySelector('.parent-main-search').style.visibility = 'visible';
});

var weatherApp = new Swiper(".weatherApp", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1,
  loop: true,
  speed: 1500,
  coverflowEffect: {
    rotate: 0,
    stretch: 40,
    depth: 300,
    modifier: 1.5,
    slideShadows: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 2,
    },
  },
});



