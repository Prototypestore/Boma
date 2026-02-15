document.addEventListener("DOMContentLoaded", () => {
  fetch("Info.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch Info.json");
      }
      return response.json();
    })
    .then(data => {
      const container = document.getElementById("Info");

      const heading = document.createElement("h1");
      heading.textContent = "Welcome to The Boma";

      const paragraph = document.createElement("p");
      paragraph.textContent = "With its glass-enclosed restaurant, delicious South African buffet food, large outdoor lawn and crackling bonfires under a fairy-lit forest courtyard, The Boma is the perfect place to celebrate any special event.";

      container.appendChild(heading);
      container.appendChild(paragraph);

      console.log(data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
});
