const synth = window.speechSynthesis;

function speak(text) {
    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set Italian voice
    let italianVoice = null;
    const voices = synth.getVoices();
    
    for (const voice of voices) {
        if (voice.lang.includes('it')) {
            italianVoice = voice;
            break;
        }
    }

    if (italianVoice) {
        utterance.voice = italianVoice;
    }

    utterance.lang = 'it-IT';
    utterance.rate = 0.9; // Slightly slower
    utterance.pitch = 1;

    synth.speak(utterance);
}

// Load voices when they're available
speechSynthesis.onvoiceschanged = function() {
    console.log('Voices loaded');
};
