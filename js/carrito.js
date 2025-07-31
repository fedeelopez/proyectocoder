// ========================================
// CARRITO DE COMPRAS UNIFICADO
// ========================================

// Clase para manejar el carrito
class CarritoCompras {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("carrito")) || [];
  }

  agregarProducto(producto, cantidad = 1) {
    const itemExistente = this.items.find(item => item.id === producto.id);
    
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.items.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad
      });
    }
    
    this.guardarEnLocalStorage();
    this.actualizarContadorCarrito();
    this.mostrarNotificacionExito(`✅ ${producto.nombre} agregado al carrito`);
  }

  eliminarProducto(index) {
    const producto = this.items[index];
    this.items.splice(index, 1);
    this.guardarEnLocalStorage();
    this.actualizarContadorCarrito();
    this.mostrarNotificacionExito(`❌ ${producto.nombre} eliminado del carrito`);
  }

  modificarCantidad(index, delta) {
    this.items[index].cantidad += delta;
    if (this.items[index].cantidad < 1) {
      this.items[index].cantidad = 1;
    }
    this.guardarEnLocalStorage();
    this.actualizarContadorCarrito();
  }

  obtenerTotal() {
    return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  obtenerCantidadTotal() {
    return this.items.reduce((total, item) => total + item.cantidad, 0);
  }

  vaciarCarrito() {
    this.items = [];
    this.guardarEnLocalStorage();
    this.actualizarContadorCarrito();
    this.mostrarNotificacionExito("🛒 Carrito vaciado");
  }

  guardarEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }

  mostrarNotificacionExito(mensaje) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: mensaje,
      timer: 2000,
      showConfirmButton: false
    });
  }

  actualizarContadorCarrito() {
    const totalItems = this.obtenerCantidadTotal();
    
    const contadores = [
      document.getElementById('carrito-resumen'),
      document.getElementById('carrito-resumen-desktop')
    ];

    contadores.forEach(contador => {
      if (contador) {
        contador.textContent = totalItems;
        contador.style.display = totalItems > 0 ? 'inline' : 'none';
      }
    });
  }
}

// Instancia global del carrito
const carritoCompras = new CarritoCompras();

// Función para procesar la compra
function procesarCompra() {
  if (carritoCompras.items.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Carrito vacío',
      text: 'Agrega productos al carrito antes de continuar'
    });
    return;
  }

  Swal.fire({
    title: 'Finalizar Compra',
    html: `
      <div class="text-start">
        <h6>Resumen de la compra:</h6>
        ${carritoCompras.items.map(item => `
          <div class="d-flex justify-content-between mb-2">
            <span>${item.nombre} x${item.cantidad}</span>
            <span>${(item.precio * item.cantidad).toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</span>
          </div>
        `).join('')}
        <hr>
        <div class="d-flex justify-content-between fw-bold">
          <span>Total:</span>
          <span>${carritoCompras.obtenerTotal().toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</span>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Confirmar Compra',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Simular proceso de pago
      Swal.fire({
        title: 'Procesando pago...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      setTimeout(() => {
        carritoCompras.vaciarCarrito();
        Swal.fire({
          icon: 'success',
          title: '¡Compra exitosa!',
          text: 'Tu pedido ha sido procesado correctamente. Te enviaremos un email con los detalles.',
          confirmButtonText: 'Aceptar'
        });
      }, 2000);
    }
  });
}

// Función para mostrar el carrito
function mostrarCarrito() {
  if (carritoCompras.items.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Carrito vacío',
      text: 'No hay productos en tu carrito'
    });
    return;
  }

  const html = `
    <div class="text-start">
      ${carritoCompras.items.map((item, index) => `
        <div class="border-bottom pb-2 mb-2">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6>${item.nombre}</h6>
              <small>${item.precio.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})} c/u</small>
            </div>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-outline-secondary" onclick="modificarCantidadCarrito(${index}, -1)">-</button>
              <span>${item.cantidad}</span>
              <button class="btn btn-sm btn-outline-secondary" onclick="modificarCantidadCarrito(${index}, 1)">+</button>
              <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${index})">🗑️</button>
            </div>
          </div>
        </div>
      `).join('')}
      <hr>
      <div class="d-flex justify-content-between fw-bold">
        <span>Total:</span>
        <span>${carritoCompras.obtenerTotal().toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</span>
      </div>
    </div>
  `;

  Swal.fire({
    title: '🛒 Tu Carrito',
    html: html,
    showCancelButton: true,
    confirmButtonText: 'Finalizar Compra',
    cancelButtonText: 'Seguir Comprando',
    width: '600px'
  }).then((result) => {
    if (result.isConfirmed) {
      procesarCompra();
    }
  });
}

// Funciones auxiliares para el carrito
function modificarCantidadCarrito(index, delta) {
  carritoCompras.modificarCantidad(index, delta);
  mostrarCarrito(); // Recargar el carrito
}

function eliminarDelCarrito(index) {
  carritoCompras.eliminarProducto(index);
  mostrarCarrito(); // Recargar el carrito
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Actualizar contador del carrito
  carritoCompras.actualizarContadorCarrito();
});

// Exportar funciones para uso global
window.mostrarCarrito = mostrarCarrito;
window.procesarCompra = procesarCompra;
window.modificarCantidadCarrito = modificarCantidadCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;

// Exportar la instancia global del carrito
window.carritoCompras = carritoCompras;
