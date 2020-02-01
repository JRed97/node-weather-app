console.log("Client side javascript is loaded!");

const weather_form = document.getElementsByClassName("weather_form")[0];
const weather_btn = document.getElementById("submit_btn");
const search = document.getElementById("weather_input");
const success_p = document.getElementById("success_msg");
const error_p = document.getElementById("error_msg");

weather_form.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    success_p.innerHTML = "Loading...";
    error_p.innerHTML = "";

    if(location !== "" && typeof location !== "undefined")
    {
        fetch("/weather?address=" + location).then((response) => {
            response.json().then((data) => {
                if(data.error)
                {
                    success_p.innerHTML = "";
                    error_p.innerHTML = data.error;
                }
                else
                {
                    success_p.innerHTML = data.location + "<br><br>" + data.forecast + " It is currently " + data.temp + " degrees out." + " There is a " + data.precipitation + "% chance of rain.";
                }
            });
        });
    }
    else
    {
        console.log("please enter a location!");
    }
});
