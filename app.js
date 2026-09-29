// =========================================================
// QRESTAURANT - APP.JS
// =========================================================


// =========================================================
// OBTENER MESA
// =========================================================

function obtenerMesa() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const mesaURL =
        parametros.get("mesa");


    if (mesaURL) {

        sessionStorage.setItem(
            "clienteMesa",
            mesaURL
        );

        return mesaURL;
    }


    return (
        sessionStorage.getItem(
            "clienteMesa"
        ) || "1"
    );
}



// =========================================================
// OBTENER CLIENTE
// =========================================================

function obtenerCliente() {

    return {

        nombre:
            sessionStorage.getItem(
                "clienteNombre"
            ) || "",

        apellido:
            sessionStorage.getItem(
                "clienteApellido"
            ) || "",

        mesa:
            obtenerMesa()

    };

}



// =========================================================
// IR A OTRA PÁGINA
// =========================================================

function irA(pagina) {

    const mesa =
        obtenerMesa();


    window.location.href =
        pagina +
        "?mesa=" +
        encodeURIComponent(mesa);

}



// =========================================================
// LLAMAR MESERO
// =========================================================

async function llamarMesero() {

    const cliente =
        obtenerCliente();


    const solicitud = {

        mesa: cliente.mesa,

        tipo: "Llamar mesero",

        mensaje:
            cliente.nombre +
            " " +
            cliente.apellido

    };


    // Guardar localmente

    const asistencias =
        JSON.parse(
            localStorage.getItem(
                "asistencias"
            )
        ) || [];


    asistencias.push({

        ...solicitud,

        fecha:
            new Date().toISOString(),

        estado:
            "Pendiente"

    });


    localStorage.setItem(
        "asistencias",
        JSON.stringify(
            asistencias
        )
    );


    // Enviar a Supabase

    if (
        window.supabaseClient
    ) {

        const {
            error
        } =
            await window.supabaseClient
                .from("asistencias")
                .insert([{

                    mesa:
                        cliente.mesa,

                    tipo:
                        "Llamar mesero",

                    mensaje:
                        cliente.nombre +
                        " " +
                        cliente.apellido,

                    estado:
                        "Pendiente"

                }]);


        if (error) {

            console.error(
                "Error Supabase:",
                error
            );

        }

    }


    alert(
        "🔔 El mesero ha sido llamado."
    );

}



// =========================================================
// SOLICITAR AYUDA
// =========================================================

async function solicitarAyuda(tipo) {

    const cliente =
        obtenerCliente();


    const mensaje =
        cliente.nombre +
        " " +
        cliente.apellido;


    // Guardar localmente

    const asistencias =
        JSON.parse(
            localStorage.getItem(
                "asistencias"
            )
        ) || [];


    asistencias.push({

        mesa:
            cliente.mesa,

        tipo:
            tipo,

        mensaje:
            mensaje,

        fecha:
            new Date().toISOString(),

        estado:
            "Pendiente"

    });


    localStorage.setItem(
        "asistencias",
        JSON.stringify(
            asistencias
        )
    );


    // Supabase

    if (
        window.supabaseClient
    ) {

        const {
            error
        } =
            await window.supabaseClient
                .from("asistencias")
                .insert([{

                    mesa:
                        cliente.mesa,

                    tipo:
                        tipo,

                    mensaje:
                        mensaje,

                    estado:
                        "Pendiente"

                }]);


        if (error) {

            console.error(
                error
            );

        }

    }


    alert(
        "🆘 Solicitud enviada."
    );

}



// =========================================================
// MOSTRAR CAMPO "OTRA SOLICITUD"
// =========================================================

function mostrarOtraAsistencia() {

    const campo =
        document.getElementById(
            "mensajeAsistencia"
        );


    if (campo) {

        campo.style.display =
            "block";

        campo.focus();

    }

}



// =========================================================
// ENVIAR OTRA SOLICITUD
// =========================================================

async function enviarOtraSolicitud() {

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
            "Escribe tu solicitud."
        );

        return;

    }


    const cliente =
        obtenerCliente();


    // Local

    const asistencias =
        JSON.parse(
            localStorage.getItem(
                "asistencias"
            )
        ) || [];


    asistencias.push({

        mesa:
            cliente.mesa,

        tipo:
            "Otra solicitud",

        mensaje:
            cliente.nombre +
            " " +
            cliente.apellido +
            ": " +
            mensaje,

        fecha:
            new Date().toISOString(),

        estado:
            "Pendiente"

    });


    localStorage.setItem(
        "asistencias",
        JSON.stringify(
            asistencias
        )
    );


    // Supabase

    if (
        window.supabaseClient
    ) {

        const {
            error
        } =
            await window.supabaseClient
                .from("asistencias")
                .insert([{

                    mesa:
                        cliente.mesa,

                    tipo:
                        "Otra solicitud",

                    mensaje:
                        cliente.nombre +
                        " " +
                        cliente.apellido +
                        ": " +
                        mensaje,

                    estado:
                        "Pendiente"

                }]);


        if (error) {

            console.error(
                error
            );

        }

    }


    campo.value = "";

    alert(
        "✅ Solicitud enviada."
    );

}



// =========================================================
// PEDIR CUENTA
// =========================================================

async function solicitarCuenta() {

    const cliente =
        obtenerCliente();


    // Local

    const cuentas =
        JSON.parse(
            localStorage.getItem(
                "cuentas"
            )
        ) || [];


    cuentas.push({

        mesa:
            cliente.mesa,

        cliente:
            cliente.nombre +
            " " +
            cliente.apellido,

        fecha:
            new Date().toISOString(),

        estado:
            "Pendiente"

    });


    localStorage.setItem(
        "cuentas",
        JSON.stringify(
            cuentas
        )
    );


    // Supabase

    if (
        window.supabaseClient
    ) {

        const {
            error
        } =
            await window.supabaseClient
                .from("cuentas")
                .insert([{

                    mesa:
                        cliente.mesa,

                    estado:
                        "Pendiente"

                }]);


        if (error) {

            console.error(
                error
            );

        }

    }


    const tarjeta =
        document.querySelector(
            ".tarjeta-cuenta"
        );


    const mensaje =
        document.getElementById(
            "mensajeCuenta"
        );


    if (tarjeta) {

        tarjeta.style.display =
            "none";

    }


    if (mensaje) {

        mensaje.style.display =
            "block";

    }

}



// =========================================================
// PAGOS
// =========================================================

function seleccionarPago(metodo) {

    const informacion =
        document.getElementById(
            "informacionPago"
        );


    const metodoSeleccionado =
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


    informacion.style.display =
        "block";


    if (metodoSeleccionado) {

        metodoSeleccionado.textContent =
            metodo;

    }


    if (detalle) {

        detalle.textContent =
            "Has seleccionado: " +
            metodo;

    }

}



// =========================================================
// CONFIRMAR PAGO
// =========================================================

async function confirmarPago() {

    const metodoElemento =
        document.getElementById(
            "metodoSeleccionado"
        );


    if (!metodoElemento) {

        return;

    }


    const metodo =
        metodoElemento.textContent;


    const cliente =
        obtenerCliente();


    // Local

    const pagos =
        JSON.parse(
            localStorage.getItem(
                "pagos"
            )
        ) || [];


    pagos.push({

        mesa:
            cliente.mesa,

        metodo:
            metodo,

        cliente:
            cliente.nombre +
            " " +
            cliente.apellido,

        fecha:
            new Date().toISOString(),

        estado:
            "Pendiente"

    });


    localStorage.setItem(
        "pagos",
        JSON.stringify(
            pagos
        )
    );


    // Supabase

    if (
        window.supabaseClient
    ) {

        const {
            error
        } =
            await window.supabaseClient
                .from("pagos")
                .insert([{

                    mesa:
                        cliente.mesa,

                    metodo:
                        metodo,

                    estado:
                        "Pendiente"

                }]);


        if (error) {

            console.error(
                error
            );

        }

    }


    const informacion =
        document.getElementById(
            "informacionPago"
        );


    const mensaje =
        document.getElementById(
            "mensajePago"
        );


    if (informacion) {

        informacion.style.display =
            "none";

    }


    if (mensaje) {

        mensaje.style.display =
            "block";

    }

}



// =========================================================
// PEDIDO
// =========================================================

function obtenerPedido() {

    const mesa =
        obtenerMesa();


    return JSON.parse(

        localStorage.getItem(
            "pedido_" + mesa
        )

    ) || [];

}



// =========================================================
// GUARDAR PEDIDO
// =========================================================

function guardarPedido(pedido) {

    const mesa =
        obtenerMesa();


    localStorage.setItem(

        "pedido_" + mesa,

        JSON.stringify(
            pedido
        )

    );

}



// =========================================================
// AGREGAR PRODUCTO
// =========================================================

function agregarProducto(
    id,
    nombre,
    precio
) {

    const pedido =
        obtenerPedido();


    const productoExistente =
        pedido.find(
            producto =>
                producto.id === id
        );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        pedido.push({

            id:
                id,

            nombre:
                nombre,

            precio:
                precio,

            cantidad:
                1

        });

    }


    guardarPedido(
        pedido
    );


    actualizarContador();


    alert(
        "✅ Producto agregado al pedido."
    );

}



// =========================================================
// CAMBIAR CANTIDAD
// =========================================================

function cambiarCantidad(
    id,
    cambio
) {

    const pedido =
        obtenerPedido();


    const producto =
        pedido.find(
            producto =>
                producto.id === id
        );


    if (!producto) {

        return;

    }


    producto.cantidad +=
        cambio;


    if (
        producto.cantidad <= 0
    ) {

        const posicion =
            pedido.findIndex(
                producto =>
                    producto.id === id
            );


        pedido.splice(
            posicion,
            1
        );

    }


    guardarPedido(
        pedido
    );


    mostrarPedido();


    actualizarContador();

}



// =========================================================
// ELIMINAR PRODUCTO
// =========================================================

function eliminarProducto(id) {

    const pedido =
        obtenerPedido();


    const nuevoPedido =
        pedido.filter(
            producto =>
                producto.id !== id
        );


    guardarPedido(
        nuevoPedido
    );


    mostrarPedido();


    actualizarContador();

}



// =========================================================
// MOSTRAR PEDIDO
// =========================================================

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


    let total = 0;


    if (pedido.length === 0) {

        lista.innerHTML =
            "<p>No hay productos en tu pedido.</p>";


        if (totalElemento) {

            totalElemento.textContent =
                "0.00";

        }

        return;

    }


    pedido.forEach(
        producto => {


            const subtotal =
                producto.precio *
                producto.cantidad;


            total +=
                subtotal;


            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "producto-pedido";


            elemento.innerHTML = `

                <strong>
                    ${producto.nombre}
                </strong>

                <p>
                    $${producto.precio.toFixed(2)}
                </p>

                <p>
                    Cantidad:
                    ${producto.cantidad}
                </p>

                <button
                    onclick="cambiarCantidad(
                        '${producto.id}',
                        1
                    )">

                    +

                </button>

                <button
                    onclick="cambiarCantidad(
                        '${producto.id}',
                        -1
                    )">

                    -

                </button>

                <button
                    onclick="eliminarProducto(
                        '${producto.id}'
                    )">

                    Eliminar

                </button>

            `;


            lista.appendChild(
                elemento
            );

        }
    );


    if (totalElemento) {

        totalElemento.textContent =
            total.toFixed(2);

    }

}



// =========================================================
// CONTADOR DEL PEDIDO
// =========================================================

function actualizarContador() {

    const pedido =
        obtenerPedido();


    const cantidad =
        pedido.reduce(
            (
                total,
                producto
            ) =>
                total +
                producto.cantidad,

            0
        );


    const contador =
        document.getElementById(
            "contadorPedido"
        );


    if (contador) {

        contador.textContent =
            cantidad;

    }

}



// =========================================================
// ENVIAR PEDIDO
// =========================================================

async function enviarPedido() {

    const pedido =
        obtenerPedido();


    if (pedido.length === 0) {

        alert(
            "Tu pedido está vacío."
        );

        return;

    }


    const cliente =
        obtenerCliente();


    let total = 0;


    pedido.forEach(
        producto => {

            total +=
                producto.precio *
                producto.cantidad;

        }
    );


    // =====================================
    // GUARDAR LOCALMENTE
    // =====================================

    const pedidosEnviados =
        JSON.parse(
            localStorage.getItem(
                "pedidosEnviados"
            )
        ) || [];


    pedidosEnviados.push({

        mesa:
            cliente.mesa,

        cliente:
            cliente.nombre +
            " " +
            cliente.apellido,

        productos:
            pedido,

        total:
            total,

        fecha:
            new Date().toISOString(),

        estado:
            "Pendiente"

    });


    localStorage.setItem(
        "pedidosEnviados",
        JSON.stringify(
            pedidosEnviados
        )
    );



    // =====================================
    // ENVIAR A SUPABASE
    // =====================================

    if (
        window.supabaseClient
    ) {

        const {
            error
        } =
            await window.supabaseClient
                .from("pedidos")
                .insert([{

                    mesa:
                        cliente.mesa,

                    productos:
                        pedido,

                    total:
                        total,

                    estado:
                        "Pendiente"

                }]);


        if (error) {

            console.error(
                "Error enviando pedido:",
                error
            );

            alert(
                "El pedido se guardó localmente, pero hubo un problema conectando con el servidor."
            );

            return;

        }

    }


    // =====================================
    // LIMPIAR CARRITO
    // =====================================

    guardarPedido([]);


    alert(
        "✅ Pedido enviado correctamente."
    );


    // Volver al inicio

    irA("index.html");

}



// =========================================================
// INICIAR
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        actualizarContador();

        mostrarPedido();

    }
);
