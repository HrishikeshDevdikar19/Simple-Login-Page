document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in (you may implement this based on your session handling or token validation)
    const isLoggedIn = false;  // Replace with your logic to check if user is logged in

    if (isLoggedIn) {
        showLoggedInPage();
    } else {
        showLoginPage();
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const storedUserData = data;

            if (email === storedUserData.email && password === storedUserData.password) {
                document.getElementById('message').textContent = "Login successful!";
                document.getElementById('message').style.color = "green";
                showLoggedInPage();
              
            } else {
                document.getElementById('message').textContent = "Invalid email or password.";
                document.getElementById('message').style.color = "red";
            }
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
            document.getElementById('message').textContent = "Error loading user data. Please try again later.";
        });
});

document.getElementById('signUpLink').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default link behavior (e.g., page refresh)

    clearMessage();
    document.getElementById('loginForm').style.display = 'none';  // Hide login form
    document.getElementById('signUpForm').style.display = 'block';  // Show sign-up form
});

document.getElementById('loginLink').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default link behavior (e.g., page refresh)

    clearMessage();
    document.getElementById('signUpForm').style.display = 'none';  // Hide sign-up form
    document.getElementById('loginForm').style.display = 'block';  // Show login form
});

document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate password (example: 8-16 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById('message').textContent = "Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        document.getElementById('message').style.color = "red";
        clearPasswords();
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('message').textContent = "Passwords do not match.";
        document.getElementById('message').style.color = "red";
        clearPasswords();
        return;
    }

 
    document.getElementById('message').textContent = "Sign-up successful! You can now log in.";
    document.getElementById('message').style.color = "green";
    clearForm('signUpForm');
    showLoggedInPage();

});

document.getElementById('logoutButton').addEventListener('click', function() {
   
    showLoginPage();
    document.location.reload()
});

function clearMessage() {
    document.getElementById('message').textContent = "";
}

function clearPasswords() {
    document.getElementById('signUpPassword').value = "";
    document.getElementById('confirmPassword').value = "";
}

function clearForm(formId) {
    document.getElementById(formId).reset();
    clearMessage();
}

function showLoggedInPage() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('leftContainer').style.display = 'none';
    document.getElementById('rightContainer').style.display = 'none';   
    document.getElementById('loggedInContainer').style.display = 'block';  
}

function showLoginPage() {
    document.getElementById('loginContainer').style.display = 'block'; 

    document.getElementById('loggedInContainer').style.display = 'none'; 
    document.getElementById('leftContainer').style.display = 'block';
    document.getElementById('rightContainer').style.display = 'block';  

}
