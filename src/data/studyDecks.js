// MODEL: Mazos de estudio para separar tarjetas por nivel o tema
const studyDecks = [
  {
    id: "basics",
    name: "Básico",
    description: "Frases esenciales para empezar a trabajar como camarero.",
    accent: "green",
  },
  {
    id: "advanced",
    name: "Avanzado",
    description:
      "Frases de sala más naturales, pasado, futuro, trucos rápidos y material extra.",
    accent: "blue",
    subdecks: [
      {
        id: "service",
        name: "Sala y servicio",
        description: "Pedidos, bebidas, cobros y atención al cliente.",
      },
      {
        id: "hotel",
        name: "Hotel y recepción",
        description: "Habitación, incidencias, huéspedes y contexto hotelero.",
      },
      {
        id: "grammar",
        name: "Pasado y futuro",
        description: "Trucos para tiempos verbales y estructuras útiles.",
      },
      {
        id: "general",
        name: "Frases generales",
        description: "Respuestas cortas y expresiones de uso amplio.",
      },
    ],
    defaultSubdeckId: "service",
  },
];

export default studyDecks;
