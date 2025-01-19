// Sistema de Text-to-Speech optimizado para italiano
class ItalianTTS {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.currentVoice = null;
        this.isInitialized = false;
        this.audioCache = new Map();
        
        // Configuración de voz italiana
        this.voicePreferences = [
            { contains: 'italiano', gender: 'female' },
            { contains: 'italian', gender: 'female' },
            { contains: 'it-IT', gender: 'female' }
        ];

        // Inicializar voces cuando estén disponibles
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.initializeVoices();
        }
        
        // Intentar inicializar inmediatamente también
        this.initializeVoices();
    }

    initializeVoices() {
        if (this.isInitialized) return;

        this.voices = this.synth.getVoices();
        if (this.voices.length > 0) {
            this.selectBestItalianVoice();
            this.isInitialized = true;
            console.log('TTS Italiano inicializado con voz:', this.currentVoice?.name);
        }
    }

    selectBestItalianVoice() {
        // Buscar la mejor voz italiana disponible
        for (const pref of this.voicePreferences) {
            // Primero intentar encontrar una voz que coincida exactamente
            const exactMatch = this.voices.find(voice => 
                voice.lang === 'it-IT' &&
                voice.name.toLowerCase().includes(pref.contains)
            );
            
            if (exactMatch) {
                this.currentVoice = exactMatch;
                return;
            }

            // Si no hay coincidencia exacta, buscar una aproximada
            const approxMatch = this.voices.find(voice => 
                voice.name.toLowerCase().includes(pref.contains) ||
                voice.lang.toLowerCase().includes('it')
            );

            if (approxMatch) {
                this.currentVoice = approxMatch;
                return;
            }
        }

        // Si no se encuentra ninguna voz italiana, usar la primera voz it-IT disponible
        this.currentVoice = this.voices.find(voice => voice.lang === 'it-IT') ||
                           this.voices.find(voice => voice.lang.includes('it')) ||
                           this.voices[0]; // Última opción: usar cualquier voz
    }

    prepareText(text) {
        // Mapa de reemplazos para mejorar la pronunciación
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

    async speak(text, options = {}) {
        // Asegurarse de que las voces estén inicializadas
        if (!this.isInitialized) {
            this.initializeVoices();
        }

        // Limpiar el texto
        const cleanText = this.prepareText(text);

        // Cancelar cualquier pronunciación anterior
        this.synth.cancel();

        // Crear nueva pronunciación
        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        // Configurar la pronunciación
        utterance.voice = this.currentVoice;
        utterance.lang = 'it-IT';
        utterance.rate = options.rate || 0.9;  // Velocidad ligeramente más lenta para claridad
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume || 1.0;

        // Promesa para manejar la finalización
        return new Promise((resolve, reject) => {
            utterance.onend = () => resolve();
            utterance.onerror = (error) => reject(error);
            this.synth.speak(utterance);
        });
    }
}

// Crear instancia global del TTS
const italianTTS = new ItalianTTS();

// Función global para hablar
async function speak(text, options = {}) {
    try {
        await italianTTS.speak(text, options);
    } catch (error) {
        console.error('Error en la pronunciación:', error);
    }
}
