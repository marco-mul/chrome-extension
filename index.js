fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature",
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `📸 ${data.user.name}`;
  })
  .catch((err) => {
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
    document.getElementById("author").textContent = `By: Dodi Achmad`;
  });

setTimeout(() => {
  fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("joke: ", data);
      document.getElementById("quote").innerHTML = `
    <span class="quote-title">You're in for a joke</span>
    <p>${data.joke.charAt(0).toUpperCase() + data.joke.slice(1)}</p>
    `;
    })
    .catch((err) => {
      document.getElementById("quote").innerHTML = `
    <span class="quote-title">You're in for a joke</span>
    <p>Or are you?</p>`;
    });
}, 3000);

fetch("https://api.frankfurter.dev/v2/rates?base=EUR&quotes=USD,GBP,CHF")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    console.log("currencies: ", data);
    document.getElementById("crypto-top").innerHTML = `
            <img src="currency-compare.svg" alt="EUR vs USD, GBP, CHF" />         
        `;
    document.getElementById("crypto").innerHTML += `
            <p>${data[0].base} vs</p>
            <p>${data[2].quote}: ${data[2].rate}</p>
            <p>${data[1].quote}: ${data[1].rate}</p>
            <p>${data[0].quote}: ${data[0].rate}</p>
        `;
  })
  .catch((err) => console.error(err));

fetch(
  `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${import.meta.env.VITE_NYT_API_KEY}`,
)
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    console.log("articles: ",data);
    function renderStory() {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      document.getElementById("story").innerHTML = `
            <h2>${data.results[randomIndex].title}</h2>
            <p>${data.results[randomIndex].abstract}</p>
            <button id="story-link"><img id="nyt-logo" src="nyt-logo.png" alt="NYT" /> Read More</button>
        `;
      document.getElementById("story-link").addEventListener("click", () => {
        window.open(data.results[randomIndex].url, "_blank");
      });
    }
    renderStory();
    setInterval(renderStory, 15000);
  })
  .catch((err) => console.error(err));

function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "fr-FR",
    { timeStyle: "short" },
  );
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition(
  (position) => {
    fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`,
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Weather data not available");
        }
        return res.json();
      })
      .then((data) => {
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}ºC</p>
                <p class="weather-city">${data.name}</p>
            `;
      })
      .catch((err) => console.error(err));
  },
  (err) => console.error("Geolocation failed:", err.code, err.message),
);
