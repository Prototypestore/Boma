document.addEventListener("DOMContentLoaded", () => {
  const mediaContainer = document.getElementById("media"); // your footer div for icons

  fetch("icon.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch icon.json");
      }
      return response.json();
    })
    .then(data => {
      data.icons.forEach(icon => {
        const link = document.createElement("a");
        link.href = "#"; // replace with actual URLs if needed
        link.setAttribute("aria-label", icon.alt);

        const img = document.createElement("img");
        img.src = icon.src;
        img.alt = icon.alt;
        img.width = 24; // consistent size
        img.height = 24;

        link.appendChild(img);
        mediaContainer.appendChild(link);
      });
    })
    .catch(error => {
      console.error("Error loading icons:", error);
      mediaContainer.innerHTML = "<p>Icons unavailable</p>";
    });
});
