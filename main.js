// Variables
var w = $(window).width();
var desktop;
var mobile;

// Clock mechanic
setInterval(() => {
    d = new Date(); //object of date()
    hr = d.getHours();
    min = d.getMinutes();

    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
 
    hour.style.transform = `rotate(${hr_rotation}deg)`;
    minute.style.transform = `rotate(${min_rotation}deg)`;
}, 1000);

// Temperature
const params = {
  latitude: 41.15,
  longitude: -8.61024,
  current_weather: true,
  forecast_days: 1
};
const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current_weather=${params.current_weather}&forecast_days=${params.forecast_days}`;

const fetchWeatherData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Assuming single location response structure from Open Meteo API
    const { current_weather, timezone, timezone_abbreviation, latitude, longitude } = data;

    // Process weather data
    const weatherData = {
      current: {
        time: new Date(current_weather.time),
        temperature2m: Math.floor(current_weather.temperature),
      },
      timezone,
      timezoneAbbreviation: timezone_abbreviation,
      latitude,
      longitude
    };

    $("#weather").find("span").text(weatherData.current.temperature2m);

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Run the function
fetchWeatherData();

// To-do on load
$(document).ready(function () {
    if (w >= 1200) {
        desktopLayout();

    } else if (w < 1200 && w >= 992) {
        tabletLayoutCSS();

    } else if (w < 992 && w >= 600) {
        smallTabletLayout();

    } else {
        mobileLayout();
    }

    // Checked items on default
    var firstItem = $(".checklist").children().eq(0);
    $(firstItem).addClass("checked");
    $(firstItem).find("p").css({"color":"var(--tertiary)", "text-decoration":"line-through"});
    $(firstItem).find(".check").css({"background-color":"var(--soft)", "border":"1px solid hsla(0, 0%, 100%, 0)"});
    $(firstItem).find("img").css("opacity","1");

    // On load effect
    $("body").css("opacity", "1");
});

// Determine viewport layout when resizing
window.addEventListener('resize', function(){
    w = $(window).width();

    if (w >= 1200) {
        desktopLayout();

    } else if (w < 1200 && w >= 992) {
        tabletLayout();

    } else if (w < 992 && w >= 600) {
        smallTabletLayout();
    
    } else { 
        mobileLayout();
  }
});

function mobileLayout() {
    // console.log("mobile");

    // check if coming from small tablet
    if ($("#column-2").length) {

        $("#utilities").appendTo("#column-1");
        $("#about").appendTo("#column-1");
        $("#bucketlist").appendTo("#column-1");
        $("#music").appendTo("#column-1");

        $("#column-2").remove();

        $(".empty").remove();
        $("<div class='empty'></div>").appendTo("#column-1");

    } else {
        // mobile on load
        $(".empty").remove();
        $("<div class='empty'></div>").appendTo("#column-1");
    }
};

function smallTabletLayout() {
    // console.log("small tablet");

    // check if coming from tablet
    if ($("#column-2").length) {
        
        $("#highlight").appendTo("#column-1");
        $("#credits").appendTo("#column-1");
        $("#music").appendTo("#column-2");

        $("#column-3").remove();

        $(".empty").remove();
        $("<div class='empty'></div>").appendTo("#column-1");
        $("<div class='empty'></div>").appendTo("#column-2");
        $("<div class='empty'></div>").appendTo("#column-3");


    } else {
        // if coming from mobile or small tablet on load
        $("body").append("<div id='column-2' class='column'></div>");

        $("#utilities").appendTo("#column-2");
        $("#about").appendTo("#column-2");
        $("#bucketlist").appendTo("#column-2");
        $("#music").appendTo("#column-2");

        $(".empty").remove();
        $("<div class='empty'></div>").appendTo("#column-1");
        $("<div class='empty'></div>").appendTo("#column-2");
    }
};

function tabletLayout() {
    // console.log("tablet");

    // check if coming from desktop
    if ($("#column-4").length) {
    
        $("#highlight").appendTo("#column-3");
        $("#bucketlist").appendTo("#column-2");

        $("#column-4").remove();

        $(".empty").remove();
        $("<div class='empty'></div>").appendTo("#column-1");
        $("<div class='empty'></div>").appendTo("#column-2");
        $("<div class='empty'></div>").appendTo("#column-3");
        $("<div class='empty'></div>").appendTo("#column-4"); 

    } else if ($("#column-3").length == 0) {
        // check if coming from small tablet
        $("body").append("<div id='column-3' class='column'></div>");
        
        $("#credits").appendTo("#column-3");
        $("#music").appendTo("#column-3");
        $("#highlight").appendTo("#column-3");

        $(".empty").remove();
        $("<div class='empty'></div>").appendTo("#column-1");
        $("<div class='empty'></div>").appendTo("#column-2");
        $("<div class='empty'></div>").appendTo("#column-3");
    
    } else if ($("#column-3").length == 1) {
        // if we're on tablet do nothing
    }
};

function tabletLayoutCSS() {
    // to happen on load
    $("body").append("<div id='column-2' class='column'></div>");
    $("body").append("<div id='column-3' class='column'></div>");

    $("#utilities").appendTo("#column-2");
    $("#about").appendTo("#column-2");
    $("#bucketlist").appendTo("#column-2");

    $("#credits").appendTo("#column-3");
    $("#music").appendTo("#column-3");
    $("#highlight").appendTo("#column-3");

    $("<div class='empty'></div>").appendTo("#column-1");
    $("<div class='empty'></div>").appendTo("#column-2");
    $("<div class='empty'></div>").appendTo("#column-3");
};

function desktopLayout() {
    // console.log("desktop");

    if ($("#column-4").length) {
        // if we're on desktop already - do nothing

    } else if ($("#column-2").length) {
        // if coming from tablet

        $("body").append("<div id='column-4' class='column'></div>");
    
        $("#highlight").appendTo("#column-4");
        $("#bucketlist").appendTo("#column-4");

        $(".empty").remove();
        $("<div class='empty'></div>").appendTo("#column-1");
        $("<div class='empty'></div>").appendTo("#column-2");
        $("<div class='empty'></div>").appendTo("#column-3");
        $("<div class='empty'></div>").appendTo("#column-4");

    } else {
        // desktop on load

        $("body").append("<div id='column-2' class='column'></div>");
        $("body").append("<div id='column-3' class='column'></div>");
        $("body").append("<div id='column-4' class='column'></div>");

        $("#socialmedia").appendTo("#column-1");
        $("#utilities").appendTo("#column-2");
        $("#about").appendTo("#column-2");
        
        $("#credits").appendTo("#column-3");
        $("#music").appendTo("#column-3");
    
        $("#highlight").appendTo("#column-4");
        $("#bucketlist").appendTo("#column-4");

        $("<div class='empty'></div>").appendTo("#column-1");
        $("<div class='empty'></div>").appendTo("#column-2");
        $("<div class='empty'></div>").appendTo("#column-3");
        $("<div class='empty'></div>").appendTo("#column-4");
    }
};    

$(document).ready(function() {
    // Hover effect on the credits links
    $("#credits a").hover(
        function() {
            $(this).find("img").css("opacity", ".8");
            $(this).find(".title").css("color", "#ffffff");


        }, function() {
            $(this).find("img").css("opacity", ".35");
            $(this).find(".title").css("color", "var(--primary)");
    });

    // Show the local storage value on load
    $("#intro .tag").each(function() {
        var tagId = $(this).attr("id");
        var storedValue = localStorage.getItem(tagId);
        
        if (storedValue !== null) {
            $(this).find("span").text(storedValue);
        } else {
            $(this).find("span").text(0);
        
        $(this).data("toggleState", false); 
        }
    });


    // Check if clicked on tag
    $("#intro .tag").on("click", function() {
        var toggleState = $(this).data("toggleState");
        toggleState = !toggleState;

        $(this).data("toggleState", toggleState);
        var currentValue = parseInt($(this).find("span").text());
 
        if (toggleState) {

            $(this).css({"background-color":"var(--minimal)", "border":"solid .5px var(--subtle)"});
            $(this).find("span").css("color","var(--primary)");

            var currentValue = parseInt($(this).find("span").text());
            var newValue = currentValue + 1;
            $(this).find("span").text(newValue);
            localStorage.setItem($(this).attr("id"), newValue);

        } else {

            $(this).css({"background-color":"var(--foreground)", "border":"solid .5px var(--quiet)"});
            $(this).find("span").css("color","var(--secondary)");

            var currentValue = parseInt($(this).find("span").text());
            var newValue = currentValue - 1;
            $(this).find("span").text(newValue);
            localStorage.setItem($(this).attr("id"), newValue);
         }
    });

    // Change sun-moon icon depending on hours
    var dt = new Date();
    var time = dt.getHours();
    
    if (time >= 7 && time <= 18) {
        $("#weather").find("img").attr('src','assets/sun.svg');
    } else {
        $("#weather").find("img").attr('src','assets/moon.svg');
    };


    // Check if clicked on checklist
    $("#bucketlist .checklist-item").on("click", function() {
        var toggleState2 = $(this).data("toggleState2");
        toggleState2 = !toggleState2;

        $(this).data("toggleState2", toggleState2);
        var checkClass = $(this).attr("class");
 
        if (toggleState2 && $(this).hasClass("checked"))   {

            $(this).removeClass("checked");

            $(this).find("p").css({"color":"var(--primary)", "text-decoration":"none"});
            $(this).find(".check").css({"background-color":"transparent", "border":"1px solid hsla(0, 0%, 100%, 0.12)"});
            $(this).find("img").css("opacity","0");

        } else if (toggleState2) {

            $(this).find("p").css({"color":"var(--tertiary)", "text-decoration":"line-through"});
            $(this).find(".check").css({"background-color":"var(--soft)", "border":"1px solid hsla(0, 0%, 100%, 0)"});
            $(this).find("img").css("opacity","1");
        
        } else {

            $(this).find("p").css({"color":"var(--primary)", "text-decoration":"none"});
            $(this).find(".check").css({"background-color":"transparent", "border":"1px solid hsla(0, 0%, 100%, 0.12)"});
            $(this).find("img").css("opacity","0");
         }
    });

    // Hover effect on the songs
    $(".song").hover(

        function() {
            $(this).find(".music-hover").css("opacity","1");
            $(this).find("p:first").css("color","#FFFFFF");


        }, function() {
            $(this).find(".music-hover").css("opacity","0");
            $(this).find("p:first").css("color","var(--primary)");

    });

    // Change images on click
    var currentNumber = 0;
    var lastNumber
    var maxNumber = 3;

    let leftChevron = $(".stepper").find("img").eq(0);
    let rightChevron = $(".stepper").find("img").eq(1);

    $(".dots").find(".dot").eq(currentNumber).css("background-color","var(--primary)");
    $(leftChevron).css("opacity", ".2");

    $(leftChevron).on("click", function() {
        if (currentNumber == 1) {
            currentNumber = currentNumber - 1;
            lastNumber = currentNumber + 1;

            $(leftChevron).css("opacity", ".2");

            var activeDot = $(".dots").find(".dot").eq(currentNumber);
            $(activeDot).css("background-color","var(--primary)");

            var lastDot = $(".dots").find(".dot").eq(lastNumber);
            $(lastDot).css("background-color","var(--soft)");

            $(".slides").find(".slide").eq(currentNumber).css("left","0");
            $(".slides").find(".slide").eq(lastNumber).css("left","100%");


        } else if (currentNumber > 1) {
            currentNumber = currentNumber-1;
            lastNumber = currentNumber+1;

            $(leftChevron).css("opacity", "1");
            $(rightChevron).css("opacity", "1");

            var activeDot = $(".dots").find(".dot").eq(currentNumber);
            $(activeDot).css("background-color","var(--primary)");

            var lastDot = $(".dots").find(".dot").eq(lastNumber);
            $(lastDot).css("background-color","var(--soft)");

            $(".slides").find(".slide").eq(currentNumber).css("left","0");
            $(".slides").find(".slide").eq(lastNumber).css("left","100%");

        } else {}
    });

    $(rightChevron).on("click", function() {
        var n = currentNumber + 1;

        if (n == maxNumber) {
            currentNumber = currentNumber+1;
            lastNumber = currentNumber-1;

            $(rightChevron).css("opacity", ".2");

            var activeDot = $(".dots").find(".dot").eq(currentNumber);
            $(activeDot).css("background-color","var(--primary)");
        
            var lastDot = $(".dots").find(".dot").eq(lastNumber);
            $(lastDot).css("background-color","var(--soft)");

            $(".slides").find(".slide").eq(currentNumber).css("left","0");
            $(".slides").find(".slide").eq(lastNumber).css("left","-100%");


        } else if (currentNumber < maxNumber) {
            currentNumber = currentNumber+1;
            lastNumber = currentNumber-1;

            $(rightChevron).css("opacity", "1");
            $(leftChevron).css("opacity", "1");
            
            var activeDot = $(".dots").find(".dot").eq(currentNumber);
            $(activeDot).css("background-color","var(--primary)");
        
            var lastDot = $(".dots").find(".dot").eq(lastNumber);
            $(lastDot).css("background-color","var(--soft)");

            $(".slides").find(".slide").eq(currentNumber).css("left","0");
            $(".slides").find(".slide").eq(lastNumber).css("left","-100%");
        } else {}
    });
});

