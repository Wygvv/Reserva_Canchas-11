document
.getElementById("registerForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    alert(result.mensaje);

    window.location.href = "login.html";
});