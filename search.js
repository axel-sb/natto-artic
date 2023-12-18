let artworkImage = document.querySelector(".artwork-image");

let searchInput = document.querySelector("#site-search");
let q;
let timeout = null;

searchInput.addEventListener("keyup", function () {
  clearTimeout(timeout);

  timeout = setTimeout(function () {
    q = searchInput.value.toLowerCase();
    searchArtwork();
    console.log("q: ", q);
  }, 1500); // Adjust delay as needed
});

function searchArtwork(query) {
  fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${q}&fields=title,alt_text,date_qualifier_title,date_display,description,medium_display,dimensions,artwork_type_title,artist_title,category_titles,style_title,classification_titles,material_titles,technique_titles,theme_titles,image_id&limit=3`
  )
    .then((r) => r.json())
    .then((data) => {
      console.log("data: ", data);
      const artworks = data.data;
      console.log("artworks: ", artworks);
      const artwork = artworks[Math.floor(Math.random() * artworks.length)];
      console.log("artwork: ", artwork);
      const nextArtwork = artworks[2];
      console.log("nextArtwork: ", nextArtwork);
      const nextSrc = `https://www.artic.edu/iiif/2/${nextArtwork.image_id}/full/843,/0/default.jpg`;
      const src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
      artworkImage.innerHTML = `
      <button onclick="next()">Next</button>
      <img src="${src}"  ${(onclick = "location.reload()")} />
       
          <div>
          <h3>${artwork.artist_title} - ${artwork.title}</h3>
          <h4>${artwork.date_display}</h4>
          <details>
          <summary>Details</summary>
          ${artwork.description}
          <p>${artwork.medium_display}<p>
          <p>${artwork.dimensions}<p>          
          <p>Artwork_type: ${artwork.artwork_type_title}<p>          
          <p>Category: ${artwork.category_titles}<p>
          <p>Style: ${artwork.style_title}<p>
          <p>Classification: ${artwork.classification_titles}<p>
          <p>Material: ${artwork.material_titles}<p>
          <p>Technique: ${artwork.technique_titles}<p>
          <p>Theme: ${artwork.theme_titles}</p> 
          </details>
          </div>
          `;
    });
}

