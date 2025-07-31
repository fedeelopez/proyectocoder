// Obtener referencias
const form = document.querySelector("#form-contacto");
const output = document.querySelector("#salida");

let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

// Función para mostrar confirmación de contacto
function mostrarConfirmacionContacto(usuario) {
  Swal.fire({
    icon: 'success',
    title: '¡Mensaje enviado!',
    html: `
      <div class="text-start">
        <p>Gracias <strong>${usuario.nombre}</strong>,</p>
        <p>Te contactaremos a <em>${usuario.email}</em>.</p>
        <p><small>Fecha: ${usuario.fecha}</small></p>
      </div>
    `,
    confirmButtonText: 'Aceptar'
  });
}

// Función para guardar contacto en localStorage
function guardarContactoLocalStorage(usuario) {
  contactos.push(usuario);
  localStorage.setItem("contactos", JSON.stringify(contactos));
}

// Función para validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Función para validar formulario
function validarFormulario(nombre, email, mensaje) {
  if (nombre.trim() === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Campo requerido',
      text: 'Por favor ingresa tu nombre'
    });
    return false;
  }

  if (email.trim() === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Campo requerido',
      text: 'Por favor ingresa tu email'
    });
    return false;
  }

  if (!validarEmail(email)) {
    Swal.fire({
      icon: 'warning',
      title: 'Email inválido',
      text: 'Por favor ingresa un email válido'
    });
    return false;
  }

  if (mensaje.trim() === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Campo requerido',
      text: 'Por favor ingresa tu mensaje'
    });
    return false;
  }

  if (mensaje.trim().length < 10) {
    Swal.fire({
      icon: 'warning',
      title: 'Mensaje muy corto',
      text: 'El mensaje debe tener al menos 10 caracteres'
    });
    return false;
  }

  return true;
}

// Event listener para el formulario
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const email = document.querySelector("#email").value.trim();
  const mensaje = document.querySelector("#mensaje").value.trim();

  // Validar formulario
  if (!validarFormulario(nombre, email, mensaje)) {
    return;
  }

  // Mostrar loading
  Swal.fire({
    title: 'Enviando mensaje...',
    text: 'Por favor espera',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // Simular envío
  setTimeout(() => {
    const usuario = {
      nombre,
      email,
      mensaje,
      fecha: new Date().toLocaleString('es-AR'),
    };

    guardarContactoLocalStorage(usuario);
    mostrarConfirmacionContacto(usuario);
    form.reset();
  }, 1500);
});

// Función para mostrar historial de contactos
function mostrarHistorialContactos() {
  if (contactos.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Sin contactos',
      text: 'No hay mensajes de contacto guardados'
    });
    return;
  }

  const html = `
    <div class="text-start">
      <h6>Mensajes de contacto:</h6>
      ${contactos.map((contacto, index) => `
        <div class="border-bottom pb-2 mb-2">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <strong>${contacto.nombre}</strong><br>
              <small class="text-muted">${contacto.email}</small><br>
              <small class="text-muted">${contacto.fecha}</small>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="eliminarContacto(${index})">🗑️</button>
          </div>
          <p class="mt-2 mb-0"><small>${contacto.mensaje}</small></p>
        </div>
      `).join('')}
    </div>
  `;

  Swal.fire({
    title: '📧 Historial de Contactos',
    html: html,
    width: '600px',
    confirmButtonText: 'Cerrar'
  });
}

// Función para eliminar contacto
function eliminarContacto(index) {
  const contacto = contactos[index];
  
  Swal.fire({
    title: '¿Eliminar contacto?',
    text: `¿Estás seguro de que quieres eliminar el contacto de ${contacto.nombre}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      contactos.splice(index, 1);
      localStorage.setItem("contactos", JSON.stringify(contactos));
      
      Swal.fire({
        icon: 'success',
        title: 'Contacto eliminado',
        text: 'El contacto ha sido eliminado correctamente',
        timer: 1500,
        showConfirmButton: false
      });
      
      mostrarHistorialContactos();
    }
  });
}

// Función para limpiar historial
function limpiarHistorialContactos() {
  if (contactos.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Sin contactos',
      text: 'No hay mensajes para eliminar'
    });
    return;
  }

  Swal.fire({
    title: '¿Limpiar historial?',
    text: '¿Estás seguro de que quieres eliminar todos los contactos? Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, limpiar todo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      contactos = [];
      localStorage.removeItem("contactos");
      
      Swal.fire({
        icon: 'success',
        title: 'Historial limpiado',
        text: 'Todos los contactos han sido eliminados',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Agregar botones para gestionar contactos si existen
  const botonHistorial = document.getElementById('ver-historial');
  if (botonHistorial) {
    botonHistorial.addEventListener('click', mostrarHistorialContactos);
  }
  
  const botonLimpiar = document.getElementById('limpiar-historial');
  if (botonLimpiar) {
    botonLimpiar.addEventListener('click', limpiarHistorialContactos);
  }
});

// Exportar funciones para uso global
window.mostrarHistorialContactos = mostrarHistorialContactos;
window.eliminarContacto = eliminarContacto;
window.limpiarHistorialContactos = limpiarHistorialContactos;
