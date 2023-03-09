import { clientServices } from "../service/client-service.js";

//Tomando la tabla desde el HTML
const formulario = document.querySelector("[data-form]");

//Evento "submit" de la tabla.
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault(); //Para evitar que trate de cambiar de página. 
  //Obteniendo los valores introducidos.
  const nombre = document.querySelector("[data-nombre]").value;
  const email = document.querySelector("[data-email]").value;
  
  try{
    await clientServices.crearCliente(nombre, email)  
    window.location.href = "registro_completado.htmL";
  }catch(error){
    console.log(error)
    window.location.href = "error.html";
  }

  /* clientServices
    .crearCliente(nombre, email)
    .then(() => {
        window. location.href = "registro_completado.htmL";
    })
    .catch((err) => console.log(err)); */
});
