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
        fetch("http://127.0.0.1:3000/weather?address=" + location).then((response) => {
            response.json().then((data) => {
                if(data.error)
                {
                    success_p.innerHTML = "";
                    error_p.innerHTML = data.error;
                }
                else
                {
                    success_p.innerHTML = data.forecast;
                }
            });
        });
    }
    else
    {
        console.log("please enter a location!");
    }
});
