function aceptar() {
  document.querySelector('.buttons').style.display = 'none';
  document.getElementById('formulario').style.display = 'block';
}

function enviarFormulario() {
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  if (!nombre || !edad) {
    alert("Por favor, rellene ambos campos.");
    return;
  }
  document.getElementById('formulario').style.display = 'none';
  const mensaje = document.getElementById('mensaje');
  mensaje.style.display = 'block';
  mensaje.textContent = 'Dispensando boquilla';
  animarPuntos(mensaje, () => {
    iniciarMedicion();
  }, 3000);
}

function animarPuntos(elemento, callback, duracion = 3000) {
  let puntos = '';
  const baseTexto = elemento.textContent;
  const interval = setInterval(() => {
    puntos = puntos.length < 3 ? puntos + '.' : '';
    elemento.textContent = baseTexto + puntos;
  }, 500);
  setTimeout(() => {
    clearInterval(interval);
    callback();
  }, duracion);
}

function iniciarMedicion() {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = 'Midiendo su nivel de alcohol en aire...';

  const sople = document.getElementById('sople');
  sople.style.display = 'block';
  sople.textContent = '¡Sople!';
  sople.className = 'verde';

  setTimeout(() => {
    sople.textContent = '¡Pare!';
    sople.className = 'rojo';
    mostrarResultado();
  }, 10000);
}

function mostrarResultado() {
  const nivel = (Math.random()).toFixed(2);
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;

  const resultado = document.getElementById('resultado');
  resultado.style.display = 'block';
  resultado.innerHTML =
    `<p><strong>Nivel de alcohol:</strong> ${nivel}</p>
     <p><strong>Nombre:</strong> ${nombre}</p>
     <p><strong>Edad:</strong> ${edad}</p>`;

  document.getElementById('volverBtn').style.display = 'inline-block';

  // Enviar los datos a PHP usando fetch (sin mostrar ningún mensaje)
  fetch('guardar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `nombre=${encodeURIComponent(nombre)}&edad=${encodeURIComponent(edad)}&nivel=${encodeURIComponent(nivel)}`
  });
}

function volverAlInicio() {
  document.querySelector('.buttons').style.display = 'flex';
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('mensaje').style.display = 'none';
  document.getElementById('sople').style.display = 'none';
  document.getElementById('resultado').style.display = 'none';
  document.getElementById('volverBtn').style.display = 'none';
  document.getElementById('nombre').value = '';
  document.getElementById('edad').value = '';
}