// Mostrar y ocultar la lista de productos
document.querySelector('.desp-cab').addEventListener('click', function() {
    var cont = this.nextElementSibling;
    if (cont.style.display === "block") {
        cont.style.display = "none";
        this.innerHTML = "PRODUCTOS ▼";
    } else {
        cont.style.display = "block";
        this.innerHTML = "PRODUCTOS ▲";
    }
});

document.querySelectorAll('.btn-seleccionar').forEach(function(btn) {
    btn.addEventListener('click', function() {
        // Obtener los datos del producto seleccionado
        var productoItem = this.parentElement;
        var nombreProducto = productoItem.querySelector('p').innerText;
        var precioProducto = productoItem.querySelectorAll('p')[1].innerText.replace('$', '');
        var imagenProducto = productoItem.querySelector('img').src;

        // Mostrar el contenedor de selección
        var seleccionCont = document.querySelector('.seleccion-cont');
        seleccionCont.style.display = "block";

        // Actualizar los detalles del producto seleccionado
        document.getElementById('producto-nombre').innerText = nombreProducto;
        document.getElementById('producto-precio').innerText = "$" + precioProducto;
        document.getElementById('producto-img').src = imagenProducto;

        // Establecer la cantidad a 1 y recalcular el precio
        var cantidadInput = document.getElementById('cantidad');
        cantidadInput.value = 1;
        actualizarPrecioTotal(precioProducto, cantidadInput.value);

        cantidadInput.addEventListener('input', function() {
            var cantidad = parseInt(cantidadInput.value);
            if (cantidad >= 1) {
                actualizarPrecioTotal(precioProducto, cantidad);
            }
        });

        // Eliminar el evento de click anterior para evitar acumulación
        var btnComprar = document.querySelector('.btn-comprar');
        var nuevoBtnComprar = btnComprar.cloneNode(true);  // Clonar para eliminar eventos anteriores
        btnComprar.parentNode.replaceChild(nuevoBtnComprar, btnComprar);

        nuevoBtnComprar.addEventListener('click', function() {
            // Agregar siempre la compra como nueva
            agregarCompra(nombreProducto, precioProducto, cantidadInput.value, imagenProducto);
        });

        // Botón Borrar
        document.querySelector('.btn-borrar').addEventListener('click', function() {
            resetearCampos();
        });
    });
});

function actualizarPrecioTotal(precioProducto, cantidad) {
    var precioTotal = precioProducto * cantidad;
    document.getElementById('producto-precio').innerText = "$" + precioTotal.toFixed(2);
}

// Función para agregar una compra
function agregarCompra(nombre, precio, cantidad, imagen) {
    var comprasLista = document.getElementById('compras-lista');

    // Mostrar el contenedor de compras si está oculto
    if (comprasLista.style.display === 'none' || comprasLista.style.display === '') {
        comprasLista.style.display = 'block'; // Ahora sí se mostrará
    }

    var compraItem = document.createElement('div');
    compraItem.classList.add('compra-item');

    var precioTotal = (precio * cantidad).toFixed(2);

    // Crear una nueva compra independiente
    compraItem.innerHTML = `
        <img src="${imagen}" alt="${nombre}" style="width: 50px;">
        <p>${nombre}</p>
        <p>Cantidad: ${cantidad}</p>
        <p>Total: $${precioTotal}</p>
    `;
    comprasLista.appendChild(compraItem);
}

// Función para resetear los campos
function resetearCampos() {
    document.getElementById('producto-nombre').innerText = '';
    document.getElementById('producto-precio').innerText = '';
    document.getElementById('producto-img').src = '';
    document.getElementById('cantidad').value = 1;
}








