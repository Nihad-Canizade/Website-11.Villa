// Add Favorite Function
let id = new URLSearchParams(window.location.search).get("id");
let favorites = document.querySelector(".sec-boxs");

function forFavorites(){
fetch('http://localhost:3000/favorites')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            favorites.innerHTML += `
    <div class="sec-box">
    <i class="bi bi-heart-fill"></i>
    <img src="${element.image}" alt="Image">
    <div class="sec-box-p1">${element.date}</div>
    <div class="sec-box-p2">${element.description}</div>
    <button class ="rmv-fav-btn" onclick= "deleteItem(${element.id})">Remove from favorites</button>
 </div>
    `
        })
    })
}

forFavorites();


// Delete Favorite Function
let rmvBtn = document.querySelector(".rmv-fav-btn");

const deleteItem = (id) => {
    axios.delete('http://localhost:3000/favorites/' + id)
        .then(res => {
            console.log(res.data);
            window.location.reload();
        })
}