import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

//Creando una función asíncron.
const obtenerInformacion = async () => {
  //Obtenemos la URL con el id.
  const url = new URL(window.location);
  //url.searchParam.get(id) Para buscar el id por parametro (url?id=id).
  const id = url.searchParams.get("id");

  if (id == null) {
    window.location.href = "error.html";
  }

  const nombre = document.querySelector("[data-nombre]");
  const email = document.querySelector("[data-email]");

  try {
    //Usando un await (sustituye el then) para esperar respuesta del servidor.
    const perfil = await clientServices.detalleCliente(id);
    if (perfil.nombre && perfil.email) {
      nombre.value = perfil.nombre;
      email.value = perfil.email;
    } else {
      throw new Error();
    }
  } catch (error) {
    window.location.href = "error.html";
  }
};

obtenerInformacion();

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  const nombre = document.querySelector("[data-nombre]").value;
  const email = document.querySelector("[data-email]").value;

  try{
      await clientServices.actualizarCliente(nombre, email, id)
      window.location.href = "edicion_concluida.html";
  }catch(error){
    console.log(error);
    window.location.href = "error.html";
  }
  
  /* clientServices.actualizarCliente(nombre, email, id).then(() => {
    window.location.href = "edicion_concluida.html";
  }); */
});
