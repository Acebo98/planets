//Lista de objetos en la tienda
var objetos = [{
    nombre: "Carne de ternera",
    imagen: "ternera.jpg",
    descripcion: "Se llama carne de ternera a la carne de las vacas o bueyes que se han criado por lo menos seis meses de edad hasta el momento del sacrificio.",
    precio: 20,
}, {
    nombre: "Lentejas",
    imagen: "lentejas.jpg",
    descripcion: "La lenteja es una planta anual herbácea de la familia fabaceae, con tallos de 30 a 40 cm, endebles, ramosos y estriados, hojas oblongas, estípulas lanceoladas.",
    precio: 5,
}, {
    nombre: "Arroz",
    imagen: "arroz.jpg",
    descripcion: "El arroz es la semilla de la planta Oryza sativa o de Oryza glaberrima. Se trata de un cereal considerado alimento básico en muchas culturas culinarias, así como en algunas partes de América Latina.",
    precio: 12,
}, {
    nombre: "Tomates",
    imagen: "tomates.jpg",
    descripcion: "Solanum lycopersicum, cuyo fruto es el tomate, conocida comúnmente como tomatera, es una especie de planta herbácea del género Solanum de la familia Solanaceae.",
    precio: 24,
}, {
    nombre: "Pipas",
    imagen: "pipas.jpg",
    descripcion: "Las pipas, semillas de girasol o maravillas son semillas comestibles de los aquenios de la planta llamada comúnmente girasol.",
    precio: 2,
}, {
    nombre: "Pizza 4 quesos",
    imagen: "pizza.jpg",
    descripcion: "La pizza es una preparación culinaria que consiste en un pan plano, habitualmente de forma circular, elaborado con harina de trigo.",
    precio: 7.50,
}, {
    nombre: "Ketchup",
    imagen: "ketchup.jpg",
    descripcion: "Kétchup, cátchup o cátsup​ es una salsa agridulce de origen chino hecha de tomates, azúcar y vinagre, con condimentos y diversas especias.",
    precio: 8.75,
}, {
    nombre: "Manzanas",
    imagen: "manzana.jpg",
    descripcion: "La manzana es el fruto comestible de la especie Malus domestica, llamada comúnmente manzano.",
    precio: 1.5,
} ];

//Lista del carrito
var listaCarrito = [];

var tienda = document.querySelector("#tienda"); //Tienda

//Carrito
var carrito = document.querySelector("#carrito");
var btn_carrito = document.querySelector("#btn_carrito");
var isAppearing = 0;
btn_carrito.addEventListener("click", clickCarrito);

//Iniciamos la página web
window.onload = function() {
    for (let item of objetos) {
        anadirObjetoTienda(item);
    }
    actualizarCarrito(listaCarrito);
}

//Añadimos un objeto a la lista
function anadirObjetoTienda(objeto) {

    //Elemento contenedor
    let div = document.createElement("div");
    div.classList.add("catalogo");

    //Margen
    let divMargen = document.createElement("div");
    divMargen.classList.add("margen");
    div.appendChild(divMargen);

    //Nombre
    let h1 = document.createElement("h1");
    h1.innerHTML = objeto.nombre;
    divMargen.appendChild(h1);

    //Imagen
    let img = document.createElement("img");
    img.src = "images/" + objeto.imagen;
    divMargen.appendChild(img);

    //Descripcion
    let pDescripcion = document.createElement("p");
    pDescripcion.innerHTML = objeto.descripcion;
    divMargen.appendChild(pDescripcion);

    //Precio
    let pPrecio = document.createElement("p");
    pPrecio.innerHTML = "Precio unitario <span class='precio'>" + objeto.precio + "</span>";
    divMargen.appendChild(pPrecio);

    //Botón para añadir al carro
    let btnAnadir = document.createElement("button");
    btnAnadir.classList.add("btn_anadir_carro");
    btnAnadir.type = "button";
    btnAnadir.innerHTML = "Añadir al carro";
    btnAnadir.addEventListener("click", anadirCarrito);
    divMargen.appendChild(btnAnadir);

    //Numeric up down
    let inputNumber = document.createElement("input");
    inputNumber.type = "number";
    inputNumber.max = 10;
    inputNumber.min = 1;
    inputNumber.value = 1;
    divMargen.appendChild(inputNumber);

    //Finalmente añadimos el elemento
    tienda.appendChild(div);
}

//Añadir al carrito
function anadirCarrito(e) {
    let padre = e.target.parentNode; //Elemento padre

    let nombre = padre.firstElementChild.innerHTML; //Nombre del elemento
    let PU = Number(padre.children[3].firstElementChild.innerHTML); //PU
    let unidades = Number(padre.children[5].value); //Número de unidades

    //Objeto del carrito
    var item_carrito = {
        nombre: nombre,
        precio: PU,
        unidades: unidades,
        total: PU * unidades,
    };

    //Si no existe lo metemos en el carrito
    if (comprobarExistenciaCarrito(item_carrito) == false) {
        listaCarrito.push(item_carrito);
    }
    else {
        //Si existe modificamos las unidades y el total
        for (let item of listaCarrito) {
            if (item.nombre == item_carrito.nombre) {
                item.unidades += item_carrito.unidades;
                item.total += item_carrito.total;
                break;
            }
        }
    }

    //Finalmente actualizamos el carrito
    actualizarCarrito(listaCarrito);
}

//Actualizamos el carrito con datos nuevos
function actualizarCarrito(listaCarrito) {
    carrito.innerHTML = "";     //Limpiamos el carrito de antemano

    let subtotal = 0;   //Variable donde almacenamos el total

    //Creamos la cabecera
    let h2 = document.createElement("h2");
    h2.innerHTML = "Carrito";
    carrito.appendChild(h2);

    for (let item of listaCarrito) {
        let divContenedor = document.createElement("div");
        divContenedor.classList.add("item_carrito");

        //Div margen
        let divMargen = document.createElement("div");
        divMargen.classList.add("margen", "flex");
        divContenedor.appendChild(divMargen);

        //Imagen
        let img = document.createElement("img");
        img.src = "images/" + recupararFoto(item.nombre);
        divMargen.appendChild(img);

        //Div info producto
        let divInfo = document.createElement("div");
        divInfo.classList.add("item_carrito_info");
        let h5 = document.createElement("h3");
        h5.innerHTML = item.nombre;
        h5.classList.add("center");
        divInfo.appendChild(h5);
        let p1 = document.createElement("p");
        p1.innerHTML = "Unidades: " + item.unidades;
        divInfo.appendChild(p1);
        let p2 = document.createElement("p");
        p2.innerHTML = "P/u: " + item.precio;
        divInfo.appendChild(p2);
        let p3 = document.createElement("p");
        p3.innerHTML = "Total: " + item.total;
        divInfo.appendChild(p3);
        divMargen.appendChild(divInfo);

        //Vamos sumando al subtotal
        subtotal += item.total;

        //Añadimos el botón
        let btn_eliminar = document.createElement("button");
        btn_eliminar.type = "button";
        btn_eliminar.addEventListener("click", eliminarItemCarrito);
        divMargen.appendChild(btn_eliminar);

        //HR
        divContenedor.appendChild(document.createElement("hr"));

        //Finalmente añadimos el item
        carrito.appendChild(divContenedor);
    }

    //Finalmente añadimos el subtotal de la compra
    if (listaCarrito.length > 0) {
        let h3Subtotal = document.createElement("h3");
        h3Subtotal.innerHTML = "Subtotal: " + subtotal;
        carrito.appendChild(h3Subtotal);
    }
}

//Eliminamos un item del carrito
function eliminarItemCarrito(e) {
    let padre = e.target.parentNode;    //Nodo padre
    let nombre = padre.children[1].firstElementChild.innerHTML; //Nombre del producto

    try {
        let unidadesXBorrar = Number(prompt("¿Cuantas unidades quiere borrar?"));   //Unidades a borrar

        //Quitamos las unidades
        for (let item of listaCarrito) {
            if (item.nombre == nombre) {
                item.unidades -= unidadesXBorrar;   //Quitamos las unidades, si es menor o igual que cero significa que queremos quitar todas
                if (isNaN(item.unidades) == true) { //Comprobamos primero que sea un número valido
                    throw Error("Introduzca un valor válido."); 
                }
                if (item.unidades <= 0) {
                    listaCarrito.splice(listaCarrito.indexOf(item), 1);
                }
                else {
                    item.total = item.precio * item.unidades;
                }
                break;
            }
        }

        //Finalmente actualizamos el carrito
        actualizarCarrito(listaCarrito);
    }
    catch(error) {
        alert(error);
    }
}

//Comprobamos la existencia en el carrito
function comprobarExistenciaCarrito(item_carrito) {
    let vof = false;
    for (let item of listaCarrito) {
        if (item.nombre == item_carrito.nombre) {
            vof = true;
            break;
        }
    }
    return vof;
}

//Recuperamos la foto a partir del nombre
function recupararFoto(nombre) {
    for (let objeto of objetos) {
        if (objeto.nombre == nombre) {
            return objeto.imagen;
        }
    }
}

//Clicamos en el carrito
function clickCarrito(e) {
    if (isAppearing == 0) {
        carrito.style.right = "0px";
    }
    else {
        carrito.style.right = "-500px";
    }
    isAppearing++;
    if (isAppearing > 1) isAppearing = 0;
}