async function callAPI(place) {
  const request = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=cf7bf5f0bc8c4500b6d145918232408&q=${place}`
  );
  const data = await request.json();
  const data_to_display = dataToDisplay(data);
  console.log(data_to_display.get("country"));
  return data_to_display;
}

function dataToDisplay(data) {
  const newData = new Map([
    ["country", data["location"]["country"]],
    ["region", data["location"]["region"]],
    ["city", data["location"]["name"]],
    ["temp", data["current"]["temp_c"]],
    ["condition", data["current"]["condition"]["text"]],
    ["wind", data["current"]["wind_kph"]],
  ]);
  return newData;
}

function displayData(data) {
  document.querySelector(".country").textContent = data.get("country");
  document.querySelector(".region").textContent = data.get("region");
  document.querySelector(".city").textContent = data.get("city");
  document.querySelector(".condition").textContent = data.get("condition");
  document.querySelector(".temp").textContent = "Temperature of " + data.get("temp") + " Celsius";
  document.querySelector(".wind").textContent = "Wind of " + data.get("wind") + "kph";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const place = document.getElementById("place").value;
    callAPI(place).then((data) => displayData(data));
  });
});
