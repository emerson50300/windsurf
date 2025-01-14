// Essential Italian vocabulary following the Pareto Principle
const essentialVocabulary = [
    { italian: 'essere', english: 'to be' },
    { italian: 'avere', english: 'to have' },
    { italian: 'fare', english: 'to do/make' },
    { italian: 'andare', english: 'to go' },
    { italian: 'io', english: 'I' },
    { italian: 'tu', english: 'you (informal)' },
    { italian: 'lui/lei', english: 'he/she' },
    { italian: 'noi', english: 'we' },
    { italian: 'sì', english: 'yes' },
    { italian: 'no', english: 'no' },
    { italian: 'grazie', english: 'thank you' },
    { italian: 'prego', english: 'you\'re welcome' },
    { italian: 'per favore', english: 'please' },
    { italian: 'ciao', english: 'hello/goodbye' },
    { italian: 'arrivederci', english: 'goodbye (formal)' }
];

// Study schedule
const studySchedule = [
    '30 min: Essential Vocabulary',
    '30 min: Basic Grammar',
    '20 min: Listening Practice',
    '20 min: Speaking Practice',
    '20 min: Review Previous Material'
];

// Free learning resources
const freeResources = [
    { name: 'Duolingo', url: 'https://www.duolingo.com/course/it/en/Learn-Italian' },
    { name: 'BBC Languages - Italian', url: 'http://www.bbc.co.uk/languages/italian/' },
    { name: 'YouTube - ItalianPod101', url: 'https://www.youtube.com/user/italianpod101' },
    { name: 'Memrise', url: 'https://www.memrise.com/courses/english/italian/' }
];

// Practice tools
const practiceTools = [
    { name: 'Anki Flashcards', url: 'https://apps.ankiweb.net/' },
    { name: 'Quizlet', url: 'https://quizlet.com/' },
    { name: 'Tandem Language Exchange', url: 'https://www.tandem.net/' }
];

// Initialize flashcards
let currentCardIndex = 0;
const flashcard = document.querySelector('.flashcard');
const nextCardButton = document.getElementById('next-card');

function updateFlashcard() {
    const frontContent = document.querySelector('.flashcard-front p');
    const backContent = document.querySelector('.flashcard-back p');
    
    frontContent.textContent = essentialVocabulary[currentCardIndex].italian;
    backContent.textContent = essentialVocabulary[currentCardIndex].english;
}

// Flashcard flip functionality
if (flashcard) {
    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });
}

// Next card functionality
if (nextCardButton) {
    nextCardButton.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % essentialVocabulary.length;
        flashcard.classList.remove('flipped');
        updateFlashcard();
    });
}

// Populate study schedule
const scheduleList = document.getElementById('study-schedule');
if (scheduleList) {
    studySchedule.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        scheduleList.appendChild(li);
    });
}

// Populate resources
const freeResourcesList = document.getElementById('free-resources');
const practiceToolsList = document.getElementById('practice-tools');

if (freeResourcesList) {
    freeResources.forEach(resource => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = resource.url;
        a.textContent = resource.name;
        a.target = '_blank';
        li.appendChild(a);
        freeResourcesList.appendChild(li);
    });
}

if (practiceToolsList) {
    practiceTools.forEach(tool => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = tool.url;
        a.textContent = tool.name;
        a.target = '_blank';
        li.appendChild(a);
        practiceToolsList.appendChild(li);
    });
}

// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle card animations
function handleCardAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (isInViewport(card)) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Initialize the first flashcard
document.addEventListener('DOMContentLoaded', () => {
    updateFlashcard();
    handleCardAnimations();
});

window.addEventListener('scroll', () => {
    handleCardAnimations();
});

window.addEventListener('resize', () => {
    handleCardAnimations();
});
