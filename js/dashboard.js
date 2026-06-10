async function cargarCanchas() {

    const response = await fetch(
        "http://localhost:3000/api/canchas"
    );

    const canchas = await response.json();

    const tabla =
        document.getElementById(
            "tablaCanchas"
        );

    canchas.forEach(cancha => {

        tabla.innerHTML += `
            <tr>
                <td>${cancha.id}</td>
                <td>${cancha.nombre}</td>
                <td>${cancha.tipo}</td>
                <td>${cancha.precio_hora}</td>
            </tr>
        `;
    });
}

cargarCanchas();