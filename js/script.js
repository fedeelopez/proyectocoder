// Variables globales
let productos = [];
let datosCargados = false;

// Clase para manejar productos
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

  obtenerPrecioFormateado() {
    return this.precio.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS'
    });
  }

  generarHTML() {
    return `
      <div class="producto-inicio">
        <h3>${this.nombre}</h3>
        <p>${this.descripcion}</p>
        <a href="./pages/productos.html" class="btn-modern">Ver Más</a>
      </div>
    `;
  }
}

// Función para cargar datos remotos
async function cargarDatosRemotos() {
  try {
    const respuesta = await fetch('./data/productos.json');
    if (!respuesta.ok) {
      throw new Error('Error al cargar los datos');
    }

    const datos = await respuesta.json();
    productos = datos.productos.map(p => {
      const imagenAjustada = p.imagen.replace('../assets/', './assets/');
      return new Producto(
        p.id, p.nombre, p.precio, p.categoria, p.descripcion,
        p.caracteristicas, imagenAjustada, p.destacado
      );
    });

    datosCargados = true;
    mostrarProductosDestacados();

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

// Función para mostrar productos destacados en la página principal
function mostrarProductosDestacados() {
  const contenedor = document.getElementById('productos-destacados');
  if (!contenedor || !datosCargados) return;

  const productosDestacados = productos.filter(p => p.destacado);
  
  if (productosDestacados.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12 text-center">
        <h3 class="text-muted">No hay productos destacados disponibles</h3>
        <p class="text-muted">Visita nuestra sección de productos para ver todo el catálogo.</p>
      </div>
    `;
    return;
  }
  
  const html = productosDestacados.map(producto => producto.generarHTML()).join('');
  
  contenedor.innerHTML = html;
}

// Función para mostrar detalle de producto
function mostrarDetalleProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  Swal.fire({
    title: producto.nombre,
    html: `
      <div class="text-start">
        <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 200px; margin-bottom: 1rem;">
        <p><strong>Descripción:</strong> ${producto.descripcion}</p>
        <p><strong>Precio:</strong> ${producto.obtenerPrecioFormateado()}</p>
        <p><strong>Características:</strong></p>
        <ul>
          ${producto.caracteristicas.map(caract => `<li>${caract}</li>`).join('')}
        </ul>
        <div class="mt-3">
          <label for="cantidad-producto">Cantidad:</label>
          <input type="number" id="cantidad-producto" value="1" min="1" class="form-control">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Agregar al Carrito',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const cantidad = parseInt(document.getElementById('cantidad-producto').value);
      if (cantidad < 1) {
        Swal.showValidationMessage('La cantidad debe ser mayor a 0');
        return false;
      }
      return cantidad;
    }
  }).then((result) => {
    if (result.isConfirmed) {

      window.carritoCompras.agregarProducto(producto, result.value);
    }
  });
}

// Función para mostrar información de la empresa
function mostrarInformacionEmpresa() {
  Swal.fire({
    title: '🏢 Sobre Termo Tienda',
    html: `
      <div class="text-start">
        <p><strong>Misión:</strong> Proporcionar productos térmicos de alta calidad para mejorar la experiencia de consumo de bebidas.</p>
        <p><strong>Visión:</strong> Ser la tienda líder en productos térmicos personalizados y funcionales.</p>
        <p><strong>Valores:</strong></p>
        <ul>
          <li>Calidad en todos nuestros productos</li>
          <li>Atención personalizada al cliente</li>
          <li>Innovación en diseño y funcionalidad</li>
          <li>Compromiso con la satisfacción del cliente</li>
        </ul>
      </div>
    `,
    confirmButtonText: 'Entendido'
  });
}

// Inicializa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Carga datos remotos
  cargarDatosRemotos();

  // Agrega event listener para información de empresa
  const enlaceEmpresa = document.querySelector('a[href="./pages/empresa.html"]');
  if (enlaceEmpresa) {
    enlaceEmpresa.addEventListener('click', function(e) {
      e.preventDefault();
      mostrarInformacionEmpresa();
    });
  }
});

window.mostrarDetalleProducto = mostrarDetalleProducto;
