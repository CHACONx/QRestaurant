// ======================================================
// RESTAURANTE QR
// JAVASCRIPT PRINCIPAL
// ======================================================


// ======================================================
// IDENTIFICAR LA MESA
// ======================================================

const parametros = new URLSearchParams(
    window.location.search
);


let mesaURL = parametros.get("mesa");


// Si la URL contiene una mesa,
// la guardamos.

if (mesaURL) {

    localStorage.setItem(
        "mesa",
        mesaURL
    );

}


// Obtener mesa guardada

let mesa = localStorage.getItem("mesa");


// Si no existe,
// usamos Mesa 1 para pruebas.

if (!mesa) {

    mesa = "1";

}


// Mostrar mesa en cualquier página

const elementosMesa =
    document.querySelectorAll("#mesa");


elementosMesa.forEach(function(elemento) {

    elemento.textContent =
        "Mesa: " + mesa;

});



// ======================================================
// NAVEGACIÓN
// ======================================================

function irA(pagina) {

    window.location.href =
        pagina + "?mesa=" + encodeURIComponent(mesa);

}



// ======================================================
// LLAMAR AL MESERO
// ======================================================

function llamarMesero() {


    const confirmar = confirm(

        "🛎️ LLAMAR AL MESERO\n\n" +

        "Mesa: " + mesa + "\n\n" +

        "¿Deseas solicitar al mesero?"

    );


    if (!confirmar) {

        return;

    }


    let solicitudes =
        JSON.parse(
            localStorage.getItem("asistencias")
        ) || [];


    solicitudes.push({

        id: Date.now(),

        mesa: mesa,

        tipo: "Llamar al mesero",

        fecha: new Date().toLocaleString(),

        estado: "Pendiente"

    });


    localStorage.setItem(

        "asistencias",

        JSON.stringify(solicitudes)

    );


    alert(

        "✅ Solicitud enviada.\n\n" +

        "Mesa: " + mesa

    );

}



// ======================================================
// ASISTENCIA
// ======================================================

function solicitarAyuda(tipo) {


    const confirmar = confirm(

        "🆘 SOLICITUD DE ASISTENCIA\n\n" +

        "Mesa: " + mesa + "\n" +

        "Solicitud: " + tipo + "\n\n" +

        "¿Deseas enviar esta solicitud?"

    );


    if (!confirmar) {

        return;

    }


    let solicitudes =
        JSON.parse(
            localStorage.getItem("asistencias")
        ) || [];


    solicitudes.push({

        id: Date.now(),

        mesa: mesa,

        tipo: tipo,

        fecha: new Date().toLocaleString(),

        estado: "Pendiente"

    });


    localStorage.setItem(

        "asistencias",

        JSON.stringify(solicitudes)

    );


    alert(

        "✅ Solicitud enviada.\n\n" +

        "Mesa: " + mesa + "\n" +

        tipo

    );

}



// ======================================================
// OTRA ASISTENCIA
// ======================================================

function mostrarOtraAsistencia() {


    const elemento =
        document.getElementById(
            "otraSolicitud"
        );


    if (elemento) {

        elemento.style.display =
            "block";

    }

}



// ======================================================
// ENVIAR OTRA ASISTENCIA
// ======================================================

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
            "⚠️ Escribe qué necesitas."
        );

        return;

    }


    let solicitudes =
        JSON.parse(
            localStorage.getItem("asistencias")
        ) || [];


    solicitudes.push({

        id: Date.now(),

        mesa: mesa,

        tipo: mensaje,

        fecha: new Date().toLocaleString(),

        estado: "Pendiente"

    });


    localStorage.setItem(

        "asistencias",

        JSON.stringify(solicitudes)

    );


    campo.value = "";


    alert(

        "✅ Solicitud enviada.\n\n" +

        "Mesa: " + mesa

    );

}



// ======================================================
// PEDIR CUENTA
// ======================================================

function solicitarCuenta() {


    const confirmar = confirm(

        "🧾 SOLICITAR CUENTA\n\n" +

        "Mesa: " + mesa + "\n\n" +

        "¿Deseas solicitar la cuenta?"

    );


    if (!confirmar) {

        return;

    }


    let cuentas =
        JSON.parse(
            localStorage.getItem("cuentas")
        ) || [];


    cuentas.push({

        id: Date.now(),

        mesa: mesa,

        fecha: new Date().toLocaleString(),

        estado: "Pendiente"

    });


    localStorage.setItem(

        "cuentas",

        JSON.stringify(cuentas)

    );


    const tarjeta =
        document.querySelector(
            ".tarjeta-cuenta"
        );


    if (tarjeta) {

        tarjeta.style.display =
            "none";

    }


    const mensaje =
        document.getElementById(
            "mensajeCuenta"
        );


    if (mensaje) {

        mensaje.style.display =
            "block";

    }


    alert(

        "✅ Cuenta solicitada.\n\n" +

        "Mesa: " + mesa

    );

}



// ======================================================
// FORMAS DE PAGO
// ======================================================

let metodoPagoSeleccionado = "";



function seleccionarPago(metodo) {


    metodoPagoSeleccionado =
        metodo;


    const informacion =
        document.getElementById(
            "informacionPago"
        );


    const metodoElemento =
        document.getElementById(
            "metodoSeleccionado"
        );


    const detalle =
        document.getElementById(
            "detallePago"
        );


    if (!informacion) {

        return;

    }


    metodoElemento.textContent =
        metodo;



    if (metodo === "Efectivo") {

        detalle.innerHTML = `

            <p>
                💵 Puedes pagar
                directamente al mesero
                o en caja.
            </p>

        `;

    }



    else if (metodo === "Tarjeta") {

        detalle.innerHTML = `

            <p>
                💳 Puedes pagar con
                tarjeta de crédito
                o débito.
            </p>

            <p>
                El mesero llevará
                la terminal a tu mesa.
            </p>

        `;

    }



    else if (
        metodo === "Transferencia bancaria"
    ) {

        detalle.innerHTML = `

            <p>
                🏦 Solicita los datos
                bancarios al personal
                del restaurante.
            </p>

        `;

    }



    else if (metodo === "Pago con QR") {

        detalle.innerHTML = `

            <p>
                📱 Escanea el código QR
                proporcionado por
                el restaurante.
            </p>

        `;

    }


    informacion.style.display =
        "block";


    informacion.scrollIntoView({

        behavior: "smooth"

    });

}



// ======================================================
// CONFIRMAR PAGO
// ======================================================

function confirmarPago() {


    if (!metodoPagoSeleccionado) {

        alert(
            "⚠️ Selecciona un método de pago."
        );

        return;

    }


    let pagos =
        JSON.parse(
            localStorage.getItem("pagos")
        ) || [];


    pagos.push({

        id: Date.now(),

        mesa: mesa,

        metodo: metodoPagoSeleccionado,

        fecha: new Date().toLocaleString(),

        estado: "Seleccionado"

    });


    localStorage.setItem(

        "pagos",

        JSON.stringify(pagos)

    );


    const informacion =
        document.getElementById(
            "informacionPago"
        );


    if (informacion) {

        informacion.style.display =
            "none";

    }


    const mensaje =
        document.getElementById(
            "mensajePago"
        );


    if (mensaje) {

        mensaje.style.display =
            "block";

    }

}



// ======================================================
// PEDIDOS
// ======================================================


// Obtener pedido

function obtenerPedido() {

    return JSON.parse(

        localStorage.getItem("pedido")

    ) || [];

}



// Guardar pedido

function guardarPedido(pedido) {

    localStorage.setItem(

        "pedido",

        JSON.stringify(pedido)

    );

}



// ======================================================
// AGREGAR PRODUCTO
// ======================================================

function agregarProducto(
    id,
    nombre,
    precio
) {


    let pedido =
        obtenerPedido();


    const existente =
        pedido.find(
            producto =>
                producto.id === id
        );


    if (existente) {

        existente.cantidad++;

    }

    else {

        pedido.push({

            id: id,

            nombre: nombre,

            precio: precio,

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



// ======================================================
// CAMBIAR CANTIDAD
// ======================================================

function cambiarCantidad(
    id,
    cambio
) {


    let pedido =
        obtenerPedido();


    const producto =
        pedido.find(
            producto =>
                producto.id === id
        );


    if (!producto) {

        return;

    }


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        pedido =
            pedido.filter(
                producto =>
                    producto.id !== id
            );

    }


    guardarPedido(pedido);


    mostrarPedido();


    actualizarContador();

}



// ======================================================
// ELIMINAR PRODUCTO
// ======================================================

function eliminarProducto(id) {


    let pedido =
        obtenerPedido();


    pedido =
        pedido.filter(
            producto =>
                producto.id !== id
        );


    guardarPedido(pedido);


    mostrarPedido();


    actualizarContador();

}



// ======================================================
// MOSTRAR PEDIDO
// ======================================================

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


    const pedido =
        obtenerPedido();


    lista.innerHTML = "";


    if (pedido.length === 0) {

        lista.innerHTML = `

            <div class="pedido-vacio">

                <div>
                    🛒
                </div>

                <h2>
                    Tu pedido está vacío
                </h2>

                <p>
                    Agrega productos desde
                    nuestro menú.
                </p>

            </div>

        `;


        if (totalElemento) {

            totalElemento.textContent =
                "Total: $0.00";

        }


        return;

    }


    let total = 0;


    pedido.forEach(
        function(producto) {


            const subtotal =
                producto.precio *
                producto.cantidad;


            total += subtotal;


            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "producto-pedido";


            elemento.innerHTML = `

                <div>

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <p>
                        $${producto.precio.toFixed(2)}
                        cada uno
                    </p>

                </div>


                <div class="cantidad">

                    <button
                        onclick="cambiarCantidad(
                            '${producto.id}',
                            -1
                        )">

                        −

                    </button>


                    <strong>
                        ${producto.cantidad}
                    </strong>


                    <button
                        onclick="cambiarCantidad(
                            '${producto.id}',
                            1
                        )">

                        +

                    </button>

                </div>


                <strong>

                    $${subtotal.toFixed(2)}

                </strong>


                <button
                    class="eliminar"
                    onclick="eliminarProducto(
                        '${producto.id}'
                    )">

                    🗑️

                </button>

            `;


            lista.appendChild(
                elemento
            );


        }
    );


    if (totalElemento) {

        totalElemento.textContent =
            "Total: $" +
            total.toFixed(2);

    }

}



// ======================================================
// CONTADOR DEL PEDIDO
// ======================================================

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


    let cantidad = 0;


    pedido.forEach(
        producto => {

            cantidad +=
                producto.cantidad;

        }
    );


    contador.textContent =
        cantidad;

}



// ======================================================
// ENVIAR PEDIDO
// ======================================================

function enviarPedido() {


    const pedido =
        obtenerPedido();


    if (pedido.length === 0) {

        alert(
            "⚠️ Tu pedido está vacío."
        );

        return;

    }


    const confirmar = confirm(

        "🛒 ENVIAR PEDIDO\n\n" +

        "Mesa: " + mesa + "\n\n" +

        "¿Deseas enviar tu pedido?"

    );


    if (!confirmar) {

        return;

    }


    let pedidosEnviados =
        JSON.parse(

            localStorage.getItem(
                "pedidosEnviados"
            )

        ) || [];


    pedidosEnviados.push({

        id: Date.now(),

        mesa: mesa,

        productos: pedido,

        fecha:
            new Date().toLocaleString(),

        estado: "Recibido"

    });


    localStorage.setItem(

        "pedidosEnviados",

        JSON.stringify(
            pedidosEnviados
        )

    );


    // Vaciar carrito

    localStorage.removeItem(
        "pedido"
    );


    alert(

        "✅ PEDIDO ENVIADO\n\n" +

        "Mesa: " + mesa + "\n\n" +

        "El restaurante ha recibido tu pedido."

    );


    window.location.href =
        "index.html?mesa=" +
        encodeURIComponent(mesa);

}