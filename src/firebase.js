import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtener referencia a la base de datos en tiempo real
const database = getDatabase(app);

// Ejemplo: referencia a una ruta específica
const dbRef = ref(database, 'solicitudes');

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
