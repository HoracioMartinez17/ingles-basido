// MODEL: Mini curso para aprender a construir conversación con bloques reutilizables
const conversationCourse = [
  {
    id: 1,
    title: "Kit de supervivencia",
    emoji: "🧯",
    description:
      "Frases para ganar tiempo cuando no entiendes algo o necesitas pensar antes de responder.",
    blocks: [
      {
        label: "Pedir repetición",
        english: "Sorry, could you repeat that?",
        spanish: "Perdona, ¿puedes repetirlo?",
        pronunciation: "Só-ri, kud yu ri-pít dat?",
      },
      {
        label: "Ganar tiempo",
        english: "Let me check.",
        spanish: "Déjame mirar.",
        pronunciation: "Let mi chek.",
      },
      {
        label: "Responder con honestidad",
        english: "I'm not sure, but I can find out.",
        spanish: "No estoy seguro, pero puedo averiguarlo.",
        pronunciation: "Aym not shúr, bat ai kan faind aut.",
      },
    ],
    useCase:
      "Úsalo cuando algo se salga de tu guion. No te quedas en blanco, compras tiempo y sigues la conversación.",
  },
  {
    id: 2,
    title: "Construir frases como LEGO",
    emoji: "🧱",
    description:
      "Aprende a unir piezas simples para formar frases nuevas sin memorizar frases enteras.",
    blocks: [
      {
        label: "Apertura",
        english: "Would you like... ?",
        spanish: "¿Te gustaría... ?",
        pronunciation: "Wud yu laik... ?",
      },
      {
        label: "Objeto",
        english: "a coffee / a water / the bill",
        spanish: "un café / un agua / la cuenta",
        pronunciation: "a kófi / a uó-ter / de bil",
      },
      {
        label: "Cierre suave",
        english: "...please?",
        spanish: "...por favor?",
        pronunciation: "...plis?",
      },
    ],
    useCase:
      "Si entiendes la estructura, puedes crear cientos de frases nuevas cambiando solo la pieza central.",
  },
  {
    id: 3,
    title: "Responder preguntas fuera del guion",
    emoji: "🗣️",
    description:
      "Patrones para no bloquearte cuando el cliente pregunta algo inesperado.",
    blocks: [
      {
        label: "No lo sé, pero lo reviso",
        english: "I don't know, but I can check.",
        spanish: "No lo sé, pero lo puedo comprobar.",
        pronunciation: "Ai dout nóu, bat ai kan chek.",
      },
      {
        label: "Ofrecer alternativa",
        english: "We don't have that, but we have this one.",
        spanish: "No tenemos eso, pero tenemos este.",
        pronunciation: "Ui dout jav dat, bat ui jav dis uan.",
      },
      {
        label: "Pedir un momento",
        english: "One moment, please.",
        spanish: "Un momento, por favor.",
        pronunciation: "Wán móu-ment, plis.",
      },
    ],
    useCase:
      "Esto te saca del bloqueo mental: no necesitas saberlo todo, solo saber cómo continuar la conversación.",
  },
  {
    id: 4,
    title: "Conversación diaria real",
    emoji: "🍽️",
    description:
      "Preguntas y respuestas que sirven en mesa, barra y trato con clientes habituales.",
    blocks: [
      {
        label: "Preguntar",
        english: "Are you ready to order?",
        spanish: "¿Estáis listos para pedir?",
        pronunciation: "Ar yu ré-di tu ór-der?",
      },
      {
        label: "Confirmar",
        english: "Is everything okay?",
        spanish: "¿Está todo bien?",
        pronunciation: "Is év-ri-thing ou-kéi?",
      },
      {
        label: "Cerrar con educación",
        english: "Enjoy your meal.",
        spanish: "Que aproveche.",
        pronunciation: "En-yói yor míl.",
      },
    ],
    useCase:
      "Son frases cortas que salen muchísimo en el día a día y te ayudan a sonar natural sin complicarte.",
  },
  {
    id: 5,
    title: "Aún no he tomado nota",
    emoji: "📝",
    description:
      "Frases para aclarar que todavía no has apuntado el pedido y que el cliente no piense que ya está hecho.",
    blocks: [
      {
        label: "Aclarar que no está anotado",
        english: "I haven't taken your order yet.",
        spanish: "Todavía no he tomado nota de tu pedido.",
        pronunciation: "Ai javént téiken yor ór-der yet.",
      },
      {
        label: "Más natural y corto",
        english: "I haven't written it down yet.",
        spanish: "Todavía no lo he apuntado.",
        pronunciation: "Ai javént rít-en it daun yet.",
      },
      {
        label: "Pedir paciencia",
        english: "I'll take it now.",
        spanish: "Lo tomo ahora mismo.",
        pronunciation: "Ail téik it nau.",
      },
    ],
    useCase:
      "Úsalo cuando el cliente cree que ya apuntaste el pedido, pero todavía no lo has hecho. Te sirve para corregirlo sin sonar seco.",
  },
  {
    id: 6,
    title: "Escríbelo aquí para mi compañero",
    emoji: "👀",
    description:
      "Frases para pedir que escriban lo que quieren cuando no entiendes bien y necesitas enseñárselo a tu compañero.",
    blocks: [
      {
        label: "Pedir que lo escriban",
        english: "Could you write it here, please?",
        spanish: "¿Puedes escribirlo aquí, por favor?",
        pronunciation: "Kud yu rait it ji-er, plis?",
      },
      {
        label: "Explicar el motivo",
        english: "So my co-worker can see it.",
        spanish: "Para que mi compañero lo vea.",
        pronunciation: "So mai kou-uér-ker kan sí it.",
      },
      {
        label: "Decir que no lo entiendes",
        english: "I don't understand what you're saying.",
        spanish: "No entiendo lo que estás diciendo.",
        pronunciation: "Ai dout andér-stand wot yur séi-ing.",
      },
    ],
    useCase:
      "Usa esta secuencia cuando no entiendas una frase oral y quieras evitar el bloqueo: pides que lo escriban, lo enseñas a tu compañero y sigues atendiendo.",
  },
];

export default conversationCourse;
