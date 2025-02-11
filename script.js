//total preguntas del juego
const TOTAL_PREGUNTAS = 26;
//tiempo del juego
const TIEMPO_DEL_JUEGO = 600;
//estructura para almacenar las preguntas
const bd_juego = [
  {
      id:'A',
      pregunta:"Cual fue el juego con el que nos conocimos y por el que empezamos a hablar?",
      respuesta:"ahorcado"
  },
  {
    id:'B',
    pregunta:"Equipo de futbol del cual soy fan?",
    respuesta:"barcelona"
  },
  {
    id:'C',
    pregunta:"Si mi corazon es de piedra, el tuyo es?",
    respuesta:"corazon de pollo"
  },
  {
    id:'D',
    pregunta:"Siempre te digo que tu inicial es D de?",
    respuesta:"deslumbrante"
  },
  {
    id:'E',
    pregunta:"Sobrenombre (apodo) que te digo de forma cariñosa? 'Tu eres mi hermosa...'",
    respuesta:"estrellita"
  },
  {
    id:'F',
    pregunta:"Tu eres una loquita de las ...? (Es una fruta)",
    respuesta:"fresas"
  },
  {
    id:'G',
    pregunta:"Flor representativa de una de tus peliculas favoritas (Pinceladas de amor)?",
    respuesta:"gerbera"
  },
  {
    id:'H',
    pregunta:"Anime de volley que te encanta?",
    respuesta:"haikyuu"
  },
  {
    id:'I',
    pregunta:"Tan buena eres en el ahorcado?, aqui va una facil: I _ t _ _ _ _ _ _ _ e",
    respuesta:"interesante"
  },
  {
    id:'J',
    pregunta:"Mes en el que cumple mi estrellita?",
    respuesta:"junio"
  },
  {
    id:'K',
    pregunta:"Es un animal autraliano que come eucalipto?",
    respuesta:"koala"
  },
  {
    id:'L',
    pregunta:"Es una fruta que te gusta mucho. Es verde por fuera y amarilla por dentro?",
    respuesta:"lucuma"
  },
  {
    id:'M',
    pregunta:"Tu color favorito",
    respuesta:"morado"
  },
  {
    id:'N',
    pregunta:"Cosa que sueles decir cuando no tienes respuesta y que es sacada de un tik tok?",
    respuesta:"natacion"
  },
  {
    id:'O',
    pregunta:"Mes en el que nos hicimos pareja?",
    respuesta:"octubre"
  },
  {
    id:'P',
    pregunta:"Forma en que tu señora madre se dirige hacia mi?",
    respuesta:"pepito"
  },
  {
    id:'Q',
    pregunta:"Si viste la final del mundial, entonces sabras que se hizo en el país de",
    respuesta:"qatar"
  },
  {
    id:'R',
    pregunta:"El estilo de pelo que me encanta",
    respuesta:"rulos"
  },
  {
    id:'S',
    pregunta:"Lo que le haces a tu carita con avena",
    respuesta:"skincare"
  },
  {
    id:'T',
    pregunta:"Cancion de Humbe que esta en nuetra playlist",
    respuesta:"te conoci en japon"
  },
  {
    id:'U',
    pregunta:"Nombre del instrumento chiquito que encontraste y te pusiste a tocar",
    respuesta:"ukelele"
  },
  {
    id:'V',
    pregunta:"El corto que nos vimos e 'I lava you', tiene como protagonistas a dos",
    respuesta:"volcanes"
  },
  {
    id:'W',
    pregunta:"Palabra que usas cuando te quedas pensando después de que hable?",
    respuesta:"whao"
  },
  {
    id:'X',
    pregunta:"Nombre o apodo de tu novio en redes sociales?",
    respuesta:"xiam"
  },
  {
    id:'Y',
    pregunta:"Como se dice cuanto te refieres a una persona (Tu), en ingles?",
    respuesta:"you"
  },
  {
    id:'Z',
    pregunta:"Nombre del padre de Ginny",
    respuesta:"zion"
  }
]

//preguntas que ya han sido contestadas. Si estan en 0 no han sido contestadas
var estadoPreguntas = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var cantidadAcertadas = 0;

//variable que mantiene el num de pregunta acual
var numPreguntaActual = -1;

// Obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");
// Establecer el tiempo inicial en 60 segundos
let timeLeft = TIEMPO_DEL_JUEGO;
var countdown;

//boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});

//Creamos el circúlo con las letras de la A a la Z
const container = document.querySelector(".container");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = String.fromCharCode(i + 96);
  circle.id = String.fromCharCode(i + 96).toUpperCase();
  container.appendChild(circle);

  const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
  const x = Math.round(105 + 120 * Math.cos(angle));
  const y = Math.round(105 + 120 * Math.sin(angle));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}


//Función que carga la pregunta
function cargarPregunta(){
  numPreguntaActual++;
  //controlo si he llegado al final de las preguntas, para comenzar de nuevo
  if(numPreguntaActual>=TOTAL_PREGUNTAS){
    numPreguntaActual=0;
  }

  if(estadoPreguntas.indexOf(0)>=0){ //Controlo que todavía hallan preguntas por contestar
    while(estadoPreguntas[numPreguntaActual]==1){
      numPreguntaActual++;
      if(numPreguntaActual>=TOTAL_PREGUNTAS){
        numPreguntaActual=0;
      }
    }
  
    document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id
    document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.add("pregunta-actual");
  }
  else{
    clearInterval(countdown);
    mostrarPantallaFinal();
  }

}

//detecto cada vez que hay un cambio de tecla en el input
var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event) {
  //detecto si la tecla presionada es ENTER
  if (event.keyCode === 13) {
    if(respuesta.value==""){
      alert("Debe ingresar un valor!!");
      return;
    }
    //obtengo la respuesta ingresada
    var txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
  }
});

//Función que controla la respuesta
function controlarRespuesta(txtRespuesta){
  //controlo si la respuesta es correcta
  if(txtRespuesta == bd_juego[numPreguntaActual].respuesta){
    //alert("Respuesta correcta")
    cantidadAcertadas++;

    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("bien-respondida");

  }else{
    //alert("respuesta incorrecta")
    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    var letra =  bd_juego[numPreguntaActual].id;
    //quito l clase del estilo de pregunta actual
    document.getElementById(letra).classList.remove("pregunta-actual");
    //agrego la clase del estilo de pregunta mal respondida
    document.getElementById(letra).classList.add("mal-respondida");

  }
  respuesta.value="";
  cargarPregunta();
}


//botón para pasar de pregunta sin contestar
var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
  var letra =  bd_juego[numPreguntaActual].id;
  document.getElementById(letra).classList.remove("pregunta-actual");

  cargarPregunta();
});


// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo(){
  countdown = setInterval(() => {
    // Restar un segundo al tiempo restante
    timeLeft--;
  
    // Actualizar el texto del cronómetro con el tiempo restante
    timer.innerText = timeLeft;
  
    // Si el tiempo llega a 0, detener el cronómetro
    if (timeLeft < 0) {
      clearInterval(countdown);
      mostrarPantallaFinal();
    }
  }, 1000);
}

//muestro la pantlla final
function mostrarPantallaFinal(){
  document.getElementById("acertadas").textContent = cantidadAcertadas;
  document.getElementById("score").textContent = (cantidadAcertadas*100)/26 + "% de acierto";
  document.getElementById("pantalla-juego").style.display =  "none";
  document.getElementById("pantalla-final").style.display =  "block";
}

//boton para recomenzar el juego
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
  numPreguntaActual = -1;
  timeLeft = TIEMPO_DEL_JUEGO;
  timer.innerText = timeLeft;
  cantidadAcertadas = 0;
  estadoPreguntas = [0,0,0,0,0,0,0,0,0,0];

  //quito las clases de los circulos
  var circulos = document.getElementsByClassName("circle");
  for(i=0;i<circulos.length;i++){
    circulos[i].classList.remove("bien-respondida");
    circulos[i].classList.remove("mal-respondida");
  }

  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});