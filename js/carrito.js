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
  const resumenDesktop = document.getElementById("carrito-resumen-desktop");
  const resumenMobile = document.getElementById("carrito-resumen");

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  if (resumenDesktop) {
    resumenDesktop.textContent = totalItems;
    resumenDesktop.title = `Total: $${totalPrecio.toLocaleString()}`;
  }
  if (resumenMobile) {
    resumenMobile.textContent = totalItems;
    resumenMobile.title = `Total: $${totalPrecio.toLocaleString()}`;
  }

  renderizarCarrito();
}

function renderizarCarrito() {
  const contenedor = document.getElementById("detalle-carrito");
  if (!contenedor) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='text-center'>Tu carrito está vacío.</p>";
    return;
  }

  let total = 0;
  let html = "<div class='carrito-vertical'>";

  carrito.forEach((producto, i) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    html += `
      <div class="card mb-3 p-2 shadow-sm">
        <div class="d-flex justify-content-between align-items-center">
          <div class="fw-bold">${producto.nombre}</div>
          <div>$${producto.precio.toLocaleString()} c/u</div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-2">
          <div class="cantidad-controls d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-secondary" onclick="modificarCantidad(${i}, -1)">−</button>
            <span>${producto.cantidad}</span>
            <button class="btn btn-sm btn-secondary" onclick="modificarCantidad(${i}, 1)">+</button>
          </div>
          <div class="text-end">
            <div class="text-muted">Subtotal:</div>
            <div class="fw-bold">$${subtotal.toLocaleString()}</div>
          </div>
        </div>
        <div class="text-end mt-2">
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${i})">Eliminar</button>
        </div>
      </div>
    `;
  });

  html += `
    <div class="text-end mt-3 border-top pt-3">
      <h5>Total: $${total.toLocaleString()}</h5>
    </div>
  </div>`;

  contenedor.innerHTML = html;
}

function modificarCantidad(index, delta) {
  carrito[index].cantidad += delta;
  if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarResumen();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarResumen();
}

// Agregar productos desde botones

document.querySelectorAll(".agregar-carrito").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = parseInt(btn.dataset.id);
    const nombre = btn.dataset.nombre;
    const precio = parseInt(btn.dataset.precio);
    const cantidadId = btn.dataset.cantidadId;
    const cantidad = parseInt(document.getElementById(cantidadId).value);

    if (cantidad > 0) {
      agregarProducto(id, nombre, precio, cantidad);
      document.getElementById(cantidadId).value = 1; // volver a 1
    }
  });
});

actualizarResumen();

// Vaciar carrito

document.getElementById("vaciarCarritoLateral").addEventListener("click", () => {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarResumen();
});

function cambiarCantidad(id, delta) {
  const input = document.getElementById(id);
  let valor = parseInt(input.value) || 1;
  valor = Math.max(1, valor + delta);
  input.value = valor;
}
