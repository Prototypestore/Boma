document.addEventListener("DOMContentLoaded", () => {
  fetch("Info.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch Info.json");
      return response.json();
    })
    .then(data => {
      const container = document.getElementById("Info");

      // Heading
      const heading = document.createElement("h1");
      heading.textContent = "Welcome to The Boma";

      // Paragraph
      const paragraph = document.createElement("p");
      paragraph.textContent =
        "With its glass-enclosed restaurant, delicious South African buffet food, large outdoor lawn and crackling bonfires under a fairy-lit forest courtyard, The Boma is the perfect place to celebrate any special event.";

      container.appendChild(heading);
      container.appendChild(paragraph);

      // Gallery container
      const gallery = document.createElement("div");
      gallery.className = "gallery";

      // Show first 8 images
      data.gallery.forEach((imgData, index) => {
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "img-wrapper";

        const img = document.createElement("img");
        img.src = imgData.src;
        img.alt = imgData.alt;
        img.loading = "lazy";

        imgWrapper.appendChild(img);

        // If this is the 8th image, add overlay for +4
        if (index === 7 && data.gallery.length > 8) {
          const overlay = document.createElement("div");
          overlay.className = "overlay";
          overlay.textContent = `+${data.gallery.length - 8}`;
          imgWrapper.appendChild(overlay);

          // Click to reveal remaining images
          imgWrapper.style.cursor = "pointer";
          imgWrapper.addEventListener("click", () => {
            // Remove overlay
            overlay.remove();

            // Append remaining images
            for (let i = 8; i < data.gallery.length; i++) {
              const extraWrapper = document.createElement("div");
              extraWrapper.className = "img-wrapper";

              const extraImg = document.createElement("img");
              extraImg.src = data.gallery[i].src;
              extraImg.alt = data.gallery[i].alt;
              extraImg.loading = "lazy";

              extraWrapper.appendChild(extraImg);
              gallery.appendChild(extraWrapper);
            }
          });
        }

        gallery.appendChild(imgWrapper);
      });

      container.appendChild(gallery);
    })
    .catch(error => {
      console.error("Error:", error);
      container.innerHTML = "<p>Gallery unavailable at the moment.</p>";
    });
});
