// Función principal de pronunciación
function speak(text, options = {}) {
    if ('speechSynthesis' in window) {
        // Cancelar cualquier pronunciación anterior
        window.speechSynthesis.cancel();

        // Preparar el texto para pronunciación
        const cleanText = prepareTextForSpeech(text);
        
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'it-IT';
        utterance.rate = 0.9;  // Velocidad consistente con hora.html
        utterance.pitch = 1.0;  // Tono natural como en hora.html
        utterance.volume = 1.0;

        // Configurar la voz
        setItalianVoice(utterance);

        // Añadir una pequeña pausa antes de la pronunciación para mejor calidad
        setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 100);
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
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    // Lista de voces preferidas en orden de prioridad
    const preferredVoices = [
        'Google italiano',
        'Microsoft Elsa',
        'Microsoft Cosimo',
        'Italian',
        'Italiano'
    ];

    // 1. Primero intentar encontrar una voz preferida específica
    for (const preferredVoice of preferredVoices) {
        selectedVoice = voices.find(voice => 
            voice.lang === 'it-IT' && 
            voice.name.toLowerCase().includes(preferredVoice.toLowerCase())
        );
        if (selectedVoice) break;
    }

    // 2. Si no se encuentra una voz preferida, buscar cualquier voz italiana nativa
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
            voice.lang === 'it-IT' && 
            voice.localService === true
        );
    }

    // 3. Si aún no hay voz, buscar cualquier voz italiana
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang === 'it-IT');
    }

    // 4. Como último recurso, buscar cualquier voz que incluya 'it'
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.includes('it'));
    }

    // Usar la voz seleccionada y configurar parámetros óptimos
    if (selectedVoice) {
        utterance.voice = selectedVoice;
        // Ajustar parámetros para una mejor calidad
        utterance.rate = 0.85;     // Velocidad ligeramente más lenta para mayor claridad
        utterance.pitch = 1.0;     // Tono natural
        utterance.volume = 1.0;    // Volumen máximo
    }

    // Registrar la voz seleccionada para debugging
    console.log('Voz seleccionada:', selectedVoice ? `${selectedVoice.name} (${selectedVoice.lang})` : 'No se encontró voz italiana');
}

// Evento para cargar las voces y mostrar información útil
if ('speechSynthesis' in window) {
    let voicesLoaded = false;
    
    speechSynthesis.onvoiceschanged = () => {
        if (voicesLoaded) return; // Evitar múltiples cargas
        voicesLoaded = true;
        
        const voices = speechSynthesis.getVoices();
        const italianVoices = voices.filter(voice => voice.lang === 'it-IT');
        
        console.log('Voces italianas disponibles:', 
            italianVoices.map(v => `${v.name} (${v.lang}${v.localService ? ', local' : ', red'})`)
        );
    };
}
