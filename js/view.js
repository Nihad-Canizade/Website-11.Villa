let id = new URLSearchParams(window.location.search).get("id");
let sec4Boxs = document.querySelector('.sec4-boxs');


fetch(`http://localhost:3000/boxs/${id}`)
    .then(res => res.json())
    .then(data => {
        sec4Boxs.innerHTML += `
    <div class="sec4-box">
        <img src="${data.image}" alt="image">
        <p class="sec4-box-p1">${data.date}</p>
        <p class="sec4-box-p2">${data.description}</p>
    </div>
    `
    });