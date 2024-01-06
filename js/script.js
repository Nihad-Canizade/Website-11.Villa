// Menu Icon
function menuFunction(x) {
    x.classList.toggle("change");
}

// Menu click open navbar function
let menuIcon = document.querySelector('.menu-icon');
let forDisplayNone = document.getElementById('forDisplayNone');
let bar1 = document.querySelector('.bar1');
let bar2 = document.querySelector('.bar2');
let bar3 = document.querySelector('.bar3');
let navSection = document.querySelector('.nav-section');
let navP1 = document.querySelector('nav-p1');

menuIcon.addEventListener('click', () => {
    forDisplayNone.classList.toggle("for-display-none");
    bar1.classList.toggle("for-bgcolor");
    bar3.classList.toggle("for-bgcolor");


    if (navSection.style.display == "block") {
        navSection.style.display = "none";
    } else {
        navSection.style.display = "block";
    }
});



// Slide Show
let slideIndex = 0;
showSlides();

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000);
}


// To top button
let mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


// Section 4 JSON
let sec4Boxs = document.querySelector('.sec4-boxs');
let page = 3;
let search = document.querySelector("input[type=search]");

function getDataJson() {
    fetch('http://localhost:3000/boxs')
        .then(response => response.json())
        .then(data => {
            data.slice(page - 3, page).forEach(element => {
                sec4Boxs.innerHTML += `
                
            <div class="sec4-box">
            <i class="bi bi-heart-fill box-heart" onclick = "addFavorite(${element.id})"></i>    
            <img src="${element.image}" alt="Image">
            <p class="sec4-box-p1">${element.date}</p>
            <p class="sec4-box-p2">${element.description}</p>
            <div class = "sec4-box-btns">
            <button><a href = "./view.html?id=${element.id}">View Details</a></button>
            <button><a href = "./update.html?id=${element.id}">Update</a></button>
            <button onclick = "boxDelete(${element.id})">Delete</button>
            </div>
        </div>`
            })

            // Search Function
            search.addEventListener("input", (e) => {
                let filter = data.filter((el) => {
                    return el.description.startsWith(e.target.value);
                });
                sec4Boxs.innerHTML = "";
                filter.forEach(element => {
                    sec4Boxs.innerHTML += `
                    <div class="sec4-box">
                    <i class="bi bi-heart-fill box-heart" onclick = "addFavorite(${element.id})"></i>    
                    <img src="${element.image}" alt="Image">
                    <p class="sec4-box-p1">${element.date}</p>
                    <p class="sec4-box-p2">${element.description}</p>
                    <div class = "sec4-box-btns">
                    <button><a href = "./view.html?id=${element.id}">View Details</a></button>
                    <button><a href = "./update.html?id=${element.id}">Update</a></button>
                    <button onclick = "boxDelete(${element.id})">Delete</button>
                    </div>
                </div>`
                })
            })
        })
}
getDataJson();




// Load More function
let loadMoreBtn = document.querySelector(".loadmore-btn");
loadMoreBtn.addEventListener('click', () => {
    page += 3;
    getDataJson();
})


// Boxs delete function
function boxDelete(id) {
    axios.delete(`http://localhost:3000/boxs/${id}`)
    window.location.reload();
}


// Add to Favorties Function
function addFavorite(id) {
    axios.get('http://localhost:3000/boxs/' + id)
        .then(res => {
            axios.post('http://localhost:3000/favorites', res.data)
        })
}
