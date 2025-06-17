// VARIABLES Y CONSTANTES
const productos = ["Termo Stanley", "Botella térmica", "Mate", "Vaso térmico"];
let carrito = [];
let continuar = true;

// FUNCIÓN PARA MOSTRAR PRODUCTOS
function mostrarProductos() {
  console.log("📦 Lista de productos disponibles:");
  productos.forEach((producto, index) => {
    console.log(`${index + 1}. ${producto}`);
  });
}

// FUNCIÓN PARA AGREGAR AL CARRITO
function agregarProducto() {
  let seleccion = prompt("¿Qué producto querés agregar al carrito?\n(1- Termo Stanley, 2- Botella térmica, 3- Mate, 4- Vaso térmico)");
  let index = parseInt(seleccion) - 1;

  if (productos[index]) {
    carrito.push(productos[index]);
    alert(`✅ Agregaste "${productos[index]}" al carrito.`);
  } else {
    alert("❌ Selección no válida. Intentá de nuevo.");
  }
}

// BUCLE PARA INTERACTUAR
while (continuar) {
  mostrarProductos();
  agregarProducto();
  continuar = confirm("¿Querés agregar otro producto?");
}

console.log("🛒 Productos en tu carrito:", carrito);
alert("Gracias por tu compra. Revisá la consola para ver tu carrito.");
