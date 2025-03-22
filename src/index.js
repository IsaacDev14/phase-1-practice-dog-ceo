console.log('%c HI', 'color: firebrick');

document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const dogImageContainer = document.getElementById("dog-image-container");
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogBreedsList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");

    let allBreeds = []; // Store all breeds globally

    // Fetch and display dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(image => {
                const img = document.createElement("img");
                img.src = image;
                img.alt = "dog";
                img.style.width = "200px"; // Adjust size
                img.style.margin = "10px";
                dogImageContainer.appendChild(img);
            });
        })
        .catch(error => console.log(error));

    // Fetch and store dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message);
            displayBreeds(allBreeds); // Display all breeds initially
        })
        .catch(error => console.error("Error fetching breeds:", error));

    // Function to display breeds
    function displayBreeds(breeds) {
        dogBreedsList.innerHTML = ""; // Clear previous breeds
        breeds.forEach(breed => {
            const li = document.createElement("li");
            li.textContent = breed;

            // Change text color on click
            li.addEventListener("click", () => {
                li.style.color = "blue"; // Change to any color you prefer
            });

            dogBreedsList.appendChild(li);
        });
    }

    // Filter breeds based on dropdown selection
    breedDropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        displayBreeds(filteredBreeds);
    });
});
