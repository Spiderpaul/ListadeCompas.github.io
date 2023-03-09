//Petición al servidor usamdp Fetch para mostrar lista.
//Fetch utiliza el método GET por defecto.
const listaClientes = () =>
  fetch("http://localhost:3000/perfil").then((respuesta) => respuesta.json());

//Para crear un nuevo registro.
const crearCliente = (nombre, email) => {
  //Agregamos el método POST en la petición del fetch, en forma de objeto.
  return fetch("http://localhost:3000/perfil", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ nombre, email, id: uuid.v4() }), //Formateamos el objeto a texto.
  });
};

//Para eliminar registro.
const eliminarCliente = (id) => {
  //La petición en este caso solo requiere el http y method
  return fetch(`http://localhost:3000/perfil/${id}`, {
    method: "DELETE",
  });
};

const detalleCliente = (id) => {
  return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta) =>
    respuesta.json()
  );
};

const actualizarCliente = (nombre, email, id) => {
  return fetch(`http://localhost:3000/perfil/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, email }),
  })
    .then((respuesta => respuesta))
    .catch((err => console.log(err)));
};

//Para exportar los métodos al client controller.
export const clientServices = {
  listaClientes, //listaClientes: listaClientes,
  crearCliente,
  eliminarCliente,
  detalleCliente,
  actualizarCliente,
};
