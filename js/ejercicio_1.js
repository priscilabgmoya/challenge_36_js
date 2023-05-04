class Contacto {
  #nombre;
  #telefono;
  constructor(nombre, telefono) {
    this.#nombre = nombre.toLowerCase();
    this.#telefono = telefono;
  }
  get getNombre() {
    return this.#nombre;
  }
  get getTelefono() {
    return this.#telefono;
  }
}

class AgendaTelefonica {
  #propietario;
  #agenda;
  constructor(propietario) {
    this.#propietario = propietario.toLowerCase();
    this.#agenda = []
  }
  aniadirContacto(contactoNuevo) {
    let buscarContacto = this.#agenda.find((contacto) => contacto.getNombre === contactoNuevo.getNombre);
    if (buscarContacto) return "Error: Ya existe el contacto!";
    if (this.#agenda.length <= 9) {
      this.#agenda.push(contactoNuevo);
      return "Contacto Agregado!";
    } else {
      return "Agenda Llena!";
    }
  }
  existeContacto(contactoExistente) {
    let contactoEncontrado = this.#agenda.find((contacto) => contactoExistente === contacto);
    if (contactoEncontrado) {
      return `Si existe el contacto!. Sus datos son: Nombre: ${contactoEncontrado.getNombre} - Telefono: ${contactoEncontrado.getTelefono}`;
    } else {
      return "No se encontro Contacto!";
    }
  }
  listarContacto(padre) {
    let h3 = document.createElement('h3');
    h3.innerText = `Listado de Contactos de ${this.#propietario}: `;
    padre.appendChild(h3);
    let ol = document.createElement('ol');
    this.#agenda.forEach((contacto) => {
      let li = document.createElement('li');
      li.innerText = ` Nombre: ${contacto.getNombre} - Telefono: ${contacto.getTelefono}`;
      ol.appendChild(li);
    });
    padre.appendChild(ol);
  }
  buscarContacto(nombre) {
    let contactoEncontrado = this.#agenda.find(
      (contacto) => contacto.getNombre === nombre
    );
    if (contactoEncontrado) {
      return `Si existe el contacto!. Su Telefono es: ${contactoEncontrado.getTelefono}`;
    } else {
      return "No se encontro Contacto!" ;
    }
  }
  eliminarContacto(contactoEliminado) {
    let nuevoArray = this.#agenda.filter((contacto) => contacto.getNombre !== contactoEliminado);
    if (!nuevoArray.includes(contactoEliminado)) {
      this.#agenda = nuevoArray;
      return`Se elimino el contacto: ${contactoEliminado}`;
    } else {
      return "No se elimino el contacto";
    }
  }
  agendaLlena() {
    if (this.#agenda.length === 10) {
    return "Agenda Llena!";
    } else {
      return "Todavia queda espacio para guardar contactos!";
    }
  }
  huecosLibres() {
    return`La cantidad de huecos libres para agregar es ${10 - this.#agenda.length}`;
  }
}

let agenda;

function crearAgenda() {
  let propietario = document.getElementById('inputNombrePropietario').value;
  if (propietario.length !== 0) {
    agenda = new AgendaTelefonica(propietario);
    alert(`Se creo una Agenda de contactos a nombre de ${propietario}`);
  } else {
    alert(`ERROR! Ingrese un nombre correcto `);
  }
}
function agregarContacto() {
  if(agenda== null ) return alert('No se creo todavia la agenda!');
  let nombreContacto = document.getElementById('inputNombreContacto').value, telefonoContacto = document.getElementById('inputTelefonoContacto').value;
  if (nombreContacto.length !== 0 && telefonoContacto.length !== 0) {
    let respuesta = agenda.aniadirContacto(new Contacto(nombreContacto, telefonoContacto));
    alert(respuesta);
  } else {
    alert(`ERROR! Ingrese un nombre y/o número correcto `);
  }
}
function existeContacto() {
  if(agenda== null) return alert('No se creo todavia la agenda!');
  let nombreContacto = document.getElementById('inputNombreContactoExistente').value, telefonoContacto = document.getElementById('inputTelefonoContactoExistente').value;
  if (nombreContacto.length !== 0 && telefonoContacto.length !== 0) {
    let respuesta = agenda.existeContacto(new Contacto(nombreContacto, telefonoContacto));
    let padreRespuesta = document.getElementById('resultadoBusquedaContactoExistente'); 
    eliminarHijos(padreRespuesta); 
    padreRespuesta.innerText = respuesta; 
  } else {
    alert(`ERROR! Ingrese un nombre y/o número correcto `);
  }
}
function listarContacto() {
  let padreContenedor = document.getElementById('listaContactos');
  if(agenda== null ) return padreContenedor.innerHTML ='<h2>No se creo todavia la agenda!</h2>';
  eliminarHijos(padreContenedor);
  agenda.listarContacto(padreContenedor);
}

function buscarContacto() {
  debugger
  if(agenda== null ) return alert('No se creo todavia la agenda!');
  let padreRespuesta = document.getElementById('resultadoBusquedaContacto'), nombreContacto = document.getElementById('inputNombreContactoBuscar').value;
  if(nombreContacto !== null){
    eliminarHijos(padreRespuesta); 
    let h2 = document.createElement('h2'); 
    h2.innerText = agenda.buscarContacto(nombreContacto);
    padreRespuesta.appendChild(h2); 
  }else{
    alert(`ERROR! Ingrese un nombre correcto `);
  }
}

function eliminarContacto() {
  if(agenda== null ) return alert('No se creo todavia la agenda!');
  let padreRespuesta = document.getElementById('resultadoContactoEliminado'), nombreContacto = document.getElementById('inputNombreContactoEliminar').value;
  if(nombreContacto !== null){
    eliminarHijos(padreRespuesta); 
    let h2 = document.createElement('h2'); 
    h2.innerText = agenda.eliminarContacto(nombreContacto);
    padreRespuesta.appendChild(h2); 
  }else{
    alert(`ERROR! Ingrese un nombre correcto `);
  }
}

function agendaLlena() {
  if(agenda== null ) return alert('No se creo todavia la agenda!');
  let padreRespuesta = document.getElementById('resultadoAgendaLlena');
  eliminarHijos(padreRespuesta); 
  let h2 = document.createElement('h2'); 
  h2.innerText = agenda.agendaLlena();
  padreRespuesta.appendChild(h2); 
}

function huecosLibre() {
  if(agenda== null ) return alert('No se creo todavia la agenda!');
  let padreRespuesta = document.getElementById('resultadoHuecosLibres');
  eliminarHijos(padreRespuesta); 
  let h2 = document.createElement('h2'); 
  h2.innerText = agenda.huecosLibres();
  padreRespuesta.appendChild(h2); 
}

function eliminarHijos(padre){
  while(padre.hasChildNodes()){
    padre.childNodes.forEach(hijo => hijo.remove());
  }
}