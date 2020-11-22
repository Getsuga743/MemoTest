/*
Memo Test:
    Necesito:
    Un tablero, de 4x4 
    la idea, es que en el tablero, se cargen PAREJAS de colores/Cartas, estas estan ocultas
    al presionar una de las celdas, esta se revela, dando a conocer la carta o color
    tiene que quedar cargada en alguna estructura, que me permita compararla con otra carta
    si las dos cartas son iguales, las cartas quedan reveladas
    si no, las cartas se vuelven a ocultar,  
*/

const $divs = document.querySelectorAll(".cuadro");
const $main = document.querySelector(".main");
let divs = [];
let contador = 0;
let match = 0;
const colors = [
  "rojo",
  "verde",
  "amarillo",
  "negro",
  "azul",
  "celeste",
  "violeta",
  "marron",
];

function juego() {
  let colores = colors.sort(() => {
    return Math.random() - 0.5;
  });

  colores = colores.concat(
    colores.sort(() => {
      return Math.random() - 0.5;
    }),
  );

  asignarColores(colores);

  $main.addEventListener("click", (e) => {
    if (e.target.classList.contains("cuadro")) {
      mostrarElemento(e.target);
      divs.push(e.target);
      console.log(divs, divs.length);
      if (divs.length === 2) {
        compararDivs(divs[0], divs[1]);
        divs = [];
      }
      if (match === 8) {
        document.querySelector(
          "body > div",
        ).innerHTML = `<div class="alert alert-primary align-self-center">Has ganado yay!</div>`;
      }
      console.log(match);
    }
  });
}
function todoOculto() {
  $divs.forEach((element) => {
    element.style.backgroundColor = "null";
  });
}

function asignarColores(col) {
  $divs.forEach((element, indice) => {
    element.className = "h-100 cuadro " + col[indice];
  });
}

function mostrarElemento(el) {
  el.style.opacity = 1;
}
function ocultarElemento(el) {
  el.style.opacity = 0;
}

function elementoSeleccionado(element) {
  mostrarElemento(element);
  setTimeout(() => {
    ocultarElemento(element);
  }, 2000);
}

function compararDivs(div1, div2) {
  if (div1.className === div2.className) {
    div1.parentElement.classList.add("blocked");
    div2.parentElement.classList.add("blocked");
    contador++;
    match++;
  } else {
    setTimeout(() => {
      ocultarElemento(div1);
      ocultarElemento(div2);
    }, 500);
  }
}

juego();
