// Configuración de la API de Google Cloud Text-to-Speech
const GOOGLE_CLOUD_API_KEY = 'YOUR_API_KEY'; // Necesitarás reemplazar esto con tu API key
const TTS_ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize';

// Cache para almacenar audios ya generados
const audioCache = new Map();

async function generateSpeech(text) {
    try {
        // Verificar si el audio ya está en caché
        if (audioCache.has(text)) {
            return audioCache.get(text);
        }

        const response = await fetch(`${TTS_ENDPOINT}?key=${GOOGLE_CLOUD_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: { text },
                voice: {
                    languageCode: 'it-IT',
                    name: 'it-IT-Wavenet-A', // Voz italiana de alta calidad
                    ssmlGender: 'FEMALE'
                },
                audioConfig: {
                    audioEncoding: 'MP3',
                    pitch: 0,
                    speakingRate: 1.0,
                    volumeGainDb: 0
                }
            })
        });

        if (!response.ok) {
            throw new Error('Error al generar el audio');
        }

        const data = await response.json();
        const audioContent = data.audioContent;
        
        // Guardar en caché
        audioCache.set(text, audioContent);
        
        return audioContent;
    } catch (error) {
        console.error('Error en generateSpeech:', error);
        // Si hay un error, usar el sistema de voz del navegador como respaldo
        fallbackSpeak(text);
        return null;
    }
}

// Función para reproducir el audio
async function playGeminiAudio(text) {
    try {
        const audioContent = await generateSpeech(text);
        if (audioContent) {
            const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
            audio.play();
        }
    } catch (error) {
        console.error('Error al reproducir audio:', error);
        fallbackSpeak(text);
    }
}

// Función de respaldo usando el sistema de voz del navegador
function fallbackSpeak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'it-IT';
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}

// Función principal que reemplazará la función speak actual
async function speak(text, options = {}) {
    // Limpiar el texto antes de enviarlo
    const cleanText = prepareTextForSpeech(text);
    
    // Intentar usar Gemini TTS primero
    try {
        await playGeminiAudio(cleanText);
    } catch (error) {
        console.error('Error con Gemini TTS, usando respaldo:', error);
        fallbackSpeak(cleanText);
    }
}

// Mantener la función de preparación de texto existente
function prepareTextForSpeech(text) {
    // Mapa de reemplazos para casos especiales
    const replacements = {
        "l'oca": "loca",
        "l'aquila": "laquila",
        "l'ape": "lape",
        "l'alce": "lalce",
        "l'orso": "lorso",
        "l'orca": "lorca",
        "l'ostrica": "lostrica",
        "l'aragosta": "laragosta",
        "l'astice": "lastice",
        "l'anguilla": "languilla",
        "l'aringa": "laringa",
        "l'anatra": "lanatra",
        "l'antilope": "lantilope",
        "l'elefante": "lelefante",
        "l'afide": "lafide",
        "l'avvoltoio": "lavvoltoio",
        "un'": "una",
        "dell'": "della",
        "all'": "alla",
        "sull'": "sulla",
        "dall'": "dalla",
        "nell'": "nella"
    };

    // Aplicar reemplazos
    let cleanText = text.toLowerCase();
    for (let [original, replacement] of Object.entries(replacements)) {
        cleanText = cleanText.replace(new RegExp(original, 'gi'), replacement);
    }

    return cleanText;
}
