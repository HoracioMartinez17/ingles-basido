# 🍷 English Waiter App - Guía Completa

Una aplicación web profesional, rápida y funcional para aprender inglés básico de camarero en 10 días.

**Stack:** React 18 + Vite + React Router + TailwindCSS + ElevenLabs TTS

---

## 📋 Características Principales

✅ **Pantalla Principal** - Menú intuitivo con acceso a todas las funcionalidades  
✅ **21 Frases Esenciales** - Datos completos con significado y pronunciación  
✅ **Modo Estudio (Flashcards)** - Tipo Anki con control de revelación  
✅ **Modo Examen** - Preguntas aleatorias con 4 opciones de respuesta  
✅ **Favoritos** - Guardados automáticamente en localStorage  
✅ **Audios Profesionales** - Generados con ElevenLabs TTS  
✅ **Diseño Responsivo** - Interfaz moderna con TailwindCSS  
✅ **Arquitectura MVC Limpia** - Separación clara de responsabilidades

---

## 🚀 Inicio Rápido

### Requisitos

- Node.js 16+
- npm o yarn

### Instalación

```bash
cd ingles-camarero
npm install
```

### Ejecutar en Desarrollo

```bash
npm run dev
```

La app se abrirá en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

---

## 📁 Estructura del Proyecto (MVC)

```
ingles-camarero/
├── src/
│   ├── components/              # VIEWS - Componentes reutilizables
│   │   ├── PhraseCard.jsx      # Tarjeta de frase
│   │   ├── StudyCard.jsx       # Tarjeta de estudio
│   │   ├── ExamQuestion.jsx    # Pregunta de examen
│   │   ├── AudioPlayer.jsx     # Reproductor de audio
│   │   └── Navigation.jsx      # Navegación global
│   │
│   ├── screens/                 # VIEWS - Pantallas principales
│   │   ├── Home.jsx            # Inicio
│   │   ├── Phrases.jsx         # Lista de frases
│   │   ├── Study.jsx           # Modo estudio
│   │   ├── Exam.jsx            # Modo examen
│   │   └── Favorites.jsx       # Mis favoritos
│   │
│   ├── hooks/                   # CONTROLLERS - Lógica de negocio
│   │   ├── useStudy.js         # Lógica del modo estudio
│   │   └── useExam.js          # Lógica del modo examen
│   │
│   ├── context/                 # MODELS - Estado global
│   │   └── FavoritesContext.jsx # Gestión de favoritos
│   │
│   ├── data/                    # MODELS - Datos
│   │   └── phrases.js          # Base de datos de frases
│   │
│   ├── App.jsx                  # Componente raíz + rutas
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos globales
│
├── scripts/
│   ├── generate-audio.js        # Script TTS + upload
│   └── QUICK_START.js           # Guía rápida
│
├── public/
│   └── audio/                   # Audios generados (gitignored)
│
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
│
├── .env.example                 # Template de variables
├── .gitignore
├── AUDIO_SETUP.md              # Guía completa de audios
└── README.md                    # Este archivo
```

---

## 🎙️ Generación de Audios (NEW!)

### Quick Start

```bash
# 1. Copia la configuración
cp .env.example .env

# 2. Edita .env con tus credenciales (ver AUDIO_SETUP.md)

# 3. Genera audios
npm run generate-audio
```

### Opciones

#### Opción A: Local Only (Gratis, Sin CDN)

```env
GENERATE_LOCAL_ONLY=true
```

#### Opción B: Con Cloudinary (Recomendado, CDN Global)

```env
GENERATE_LOCAL_ONLY=false
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

**📖 Guía Detallada:** Ver [AUDIO_SETUP.md](./AUDIO_SETUP.md)

---

## 🏗️ Arquitectura MVC

### Models (Capa de Datos)

- `src/data/phrases.js` - Array de frases con estructura completa
- `src/context/FavoritesContext.jsx` - Estado global con persistencia

### Controllers (Lógica de Negocio)

- `src/hooks/useStudy.js` - Control del modo estudio (flashcards)
- `src/hooks/useExam.js` - Control del modo examen (preguntas aleatorias)

### Views (Presentación)

- `src/components/` - Componentes reutilizables (PhraseCard, AudioPlayer, etc.)
- `src/screens/` - Pantallas principales (Home, Study, Exam, etc.)

**Beneficios:**

- ✅ Separación de responsabilidades
- ✅ Código testeable y mantenible
- ✅ Fácil de escalar
- ✅ Sin "spaghetti code"

---

## 📖 Cómo Usar la App

### 1️⃣ Pantalla de Inicio

- Accede a todas las secciones
- Información sobre cómo usar la app

### 2️⃣ Frases Esenciales

- Visualiza todas las 21 frases
- Busca por palabra (inglés o español)
- Reproduce audio (si están generados)
- Marca favoritas con ⭐

### 3️⃣ Modo Estudio

- Aprende con flashcards tipo Anki
- Control total sobre qué revelar:
  - Significado 🟢
  - Pronunciación 🟠
  - Audio 🔊
- Navega libremente entre frases
- Barra de progreso

### 4️⃣ Modo Examen

- Preguntas aleatorias
- 4 opciones de respuesta por pregunta
- Feedback inmediato (✓ ✗)
- Contador de aciertos en tiempo real
- Estadísticas finales con análisis

### 5️⃣ Mis Favoritos

- Visualiza frases marcadas como favoritas
- Persisten en localStorage
- Estudia solo lo difícil

---

## 🎙️ Sistema de Audio

### Flujo Completo

```
Frases en phrases.js
       ↓
   ElevenLabs TTS
       ↓
   MP3 Generado
       ↓
   Cloudinary (Opcional)
       ↓
   URL en phrases.js
       ↓
   AudioPlayer en React
```

### Voces Disponibles

| Voz    | ID                     | Tipo                |
| ------ | ---------------------- | ------------------- |
| Rachel | `21m00Tcm4TlvDq8ikWAM` | Natural, femenina   |
| Josh   | `TtoHMqjbheRV60QrIZEP` | Natural, masculino  |
| Sam    | `knnD5LTO7hihz3UNGvjT` | Neutral, masculino  |
| Bella  | `EXAVITQu4vr4xnSDxMaL` | Cálida, femenina    |
| Antoni | `ErXwobaYiN84WevQeRHl` | Profunda, masculino |

Cambia en `.env`:

```env
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
```

---

## 💾 Persistencia de Datos

### Favoritos

- Guardados en `localStorage` automáticamente
- Persisten entre sesiones
- Sincronización en tiempo real

### Audios

- **Local:** `./public/audio/` (gitignored)
- **Cloudinary:** URLs en phrases.js

### Frases

- `src/data/phrases.js` (editable)

---

## 🎨 Personalización

### Agregar Más Frases

Edita `src/data/phrases.js`:

```javascript
{
  id: 22,
  english: "Your phrase here",
  spanish: "Tu frase aquí",
  pronunciation: "Yor fréiz jír",
  audio: "" // Se actualiza con npm run generate-audio
}
```

### Cambiar Colores

Los colores usan clases de TailwindCSS (fácilmente customizables):

```jsx
// Ejemplo: bg-blue-500, text-green-700, etc.
<div className="bg-blue-500 text-white">
```

Edita `tailwind.config.js` para temas personalizados.

### Cambiar Voces

Edita `.env`:

```env
ELEVENLABS_VOICE_ID=TtoHMqjbheRV60QrIZEP
npm run generate-audio
```

---

## 📊 Estadísticas y Costos

### Uso de Frases

- 21 frases incluidas
- Campo "audio" preparado para futuras extensiones

### Consumo de APIs

| API        | Límite Gratuito       | Por Frase      |
| ---------- | --------------------- | -------------- |
| ElevenLabs | 10,000 caracteres/mes | ~15 caracteres |
| Cloudinary | 25GB/mes              | ~1MB por audio |

**Para 21 frases:** ~315 caracteres (3% del límite)

---

## 🐛 Troubleshooting

### La app no inicia

```bash
# Limpia node_modules e instala de nuevo
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Los audios no se reproducen

- Verifica que la URL sea correcta en `phrases.js`
- Abre la consola del navegador (F12) para ver errores
- Comprueba que CORS esté habilitado en Cloudinary

### Error en "npm run generate-audio"

- Verifica `.env` está configurado (ver AUDIO_SETUP.md)
- Comprueba credenciales de ElevenLabs
- Revisa Upload Preset en Cloudinary

---

## 📝 Notas Técnicas

### Stack Elegido

- **React 18** - Librería moderna con hooks
- **Vite** - Bundler ultra rápido (desarrollo + build)
- **React Router v6** - Enrutamiento declarativo
- **TailwindCSS** - Estilos con utility-first
- **ElevenLabs TTS** - Síntesis de voz profesional
- **Cloudinary** - CDN para media (opcional)

### Decisiones de Arquitectura

1. **MVC en React** - Separa datos, lógica y presentación
2. **Hooks Personalizados** - Controllers reutilizables (`useStudy`, `useExam`)
3. **Context API** - Estado global sin Redux
4. **localStorage** - Persistencia sin backend
5. **Pre-generación de Audios** - Mejor UX que TTS en tiempo real

### Performance

- ✅ SPA ultrarrápida (Vite)
- ✅ Audios cacheados con CDN
- ✅ Código splittable por rutas
- ✅ Optimizado para mobile

---

## 🚀 Deployment

### Opciones

#### Vercel (Recomendado para React)

```bash
npm install -g vercel
vercel
```

#### Netlify

```bash
npm run build
# Sube la carpeta dist/
```

#### GitHub Pages

```bash
npm run build
git add dist/
git commit -m "Deploy"
git push
```

---

## 📄 Licencia

MIT - Libre para usar, modificar y distribuir

---

## 💡 Roadmap Futuro

- [ ] Sincronización con backend (Firebase)
- [ ] Estadísticas de aprendizaje
- [ ] Spaced Repetition (SRS)
- [ ] Soporte para más idiomas
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Gamificación (puntos, logros)

---

## ✨ ¿Preguntas o Sugerencias?

1. **Guía de Audios:** Ver [AUDIO_SETUP.md](./AUDIO_SETUP.md)
2. **Código Fuente:** Bien comentado en cada archivo
3. **Quick Start Audio:** Ejecuta `node scripts/QUICK_START.js`

---

**¡Feliz aprendizaje! 🚀**

Hecho con ❤️ para camareros estudiosos de inglés.
