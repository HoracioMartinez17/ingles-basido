#!/usr/bin/env node
/**
 * 🎙️ Audio Generation Script for English Waiter App
 *
 * Genera audios usando ElevenLabs TTS y los sube a Cloudinary
 * Uso: node scripts/generate-audio.js
 *
 * Features:
 * - Genera MP3 por cada frase
 * - Sube a Cloudinary (CDN global incluido)
 * - Actualiza phrases.js con URLs
 * - Manejo robusto de errores
 * - Retry logic para fallos de red
 */

import fs from "fs/promises";
import path from "path";
import https from "https";
import FormData from "form-data";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CONFIG = {
  elevenlabs: {
    apiKey: process.env.ELEVENLABS_API_KEY,
    voiceId: process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM", // Rachel
    model: process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2",
    outputFormat: process.env.ELEVENLABS_OUTPUT_FORMAT || "mp3_44100_128",
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    folder: "english-waiter-audios",
  },
  app: {
    outputDir: process.env.OUTPUT_DIR || "./public/audio",
    phrasesFile: process.env.PHRASES_FILE || "./src/data/phrases.js",
    generateLocalOnly: process.env.GENERATE_LOCAL_ONLY === "true",
    maxRetries: 3,
    retryDelay: 2000,
  },
};

// ============================================================================
// VALIDACIÓN DE CONFIGURACIÓN
// ============================================================================

function validateConfig() {
  const errors = [];

  if (!CONFIG.elevenlabs.apiKey) {
    errors.push("❌ ELEVENLABS_API_KEY no configurada en .env");
  }

  if (!CONFIG.app.generateLocalOnly) {
    if (!CONFIG.cloudinary.cloudName) {
      errors.push("❌ CLOUDINARY_CLOUD_NAME no configurada en .env");
    }
    if (!CONFIG.cloudinary.apiKey) {
      errors.push("❌ CLOUDINARY_API_KEY no configurada en .env");
    }
    if (!CONFIG.cloudinary.apiSecret) {
      errors.push("❌ CLOUDINARY_API_SECRET no configurada en .env");
    }
  }

  if (errors.length > 0) {
    console.error("\n" + errors.join("\n"));
    console.error("\n📋 Copia .env.example a .env y configura las variables\n");
    process.exit(1);
  }
}

// ============================================================================
// ELEVENLABS API
// ============================================================================

const elevenlabs = new ElevenLabsClient({
  apiKey: CONFIG.elevenlabs.apiKey,
  maxRetries: CONFIG.app.maxRetries,
});

async function generateAudioWithRetry(text, retries = 0) {
  try {
    console.log(`  📝 Generando audio: "${text.substring(0, 50)}..."`);

    const audioStream = await elevenlabs.textToSpeech.convert(CONFIG.elevenlabs.voiceId, {
      text,
      modelId: CONFIG.elevenlabs.model,
      outputFormat: CONFIG.elevenlabs.outputFormat,
      voiceSettings: {
        stability: 0.5,
        similarityBoost: 0.8,
      },
    });

    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks);
  } catch (error) {
    if (retries < CONFIG.app.maxRetries) {
      console.log(
        `  ⚠️  Error en intento ${retries + 1}/${CONFIG.app.maxRetries}. Reintentando en ${CONFIG.app.retryDelay}ms...`,
      );
      await new Promise((resolve) => setTimeout(resolve, CONFIG.app.retryDelay));
      return generateAudioWithRetry(text, retries + 1);
    }
    throw error;
  }
}

// ============================================================================
// CLOUDINARY UPLOAD
// ============================================================================

async function uploadToCloudinary(filePath, fileName) {
  try {
    console.log(`  ☁️  Subiendo a Cloudinary: ${fileName}`);

    const fileContent = await fs.readFile(filePath);
    const form = new FormData();

    form.append("file", fileContent, fileName);
    form.append("upload_preset", "english_waiter"); // Debe estar configurado en Cloudinary
    form.append("folder", CONFIG.cloudinary.folder);
    form.append("resource_type", "auto");

    return new Promise((resolve, reject) => {
      const options = {
        hostname: `api.cloudinary.com`,
        port: 443,
        path: `/v1_1/${CONFIG.cloudinary.cloudName}/auto/upload`,
        method: "POST",
        headers: form.getHeaders(),
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const result = JSON.parse(data);
            resolve(result.secure_url);
          } else {
            reject(new Error(`Cloudinary error: ${data}`));
          }
        });
      });

      req.on("error", reject);
      form.pipe(req);
    });
  } catch (error) {
    console.error(`  ❌ Error subiendo a Cloudinary: ${error.message}`);
    throw error;
  }
}

// ============================================================================
// GESTIÓN DE ARCHIVOS
// ============================================================================

async function ensureOutputDir() {
  try {
    await fs.mkdir(CONFIG.app.outputDir, { recursive: true });
  } catch (error) {
    console.error(`❌ Error creando directorio: ${error.message}`);
    throw error;
  }
}

async function savePhraseAudio(phraseId, audioBuffer) {
  const fileName = `phrase-${phraseId}.mp3`;
  const filePath = path.join(CONFIG.app.outputDir, fileName);

  try {
    await fs.writeFile(filePath, audioBuffer);
    console.log(`  ✓ Audio guardado: ${fileName}`);
    return filePath;
  } catch (error) {
    console.error(`❌ Error guardando audio: ${error.message}`);
    throw error;
  }
}

// ============================================================================
// LECTURA DE PHRASES
// ============================================================================

async function readPhrases() {
  try {
    // Usar dynamic import para cargar el archivo directamente
    const absolutePath = path.resolve(CONFIG.app.phrasesFile);
    const phrases = (await import(`file://${absolutePath}`)).default;
    return phrases;
  } catch (error) {
    console.error(`❌ Error leyendo phrases: ${error.message}`);
    throw error;
  }
}

// ============================================================================
// ACTUALIZACIÓN DE PHRASES
// ============================================================================

async function updatePhrasesFile(phrases) {
  try {
    const phrasesCode = `// MODEL: Datos de frases para estudiar inglés de camarero
const phrases = ${JSON.stringify(phrases, null, 2)};

export default phrases;
`;

    await fs.writeFile(CONFIG.app.phrasesFile, phrasesCode);
    console.log(`\n✓ Archivo phrases.js actualizado con URLs de audio`);
  } catch (error) {
    console.error(`❌ Error actualizando phrases: ${error.message}`);
    throw error;
  }
}

// ============================================================================
// MAIN PROCESS
// ============================================================================

async function main() {
  console.log("\n🎙️  English Waiter Audio Generator\n");
  console.log("━".repeat(60));

  validateConfig();

  try {
    // Paso 1: Preparar
    console.log("\n📂 Preparando directorios...");
    await ensureOutputDir();
    console.log("✓ Listo");

    // Paso 2: Leer frases
    console.log("\n📖 Leyendo frases...");
    const phrases = await readPhrases();
    console.log(`✓ Se encontraron ${phrases.length} frases`);

    // Paso 3: Generar audios
    console.log("\n🎵 Generando audios con ElevenLabs...");
    console.log(`   Voz: ${CONFIG.elevenlabs.voiceId}\n`);
    console.log(`   Modelo: ${CONFIG.elevenlabs.model}`);
    console.log(`   Formato: ${CONFIG.elevenlabs.outputFormat}\n`);

    const phrasesWithAudio = [];

    for (let i = 0; i < phrases.length; i++) {
      const phrase = phrases[i];
      const progress = `[${i + 1}/${phrases.length}]`;

      try {
        console.log(`${progress} ${phrase.english}`);

        // Generar audio
        const audioBuffer = await generateAudioWithRetry(phrase.english);
        const localPath = await savePhraseAudio(phrase.id, audioBuffer);

        let audioUrl = `/audio/phrase-${phrase.id}.mp3`; // URL local por defecto (root-relative)

        // Subir a Cloudinary si no es solo local
        if (!CONFIG.app.generateLocalOnly) {
          try {
            audioUrl = await uploadToCloudinary(localPath, `phrase-${phrase.id}.mp3`);
            console.log(`  ✓ URL: ${audioUrl}`);
          } catch (uploadError) {
            console.warn(`  ⚠️  No se pudo subir a Cloudinary, usando URL local`);
          }
        }

        phrasesWithAudio.push({
          ...phrase,
          audio: audioUrl,
        });
      } catch (error) {
        console.error(`  ❌ Error procesando frase ${phrase.id}: ${error.message}`);
        phrasesWithAudio.push(phrase); // Mantener original sin audio
      }

      // Pequeño delay entre requests para no sobrecargar la API
      if (i < phrases.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    // Paso 4: Actualizar archivo
    console.log("\n💾 Actualizando archivo...");
    await updatePhrasesFile(phrasesWithAudio);

    // Resumen
    console.log("\n" + "━".repeat(60));
    console.log("\n✅ ¡Proceso completado!\n");
    console.log(`📊 Estadísticas:`);
    console.log(`   - Frases procesadas: ${phrasesWithAudio.length}`);
    console.log(`   - Audios con URL: ${phrasesWithAudio.filter((p) => p.audio).length}`);
    console.log(`   - Guardados en: ${CONFIG.app.outputDir}`);

    if (!CONFIG.app.generateLocalOnly) {
      console.log(
        `   - Subidos a Cloudinary: ${phrasesWithAudio.filter((p) => p.audio.startsWith("http")).length}`,
      );
    }

    console.log("\n🎉 Los audios están listos para usar en la app!\n");
  } catch (error) {
    console.error("\n❌ Error fatal:", error.message);
    process.exit(1);
  }
}

// Ejecutar
main();
