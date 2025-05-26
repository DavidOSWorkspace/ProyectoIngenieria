function mostrarPantallaPrincipal() {
  console.log('Pantalla principal activada');
  document.getElementById('pantallaInicio').style.display = 'none';
  document.getElementById('inicio').style.display = 'block';
}
    function volverPantallaInicio() {
      document.querySelectorAll('.pantalla').forEach(e => e.style.display = 'none');
      document.getElementById('pantallaInicio').style.display = 'flex';
    }

    function mostrarUsuario() {
      document.getElementById('inicio').style.display = 'none';
      document.getElementById('usuarioSection').style.display = 'block';
    }

    function mostrarLogin() {
      document.getElementById('inicio').style.display = 'none';
      document.getElementById('login').style.display = 'block';
    }

    function mostrarFormulario() {
      document.getElementById('usuarioSection').style.display = 'none';
      document.getElementById('formulario').style.display = 'block';
    }

    function loginAdmin() {
      const usuario = document.getElementById('usuario').value;
      const contrasena = document.getElementById('contrasena').value;
      const errorLogin = document.getElementById('errorLogin');

      fetch('admin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `usuario=${encodeURIComponent(usuario)}&contrasena=${encodeURIComponent(contrasena)}`
      })
      .then(response => response.text())
      .then(data => {
        if (data.includes('<table')) {
          document.getElementById('login').style.display = 'none';
          document.getElementById('tablaRegistros').style.display = 'block';
          document.getElementById('tablaRegistros').innerHTML = data + '<br><button onclick=\"volverPantallaInicio()\">Volver al inicio</button>';
        } else {
          errorLogin.style.display = 'block';
        }
      });
    }

    function enviarFormulario() {
      const nombre = document.getElementById('nombre').value;
      const edad = parseInt(document.getElementById('edad').value);
      const errorEdad = document.getElementById('errorEdad');
      const formulario = document.getElementById('formulario');

      if (!nombre || isNaN(edad)) {
        alert("Por favor, rellene ambos campos.");
        return;
      }

      if (edad < 18) {
        formulario.classList.add('error');
        errorEdad.style.display = 'block';
        return;
      } else {
        formulario.classList.remove('error');
        errorEdad.style.display = 'none';
      }

      formulario.style.display = 'none';
      document.getElementById('pantallaProceso').style.display = 'flex';

      const mensaje = document.getElementById('mensaje');
      mensaje.textContent = 'Dispensando boquilla';
      animarPuntos(mensaje, () => {
        iniciarMedicion(nombre, edad);
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

    function iniciarMedicion(nombre, edad) {
      const mensaje = document.getElementById('mensaje');
      mensaje.textContent = 'Midiendo su nivel de alcohol en aire...';

      const sople = document.getElementById('sople');
      sople.style.display = 'block';
      sople.textContent = '¡Sople!';
      sople.className = 'verde';

      setTimeout(() => {
        sople.textContent = '¡Pare!';
        sople.className = 'rojo';
        mostrarResultado(nombre, edad);
      }, 10000);
    }
   function mostrarResultado(nombre, edad) {
    document.getElementById('mensaje').textContent = '';
      const nivel = (Math.random()).toFixed(2);
      const resultado = document.getElementById('resultado');
      resultado.style.display = 'block';
      resultado.innerHTML =
        `<p><strong>Nivel de alcohol:</strong> ${nivel}</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Edad:</strong> ${edad}</p>`;

      document.getElementById('volverBtn').style.display = 'inline-block';

      fetch('guardar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `nombre=${encodeURIComponent(nombre)}&edad=${encodeURIComponent(edad)}&nivel=${encodeURIComponent(nivel)}`
      });
    }
