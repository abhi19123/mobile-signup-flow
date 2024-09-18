// Function for handling Google Login
window.onload = function () {
    google.accounts.id.initialize({
        client_id: '829760884709-l7vbjlkakf57vkkqgb022qjv6lef7gl5.apps.googleusercontent.com', // Replace with your actual Google Client ID
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.querySelector('.google-login'),
        { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt(); // Automatically display the One-tap sign-in
};

// Handle the response from Google sign-in
function handleCredentialResponse(response) {
    console.log("Google ID Token: " + response.credential);
    
    // Send the token to the backend for verification
    fetch('http://localhost:5000/verifyGoogleToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: response.credential
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log('Verification response from server:', data);
        alert(`Welcome, ${data.name}!`);
    })
    .catch(err => console.error('Error verifying token:', err));
}
