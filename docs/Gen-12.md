# GEN-12 – Evolución de esquema

## Proyecto: Sistema de Reserva de Canchas

### Esquema inicial

Inicialmente la entidad Reserva contenía únicamente:

* id
* cancha_id
* fecha
* hora_inicio
* hora_fin

Su objetivo era registrar reservas básicas de una cancha.

---

### Cambio realizado

Durante el desarrollo se detectó la necesidad de almacenar el costo total de cada reserva.

Por esta razón se agregó el atributo:

* precio_total

a la tabla Reservas.

---

### Motivo del cambio

El cambio permite:

* Calcular automáticamente el valor de una reserva.
* Mostrar el total pagado por el usuario.
* Generar estadísticas futuras sobre ingresos.
* Evitar recalcular el precio cada vez que se consulta una reserva.

---

### Estado actual

La entidad Reserva quedó compuesta por:

* id
* cancha_id
* usuario_id
* fecha
* hora_inicio
* hora_fin
* precio_total
* createdAt
* updatedAt

---

### Impacto en el sistema

El backend calcula automáticamente el valor total de la reserva considerando:

* Precio por hora de la cancha.
* Cantidad de horas reservadas.

Este valor queda almacenado en la base de datos mediante el campo `precio_total`.
