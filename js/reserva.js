document
.getElementById("reservaForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:3000/api/reservas",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",

                "Authorization":
                    `Bearer ${token}`
            },

            body: JSON.stringify({
                cancha_id:
                    document.getElementById("cancha_id").value,

                fecha:
                    document.getElementById("fecha").value,

                hora_inicio:
                    document.getElementById("hora_inicio").value,

                hora_fin:
                    document.getElementById("hora_fin").value,

                precio_total:
                    document.getElementById("precio_total").value
            })
        }
    );

    const data =
        await response.json();

    alert("Reserva creada");

    console.log(data);
});