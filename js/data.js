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
  { 
    name: "Carne mechada", 
    img: "mechada.webp", 
    vec: [2, 0, -2, -1, 0, 0],
    desc: "El clásico de clásicos. No necesitas inventar nada nuevo: tu sola presencia genera confianza. La gente sabe qué esperar de ti y por eso te quiere. Además, eres como buen maracucho: sabes que todo en esta vida sabe mejor si lo ahogas en salsa tártara hasta que la empanada pida auxilio. :3" 
  },
  { 
    name: "Carne molida", 
    img: "carnemolida.webp", 
    vec: [2, -1, -2, -2, 0, -1],
    desc: "Sin lujos, sin drama, sin vueltas. Vas directo al grano y eso es una virtud. Eres el equivalente a un lunes por la mañana: sobrio, rústico, pero resuelves. El terror de las camisas blancas porque un mordisco tuyo es una sentencia de tintorería." 
  },
  { 
    name: "Pollo", 
    img: "pollo.webp", 
    vec: [1, -1, -2, 0, -2, 1],
    desc: "Le caes bien a todo el mundo, hasta al flojo que dice que no tiene hambre. Eres el comodín social que nunca arma pelea en el grupo. Ojo, también eres la vieja confiable cuando alguien va al médico y le dicen: 'Señor, sople el mínimo viento y le da un infarto, haga dieta'. Eres el puente entre la gordura y la dignidad." 
  },
  { 
    name: "Queso", 
    img: "queso.webp", 
    vec: [0, -2, -1, -1, -2, -1],
    desc: "Minimalista por convicción. No necesitas diez ingredientes para brillar: con lo justo, ya eres suficiente. Eres la favorita de los vegetarianos que van a una tarantina de frituras a engañar a su propia conciencia diciendo: 'Bueno, pero es de queso, esto califica como ensalada'." 
  },
  { 
    name: "Jamón y queso", 
    img: "jamonqueso.webp", 
    vec: [0, -1, -1, 0, -2, 1],
    desc: "Team dupla dinámica. Solo estás bien, pero con tu combo perfecto al lado eres imparable. Tienes vibras de desayuno escolar de colegio privado en los 2000. Un gusto diplomático que no ofende a nadie pero que tampoco arriesga nada. El centro centrismo hecho fritura." 
  },
  { 
    name: "Papa", 
    img: "papa.webp", 
    vec: [1, -2, -1, -2, -2, -1],
    desc: "Humilde, sencillo y el rey del carbohidrato sobre carbohidrato. ¿Masa de maíz frita rellena con puré de papa? Una genialidad andina que desafía cualquier ley de la nutrición moderna. Tu nutricionista llora cada vez que te muerden, pero tu corazón (lleno de carbohidratos) sonríe." 
  },
  { 
    name: "Pabellón", 
    img: "pabellon.webp", 
    vec: [1, 2, -2, 0, 0, 2],
    desc: "¿Por qué elegir una sola cosa si puedes meter el almuerzo entero dentro de una masa frita? Ambicioso, generoso y un atentado directo contra el fitness. Eres una experiencia religiosa de tres pisos: carne, caraota, queso y plátano. Comerse una de estas requiere firmar un testamento y programar una siesta de 4 horas mínimas." 
  },
  { 
    name: "Pelua", 
    img: "pelua.webp", 
    vec: [0, 2, -2, -1, 1, 1],
    desc: "Vives en el exceso y no pides disculpas. Más queso, más carne, más de todo: la moderación te parece un insulto personal. Tu filosofía de vida es que si la grasa no te corre por el antebrazo hasta llegar al codo mientras comes, entonces la empanada fracasó como concepto." 
  },
  { 
    name: "Caraotas", 
    img: "caraotas.webp", 
    vec: [2, 0, -2, -2, 0, -2],
    desc: "Con raíces profundas y mucha tradición. Tienes esa vibra de abuela que te dice 'estás muy flaco' mientras te sirve un plato para cuatro personas. Un peligro biológico si tienes una reunión en una oficina cerrada dos horas después, pero la nostalgia y el sabor valen totalmente el riesgo." 
  },
  { 
    name: "Camarón", 
    img: "camaron.webp", 
    vec: [-1, 0, -1, 2, 0, 0],
    desc: "Eres para ocasiones especiales, o al menos eso crees tú porque te la pasas cotizándote alto. Te crees de la alta sociedad playera, pero al final del día terminas frito en el mismo aceite de antier que la de carne molida. Exclusivo, afrodisíaco y propenso a mandar a alguien a emergencias por alergia." 
  },
  { 
    name: "Sifrina", 
    img: "sifrina.webp", 
    vec: [-1, 1, -2, 2, 0, 2],
    desc: "Elegante, exigente y con un gusto impecable. No es que seas difícil, es que sabes exactamente lo que mereces. Seguramente pides la empanada 'con servilleta doble para no tocar el aceite' y preguntas si el queso es bajo en sodio. Spoiler: No lo es, todo ahí dentro es pura y deliciosa grasa marginal." 
  },
  { 
    name: "Perico", 
    img: "perico.webp", 
    vec: [0, 0, -2, -2, 0, 2],
    desc: "Energía pura de domingo por la mañana en familia. Espontáneo, ruidoso y caótico de forma encantadora. Eres el desayuno que se hace cuando ya no queda nada en la nevera salvo tres huevos, medio tomate arrugado y un cuarto de cebolla. Haces magia con el caos." 
  },
  { 
    name: "Lomo negro", 
    img: "lomonegro.webp", 
    vec: [-1, 0, -1, 1, 2, -1],
    desc: "Intenso, misterioso y con un toque agridulce que confunde a los principiantes. Eres el equivalente gastronómico a escuchar música indie: no eres para todo el mundo, requieres un paladar con presupuesto y te da un aire de superioridad intelectual frente a los que comen pollo." 
  },
  { 
    name: "Pizza", 
    img: "pizza.webp", 
    vec: [-2, 1, -1, 0, 0, 1],
    desc: "Rompes las reglas sin pedir permiso. Fusionas mundos que la cultura italiana consideraría un crimen de guerra, pero a ti te sabe a gloria. Eres el terror de las dietas cetogénicas: puro queso derretido, salsa y masa frita. La aberración culinaria más hermosa de la medianoche." 
  },
  { 
    name: "Plátano con queso", 
    img: "platano.webp", 
    vec: [-1, 0, 2, 0,-1, 0],
    desc: "Contradictorio por naturaleza: dulce y salado a la vez. La gente cuerda no entiende cómo funciona tu mente, pero les encanta intentar descifrarte. Tienes el superpoder maracucho de meterle plátano maduro a todo lo que sea comestible solo para ver el mundo arder." 
  },
  { 
    name: "Operada", 
    img: "operada.webp", 
    vec: [-2, 2, -1, 1, 1, 2],
    desc: "Has pasado por muchas transformaciones y no le tienes miedo a los cambios extremos. Te abren por la mitad después de nacer para meterte más cosas de las que tu diseño original soportaba. Dramática, exagerada, costosa, pero siempre espectacular y el centro de todas las miradas." 
  },
  { 
    name: "Aire", 
    img: "aire.webp", 
    vec: [-2, -2, 0, 0, 0, -2],
    desc: "Un monumento al misterio y a la decepción más encantadora del mundo. Te inflas por fuera prometiendo el paraíso terrenal y cuando te muerden... puro viento y una lagrimita de grasa. Eres idéntico/a a las promesas de tu ex: te ves increíble en la vitrina, pero por dentro estás completamente vacío/a." 
  },
  { 
    name: "Chicharrón", 
    img: "chicharron.webp", 
    vec: [0, 1, -2, -1, 2, 0],
    desc: "Crocante por fuera, pesado por dentro. Te atreves a combinaciones que los cardiólogos prohibieron en la convención de Ginebra de 1950. Tienes una personalidad fuerte, crujiente, rústica y dejas una marca imborrable en el hígado de cualquiera que se cruce en tu camino." 
  },
  { 
    name: "Pura salsa", 
    img: "salsa.webp", 
    vec: [-1, -1, 0, 0, 2, 2],
    desc: "Todo estilo, toda actitud, cero sustancia. Eres esa persona que habla bellísimo, se viste espectacular, pero cuando rascas un poquito no hay nada detrás. No te importa, porque mientras tengas carisma, labia y un buen empaque, la gente te seguirá consumiendo con gusto." 
  }
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