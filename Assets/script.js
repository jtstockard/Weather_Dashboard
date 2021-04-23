console.log("testing");
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
  console.log("clicked");
  var searchInput = $(".searchInput").val();
  var fiveDayUrl =
    "https://api.openweathermap.org/data/2.5/onecall?q=" +
    searchInput +
    "&appid=" +
    YOUR_API_KEY +
    "&units=imperial";
  var currentUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
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
      var cityName = $(".list-group").addClass("list-group-item");
      cityName.append("<li>" + response.name + "</li>");

      localStorage.setItem(keyCount, response.name);
      keyCount = keyCount + 1;

      var currentCard = $(".currentCard").append("<div>").addClass("card-body");
      currentCard.empty();
      var currentName = currentCard.append("<p>");

      currentCard.append(currentName);

      var timeUTC = new Date(response.dt * 1000);
      currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
      currentName.append(
        `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`
      );

      var currentTemp = currentName.append("<p>");

      currentName.append(currentTemp);
      currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");

      currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");

      currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

      var urlUV =
        `https://api.openweathermap.org/data/2.5/uvi?appid=` +
        YOUR_API_KEY +
        `&lat=${response.coord.lat}&lon=${response.coord.lon}`;

      $.ajax({
        url: urlUV,
        method: "GET",
      }).then(function (response) {
        var currentUV = currentTemp
          .append("<p>" + "UV Index: " + response.value + "</p>")
          .addClass("card-text");
        currentUV.addClass("UV");
        currentTemp.append(currentUV);
      });
    });
    $.ajax({
      url: fiveDayUrl,
      method: "GET",
    }).then(function (response) {
      var days = [0, 8, 16, 24, 32];
      //var fiveDayCard = $(".fiveDayCard").addClass("card-body");
      var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
      fiveDayDiv.empty();
      days.forEach(function (i) {
        var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
        FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

        fiveDayDiv.append(
          "<div class=fiveDayColor>" +
            "<p>" +
            FiveDayTimeUTC1 +
            "</p>" +
            `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` +
            "<p>" +
            "Temperature: " +
            response.list[i].main.temp +
            "</p>" +
            "<p>" +
            "Humidity: " +
            response.list[i].main.humidity +
            "%" +
            "</p>" +
            "</div>"
        );
      });
    });
  }
});
