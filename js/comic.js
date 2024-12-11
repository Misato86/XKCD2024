var maxComic = 0; // Högsta serienumret
var currentComic = 0; // Nuvarande serienummer

// Körs när sidan laddas
window.onload = function () {
  // Hämta den senaste serien
  getComic("latest");

  // Lägg till funktionalitet för navigeringsknappar
  document.getElementById("prev-btn").onclick = function () {
    if (currentComic > 1) {
      getComic(currentComic - 1);
    }
  };

  document.getElementById("next-btn").onclick = function () {
    if (currentComic < maxComic) {
      getComic(currentComic + 1);
    }
  };
};

// Funktion för att hämta serie från XKCD API
function getComic(which) {
  fetch("https://xkcd.vercel.app/?comic=" + which)
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Failed to load comic");
      }
    })
    .then(function (data) {
      // Uppdatera maxComic om det behövs
      if (maxComic < data.num) {
        maxComic = data.num;
      }
      // Uppdatera currentComic
      currentComic = data.num;

      // Skicka JSON-data till DOM
      appendComic(data);
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
}

// Funktion för att visa serien i DOM
function appendComic(data) {
  // Uppdatera serie-titeln
  document.getElementById("comic-title").textContent = data.safe_title;

  // Uppdatera serie-bilden
  var img = document.getElementById("comic-image");
  img.src = data.img;
  img.alt = data.alt;

  // Uppdatera serie-beskrivning (alt-text)
  document.getElementById("comic-alt").textContent = data.alt;

  var formattedDate = `${data.year}-${data.month.padStart(2, '0')}-${data.day.padStart(2, '0')}`;
  document.getElementById("comic-date").textContent = `Published on: ${formattedDate}`;
}
