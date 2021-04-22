/* PSUEDO CODE 

1. GET API KEY
*use api key from OpenWeather to weather access of new accuasitions
*Use the three difreernt calls for current, 5-day, and UX index

2. BOOTSTRAP
* Use link and script for css and js
* Fill in containers on html with css and html div classes

3. JQUERY
* use JSON to bring content to html from method placement
* use ajax to get api clearence

4. LOCALSTORAGE
*Implement localstorage in the input selection to save console data
 */

var searchBtn = $(".searchButton");

const YOUR_API_KEY = "c2c522dc356d35787144fc3d640d1650";

for (var i = 0; i < localStorage.length; i++) {
  var city = localStorage.getItem(i);
  //console.log(localStorage.getItem("City"));
  var cityName = $(".list-group").addClass("list-group-item");

  cityName.append("<li>" + city + "<li>");
}

var keyCount = 0;

searchBtn.click(function () {
  var searchInput = $(".searchInput").val();
  var fiveDayUrl =
    "api.openweathermap.org/data/2.5/forecast?q=" +
    searchInput +
    "&appid=" +
    YOUR_API_KEY +
    "&units=imperial";
  var currentUrl =
    "api.openweathermap.org/data/2.5/weather?q=" +
    searchInput +
    "&appid=" +
    YOUR_API_KEY +
    "&units=imperial";

  if ((searchInput = "")) {
    console.log(searchInput);
  } else {
    $.ajax({
      url: currentUrl,
      method: "GET",
    }).then(function (response) {
      var currentUV = currentTemp
        .append("<p>" + "UV Index: " + response.value + "</p>")
        .addClass("card-text");
      currentUV.addClass("UV");
      currentTemp.append(currentUV);
      currentUV.append("UV Index: " + response.value);
    });
  }
});
