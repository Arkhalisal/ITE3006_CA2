import { cityData } from "./constant.js";

export const initializeHomePage = () => {
  const contentCard = [
    {
      image: "../public/icons/location.png",
      title: "50+",
      description: "Destinations",
    },
    {
      image: "../public/icons/people.png",
      title: "2000+",
      description: "Members",
    },
    {
      image: "../public/icons/calendar.png",
      title: "100+",
      description: "Guide Monthly",
    },
  ];

  const infoCardContainer = document.getElementById("info-cards-container");

  contentCard.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("info-card");

    const imageElement = document.createElement("img");
    imageElement.classList.add("info-card-image");
    imageElement.src = card.image;
    imageElement.alt = card.description;

    const titleElement = document.createElement("h3");
    titleElement.classList.add("info-card-title");
    titleElement.textContent = card.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("info-card-description");
    descriptionElement.textContent = card.description;

    cardElement.appendChild(imageElement);
    cardElement.appendChild(titleElement);
    cardElement.appendChild(descriptionElement);

    infoCardContainer.appendChild(cardElement);
  });

  const cityCardContainer = document.getElementById("popular-destinations-container");

  cityData.forEach((city) => {
    const cityCard = document.createElement("div");
    cityCard.classList.add("city-card");

    const cityImageContainer = document.createElement("div");
    cityImageContainer.classList.add("city-card-image-container");

    const cityImage = document.createElement("img");
    cityImage.classList.add("city-card-image");
    cityImage.src = city.image;
    cityImage.alt = city.name;

    const cityTours = document.createElement("p");
    cityTours.classList.add("city-card-tours");
    cityTours.textContent = `${city.tours} tours`;

    const cityInfo = document.createElement("div");
    cityInfo.classList.add("city-card-info");

    const cityName = document.createElement("p");
    cityName.classList.add("city-card-name");
    cityName.textContent = city.name;

    const cityCountry = document.createElement("p");
    cityCountry.classList.add("city-card-country");
    cityCountry.textContent = city.country;

    const cityDescription = document.createElement("p");
    cityDescription.classList.add("city-card-description");
    cityDescription.textContent = city.description;

    cityInfo.appendChild(cityName);
    cityInfo.appendChild(cityCountry);
    cityInfo.appendChild(cityDescription);

    cityImageContainer.appendChild(cityImage);
    cityCard.appendChild(cityImageContainer);
    cityCard.appendChild(cityInfo);
    cityCard.appendChild(cityTours);

    cityCard.addEventListener("click", () => {
      window.location.href = `#/forum?q=${encodeURIComponent(city.name)}`;
    });

    cityCardContainer.appendChild(cityCard);
  });
};
