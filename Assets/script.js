var searchBtn = $(".searchButton");

const API_KEY = "c2c522dc356d35787144fc3d640d1650";

for (var i = 0; i < localStorage.length; i++) {
  var city = localStorage.getItem(i);
  var cityName = $(".list-group").addClass("list-group-item");

  cityName.append("<li>" + city + "<li>");
}
var keyCount = 0;
//use keys here
searchBtn.click(function () {
  event.preventDefault;
  var searchInput = $(".searchInput").val();
  var fiveDayUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchInput +
    "&appid=" +
    API_KEY +
    "&units=imperial";
  var currentUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchInput +
    "&appid=" +
    API_KEY +
    "&units=imperial";
  //fetch or xmlsearch here
  if ((searchInput = "")) {
    console.log(searchInput);
  } else {
    $.ajax({
      url: currentUrl,
      method: "GET",
    }).then(function (response) {
      var cityName = $(".list-group").addClass("list-group-item");
      cityName.append("<li>" + response.name + "</li>");
      //stores of city local storage card list

      localStorage.setItem(keyCount, response.name);
      keyCount = keyCount + 1;

      var currentCard = $(".currentCard").append("<div>").addClass("card-body");
      currentCard.empty();
      //appends search input to current weather card
      var currentName = currentCard.append("<p>");

      currentCard.append(currentName);
      //appends time to the current city search
      var timeUTC = new Date(response.dt * 1000);
      currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
      //uses kit awesome for img prep
      currentName.append(
        `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`
      );

      var currentTemp = currentName.append("<p>");

      currentName.append(currentTemp);
      currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");

      currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");

      currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
      // UV appened from the api search

      var urlUV =
        `https://api.openweathermap.org/data/2.5/uvi?appid=` +
        API_KEY +
        `&lat=${response.coord.lat}&lon=${response.coord.lon}`;

      $.ajax({
        url: urlUV,
        method: "GET",
      }).then(function (response) {
        var currentUV = $("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
        currentUV.addClass("UV");
        if (response.value <= 2) {
          currentUV.addClass("low");
        } else if (response.value <= 6.99) {
          currentUV.addClass("moderate");
        } else if (response.value > 7) {
          currentUV.addClass("severe");
        }
        currentTemp.append(currentUV);
      });
    });
    $.ajax({
      url: fiveDayUrl,
      method: "GET",
    }).then(function (response) {
      //popluates days onto the five day forecast
      var days = [0, 8, 16, 24, 32];
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
