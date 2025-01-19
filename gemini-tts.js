// Configuración de la API de Google Cloud Text-to-Speech
const TTS_ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize';

// Cache para almacenar audios ya generados
const audioCache = new Map();

// Configuración principal de voz
const VOICE_CONFIG = {
    primary: 'it-IT-Studio-A',     // Voz principal - femenina clara
    backup: 'it-IT-Standard-A',    // Voz de respaldo si la principal falla
};

let lastSuccessfulVoice = VOICE_CONFIG.primary;

async function generateSpeech(text) {
    try {
        // Verificar si el audio ya está en caché
        if (audioCache.has(text)) {
            return audioCache.get(text);
        }

        // Obtener la API key del objeto window
        const apiKey = window.GOOGLE_CLOUD_API_KEY;
        if (!apiKey) {
            throw new Error('API key no configurada');
        }

        // Configurar la voz a usar
        const voiceToUse = lastSuccessfulVoice;

        const response = await fetch(`${TTS_ENDPOINT}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: { 
                    text,
                    ssml: `<speak>
                        <prosody rate="0.90" pitch="+0">
                            ${text}
                        </prosody>
                    </speak>`
                },
                voice: {
                    languageCode: 'it-IT',
                    name: voiceToUse,
                    ssmlGender: 'FEMALE'
                },
                audioConfig: {
                    audioEncoding: 'MP3',
                    pitch: 0,
                    speakingRate: 0.90,
                    volumeGainDb: 0,
                    effectsProfileId: ['handset-class-device'],
                    sampleRateHertz: 24000
                }
            })
        });

        if (!response.ok) {
            // Si la voz principal falla, intentar con la de respaldo
            if (voiceToUse === VOICE_CONFIG.primary) {
                lastSuccessfulVoice = VOICE_CONFIG.backup;
                return generateSpeech(text);
            }
            throw new Error('Error al generar el audio');
        }

        const data = await response.json();
        const audioContent = data.audioContent;
        
        // Guardar en caché
        audioCache.set(text, audioContent);
        
        return audioContent;
    } catch (error) {
        console.error('Error en generateSpeech:', error);
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
            audio.preservesPitch = true;
            
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Error al reproducir audio:', error);
                    fallbackSpeak(text);
                });
            }
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
        utterance.rate = 0.90;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Intentar encontrar una voz italiana en el navegador
        const voices = window.speechSynthesis.getVoices();
        const italianVoice = voices.find(voice => 
            voice.lang.includes('it-IT') || 
            voice.lang.includes('it') ||
            voice.name.toLowerCase().includes('italian')
        );

        if (italianVoice) {
            utterance.voice = italianVoice;
        }

        window.speechSynthesis.speak(utterance);
    }
}

// Función principal para hablar
async function speak(text, options = {}) {
    const cleanText = prepareTextForSpeech(text);
    
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    try {
        await playGeminiAudio(cleanText);
    } catch (error) {
        console.error('Error con Gemini TTS, usando respaldo:', error);
        fallbackSpeak(cleanText);
    }
}

// Función de preparación de texto
function prepareTextForSpeech(text) {
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

    let cleanText = text.toLowerCase();
    for (let [original, replacement] of Object.entries(replacements)) {
        cleanText = cleanText.replace(new RegExp(original, 'gi'), replacement);
    }

    return cleanText;
}
