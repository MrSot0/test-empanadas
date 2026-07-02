/* =========================================================
   MODELO DE PERSONALIDAD
   Cada empanada y cada respuesta se ubican en 6 ejes:
   [A: tradicional(+2) <-> moderna(-2)]
   [B: sencilla(-2)    <-> cargada(+2)]
   [C: salada(-2)      <-> dulce(+2)]
   [D: casual(-2)      <-> elegante(+2)]
   [E: suave(-2)       <-> intensa/picante(+2)]
   [F: reservada(-2)   <-> social(+2)]
   El resultado es la empanada cuyo vector queda más cerca
   del vector acumulado de tus respuestas (distancia euclidiana).
========================================================= */

const EMPANADAS = [
  { name:"Carne mechada", img:"mechada.webp", vec:[2,0,-2,-1,0,0],
    desc:"El clásico de los clásicos. No necesitas inventar nada nuevo: tu sola presencia genera confianza. La gente sabe qué esperar de ti, y justo por eso te quiere." },
  { name:"Carne molida", img:"carnemolida.webp", vec:[2,-1,-2,-2,0,-1],
    desc:"Sin lujos, sin drama, sin vueltas. Vas directo al grano y eso es una virtud: contigo todos saben a qué atenerse." },
  { name:"Pollo", img:"pollo.webp", vec:[1,-1,-2,0,-2,1],
    desc:"Le caes bien a todo el mundo, hasta a quien dice que no le gusta nada. Eres el comodín social que nunca arma pelea en el grupo." },
  { name:"Queso", img:"queso.webp", vec:[0,-2,-1,-1,-2,-1],
    desc:"Minimalista por convicción. No necesitas diez ingredientes para brillar: con lo justo, ya eres suficiente." },
  { name:"Jamón y queso", img:"jamonqueso.webp", vec:[0,-1,-1,0,-2,1],
    desc:"Team dupla dinámica. Solo/a estás bien, pero con tu combo perfecto al lado, eres imparable." },
  { name:"Papa", img:"papa.webp", vec:[1,-2,-1,-2,-2,-1],
    desc:"Humilde, sencillo/a y siempre reconfortante. No buscas ser el centro de atención, pero cuando faltas todos te extrañan." },
  { name:"Pabellón", img:"pabellon.webp", vec:[1,2,-2,0,0,2],
    desc:"¿Por qué elegir una sola cosa si puedes tenerlo todo? Ambicioso/a, generoso/a, y no te conformas con la mitad de nada." },
  { name:"Pelua", img:"pelua.webp", vec:[0,2,-2,-1,1,1],
    desc:"Vives en el exceso y no te disculpas por eso. Más queso, más carne, más de todo: la moderación no es lo tuyo." },
  { name:"Caraotas", img:"caraotas.webp", vec:[2,0,-2,-2,0,-2],
    desc:"Con raíces profundas y mucha nostalgia. Eres quien conecta a todos con 'lo de antes', y eso vale más de lo que parece." },
  { name:"Camarón", img:"camaron.webp", vec:[-1,0,-1,2,0,0],
    desc:"Eres para ocasiones especiales. No te desperdicias en cualquier día, y todo el mundo lo sabe." },
  { name:"Sifrina", img:"sifrina.webp", vec:[-1,1,-2,2,0,2],
    desc:"Elegante, exigente y con un gusto impecable. No es que seas difícil: sabes exactamente lo que mereces." },
  { name:"Perico", img:"perico.webp", vec:[0,0,-2,-2,0,2],
    desc:"Energía de domingo en la mañana. Espontáneo/a, caótico/a de forma encantadora, siempre listo/a para lo que salga." },
  { name:"Lomo negro", img:"lomonegro.webp", vec:[-1,0,-1,1,2,-1],
    desc:"Intenso/a, misterioso/a y con mucho carácter. No eres para todo el mundo, y eso te da power." },
  { name:"Pizza", img:"pizza.webp", vec:[-2,1,-1,0,0,1],
    desc:"Rompes las reglas sin pedir permiso. Fusionas mundos que 'no deberían' ir juntos, y aun así funciona increíble." },
  { name:"Plátano con queso", img:"platano.webp", vec:[-1,0,2,0,-1,0],
    desc:"Contradictorio/a por naturaleza: dulce y salado a la vez. La gente no te entiende del todo, pero le encanta intentarlo." },
  { name:"Operada", img:"operada.webp", vec:[-2,2,-1,1,1,2],
    desc:"Has pasado por muchas transformaciones y no le tienes miedo a reinventarte. Dramático/a, sí, pero siempre con estilo." },
  { name:"Aire", img:"aire.webp", vec:[-2,-2,0,0,0,-2],
    desc:"Un poco de misterio, un poco de decepción encantadora. Prometes mucho por fuera y, aunque por dentro haya menos de lo esperado, sigues siendo inolvidable." },
  { name:"Chicharrón", img:"chicharron.webp", vec:[0,1,-2,-1,2,0],
    desc:"Crocante por fuera, intenso por dentro. Te atreves a lo que otros ni consideran, y eso te hace memorable." },
  { name:"Pura salsa", img:"salsa.webp", vec:[-1,-1,0,0,2,2],
    desc:"Todo estilo, toda actitud. No necesitas sustancia cuando tienes tanta personalidad." },
];

const QUESTIONS = [
  { q:"Es sábado en la mañana y tienes hambre. ¿Qué haces?", opts:[
    { t:"Voy a lo seguro: algo de siempre", d:[2,0,0,0,0,-1] },
    { t:"Reviso la nevera e improviso algo", d:[-1,0,0,0,0,1] },
    { t:"Salgo a buscar un sitio con buena presentación", d:[0,0,0,2,0,0] },
    { t:"Pido lo que se vea más espectacular en fotos", d:[0,0,0,1,0,2] },
  ]},
  { q:"Tu plan ideal de fin de semana:", opts:[
    { t:"Tranquilo en casa, sin drama", d:[0,-2,0,0,0,-2] },
    { t:"Rodeado de gente, que no falte nadie", d:[0,1,0,0,0,2] },
    { t:"Probar el lugar nuevo del que todos hablan", d:[-2,0,0,0,0,0] },
    { t:"Algo intenso: fiesta, adrenalina, sin límites", d:[0,0,0,0,2,0] },
  ]},
  { q:"En una fiesta, normalmente eres...", opts:[
    { t:"Quien organiza todo y no deja a nadie fuera", d:[0,2,0,0,0,2] },
    { t:"Quien prefiere quedarse en su rincón", d:[0,0,0,0,0,-2] },
    { t:"Quien llega con estilo y se nota", d:[0,0,0,2,0,0] },
    { t:"Quien pone la energía y el ruido", d:[0,0,0,0,2,1] },
  ]},
  { q:"Tu relación con el picante:", opts:[
    { t:"Nada, prefiero todo suave", d:[0,0,0,0,-2,0] },
    { t:"Un toque dulce le gana al picante siempre", d:[0,0,2,0,0,0] },
    { t:"Mientras más fuerte, mejor", d:[0,0,0,0,2,0] },
    { t:"Le pongo salsa a todo, sin excepción", d:[0,1,0,0,1,0] },
  ]},
  { q:"Si fueras una película, serías...", opts:[
    { t:"Un clásico que nunca pasa de moda", d:[2,0,0,0,0,0] },
    { t:"Un thriller oscuro e intenso", d:[0,0,0,1,2,0] },
    { t:"Una comedia con mil giros inesperados", d:[-2,0,0,0,0,2] },
    { t:"Una indie que casi nadie conoce", d:[-2,0,0,0,0,-2] },
  ]},
  { q:"Tu estilo para vestir es...", opts:[
    { t:"Cómodo, sin complicarme", d:[0,-1,0,-2,0,0] },
    { t:"Cuidado al detalle, nada al azar", d:[0,0,0,2,0,0] },
    { t:"Diferente siempre, me aburre repetir", d:[-2,0,0,0,0,0] },
    { t:"Llamativo, que se note quién soy", d:[0,0,0,1,0,1] },
  ]},
  { q:"¿Cómo manejas el drama?", opts:[
    { t:"Lo evito a toda costa", d:[0,-2,0,0,0,-2] },
    { t:"De algún modo, siempre termino en medio", d:[0,2,0,0,0,2] },
    { t:"Me encanta, mientras más show mejor", d:[0,0,0,1,0,2] },
    { t:"Lo resuelvo con calma, sin escándalo", d:[1,0,0,0,0,0] },
  ]},
  { q:"Tu filosofía sobre la comida:", opts:[
    { t:"Menos ingredientes, más calidad", d:[0,-2,0,0,0,0] },
    { t:"Entre más relleno, mejor", d:[0,2,0,0,0,0] },
    { t:"Me gusta mezclar sabores que 'no deberían' ir juntos", d:[-1,0,1,0,0,0] },
    { t:"Si no es intenso, no vale la pena", d:[0,0,0,0,2,0] },
  ]},
  { q:"En el trabajo o el estudio, eres la persona que...", opts:[
    { t:"Siempre se puede contar con", d:[2,0,0,-1,0,0] },
    { t:"Trae las ideas más locas", d:[-2,0,0,0,0,0] },
    { t:"Destaca con su propio estilo", d:[0,0,0,2,0,0] },
    { t:"Prefiere pasar desapercibida", d:[0,-2,0,0,0,-2] },
  ]},
  { q:"Elige la palabra que más te describe:", opts:[
    { t:"Clásico/a", d:[2,0,0,0,0,0] },
    { t:"Intenso/a", d:[0,0,0,0,2,0] },
    { t:"Elegante", d:[0,0,0,2,0,0] },
    { t:"Impredecible", d:[-2,0,0,0,0,1] },
    { t:"Sencillo/a", d:[0,-2,0,0,0,0] },
  ]},
];