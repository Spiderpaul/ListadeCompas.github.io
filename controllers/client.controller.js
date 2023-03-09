import { clientServices } from "../service/client-service.js";

//Manipulación del DOM.
const crearNuevaLinea = (nombre, email, id) => {
  const linea = document.createElement("tr");
  const contenido = `
      <td class="td" data-td>${nombre}</td>
      <td>${email}</td>
      <td>
        <ul class="table__button-control">
          <li>
            <a
              href="/editar_cliente.html?id=${id}"
              class="simple-button simple-button--edit"
              >Editar</a
            >
          </li>
          <li>
            <button
              class="simple-button simple-button--delete"
              type="button"
              id="${id}"
            >
              Eliminar
            </button>
          </li>
        </ul>
      </td>`;

      //Para pintar el contenido de la fila.
  linea.innerHTML = contenido;

  //Obteniendo el botón.
  const btn = linea.querySelector("button");
  //Evento de click en el botón. 
  btn.addEventListener("click", async () => {
    //Obteniendo el id del botón.
    const id = btn.id;

    try{
      const respuesta = await clientServices.eliminarCliente(id)
      console.log(respuesta);
    }catch(error){
      console.log(error);
      window.location.href = "error.html";
    }
    
    /* clientServices
      .eliminarCliente(id)
      .then((respuesta) => {
        console.log(respuesta);
      })
      .catch((err = alert(err)));
    */
  }); 

  return linea;
};

//Para obtener la tabla. 
const table = document.querySelector("[data-table]");

//Para mostrar la lista en la página.
//EL response (respuesta) se convierte en data.
clientServices
  .listaClientes()
  .then((data) => {
    //Destructurar
    data.forEach(({ nombre, email, id }) => {
      //Sustituimos perfil por {nombre, email, id}.
      const nuevaLinea = crearNuevaLinea(nombre, email, id); //perfil.nombre, perfil.email...
      table.appendChild(nuevaLinea);
    });
  })
  .catch((error) => alert("Ocurrió un error"));
