# 🛍️ Termo Tienda - E-commerce de Productos Térmicos

## 📋 Descripción del Proyecto

**Termo Tienda** es una aplicación web de e-commerce desarrollada con HTML, CSS y JavaScript que simula una tienda online especializada en productos térmicos como termos, botellas, vasos y accesorios para mate.

## ✨ Características Principales

### 🛒 Sistema de E-commerce Completo
- **Catálogo de productos** con datos remotos (JSON)
- **Carrito de compras** funcional con localStorage
- **Proceso de compra** simulado con SweetAlert2
- **Filtros por categorías** de productos
- **Gestión de cantidades** y eliminación de productos

### 🎨 Interfaz Moderna y Responsive
- **Diseño responsive** para móviles, tablets y desktop
- **Animaciones suaves** y efectos hover
- **UI/UX optimizada** con Bootstrap 5
- **Notificaciones elegantes** con SweetAlert2

### 📱 Funcionalidades Avanzadas
- **HTML dinámico** generado desde JavaScript
- **Datos remotos** simulados con archivos JSON
- **Validación de formularios** completa
- **Gestión de contactos** con historial
- **Persistencia de datos** en localStorage

## 🚀 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsive
- **JavaScript ES6+** - Funcionalidad dinámica
- **Bootstrap 5** - Framework CSS
- **SweetAlert2** - Notificaciones elegantes

### Herramientas de Desarrollo
- **SASS/SCSS** - Preprocesador CSS
- **Git** - Control de versiones
- **Responsive Design** - Mobile-first approach

## 📁 Estructura del Proyecto

```
DESARROLLO WEB PROYETO/
├── assets/                 # Imágenes y recursos
├── css/                   # Estilos compilados
├── data/                  # Datos JSON
│   └── productos.json    # Catálogo de productos
├── js/                   # Scripts JavaScript
│   ├── script.js        # Página principal
│   ├── productos.js     # Página de productos
│   ├── carrito.js       # Funcionalidad del carrito
│   └── contacto.js      # Formulario de contacto
├── pages/               # Páginas HTML
│   ├── productos.html  # Catálogo de productos
│   ├── contacto.html   # Formulario de contacto
│   ├── empresa.html    # Información de la empresa
│   └── destacados.html # Productos destacados
├── scss/               # Archivos SASS
├── index.html          # Página principal
└── README.md          # Documentación
```

## 🛠️ Funcionalidades Implementadas

### 1. **Sistema de Productos**
- ✅ Carga de datos desde JSON remoto
- ✅ Generación dinámica de HTML
- ✅ Filtros por categorías
- ✅ Detalles de productos con modales
- ✅ Gestión de cantidades

### 2. **Carrito de Compras**
- ✅ Agregar/eliminar productos
- ✅ Modificar cantidades
- ✅ Cálculo automático de totales
- ✅ Persistencia en localStorage
- ✅ Proceso de compra simulado

### 3. **Formulario de Contacto**
- ✅ Validación completa de campos
- ✅ Validación de email
- ✅ Historial de contactos
- ✅ Gestión de mensajes
- ✅ Notificaciones elegantes

### 4. **Interfaz de Usuario**
- ✅ Diseño responsive
- ✅ Animaciones suaves
- ✅ Efectos hover
- ✅ Navegación intuitiva
- ✅ Notificaciones toast

## 🎯 Criterios de Evaluación Cumplidos

### ✅ **Funcionalidad**
- Simulación completa del flujo de trabajo entrada-procesamiento-salida
- Sin errores de cómputo
- Lógica de negocio implementada (e-commerce)

### ✅ **Interactividad**
- Captura de entradas con inputs y eventos
- Salidas coherentes y visualización asíncrona
- HTML generado dinámicamente desde JavaScript

### ✅ **Escalabilidad**
- Funciones con parámetros para tareas específicas
- Objetos con propiedades y métodos relevantes
- Arrays para agrupar valores dinámicamente
- Recorrido óptimo de colecciones

### ✅ **Integridad**
- Código JavaScript en archivos .js separados
- Información estática en formato JSON
- Carga asíncrona de datos
- Referencias correctas desde HTML

### ✅ **Legibilidad**
- Nombres significativos para variables, funciones y objetos
- Instrucciones legibles y comentarios oportunos
- Código ordenado en declaración y secuencia
- Patrón "acción + sustantivo" en nombres de funciones

## 🚀 Cómo Ejecutar el Proyecto

1. **Clonar o descargar** el proyecto
2. **Abrir** `index.html` en un navegador web
3. **Navegar** por las diferentes secciones
4. **Probar** las funcionalidades del carrito y contacto

## 📱 Funcionalidades por Página

### 🏠 **Página Principal (index.html)**
- Banner hero con animaciones
- Productos destacados cargados dinámicamente
- Navegación a otras secciones
- Información de la empresa en modal

### 🛍️ **Página de Productos (productos.html)**
- Catálogo completo con filtros
- Tarjetas de productos interactivas
- Sistema de carrito integrado
- Proceso de compra simulado

### 📞 **Página de Contacto (contacto.html)**
- Formulario con validación completa
- Historial de mensajes
- Gestión de contactos
- Notificaciones elegantes

## 🎨 Características de Diseño

### **Paleta de Colores**
- **Primario**: #007C91 (Azul térmico)
- **Secundario**: #004D5E (Azul oscuro)
- **Acento**: #28a745 (Verde éxito)
- **Neutro**: #f8f9fa (Gris claro)

### **Tipografías**
- **Títulos**: Barriecito (cursiva)
- **Cuerpo**: Poppins (sans-serif)

### **Animaciones**
- FadeInUp para elementos
- Hover effects en botones
- Transiciones suaves
- Animaciones de carrito

## 📊 Estructura de Datos

### **Productos (productos.json)**
```json
{
  "id": 1,
  "nombre": "Termo + Mate",
  "precio": 35000,
  "categoria": "termos",
  "descripcion": "Termo de acero inoxidable con mate incluido",
  "caracteristicas": ["Termo 1L", "Mate + Bombilla", "Acero Inoxidable"],
  "imagen": "../assets/combo matero.jpeg",
  "destacado": true
}
```

### **Categorías**
- Termos
- Combos
- Botellas
- Sets
- Accesorios
- Vasos

## 🔧 Funciones Principales

### **Gestión de Productos**
- `cargarDatosRemotos()` - Carga productos desde JSON
- `mostrarProductos()` - Renderiza catálogo
- `filtrarPorCategoria()` - Filtra por categoría

### **Carrito de Compras**
- `agregarProductoCarrito()` - Agrega productos
- `eliminarProductoCarrito()` - Elimina productos
- `procesarCompra()` - Simula proceso de compra

### **Contacto**
- `validarFormulario()` - Valida campos
- `mostrarHistorialContactos()` - Muestra historial
- `guardarContactoLocalStorage()` - Guarda contactos

## 📈 Mejoras Futuras

- [ ] Integración con API real
- [ ] Sistema de usuarios
- [ ] Pasarela de pagos
- [ ] Panel de administración
- [ ] Sistema de reviews
- [ ] Wishlist de productos
- [ ] Búsqueda avanzada
- [ ] Filtros de precio

## 👨‍💻 Autor

**Federico López** | Coder 75710

---

## 📝 Notas de Desarrollo

Este proyecto fue desarrollado como parte del curso de JavaScript, implementando todas las mejores prácticas y criterios de evaluación solicitados. El código está optimizado para rendimiento, mantenibilidad y escalabilidad.

### **Patrones de Diseño Utilizados**
- **Clases ES6** para productos y carrito
- **Módulos** para separación de responsabilidades
- **Event-driven programming** para interactividad
- **LocalStorage** para persistencia de datos

### **Optimizaciones Implementadas**
- **Lazy loading** de imágenes
- **Debouncing** en filtros
- **Memoización** de cálculos
- **Clean code** principles 