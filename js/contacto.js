// Obtener referencias
const form = document.querySelector("#form-contacto");
const output = document.querySelector("#salida");

let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

function mostrarConfirmacion(usuario) {
  output.innerHTML = `
    <div class="alert alert-success mt-3">
      Gracias <strong>${usuario.nombre}</strong>, te contactaremos a <em>${usuario.email}</em>.
    </div>
  `;
}

function guardarEnLocalStorage(usuario) {
  contactos.push(usuario);
  localStorage.setItem("contactos", JSON.stringify(contactos));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const email = document.querySelector("#email").value.trim();
  const mensaje = document.querySelector("#mensaje").value.trim();

  if (nombre === "" || email === "" || mensaje === "") return;

  const usuario = {
    nombre,
    email,
    mensaje,
    fecha: new Date().toLocaleString(),
  };

  guardarEnLocalStorage(usuario);
  mostrarConfirmacion(usuario);
  form.reset();
});
