//to make sure geolookup works, I'm forcing visitors to use https
if (window.location.protocol != "https:")
     window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

//creating the variables so I can use them for the API call
var long;
var lat;
var dt = new Date();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var temp;

//first things first: fixing the date
function nth(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

//fixing the time
function minuteDisplay() {
  if (dt.getMinutes() < 10) {
    return ('0' + dt.getMinutes());
  } else return dt.getMinutes();
}
var time = dt.getHours() + ":" + minuteDisplay();

var date = monthNames[dt.getMonth()] + ' ' + dt.getUTCDate() + nth(dt.getUTCDate());

//putting in the time and date
$('#thetime').html(time);
$('#thedate').html(date);

//getting geolocation from the browser
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      console.log(lat);
      long = position.coords.longitude;
      console.log(long);
//making the API Call - commented out one was the old one
      //$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + "&lon=" + long + "&units=metric&appid=0c684b406b9375c9b3475fa9542a0dbb", function(json) {
//here we have the new wunderground API
        $.getJSON('https://api.wunderground.com/api/56c831f60007f96c/conditions/q/' + lat + "," + long + ".json", function(json) {

//putting in location, temperature and condition
        //console.log(json.weather[0].description);
        var tempC = json.current_observation.temp_c;
        var tempF = json.current_observation.temp_f;
        $('#thelocation').html(json.current_observation.display_location.city);

        $('#thetemp').html(Math.round(tempC));

        $('#condition').html(json.current_observation.weather);



//this function used to choose the right icon depending on the time. Unfortunately
//weathericons.io doesn't support different daytimes for icons on wunderground

  // function iconClass() {
  //                   var timeStamp = Math.floor(Date.now() / 1000);
  //                   var newClassDay = ('wi-wu-' + json.current_observation.icon);
  //                   var newClassNight = ('wi-owm-night-' + json.weather[0].id);
  //                   if ((timeStamp > json.sys.sunrise) && (timeStamp < json.sys.sunset))
  //                   return newClassDay;
  //
  //                   else return newClassNight;
  //
  //
  // }
//finding the icon

var iconNeeded = json.current_observation.icon;
var newClassDay = ('wi-wu-' + iconNeeded);

//alternatively, I could have used the icons from wunderground, but they're ugly
//var weatherIcon = 'https://icons.wxug.com/i/c/j/' + iconNeeded + '.gif';
// $('#thesymbol').prepend('<img id="theImg" src="' + weatherIcon + '" />');
$('#thesymbol').addClass(newClassDay);

//the background switcher
        switch (iconNeeded) {
          case 'rain':
          case 'sleet':
            $("body").css("background", "url('img/rain.jpg')");
            break;
          case 'chancerain':
            $("body").css("background", "url('img/drizzle.jpg')");
            break;
          case 'chancetstorms':
          case 'tstorms':
            $("body").css("background", "url('img/thunderstorm.jpg')");
            break;
          case 'clear':
          case 'mostlysunny':
          case 'partlysunny':
          case 'sunny':
            $("body").css("background", "url('img/clear.jpg')");
            break;
          case 'chancesnow':
          case 'flurries':
          case 'chanceflurries':
            $("body").css("background", "url('img/snow.jpg')");
            break;
          case 'Extreme':
            $("body").css("background", "url('img/extreme.jpg')");
            break;
          case 'cloudy':
          case 'hazy':
          case 'mostlycloudy':
          case 'partlycloudy':
            $("body").css("background", "url('img/clouds.jpg')");
            break;
          case 'unknown':
            $("body").css("background", "url('img/atmosphere.jpg')");
            break;
          default: $("body").css("background", "url('img/atmosphere.jpg')");

        }
      //the Celsius button
        $('#Celsius').click(function() {
          $('#thetemp').html(Math.round(tempC));
          $('#Celsius').addClass('active');
          $('#Fahrenheit').removeClass('active');
          $('#Fahrenheit').insertAfter('#Celsius');

        });
      //the Fahrenheit button
        $('#Fahrenheit').click(function() {
          // var temp = $('#thetemp').html();
          // var fahr = Math.round(temp * 9 / 5 + 32);
          if ($('#Fahrenheit').hasClass('active')) {
            $('#thetemp').html();
          } else {
          $('#thetemp').html(tempF);
          $('#Fahrenheit').addClass('active');
          $('#Celsius').removeClass('active');
          $('#Celsius').insertAfter('#Fahrenheit');
          }
        });




      });

    }

  );
}
