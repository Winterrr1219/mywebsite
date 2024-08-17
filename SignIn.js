//Pop up sign in
document.addEventListener("DOMContentLoaded", function () {
    // Get the modal
    var modal = document.getElementById("signInModal");

    // Get the button that opens the modal
    var btn = document.getElementById("signInBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    

    // Toggle between login and register forms
    document.getElementById("showRegister").onclick = function () {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("registerContainer").style.display = "block";
    }

    document.getElementById("showLogin").onclick = function () {
        document.getElementById("registerContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
    }

});



//Cookie
const loginContainer = document.getElementById('loginContainer');
const registerContainer = document.getElementById('registerContainer');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

showRegister.addEventListener('click', function(e) {
    e.preventDefault();
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
});

showLogin.addEventListener('click', function(e) {
    e.preventDefault();
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}


function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function updateNavBar() {
    const username = localStorage.getItem('username');
    const userMenuItem = document.getElementById('userMenuItem');
    
    if (username) {
        userMenuItem.innerHTML = `
            <button id="usernameBtn" class="btn btn-outline-light rounded-pill px-4 py-2" style="font-size: 14px;">
                ${username}
            </button>
        `;
        
        // Add event listener for username click
        document.getElementById('usernameBtn').addEventListener('click', confirmLogout);
    } else {
        userMenuItem.innerHTML = `
            <button id="signInBtn" class="btn btn-outline-light rounded-pill px-4 py-2" style="font-size: 14px;">Sign In</button>
        `;
        
        // Add event listener for sign in
        document.getElementById('signInBtn').addEventListener('click', function() {
            document.getElementById('signInModal').style.display = 'block';
        });
    }
}

function confirmLogout() {
    if (confirm('Are you sure you want to logout?')) {
        logout();
    }
}

function logout() {
    localStorage.removeItem('username');
    updateNavBar();
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const storedEmail = getCookie('email');
    const storedPassword = getCookie('password');

    if (email === storedEmail && password === storedPassword) {
        const username = getCookie('username') || 'User'; // Get username from cookie or use 'User' as default
        localStorage.setItem('username', username);

        // Close the modal
        document.getElementById('signInModal').style.display = 'none';

        // Update the navigation bar
        updateNavBar();
    } else {
        alert('Incorrect email or password. Please try again.');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    setCookie('email', email, 30);
    setCookie('password', password, 30);
    setCookie('username', name, 30); // Store username in cookie
    alert('Registration successful!');

    // Clear the input fields
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('confirmPassword').value = '';

    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});



// Call updateNavBar on page load
window.addEventListener('load', updateNavBar);