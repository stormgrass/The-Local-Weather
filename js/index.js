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
      long = position.coords.longitude;
//making the API Call
      $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + "&lon=" + long + "&units=metric&appid=0c684b406b9375c9b3475fa9542a0dbb", function(json) {
        console.log(JSON.stringify(json));
//putting in location, temperature and condition
        $('#thelocation').html(json.name);
        $('#thetemp').html(Math.round(json.main.temp));

        $('#condition').html(json.weather[0].description);



//getting the right class for my icon
        //complicating it by

  function iconClass() {
                    var timeStamp = Math.floor(Date.now() / 1000);
                    var newClassDay = ('wi-owm-day-' + json.weather[0].id);
                    var newClassNight = ('wi-owm-night-' + json.weather[0].id);
                    if ((timeStamp > json.sys.sunrise) && (timeStamp < json.sys.sunset))
                    return newClassDay;

                    else return newClassNight;


  }
//putting that icon there
$('#thesymbol').addClass(iconClass());


//the background switcher
        switch (json.weather[0].main) {
          case 'Rain':
            $("body").css("background", "url('http://hemmer.tv/weather/rain.jpg')");
            break;
          case 'Drizzle':
            $("body").css("background", "url('http://hemmer.tv/weather/drizzle.jpg')");
            break;
          case 'Thunderstorm':
            $("body").css("background", "url('http://hemmer.tv/weather/thunderstorm.jpg')");
            break;
          case 'Clear':
            $("body").css("background", "url('http://hemmer.tv/weather/clear.jpg')");
            break;
          case 'Snow':
            $("body").css("background", "url('http://hemmer.tv/weather/snow.jpg')");
            break;
          case 'Extreme':
            $("body").css("background", "url('http://hemmer.tv/weather/extreme.jpg')");
            break;
          case 'Clouds':
            $("body").css("background", "url('http://hemmer.tv/weather/clouds.jpg')");
            break;
          case 'Atmosphere':
            $("body").css("background", "url('http://hemmer.tv/weather/atmosphere.jpg')");
            break;
          default: $("body").css("background", "url('http://hemmer.tv/weather/atmosphere.jpg')");

        }
      //the Celsius button
        $('#Celsius').click(function() {
          $('#thetemp').html(Math.round(json.main.temp));
          $('#Celsius').addClass('active');
          $('#Fahrenheit').removeClass('active');
          $('#Fahrenheit').insertAfter('#Celsius');

        });
      //the Fahrenheit button
        $('#Fahrenheit').click(function() {
          var temp = $('#thetemp').html();
          var fahr = Math.round(temp * 9 / 5 + 32);
          if ($('#Fahrenheit').hasClass('active')) {
            $('#thetemp').html();
          } else {
          $('#thetemp').html(fahr);
          $('#Fahrenheit').addClass('active');
          $('#Celsius').removeClass('active');
          $('#Celsius').insertAfter('#Fahrenheit');
          }
        });




      });

    }

  );
}
