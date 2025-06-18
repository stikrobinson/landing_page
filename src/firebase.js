import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
   appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializar la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtener referencia a la base de datos en tiempo real
const database = getDatabase(app);

// Ejemplo: referencia a una ruta específica
const dbRef = ref(database, 'solicitudes');

//Contenedor de las fotos en la seccion acerca de
  const contenedor = document.getElementById("galeria");

document.querySelector("button[type='submit']").addEventListener("click", () => {

  event.preventDefault();

  const name = document.querySelector("input[name='name']").value;
  const email = document.querySelector("input[name='email']").value;
  const phone = document.querySelector("input[name='phone']").value;
  const subject = document.querySelector("select[name='subject']").value;
  const message = document.querySelector("textarea[name='message']").value;
  

  const data = {
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    message: message,
  };

  push(dbRef, data);
  document.querySelector("form").reset();
});

// Ejemplo: crear datos
// set(dbRef, { ejemplo: "dato" });
// push(dbRef, { ejemplo: "dato nuevo" });

async function cargarImagenes() {
  let index = 0;
  try {
    const snapshot = await get(child(ref(database), 'imagenes_instagram'));
    if (snapshot.exists()) {
      const imagenes = snapshot.val();
      Object.values(imagenes).forEach(imagen => {
        const img = document.createElement("img");
        img.src = imagen.url;
        img.alt = imagen.descripcion;
        img.className = "w-full rounded shadow-lg";
        console.log(img);
        contenedor.appendChild(img);
      });

      setInterval(() => {
         index = (index + 1) % contenedor.children.length;
        contenedor.style.transform = `translateX(-${index * 100}%)`;
      }, 3000);

    } else {
      console.log("No hay imágenes.");
    }
  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
  }
}

(function () {
  cargarImagenes();
})();

