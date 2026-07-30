const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit",async function(e){

e.preventDefault();

const user={

fullName:document.getElementById("fullName").value,

email:document.getElementById("email").value,

password:document.getElementById("password").value,

phone:document.getElementById("phone").value,

role:"USER"

};

const response=await fetch("http://localhost:8080/api/users/register",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(user)

});

if(response.ok){

showToast("Registration Successful");

window.location="login.html";

}else{

const msg=await response.text();

alert(msg);

}

});

}
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const loginData = {

            email: document.getElementById("email").value,

            password: document.getElementById("password").value

        };

        const response = await fetch("http://localhost:8080/api/users/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(loginData)

        });

        if (response.ok) {

            const user = await response.json();

            localStorage.setItem("user", JSON.stringify(user));

            showToast("Login Successful");

            window.location = "dashboard.html";

        } else {

            showToast("Invalid Email or Password", "error");

        }

    });

}
const welcomeText = document.getElementById("welcomeText");

if (welcomeText) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        window.location = "login.html";

    } else {

        welcomeText.innerHTML = "Welcome, " + user.fullName + " 👋";

    }

}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("user");

        window.location = "login.html";

    });

}
const itemForm = document.getElementById("itemForm");

if(itemForm){

itemForm.addEventListener("submit",async function(e){

e.preventDefault();

const user=JSON.parse(localStorage.getItem("user"));

const imageFile = document.getElementById("imageFile").files[0];

let imageName = "";

if (imageFile) {

    const formData = new FormData();

    formData.append("file", imageFile);

    const uploadResponse = await fetch(
        "http://localhost:8080/api/images/upload",
        {
            method: "POST",
            body: formData
        }
    );

    imageName = await uploadResponse.text();
}

const item = {

    itemName: document.getElementById("itemName").value,

    category: document.getElementById("category").value,

    description: document.getElementById("description").value,

    location: document.getElementById("location").value,

    dateLost: document.getElementById("dateLost").value,

    imageUrl: imageName,

    reportedBy: user.fullName,

    status: "LOST"

};

const response=await fetch("http://localhost:8080/api/lost-items",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(item)

});

if(response.ok){

showToast("Item Reported Successfully");

window.location="lost-items.html";

}else{

alert("Failed to report item");

}

});

}
const itemsContainer = document.getElementById("itemsContainer");

if (itemsContainer) {

    loadItems();

}

let allItems = [];

async function loadItems() {

    const response = await fetch("http://localhost:8080/api/lost-items");

    allItems = await response.json();

    displayItems(allItems);

}

function displayItems(items) {

    itemsContainer.innerHTML = "";

    items.forEach(item => {

        const deleteButton = canDelete(item);

        itemsContainer.innerHTML += `

        <div class="card">

            <div class="image-box">

    <img
        src="http://localhost:8080/uploads/${item.imageUrl}"
        class="item-image"
        alt="${item.itemName}"
    >

</div>

            <h3>${item.itemName}</h3>

            <p><b>Category:</b> ${item.category}</p>

            <p><b>Location:</b> ${item.location}</p>

            <p><b>Date:</b> ${item.dateLost}</p>

            <p>${item.description}</p>

            <p><b>Reported By:</b> ${item.reportedBy}</p>

            <p>
                <b>Status:</b>
                <span class="${
                    item.status === "FOUND"
                        ? "status-found"
                        : "status-lost"
                }">
                    ${item.status}
                </span>
            </p>

            ${item.status === "LOST"
    ? `
        <button onclick="claimItem(${item.id})">
            Claim
        </button>
      `
    : `
        <button disabled
                style="background:green;color:white;">
            Already Claimed
        </button>
      `
}

            ${deleteButton}

        </div>

        `;
    });

}
function canDelete(item) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return "";

    if (user.role === "ADMIN" || user.fullName === item.reportedBy) {

        return `
            <button class="delete-btn"
                onclick="deleteItem(${item.id})">
                Delete
            </button>
        `;
    }

    return "";
}

async function deleteItem(id){

    if(!confirm("Delete this item?")){

        return;

    }

    const response = await fetch("http://localhost:8080/api/lost-items/" + id,{

        method:"DELETE"

    });

    if(response.ok){

        showToast("Item Deleted Successfully");

        loadItems();

    }

}
const searchBox=document.getElementById("searchBox");

if(searchBox){

searchBox.addEventListener("keyup", filterItems);

}
const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", filterItems);

}

function filterItems() {

    const searchText = searchBox.value.toLowerCase();

    const category = categoryFilter.value;

    let filtered = allItems.filter(item =>
        item.itemName.toLowerCase().includes(searchText)
    );

    if (category !== "All") {

        filtered = filtered.filter(item =>
            item.category === category
        );

    }

    displayItems(filtered);

}
async function claimItem(itemId) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please login first.");
        return;
    }

    const item = allItems.find(i => i.id === itemId);

    if(item && item.status === "FOUND"){
        alert("This item has already been claimed.");
        return;
    }

    const claim = {

        claimantName: user.fullName,

        claimantEmail: user.email

    };

    const response = await fetch(
        "http://localhost:8080/api/claims/" + itemId,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(claim)
        }
    );

    if (response.ok) {

        showToast("Claim Submitted Successfully");

    } else {

        alert("Failed to submit claim.");

    }

}
const claimsContainer = document.getElementById("claimsContainer");

if (claimsContainer) {
    loadClaims();
}

async function loadClaims() {

    const response = await fetch("http://localhost:8080/api/claims");

    const claims = await response.json();

    claimsContainer.innerHTML = "";

    claims.forEach(claim => {

        claimsContainer.innerHTML += `

        <div class="card">

            <h3>${claim.claimantName}</h3>

            <p>Email: ${claim.claimantEmail}</p>

            <p>Message: ${claim.message}</p>

            <p>Status:
                <b>${claim.status}</b>
            </p>

            <button onclick="approveClaim(${claim.id})">
                Approve
            </button>

            <button onclick="rejectClaim(${claim.id})">
                Reject
            </button>

        </div>

        `;

    });

}
async function approveClaim(id){

    const response = await fetch(
        "http://localhost:8080/api/claims/" + id + "/approve",
        {
            method:"PUT"
        }
    );

    if(response.ok){

        alert("Claim Approved");

        loadClaims();

    }

}
async function rejectClaim(id){

    const response = await fetch(
        "http://localhost:8080/api/claims/" + id + "/reject",
        {
            method:"PUT"
        }
    );

    if(response.ok){

        alert("Claim Rejected");

        loadClaims();

    }

}
const recentItems = document.getElementById("recentItems");

if(recentItems){

    loadRecentItems();

}

async function loadRecentItems(){

    const response = await fetch("http://localhost:8080/api/lost-items");

    const items = await response.json();

    const latest = items.slice(-5).reverse();

    recentItems.innerHTML = "";

    latest.forEach(item=>{

        recentItems.innerHTML += `

        <div class="recent-card">

            <img src="http://localhost:8080/uploads/${item.imageUrl}">

            <h3>${item.itemName}</h3>

            <p>${item.location}</p>

            <p>${item.dateLost}</p>

        </div>

        `;

    });

}
const totalItems = document.getElementById("totalItems");

if (totalItems) {
    loadDashboardStats();
}

async function loadDashboardStats() {

    const response = await fetch("http://localhost:8080/api/lost-items");

    const items = await response.json();

    document.getElementById("totalItems").innerText = items.length;

    document.getElementById("lostItems").innerText =
        items.filter(item => item.status === "LOST").length;

    document.getElementById("foundItems").innerText =
        items.filter(item => item.status === "FOUND").length;

}
const myItemsContainer = document.getElementById("myItemsContainer");

if (myItemsContainer) {

    loadMyItems();

}

async function loadMyItems() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        window.location = "login.html";

        return;

    }

    const response = await fetch("http://localhost:8080/api/lost-items");

    const items = await response.json();

    const myItems = items.filter(item =>
        item.reportedBy === user.fullName
    );

    displayMyItems(myItems);

}

function displayMyItems(items) {

    myItemsContainer.innerHTML = "";

    if (items.length === 0) {

        myItemsContainer.innerHTML = `
            <h3 style="text-align:center">
                You haven't reported any items yet.
            </h3>
        `;

        return;

    }

    items.forEach(item => {

        myItemsContainer.innerHTML += `

        <div class="card">

            <div class="image-box">

                <img
                    src="http://localhost:8080/uploads/${item.imageUrl}"
                    class="item-image"
                    alt="${item.itemName}"
                >

            </div>

            <h3>${item.itemName}</h3>

            <p><b>Category:</b> ${item.category}</p>

            <p><b>Location:</b> ${item.location}</p>

            <p><b>Date:</b> ${item.dateLost}</p>

            <p>${item.description}</p>

            <p><b>Status:</b>
                <span class="${
                    item.status === "FOUND"
                        ? "status-found"
                        : "status-lost"
                }">
                    ${item.status}
                </span>
            </p>

            <button
                class="delete-btn"
                onclick="deleteItem(${item.id})">
                Delete
            </button>

        </div>

        `;

    });

}