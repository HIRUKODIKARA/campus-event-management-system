function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    if (!name || !email || !password || !role) {
        alert("Please fill all fields!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    const exists = users.some(u => u.email === email);
    if (exists) {
        alert("Email already registered!");
        return;
    }

    const user = { name, email, password, role };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    window.location.href = "login.html";
}


    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login Successful!");
        if (user.role === "Admin") {
            window.location.href = "admin/dashboard.html";
        } else {
            window.location.href = "student/dashboard.html";
        }
    } else {
        alert("Invalid credentials!");
  }



function registerEvent(eventName) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Please login first!");
        return;
    }

    const key = currentUser.email + "_events";
    let registeredEvents = JSON.parse(localStorage.getItem(key)) || [];

    if (!registeredEvents.includes(eventName)) {
        registeredEvents.push(eventName);
        localStorage.setItem(key, JSON.stringify(registeredEvents));
        alert("Event Registered Successfully!");
        loadStudentEvents(); // Refresh student dashboard
    } else {
        alert("You already registered for this event!");
    }
}

function loadStudentEvents() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const key = currentUser.email + "_events";
    const registeredEvents = JSON.parse(localStorage.getItem(key)) || [];
    const container = document.getElementById("myEvents");

    container.innerHTML = "";

    if (registeredEvents.length === 0) {
        container.innerHTML = "<p style='text-align:center; font-size:16px;'>No events registered yet.</p>";
        return;
    }

    registeredEvents.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
            <h3>${event}</h3>
            <button class="btn" onclick="cancelEvent('${event}')">Cancel Registration</button>
        `;
        container.appendChild(card);
    });
}
function cancelEvent(eventName) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const key = currentUser.email + "_events";
    let registeredEvents = JSON.parse(localStorage.getItem(key)) || [];

    registeredEvents = registeredEvents.filter(e => e !== eventName);
    localStorage.setItem(key, JSON.stringify(registeredEvents));

    loadStudentEvents();
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html";
}