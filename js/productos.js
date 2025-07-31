
class Producto {
  constructor(id, nombre, precio, categoria, descripcion, caracteristicas, imagen, destacado) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.caracteristicas = caracteristicas;
    this.imagen = imagen;
    this.destacado = destacado;
  }

  generarHTML() {
    const caracteristicasHTML = this.caracteristicas.map(caract => `<li>${caract}</li>`).join('');
    
    return `
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="card producto-card-stanley h-100">
          <img src="${this.imagen}" class="card-img-top" alt="${this.nombre}" onerror="this.src='../assets/botella1l.jpeg'">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${this.nombre}</h5>
            <p class="card-text">${this.descripcion}</p>
            <ul class="mb-3">
              ${caracteristicasHTML}
            </ul>
            <div class="precio-stanley">$${this.precio.toLocaleString()}</div>
            <div class="cantidad-controls-stanley">
              <button class="qty-btn-stanley" onclick="cambiarCantidadProducto(${this.id}, -1)">-</button>
              <input type="number" class="cantidad-input-stanley" id="cantidad-${this.id}" value="1" min="1" max="10">
              <button class="qty-btn-stanley" onclick="cambiarCantidadProducto(${this.id}, 1)">+</button>
            </div>
            <button class="btn-agregar-stanley" onclick="agregarProductoCarrito(${this.id})">
              🛒 Agregar
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// Variables globales
let productos = [];
let categorias = [];
let categoriaActual = 'todos';

// Función para cargar datos remotos
async function cargarDatosRemotos() {
  try {
    const respuesta = await fetch('../data/productos.json');
    if (!respuesta.ok) {
      throw new Error('Error al cargar los datos');
    }
    
    const datos = await respuesta.json();
    productos = datos.productos.map(p => new Producto(
      p.id, p.nombre, p.precio, p.categoria, p.descripcion, 
      p.caracteristicas, p.imagen, p.destacado
    ));
    
    // Obtener categorías únicas
    categorias = [...new Set(productos.map(p => p.categoria))];
    
    mostrarFiltrosCategoria();
    mostrarProductos();
    
  } catch (error) {
    console.error('Error cargando datos:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron cargar los productos. Intenta recargar la página.',
      confirmButtonColor: '#007C91'
    });
  }
}

// Función para mostrar filtros de categoría
function mostrarFiltrosCategoria() {
  const contenedor = document.getElementById('filtros-categoria');
  if (!contenedor) return;

  let html = `
    <button class="btn btn-outline-primary me-2 mb-2" onclick="filtrarPorCategoria('todos')">
      Todos
    </button>
  `;
  
  categorias.forEach(categoria => {
    html += `
      <button class="btn btn-outline-primary me-2 mb-2" onclick="filtrarPorCategoria('${categoria}')">
        ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}
      </button>
    `;
  });
  
  contenedor.innerHTML = html;
}

// Función para filtrar por categoría
function filtrarPorCategoria(categoria) {
  categoriaActual = categoria;
  mostrarProductos();
}

// Función para mostrar productos
function mostrarProductos() {
  const contenedor = document.getElementById('contenedor-productos');
  if (!contenedor) return;

  let productosFiltrados = productos;
  
  if (categoriaActual !== 'todos') {
    productosFiltrados = productos.filter(p => p.categoria === categoriaActual);
  }
  
  if (productosFiltrados.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12 text-center">
        <h3 class="text-muted">No hay productos en esta categoría</h3>
        <p class="text-muted">Intenta con otra categoría o vuelve más tarde.</p>
      </div>
    `;
    return;
  }
  
  const html = productosFiltrados.map(producto => producto.generarHTML()).join('');
  contenedor.innerHTML = html;
}

// Función para cambiar cantidad de producto
function cambiarCantidadProducto(id, delta) {
  const input = document.getElementById(`cantidad-${id}`);
  let valor = parseInt(input.value) || 1;
  valor = Math.max(1, Math.min(10, valor + delta));
  input.value = valor;
}

// Función para agregar producto al carrito
function agregarProductoCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value) || 1;
  
  if (cantidad < 1 || cantidad > 10) {
    Swal.fire({
      icon: 'warning',
      title: 'Cantidad inválida',
      text: 'La cantidad debe estar entre 1 y 10',
      confirmButtonColor: '#007C91'
    });
    return;
  }

  // Usar la instancia global del carrito desde carrito.js
  window.carritoCompras.agregarProducto(producto, cantidad);
  
  // Resetear cantidad a 1
  document.getElementById(`cantidad-${id}`).value = 1;
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  cargarDatosRemotos();
}); 