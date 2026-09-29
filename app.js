/* =========================================================
   RESTAURANTE QR - APP.JS
   ========================================================= */


/* =========================================================
   1. IDENTIFICAR LA MESA
   ========================================================= */

const parametros = new URLSearchParams(window.location.search);

let mesaURL = parametros.get("mesa");

let mesaGuardada = localStorage.getItem("mesa");


// Si anteriormente se guardó "Mesa: 1",
// eliminamos la parte "Mesa:".
if (mesaGuardada) {

    mesaGuardada = mesaGuardada
        .replace("Mesa:", "")
        .replace("mesa:", "")
        .trim();

}


// Obtener la mesa
let mesa = mesaURL || mesaGuardada || "1";


// Guardar solamente el número
localStorage.setItem("mesa", mesa);


/* =========================================================
   2. MOSTRAR LA MESA EN TODAS LAS PÁGINAS
   ========================================================= */

document.querySelectorAll("#mesa").forEach(function(elemento) {

    elemento.textContent = mesa;

});


/* =========================================================
   3. IR A OTRA PÁGINA MANTENIENDO LA MESA
   ========================================================= */

function irA(pagina) {

    window.location.href =
        pagina + "?mesa=" + encodeURIComponent(mesa);

}


/* =========================================================
   4. LLAMAR AL MESERO
   ========================================================= */

function llamarMesero() {

    let solicitudes =
        JSON.parse(
            localStorage.getItem("asistencias")
        ) || [];


    let nuevaSolicitud = {

        mesa: mesa,

        tipo: "Llamar al mesero",

        fecha: new Date().toLocaleString(),

        estado: "Pendiente"

    };


    solicitudes.push(nuevaSolicitud);


    localStorage.setItem(
        "asistencias",
        JSON.stringify(solicitudes)
    );


    alert(
        "🔔 El mesero ha sido llamado.\n\nMesa: " +
        mesa
    );

}


/* =========================================================
   5. SOLICITAR ASISTENCIA
   ========================================================= */

function solicitarAyuda(tipo) {

    let solicitudes =
        JSON.parse(
            localStorage.getItem("asistencias")
        ) || [];


    let nuevaSolicitud = {

        mesa: mesa,

        tipo: tipo,

        fecha: new Date().toLocaleString(),

        estado: "Pendiente"

    };


    solicitudes.push(nuevaSolicitud);


    localStorage.setItem(
        "asistencias",
        JSON.stringify(solicitudes)
    );


    alert(
        "🆘 Solicitud enviada.\n\n" +
        tipo +
        "\nMesa: " +
        mesa
    );

}


/* =========================================================
   6. MOSTRAR CAMPO PARA OTRA SOLICITUD
   ========================================================= */

function mostrarOtraAsistencia() {

    const elemento =
        document.getElementById(
            "otraSolicitud"
        );


    if (elemento) {

        elemento.style.display = "block";

    }

}


/* =========================================================
   7. ENVIAR OTRA SOLICITUD
   ========================================================= */

function enviarOtraSolicitud() {

    const campo =
        document.getElementById(
            "mensajeAsistencia"
        );


    if (!campo) {
        return;
    }


    const mensaje =
        campo.value.trim();


    if (mensaje === "") {

        alert(
            "Por favor escribe tu solicitud."
        );

        return;

    }


    let solicitudes =
        JSON.parse(
            localStorage.getItem("asistencias")
        ) || [];


    let nuevaSolicitud = {

        mesa: mesa,

        tipo: "Otra solicitud",

        mensaje: mensaje,

        fecha: new Date().toLocaleString(),

        estado: "Pendiente"

    };


    solicitudes.push(nuevaSolicitud);


    localStorage.setItem(
        "asistencias",
        JSON.stringify(solicitudes)
    );


    campo.value = "";


    alert(
        "🆘 Solicitud enviada correctamente.\n\n" +
        "Mesa: " +
        mesa
    );

}


/* =========================================================
   8. SOLICITAR LA CUENTA
   ========================================================= */

function solicitarCuenta() {

    let cuentas =
        JSON.parse(
            localStorage.getItem("cuentas")
        ) || [];


    let nuevaCuenta = {

        mesa: mesa,

        fecha: new Date().toLocaleString(),

        estado: "Pendiente"

    };


    cuentas.push(nuevaCuenta);


    localStorage.setItem(
        "cuentas",
        JSON.stringify(cuentas)
    );


    const tarjeta =
        document.querySelector(
            ".tarjeta-cuenta"
        );


    const mensaje =
        document.getElementById(
            "mensajeCuenta"
        );


    if (tarjeta) {

        tarjeta.style.display = "none";

    }


    if (mensaje) {

        mensaje.style.display = "block";

    }


    alert(
        "🧾 Se ha solicitado la cuenta.\n\n" +
        "Mesa: " +
        mesa
    );

}


/* =========================================================
   9. SELECCIONAR FORMA DE PAGO
   ========================================================= */

function seleccionarPago(metodo) {

    const informacion =
        document.getElementById(
            "informacionPago"
        );


    const metodoSeleccionado =
        document.getElementById(
            "metodoSeleccionado"
        );


    const detallePago =
        document.getElementById(
            "detallePago"
        );


    if (!informacion) {
        return;
    }


    informacion.style.display = "block";


    if (metodoSeleccionado) {

        metodoSeleccionado.textContent =
            metodo;

    }


    if (detallePago) {

        if (metodo === "Efectivo") {

            detallePago.textContent =
                "Puedes pagar directamente en caja o al mesero.";

        }

        else if (metodo === "Tarjeta") {

            detallePago.textContent =
                "Puedes pagar con tarjeta al momento de recibir tu cuenta.";

        }

        else if (metodo === "Transferencia bancaria") {

            detallePago.textContent =
                "Realiza la transferencia utilizando los datos proporcionados por el restaurante.";

        }

        else if (metodo === "Pago con QR") {

            detallePago.textContent =
                "Escanea el código QR de pago proporcionado por el restaurante.";

        }

        else {

            detallePago.textContent =
                "Forma de pago seleccionada.";

        }

    }

}


/* =========================================================
   10. CONFIRMAR FORMA DE PAGO
   ========================================================= */

function confirmarPago() {

    const metodoElemento =
        document.getElementById(
            "metodoSeleccionado"
        );


    if (!metodoElemento) {
        return;
    }


    const metodo =
        metodoElemento.textContent.trim();


    if (metodo === "") {

        alert(
            "Primero selecciona una forma de pago."
        );

        return;

    }


    let pagos =
        JSON.parse(
            localStorage.getItem("pagos")
        ) || [];


    let nuevoPago = {

        mesa: mesa,

        metodo: metodo,

        fecha: new Date().toLocaleString(),

        estado: "Pendiente"

    };


    pagos.push(nuevoPago);


    localStorage.setItem(
        "pagos",
        JSON.stringify(pagos)
    );


    const mensaje =
        document.getElementById(
            "mensajePago"
        );


    if (mensaje) {

        mensaje.style.display = "block";

    }


    alert(
        "💳 Forma de pago registrada.\n\n" +
        "Método: " +
        metodo +
        "\nMesa: " +
        mesa
    );

}


/* =========================================================
   11. OBTENER PEDIDO
   ========================================================= */

function obtenerPedido() {

    return JSON.parse(
        localStorage.getItem("pedido_" + mesa)
    ) || [];

}


/* =========================================================
   12. GUARDAR PEDIDO
   ========================================================= */

function guardarPedido(pedido) {

    localStorage.setItem(
        "pedido_" + mesa,
        JSON.stringify(pedido)
    );

}


/* =========================================================
   13. AGREGAR PRODUCTO AL PEDIDO
   ========================================================= */

function agregarProducto(
    id,
    nombre,
    precio
) {

    let pedido =
        obtenerPedido();


    let productoExistente =
        pedido.find(function(producto) {

            return producto.id === id;

        });


    if (productoExistente) {

        productoExistente.cantidad++;

    }

    else {

        pedido.push({

            id: id,

            nombre: nombre,

            precio: Number(precio),

            cantidad: 1

        });

    }


    guardarPedido(pedido);


    actualizarContador();


    alert(
        "✅ " +
        nombre +
        " agregado al pedido."
    );

}


/* =========================================================
   14. CAMBIAR CANTIDAD
   ========================================================= */

function cambiarCantidad(
    id,
    cambio
) {

    let pedido =
        obtenerPedido();


    let producto =
        pedido.find(function(item) {

            return item.id === id;

        });


    if (!producto) {
        return;
    }


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        pedido =
            pedido.filter(function(item) {

                return item.id !== id;

            });

    }


    guardarPedido(pedido);


    mostrarPedido();


    actualizarContador();

}


/* =========================================================
   15. ELIMINAR PRODUCTO
   ========================================================= */

function eliminarProducto(id) {

    let pedido =
        obtenerPedido();


    pedido =
        pedido.filter(function(item) {

            return item.id !== id;

        });


    guardarPedido(pedido);


    mostrarPedido();


    actualizarContador();

}


/* =========================================================
   16. MOSTRAR PEDIDO
   ========================================================= */

function mostrarPedido() {

    const lista =
        document.getElementById(
            "listaPedido"
        );


    const totalElemento =
        document.getElementById(
            "total"
        );


    if (!lista) {
        return;
    }


    let pedido =
        obtenerPedido();


    if (pedido.length === 0) {

        lista.innerHTML = `
            <div class="pedido-vacio">
                <p>🛒 Tu pedido está vacío.</p>
            </div>
        `;


        if (totalElemento) {

            totalElemento.textContent =
                "$0.00";

        }


        return;

    }


    let total = 0;


    lista.innerHTML = "";


    pedido.forEach(function(producto) {

        const subtotal =
            producto.precio *
            producto.cantidad;


        total += subtotal;


        const elemento =
            document.createElement("div");


        elemento.className =
            "producto-pedido";


        elemento.innerHTML = `

            <div>

                <strong>
                    ${producto.nombre}
                </strong>

                <p>
                    $${producto.precio.toFixed(2)}
                    cada uno
                </p>

            </div>


            <div class="cantidad">

                <button
                    type="button"
                    onclick="cambiarCantidad('${producto.id}', -1)">
                    −
                </button>


                <span>
                    ${producto.cantidad}
                </span>


                <button
                    type="button"
                    onclick="cambiarCantidad('${producto.id}', 1)">
                    +
                </button>

            </div>


            <div>

                <strong>
                    $${subtotal.toFixed(2)}
                </strong>


                <button
                    type="button"
                    class="eliminar"
                    onclick="eliminarProducto('${producto.id}')">

                    Eliminar

                </button>

            </div>

        `;


        lista.appendChild(elemento);

    });


    if (totalElemento) {

        totalElemento.textContent =
            "$" + total.toFixed(2);

    }

}


/* =========================================================
   17. ACTUALIZAR CONTADOR DEL PEDIDO
   ========================================================= */

function actualizarContador() {

    const contador =
        document.getElementById(
            "contadorPedido"
        );


    if (!contador) {
        return;
    }


    const pedido =
        obtenerPedido();


    let cantidadTotal = 0;


    pedido.forEach(function(producto) {

        cantidadTotal +=
            producto.cantidad;

    });


    contador.textContent =
        cantidadTotal;

}


/* =========================================================
   18. ENVIAR PEDIDO
   ========================================================= */

function enviarPedido() {

    let pedido =
        obtenerPedido();


    if (pedido.length === 0) {

        alert(
            "Tu pedido está vacío."
        );

        return;

    }


    let pedidosEnviados =
        JSON.parse(
            localStorage.getItem(
                "pedidosEnviados"
            )
        ) || [];


    let total = 0;


    pedido.forEach(function(producto) {

        total +=
            producto.precio *
            producto.cantidad;

    });


    let nuevoPedido = {

        mesa: mesa,

        productos: pedido,

        total: total,

        fecha: new Date().toLocaleString(),

        estado: "Pendiente"

    };


    pedidosEnviados.push(
        nuevoPedido
    );


    localStorage.setItem(
        "pedidosEnviados",
        JSON.stringify(
            pedidosEnviados
        )
    );


    // Vaciar carrito

    localStorage.removeItem(
        "pedido_" + mesa
    );


    alert(
        "✅ ¡Pedido enviado correctamente!\n\n" +
        "Mesa: " +
        mesa +
        "\nTotal: $" +
        total.toFixed(2)
    );


    irA("index.html");

}


/* =========================================================
   19. EJECUTAR FUNCIONES AL CARGAR
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        actualizarContador();

    }
);
