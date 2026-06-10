document
.getElementById("loginForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        }
    );

    const data = await response.json();

    localStorage.setItem(
        "token",
        data.token
    );

    window.location.href =
        "dashboard.html";
});