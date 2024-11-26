// Menu Hamburguesa
document.addEventListener("DOMContentLoaded", function () {
    const botonHamburguesa = document.querySelector(".hamburguesa");
    const menu = document.querySelector(".menu");
  
    botonHamburguesa.addEventListener("click", function () {
      menu.classList.toggle("abierto"); // Activa o desactiva la clase 'abierto'
    });
  });
  
  // Cambio de inicio a registro
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".login-container");
  const sign_in_btn2 = document.querySelector("#sign-in-btn2");
  const sign_up_btn2 = document.querySelector("#sign-up-btn2");
  
  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });
  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });
  sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
  });
  sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-in-mode2");
  });
  
  // Integración con el backend: Renderizar categorías dinámicamente
  const renderCategories = async () => {
    try {
      // Realiza la petición al backend
      const response = await fetch("http://localhost:5000/api/categories");
      const categories = await response.json();
  
      // Selecciona el elemento <main> donde se mostrarán las categorías
      const main = document.querySelector("main");
      main.innerHTML = ""; // Limpia el contenido existente
  
      // Recorre las categorías y crea dinámicamente los elementos HTML
      categories.forEach((category) => {
        const section = document.createElement("section");
        section.className = "categoria";
        section.id = category.name.toLowerCase();
  
        section.innerHTML = `
          <h2>${category.name}</h2>
          <p>${category.description}</p>
          <a href="apartamentosc.html">
            <img src="${category.image}" alt="${category.name}" class="imagen-categoria" />
          </a>
        `;
  
        main.appendChild(section); // Agrega la sección al <main>
      });
    } catch (error) {
      console.error("Error al cargar las categorías desde el backend:", error);
    }
  };
  
  // Llama a la función para renderizar las categorías al cargar la página
  renderCategories();
  
  // Scroll Infinito
  let imagenes = [];
  let indiceImagenActual = 0;
  let page = 1; // Número de página inicial
  const perPage = 2; // Número de imágenes por página
  
  // Función para cargar imágenes desde un archivo JSON o backend (ajustar según tu caso)
  function loadImages() {
    fetch("/js/imagenes.json") // Cambia esto si las imágenes provienen del backend
      .then((response) => response.json())
      .then((data) => {
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const images = data.slice(startIndex, endIndex);
        displayImages(images); // Función para mostrar imágenes en la página
        page++; // Incrementa el número de página para la próxima carga
      })
      .catch((error) => {
        console.error("Error al cargar imágenes:", error);
      });
  }
  
  // Función para mostrar imágenes en la página
  function displayImages(images) {
    const galeria = document.getElementById("galeria");
  
    images.forEach((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = image.url;
      imgElement.alt = image.alt;
      galeria.appendChild(imgElement);
    });
  }
  
  // Función para verificar si el usuario ha llegado al final de la página
  window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
      loadImages(); // Carga más imágenes cuando el usuario llega al final
    }
  });
  
  // Carga las primeras imágenes al cargar la página
  loadImages();
  
  // Mostrar el modal cuando se hace clic en una imagen
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("imagen-pequena")) {
      const src = event.target.getAttribute("src");
      imagenes = Array.from(document.querySelectorAll(".imagen-pequena")).map(
        (img) => img.getAttribute("src")
      );
      indiceImagenActual = imagenes.indexOf(src);
      mostrarImagen(indiceImagenActual);
      document.getElementById("modal").style.display = "block";
    }
  });
  
  // Función para mostrar la imagen en el modal
  function mostrarImagen(indice) {
    document.getElementById("imagen-ampliada").setAttribute("src", imagenes[indice]);
  }
  
  // Función para cambiar la imagen en el modal
  function cambiarImagen(direccion) {
    indiceImagenActual += direccion;
    if (indiceImagenActual < 0) {
      indiceImagenActual = imagenes.length - 1;
    } else if (indiceImagenActual >= imagenes.length) {
      indiceImagenActual = 0;
    }
    mostrarImagen(indiceImagenActual);
  }
  
  // Cerrar el modal cuando se hace clic en la "X"
  document.querySelector(".cerrar-modal").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
  });
  
  // Seleccionar los enlaces del menú
  const enlaces = document.querySelectorAll(".menu-categorias a");
  
  // Escuchar el evento de clic en cada enlace
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault(); // Prevenir el comportamiento por defecto
  
      // Obtener la sección destino del enlace
      const seccionDestino = document.querySelector(enlace.getAttribute("href"));
  
      // Desplazar suavemente hacia la sección destino
      seccionDestino.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  
      // Resaltar el enlace activo
      enlaces.forEach((link) => link.classList.remove("active"));
      enlace.classList.add("active");
    });
  });
  
  // Resaltar automáticamente según la sección visible al hacer scroll
  window.addEventListener("scroll", () => {
    const secciones = document.querySelectorAll(".categoria");
    let scrollPos = window.scrollY;
  
    secciones.forEach((seccion) => {
      const offsetTop = seccion.offsetTop - 100; // Ajuste para el menú sticky
      const offsetBottom = offsetTop + seccion.offsetHeight;
  
      const enlace = document.querySelector(
        `.menu-categorias a[href="#${seccion.id}"]`
      );
  
      if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
        enlaces.forEach((link) => link.classList.remove("active"));
        enlace.classList.add("active");
      }
    });
  });
  
  // Validación del formulario
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío si hay errores
    const email = document.querySelector("#email").value;
    const nombre = document.querySelector("#nombre").value;
  
    if (!email.includes("@")) {
      alert("Por favor ingresa un correo electrónico válido.");
      return;
    }
  
    if (nombre.trim() === "") {
      alert("El campo de nombre no puede estar vacío.");
      return;
    }
  
    // Si todo está bien, envía el formulario
    alert("Formulario enviado correctamente.");
    this.submit();
  });
  
  // Desplazamiento suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
  
  const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '193.203.175.73', // Cambia al hostname proporcionado
  user: 'u570384874_designcreation', // Usuario creado
  password: 'Eldelas2cabezasdetoro*', // Contraseña creada
  database: 'u570384874_hospedaje'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos.');
});
