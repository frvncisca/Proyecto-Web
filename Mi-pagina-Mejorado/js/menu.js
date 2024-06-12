document.addEventListener('DOMContentLoaded', function () {
    const url = 'productos.json'; // URL del archivo JSON
    let carrito = []; // Variable para almacenar los productos del carrito

    // Cargar los productos desde el archivo JSON
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarProductos(data))
        .catch(error => console.error('Error al cargar los productos:', error));

    // Función para mostrar los productos en la página
    function mostrarProductos(productos) {
        const contenedorProductos = document.querySelector('.shop-content');

        productos.forEach(producto => {
            const { id, nombre, descripcion, precio } = producto;

            const productoHTML = `
                <div class="row" id="${id}">
                    <h3>${nombre}</h3>
                    <p>${descripcion}</p>
                    <div class="in-text">
                        <div class="price"> 
                            <h6>$${precio}</h6>
                        </div>
                        <div class="s-btn">
                        <a href="#" id="boton-agregar-carrito" class="agregar-carrito">Agregar carrito</a>
                        </div>
                    </div>
                </div>
            `;

            contenedorProductos.innerHTML += productoHTML;
        });

        // Manejador de eventos para el botón "Agregar al carrito"
        document.querySelectorAll('.agregar-carrito').forEach(btn => {
            btn.addEventListener('click', function(event) {
                event.preventDefault(); // Evitar que se realice la acción predeterminada del enlace
                // Lógica para agregar el producto al carrito
                const id = event.target.dataset.id;
                const productoAgregado = carrito.find(producto => producto.id === id);

                if (productoAgregado) {
                    productoAgregado.cantidad++;
                } else {
                    const producto = {
                        id: id,
                        nombre: event.target.parentNode.parentNode.querySelector('h3').textContent,
                        precio: parseInt(event.target.parentNode.parentNode.querySelector('.price h6').textContent.replace('$', '')),
                        cantidad: 1
                    };
                    carrito.push(producto);
                }

                mostrarCarrito();
            });
        });

        // Manejador de eventos para el botón "Vaciar Carrito"
        document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
    }

    // Función para mostrar el contenido del carrito
    function mostrarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        listaCarrito.innerHTML = ''; // Limpiar la lista antes de mostrar los productos

        carrito.forEach(producto => {
            const itemCarrito = document.createElement('li');
            itemCarrito.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad}`;
            listaCarrito.appendChild(itemCarrito);
        });
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito = []; // Vaciar el arreglo de productos en el carrito
        mostrarCarrito(); // Actualizar la visualización del carrito
    }
});