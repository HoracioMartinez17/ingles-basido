#!/usr/bin/env node
/**
 * 🎙️ Audio Generation Script - Quick Start Guide
 *
 * Uso rápido del script de generación de audios
 */

console.log(`
╔════════════════════════════════════════════════════════════════╗
║     🎙️  English Waiter App - Audio Generation Quick Start      ║
╚════════════════════════════════════════════════════════════════╝

📚 OPCIÓN 1: Generar Audios Locales (Sin Subir)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Copia .env.example a .env:
   $ cp .env.example .env

2. Edita .env y configura SOLO:
   ELEVENLABS_API_KEY=tu_api_key_aqui
   GENERATE_LOCAL_ONLY=true

3. Ejecuta el script:
   $ npm run generate-audio

✓ Los audios se guardarán en: ./public/audio/


🌍 OPCIÓN 2: Generar y Subir a Cloudinary (Recomendado)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Crea cuenta gratuita en:
   - ElevenLabs: https://elevenlabs.io
   - Cloudinary: https://cloudinary.com

2. Copia .env.example a .env:
   $ cp .env.example .env

3. Edita .env y configura TODO:
   
   ELEVENLABS_API_KEY=sk_...
   ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
   
   CLOUDINARY_CLOUD_NAME=tu_nombre
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   
   GENERATE_LOCAL_ONLY=false

4. En Cloudinary, crea Upload Preset:
   - Settings → Upload
   - Agrega "english_waiter"
   - Modo: Unsigned
   - Guardar

5. Ejecuta el script:
   $ npm run generate-audio

✓ Los audios se subirán a Cloudinary con CDN global


📊 ¿Cuál elegir?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LOCAL (GENERATE_LOCAL_ONLY=true):
  ✓ Gratis totalmente
  ✓ Audios almacenados localmente
  ✗ No hay CDN
  ✗ Más lento en conexiones remotas

CLOUDINARY (GENERATE_LOCAL_ONLY=false):
  ✓ CDN global + rápido
  ✓ Escalable
  ✓ 25GB/mes gratuito
  ✗ Requiere configuración
  ✗ Pequeño overhead de latencia de API

👉 RECOMENDACIÓN: Cloudinary (mejor UX)


⏱️ ¿Cuánto tarda?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- 21 frases × ElevenLabs TTS: ~2-3 minutos
- Upload a Cloudinary: ~1-2 minutos
- TOTAL: ~3-5 minutos


🎤 Voces Disponibles
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rachel:   21m00Tcm4TlvDq8ikWAM (Default)
Josh:     TtoHMqjbheRV60QrIZEP
Sam:      knnD5LTO7hihz3UNGvjT
Bella:    EXAVITQu4vr4xnSDxMaL
Antoni:   ErXwobaYiN84WevQeRHl

Cambia ELEVENLABS_VOICE_ID en .env para usar otra voz


🚀 Después de Generar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. phrases.js se actualiza automáticamente ✓
2. Audios disponibles en la app:
   - PhraseCard → Botón "Escuchar"
   - StudyCard → Debajo de la frase
   - ExamQuestion → (opcional)

3. Inicia la app:
   $ npm run dev

4. ¡Disfruta!


❓ ¿Problemas?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lee: AUDIO_SETUP.md (guía detallada con troubleshooting)


💡 Usa Ctrl+C para detener el script en cualquier momento

`);
