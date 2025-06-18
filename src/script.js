"use strict";

const asignarEnBotones = () => {
  const reservarClase = document.querySelector("#reservar-clase");
  const reservarClases = document.querySelector("#reservar-clases");
  const reservarPresencial = document.querySelector("#reservar-presencial");
  const select = document.querySelector("select[name='subject']");


  reservarClase.addEventListener("click", () => {
    select.selectedIndex = 2;
  });

  reservarClases.addEventListener("click", () => {
    select.selectedIndex = 3;
  });

  reservarPresencial.addEventListener("click", () => {
    select.selectedIndex = 4;
  });

};

console.log("Asignando eventos a los botones...");

(function() {
  asignarEnBotones();
})();


