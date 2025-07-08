let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarProducto(id, nombre, precio, cantidad) {
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    carrito[index].cantidad += cantidad;
  } else {
    carrito.push({ id, nombre, precio, cantidad });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarResumen();
}

function actualizarResumen() {
  const resumen = document.getElementById("resumen-carrito");
  const iconosCarrito = document.querySelectorAll("#carrito-resumen");

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // Actualizar TODOS los íconos de carrito (mobile y desktop)
  iconosCarrito.forEach(icon => {
    icon.textContent = totalItems;
    icon.title = `Total: $${totalPrecio.toLocaleString()}`;
  });

  // Actualizar el resumen flotante (si existe)
  if (resumen) {
    if (carrito.length === 0) {
      resumen.textContent = "Carrito vacío";
    } else {
      resumen.innerHTML = `
        Productos: ${totalItems} | Total: $${totalPrecio.toLocaleString()}
        <button id="vaciarCarrito" class="btn btn-sm btn-outline-danger ms-2">Vaciar</button>
      `;

      document.getElementById("vaciarCarrito").addEventListener("click", () => {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarResumen();
        renderizarCarritoEnModal();
      });
    }
  }

  renderizarCarritoEnModal(); // Esto asegura que el modal también se actualice
}



function renderizarCarritoEnModal() {
  const contenedor = document.getElementById("detalle-carrito");
  if (!contenedor) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='text-center'>Tu carrito está vacío.</p>";
    return;
  }

  let html = `
    <table class="table table-sm table-bordered align-middle text-center">
      <thead class="table-light">
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
  `;

  let total = 0;
  carrito.forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    html += `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>$${subtotal.toLocaleString()}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" class="text-end"><strong>Total:</strong></td>
          <td><strong>$${total.toLocaleString()}</strong></td>
        </tr>
      </tfoot>
    </table>
  `;

  contenedor.innerHTML = html;
}


// Listeners para los botones Agregar
document.querySelectorAll(".agregar-carrito").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = parseInt(btn.dataset.id);
    const nombre = btn.dataset.nombre;
    const precio = parseInt(btn.dataset.precio);
    const cantidadId = btn.dataset.cantidadId;
    const cantidad = parseInt(document.getElementById(cantidadId).value);

    if (cantidad > 0) {
      agregarProducto(id, nombre, precio, cantidad);
    }
  });
});

actualizarResumen();

document.getElementById("carrito-nav").addEventListener("click", renderizarCarritoEnModal);

document.getElementById("vaciarCarritoModal").addEventListener("click", () => {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarResumen();
  renderizarCarritoEnModal();
});
