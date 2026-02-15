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
      container.appendChild(gallery);

      // Track expanded/collapsed state
      let expanded = false;

      // Function to render gallery
      function renderGallery() {
        gallery.innerHTML = ""; // Clear existing

        // Show first 7 images always
        for (let i = 0; i < 7; i++) {
          const imgWrapper = createImgWrapper(data.gallery[i]);
          gallery.appendChild(imgWrapper);
        }

        // Handle 8th image
        const imgWrapper8 = createImgWrapper(data.gallery[7]);
        const overlay = document.createElement("div");
        overlay.className = "overlay";

        if (!expanded) {
          overlay.textContent = `+${data.gallery.length - 8}`; // +4
        } else {
          overlay.textContent = "Show less";
        }

        imgWrapper8.appendChild(overlay);

        imgWrapper8.addEventListener("click", () => {
          expanded = !expanded;
          renderGallery(); // Re-render
        });

        // If expanded, show extra 4 images BEFORE the 8th image
        if (expanded) {
          for (let i = 8; i < data.gallery.length; i++) {
            const extraWrapper = createImgWrapper(data.gallery[i]);
            gallery.appendChild(extraWrapper);
          }
        }

        // Add the 8th image last
        gallery.appendChild(imgWrapper8);
      }

      // Helper function to create image wrapper
      function createImgWrapper(imgData) {
        const wrapper = document.createElement("div");
        wrapper.className = "img-wrapper";

        const img = document.createElement("img");
        img.src = imgData.src;
        img.alt = imgData.alt;
        img.loading = "lazy";

        wrapper.appendChild(img);
        return wrapper;
      }

      // Initial render
      renderGallery();
    })
    .catch(error => {
      console.error("Error loading gallery:", error);
      const container = document.getElementById("Info");
      container.innerHTML = "<p>Gallery unavailable at the moment.</p>";
    });
});
