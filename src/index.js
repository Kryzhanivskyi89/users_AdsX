import './style.css';

let usersData = []; 
function createCard(data) {
    const usersList = document.getElementById("users-list");
    usersList.innerHTML = "";
    const markup = data.map(({ id, name, username, email, address, phone, website, company }) => {
        return `
            <li class="card" key=${id}>       
                <div class="user-header">
                    <h2 class="user-title">${name}</h3>
                    <p class="username">${username}</p>
                </div>
                <div class="user-body">
                    <p>${email}</p>
                    <p>${phone}</p>
                    <a href="${website}" target="_blank">${website}</a>
                    <div class="address">
                        <h3>Address</h3>
                        <p>${address.city} ${address.zipcode}</p>     
                        <p>${address.street} ${address.suite}</p>
                        <p><strong>lat:</strong> ${address.geo.lat}</p>
                        <p><strong>lng:</strong> ${address.geo.lng}</p>
                    </div>
                    <div class="company">
                        <h3>Company</h3>
                        <p><strong>Name:</strong> ${company.name}</p>
                        <p><strong>Catchphrase:</strong> ${company.catchPhrase}</p>
                        <p><strong>BS:</strong> ${company.bs}</p>
                    </div>
                </div>
            </li>        
        `;
    }).join("");

    usersList.insertAdjacentHTML("beforeend", markup);  
}

function filterUsers() {
    const nameFilter = document.getElementById("nameFilter").value.toLowerCase();
    const usernameFilter = document.getElementById("usernameFilter").value.toLowerCase();
    const cityFilter = document.getElementById("cityFilter").value.toLowerCase();

    const filteredData = usersData.filter(user => {
        return (
            user.name.toLowerCase().includes(nameFilter) &&
            user.username.toLowerCase().includes(usernameFilter) &&
            user.address.city.toLowerCase().includes(cityFilter)
        );
    });
    createCard(filteredData); 
}

document.addEventListener("DOMContentLoaded", function () {
    fetch(`https://jsonplaceholder.typicode.com/users`)
        .then((response) => response.json())
        .then((data) => {
            usersData = data; 
            createCard(usersData);
        })
        .catch((error) =>
            console.error("Error loading users:", error)
        );
    document.getElementById("nameFilter").addEventListener("input", filterUsers);
    document.getElementById("usernameFilter").addEventListener("input", filterUsers);
    document.getElementById("cityFilter").addEventListener("input", filterUsers);
});