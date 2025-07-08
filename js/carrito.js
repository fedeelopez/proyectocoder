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
  animarIconoCarrito();
  mostrarToast("Producto agregado");
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

  let html = "";
  let total = 0;

  carrito.forEach((producto, i) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    html += `
      <div class="carrito-item">
        <div class="carrito-info">
          <h6>${producto.nombre}</h6>
          <div class="cantidad-controls">
            <button onclick="modificarCantidad(${i}, -1)">−</button>
            <input type="text" value="${producto.cantidad}" readonly>
            <button onclick="modificarCantidad(${i}, 1)">+</button>
          </div>
          <p>$${producto.precio.toLocaleString()} c/u</p>
          <p><strong>Subtotal:</strong> $${subtotal.toLocaleString()}</p>
        </div>
        <button class="eliminar-btn" onclick="eliminarProducto(${i})">Eliminar</button>
      </div>
    `;
  });

  html += `
    <div class="mt-3 text-end">
      <hr>
      <p class="fw-bold fs-5">Total: $${total.toLocaleString()}</p>
    </div>
  `;

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

document.querySelectorAll(".agregar-carrito").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = parseInt(btn.dataset.id);
    const nombre = btn.dataset.nombre;
    const precio = parseInt(btn.dataset.precio);
    const cantidadId = btn.dataset.cantidadId;
    const cantidad = parseInt(document.getElementById(cantidadId).value);

    if (cantidad > 0) {
      agregarProducto(id, nombre, precio, cantidad);
      document.getElementById(cantidadId).value = 1;
    }
  });
});

actualizarResumen();

document.getElementById("vaciarCarritoLateral").addEventListener("click", () => {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarResumen();
});

// ANIMACIÓN DE CARRITO
function animarIconoCarrito() {
  const iconos = [
    document.getElementById("carrito-resumen-desktop"),
    document.getElementById("carrito-resumen")
  ];

  iconos.forEach(icono => {
    if (icono) {
      icono.classList.add("carrito-animado");
      setTimeout(() => icono.classList.remove("carrito-animado"), 400);
    }
  });
}

// TOAST EMERGENTE
function mostrarToast(mensaje) {
  const toast = document.createElement("div");
  toast.className = "toast-carrito";
  toast.textContent = mensaje;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

// EXTRA — Cambiar cantidad con botones externos (si los usás)
function cambiarCantidad(id, delta) {
  const input = document.getElementById(id);
  let valor = parseInt(input.value) || 1;
  valor = Math.max(1, valor + delta);
  input.value = valor;
}
