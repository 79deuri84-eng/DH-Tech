// D.H Tech — interacciones del sitio (proyecto académico)
document.addEventListener("DOMContentLoaded", () => {
  const errorScreen = document.getElementById("errorScreen");
  const recoverButton = document.getElementById("recoverButton");

  // Pantalla de error inicial: el usuario la cierra con un clic.
  if (errorScreen && recoverButton) {
    recoverButton.addEventListener("click", () => {
      errorScreen.classList.add("recovered");
      document.body.classList.add("system-recovered");
    });
  }

  // Menú móvil.
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });
  }

  // Modo claro/oscuro. La clase se aplica al documento actual.
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const lightOn = document.body.classList.contains("light-theme");
      themeToggle.textContent = lightOn ? "☀ Tema claro" : "◐ Tema oscuro";
    });
  }

  // Año automático en el pie de página.
  document.querySelectorAll(".year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Easter egg: escribe FENIX en cualquier parte de la página.
  let secretKeys = "";
  const toast = document.getElementById("secretToast");
  let toastTimer;
  document.addEventListener("keydown", event => {
    if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
      secretKeys = (secretKeys + event.key.toUpperCase()).slice(-5);
      if (secretKeys === "FENIX" && toast) {
        toast.classList.add("show");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4500);
        secretKeys = "";
      }
    }
  });

  // Formulario de demostración: no envía ni guarda datos en un servidor.
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      formStatus.textContent = `¡Gracias${name ? ", " + name : ""}! Tu consulta de demostración está lista. Este formulario no envía datos reales.`;
      contactForm.reset();
    });
  }

  // Chatbot local basado en palabras clave; no usa una API externa.
  const chatLauncher = document.getElementById("chatLauncher");
  const chatPanel = document.getElementById("chatPanel");
  const chatClose = document.getElementById("chatClose");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  if (chatLauncher && chatPanel) {
    chatLauncher.addEventListener("click", () => {
      chatPanel.hidden = !chatPanel.hidden;
      if (!chatPanel.hidden && chatInput) chatInput.focus();
    });
  }
  if (chatClose && chatPanel) {
    chatClose.addEventListener("click", () => { chatPanel.hidden = true; });
  }

  function addChatMessage(text, className) {
    if (!chatMessages) return;
    const message = document.createElement("p");
    message.className = className;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotReply(question) {
    const q = question.toLowerCase();
    if (q.includes("precio") || q.includes("costo") || q.includes("cuánto")) {
      return "El costo depende del equipo y la avería. Lo recomendable es solicitar un diagnóstico y confirmar el precio antes de autorizar la reparación.";
    }
    if (q.includes("celular") || q.includes("teléfono") || q.includes("pantalla") || q.includes("batería")) {
      return "Podemos evaluar fallas comunes de celulares y tabletas, como carga, pantalla o batería. Visita Servicios para ver los ejemplos.";
    }
    if (q.includes("computadora") || q.includes("laptop") || q.includes("pc")) {
      return "La sección Servicios incluye ejemplos de revisión de computadoras, laptops y problemas de funcionamiento.";
    }
    if (q.includes("seguridad") || q.includes("respaldo") || q.includes("contraseña")) {
      return "Consejo Rescue: usa contraseñas únicas, activa la verificación en dos pasos y conserva copias de seguridad actualizadas.";
    }
    if (q.includes("horario") || q.includes("abren") || q.includes("ubicación") || q.includes("dirección")) {
      return "La información de ubicación y horario es ilustrativa para esta práctica: Bajo de Haina, de lunes a sábado, 9:00 a. m. a 6:00 p. m.";
    }
    if (q.includes("contacto") || q.includes("correo") || q.includes("hablar")) {
      return "Puedes usar la página Contacto para probar el formulario. Recuerda que no envía información a un servidor real.";
    }
    if (q.includes("historia") || q.includes("usb") || q.includes("desapareció") || q.includes("misterio")) {
      return "La historia cuenta que nuestra web desapareció y apareció un USB misterioso. Es una narración ficticia creada para la tarea.";
    }
    return "Puedo orientarte sobre celulares, computadoras, costos, seguridad, horarios o la historia del misterio. ¿Qué te gustaría saber?";
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", event => {
      event.preventDefault();
      const question = chatInput.value.trim();
      if (!question) return;
      addChatMessage(question, "user-message");
      addChatMessage(getBotReply(question), "bot-message");
      chatInput.value = "";
      chatInput.focus();
    });
  }
});
