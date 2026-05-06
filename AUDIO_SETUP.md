# 🎙️ Guía de Generación de Audios con ElevenLabs

## 📋 Resumen

Este script genera audios MP3 profesionales usando la API de ElevenLabs y los sube a Cloudinary para servirse globalmente con CDN.

### Ventajas de esta Estrategia

- ✅ **Audios Pregenerados**: Sin latencia en la app
- ✅ **CDN Global**: Cloudinary distribuye los audios por todo el mundo
- ✅ **Bajo Costo**: Paga una sola vez por generar
- ✅ **Mejor UX**: Reproducción instantánea en la app
- ✅ **Escalable**: Puedes agregar más frases sin problema

---

## 🚀 Configuración Paso a Paso

### Paso 1: Obtener API Key de ElevenLabs

1. Ve a [elevenlabs.io](https://elevenlabs.io)
2. Crea una cuenta (plan gratuito: 10,000 caracteres/mes)
3. Ve a **Account → API Keys**
4. Copia tu API Key

### Paso 2: Configurar Cloudinary (Opcional pero Recomendado)

#### Opción A: Con Cloudinary (Recomendado)

1. Ve a [cloudinary.com](https://cloudinary.com)
2. Crea una cuenta gratuita (25GB/mes)
3. Ve al **Dashboard** y copia:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

4. **Configura un Upload Preset**:
   - Ve a **Settings → Upload**
   - Agrega un nuevo Upload Preset llamado `english_waiter`
   - Modo: Unsigned
   - Guardarlo

#### Opción B: Solo Local (Sin subir a la nube)

Si prefieres solo generar los archivos localmente:

```bash
GENERATE_LOCAL_ONLY=true
```

### Paso 3: Crear archivo `.env`

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` y completa:

```env
# ElevenLabs
ELEVENLABS_API_KEY=tu_api_key_aqui

# Si usas Cloudinary:
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Opcional
GENERATE_LOCAL_ONLY=false  # true = solo local
```

### Paso 4: Instalar Dependencias

```bash
npm install
```

### Paso 5: Ejecutar el Script

```bash
npm run generate-audio
```

#### Ejemplo de Salida:

```
🎙️  English Waiter Audio Generator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 Preparando directorios...
✓ Listo

📖 Leyendo frases...
✓ Se encontraron 21 frases

🎵 Generando audios con ElevenLabs...
   Voz: 21m00Tcm4TlvDq8ikWAM

[1/21] Good morning
  📝 Generando audio: "Good morning..."
  ✓ Audio guardado: phrase-1.mp3
  ☁️  Subiendo a Cloudinary: phrase-1.mp3
  ✓ URL: https://res.cloudinary.com/...

[2/21] Good afternoon
  ...
```

---

## 🎤 Voces Disponibles en ElevenLabs

Puedes cambiar la voz en `.env` usando estos IDs:

| Voz    | ID                     | Tipo                |
| ------ | ---------------------- | ------------------- |
| Rachel | `21m00Tcm4TlvDq8ikWAM` | Natural, femenina   |
| Josh   | `TtoHMqjbheRV60QrIZEP` | Natural, masculino  |
| Sam    | `knnD5LTO7hihz3UNGvjT` | Neutral, masculino  |
| Bella  | `EXAVITQu4vr4xnSDxMaL` | Cálida, femenina    |
| Antoni | `ErXwobaYiN84WevQeRHl` | Profunda, masculino |

**Usa cualquiera de estos IDs en tu `.env`:**

```env
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
```

---

## 📁 Estructura Generada

Después de ejecutar el script:

```
ingles-camarero/
├── public/
│   └── audio/
│       ├── phrase-1.mp3
│       ├── phrase-2.mp3
│       └── ... (más audios)
└── src/
    └── data/
        └── phrases.js (actualizado con URLs)
```

---

## 🔄 Actualización de phrases.js

El script actualiza automáticamente `phrases.js`:

**Antes:**

```javascript
{
  id: 1,
  english: "Good morning",
  spanish: "Buenos días",
  pronunciation: "Gud mórnin",
  audio: ""
}
```

**Después (con Cloudinary):**

```javascript
{
  id: 1,
  english: "Good morning",
  spanish: "Buenos días",
  pronunciation: "Gud mórnin",
  audio: "https://res.cloudinary.com/.../phrase-1.mp3"
}
```

**O (local):**

```javascript
{
  id: 1,
  english: "Good morning",
  spanish: "Buenos días",
  pronunciation: "Gud mórnin",
  audio: "./audio/phrase-1.mp3"
}
```

---

## 🐛 Troubleshooting

### Error: "ELEVENLABS_API_KEY not configured"

- Verifica que tengas un archivo `.env` en la raíz del proyecto
- Asegúrate de haber copiado la API Key correcta

### Error: "Cloudinary error"

- Verifica que el Upload Preset se llame `english_waiter`
- Comprueba que sea modo "Unsigned"
- Revisa tus credenciales en `.env`

### Error: "HTTP 401"

- Tu API Key de ElevenLabs expiró o es inválida
- Copia una nueva desde el dashboard

### Solo genera audios locales sin subir

- Usa `GENERATE_LOCAL_ONLY=true` en `.env`
- Los audios se guardarán en `./public/audio/`

---

## 💡 Tips Pro

1. **Prueba con una frase primero**:
   - Comenta todas las frases excepto una en `phrases.js`
   - Ejecuta el script
   - Verifica que funcione

2. **Retry automático**:
   - El script reintenta 3 veces si falla una llamada a la API

3. **Rate limiting**:
   - Hay un delay de 500ms entre requests (configurable)

4. **Audios en localStorage**:
   - Los audios se cachean en el navegador automáticamente

---

## 📊 Costos Aproximados

| Servicio       | Plan Gratuito            | Costo      |
| -------------- | ------------------------ | ---------- |
| **ElevenLabs** | 10,000 caracteres/mes    | $8/100,000 |
| **Cloudinary** | 25GB/mes                 | $8 después |
| **Total**      | Suficiente para esta app | ~$5-10/mes |

---

## 🔐 Seguridad

⚠️ **IMPORTANTE:**

- Nunca commitees tu `.env` al repositorio
- Usa `GENERATE_LOCAL_ONLY=false` en producción (subir a CDN)
- `.gitignore` ya contiene `.env`

---

## ✨ Próximos Pasos

1. Ejecuta el script: `npm run generate-audio`
2. Inicia la app: `npm run dev`
3. ¡Escucha los audios en todas las pantallas!

---

¿Dudas? Revisa los logs del script para más información. 🚀
