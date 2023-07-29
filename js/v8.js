const tragos = [
  {
    id: 1,
    img: "./assets/imgs/fernet-catalogo.png",
    nombre: 'Fernet',
    precio: 900,
  },
  {
    id: 2,
    img: "./assets/imgs/gin.jpeg",
    nombre: 'Gin Aconcagua',
    precio: 1300,
  },
  {
    id: 3,
    img: "./assets/imgs/vino-toro.webp",
    nombre: 'Vino Toro',
    precio: 700,
  },
  {
    id: 4,
    img: "./assets/imgs/jack-daniels-catalogo.png",
    nombre: 'Jack Daniels',
    precio: 1600,
  }
];

const carritoTragosContainer = document.getElementById('containerTragos');
const catalogoV8 = document.getElementById('catalogo-v8__div');
const counterTragos = document.getElementById('counterTragos')
const btnVaciarCart = document.getElementById('vaciarCartV8')
let cartTragosV8 = JSON.parse(localStorage.getItem('carritoTragos')) || [];

tragos.forEach((trago) => {
  const div = document.createElement('div');
  div.classList.add('card');
  div.classList.add('gx-2');
  div.innerHTML = `<img src="${trago.img}" class="card-img-top" alt="${trago.nombre}">
    <div class="card-body">
    <h5 class="card-title">${trago.nombre}</h5>
    <p class="card-text">${trago.precio} AR$</p>
    <button href="" class="btn btn-danger">COMPRAR</button>
    <button href="" class="btn btn-add btn-danger" id="${trago.id}">AÑADIR AL CARRITO</button>
    </div>`;
  catalogoV8.appendChild(div);
});

const buttonAdd = document.querySelectorAll('.btn-add');
buttonAdd.forEach((boton) => {
  boton.addEventListener("click", (evento) => {
    addToCart(evento.target.id);
  });
});

function addToCart(id) {
  const tragoExiste = cartTragosV8.some((trago) => trago.id === parseInt(id))
  if (tragoExiste) {
    alert("No podes añadir dos veces el mismo trago estúpido de mierda!")
  } else {
    let tragoToAdd = tragos.find(trago => trago.id === parseInt(id))
    cartTragosV8.push(tragoToAdd);
    alert("Felicidades! Añadiste " + tragoToAdd.nombre + " a tu carrito.")
    localStorage.setItem("carritoTragos", JSON.stringify(cartTragosV8))
 
  }

  mostrarCarrito()
}

// function 


function mostrarCarrito() {
  carritoTragosContainer.innerHTML = ""
  counterTragos.innerHTML = `(${cartTragosV8.length})`
  if (cartTragosV8.length === 0) {
    carritoTragosContainer.innerHTML = `<p class="p-rojo">Tu carrito está vacío!</p>`
  } else {
    cartTragosV8.forEach((trago) => {
      const divTrago = document.createElement('div')
      divTrago.classList.add('card')
      divTrago.classList.add('mt-3')
      divTrago.innerHTML = `<img src="${trago.img}" class="card-img-top" alt="${trago.nombre}">
      <div class="card-body">
      <h5 class="card-title">${trago.nombre}</h5>
      <p class="card-text">${trago.precio} AR$</p>
      <a href="" class="btn btn-danger">COMPRAR</a>
      <button href="" class="btn btn-remove btn-danger" data-id=${trago.id} id="${trago.id}">ELIMINAR</button>
      </div>`
      carritoTragosContainer.append(divTrago)
      const buttonEliminar = document.querySelectorAll('.btn-remove')
      buttonEliminar.forEach((boton) => {
        boton.addEventListener("click", removeTrago)
      })
    })
  }
}

function removeTrago(e) {
  const tragoToDelete = cartTragosV8.filter((trago) => trago.id === parseInt(e.target.dataset.id))
  const indice = cartTragosV8.indexOf(tragoToDelete)
  cartTragosV8.splice(indice, 1)
  localStorage.setItem("carritoTragos", JSON.stringify(cartTragosV8))
  mostrarCarrito()
}

btnVaciarCart.addEventListener("click", () => {
  cartTragosV8.splice(0, cartTragosV8.length)
  localStorage.setItem('carritoTragos', JSON.stringify(cartTragosV8))
  mostrarCarrito()
})


mostrarCarrito()