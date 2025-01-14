// Función principal de pronunciación
function speak(text, options = {}) {
    if ('speechSynthesis' in window) {
        // Cancelar cualquier pronunciación anterior
        window.speechSynthesis.cancel();

        // Preparar el texto para pronunciación
        const cleanText = prepareTextForSpeech(text);
        
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'it-IT';
        utterance.rate = options.rate || 0.8;
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume || 1.0;

        // Configurar la voz
        setItalianVoice(utterance);

        // Pronunciar
        window.speechSynthesis.speak(utterance);
    }
}

// Función para preparar el texto para pronunciación
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

    // Manejar números
    cleanText = cleanText.replace(/(\d+)/g, (match) => {
        return numberToItalianWords(parseInt(match));
    });

    return cleanText;
}

// Función para convertir números a palabras en italiano
function numberToItalianWords(num) {
    const units = ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove'];
    const teens = ['dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'];
    const tens = ['', 'dieci', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'];

    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) {
        let unit = num % 10;
        let ten = Math.floor(num / 10);
        return unit === 0 ? tens[ten] : tens[ten] + units[unit];
    }
    return num.toString(); // Para números más grandes, mantener el número
}

// Función para configurar la voz italiana
function setItalianVoice(utterance) {
    const voices = speechSynthesis.getVoices();
    // Intentar encontrar la mejor voz italiana disponible
    const italianVoice = voices.find(voice => 
        voice.lang === 'it-IT' && voice.name.includes('Google')
    ) || voices.find(voice => 
        voice.lang === 'it-IT'
    ) || voices.find(voice => 
        voice.lang.startsWith('it')
    );

    if (italianVoice) {
        utterance.voice = italianVoice;
    }
}

// Evento para cargar las voces
if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => {
        const voices = speechSynthesis.getVoices();
        console.log('Voces disponibles:', voices.map(v => `${v.name} (${v.lang})`));
    };
}
