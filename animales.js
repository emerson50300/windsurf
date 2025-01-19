// Datos de animales en italiano
const animalesData = {
    domesticos: [
        { italiano: "il gatto", espanol: "el gato", audio: "il gatto" },
        { italiano: "il cane", espanol: "el perro", audio: "il cane" },
        { italiano: "il coniglio", espanol: "el conejo", audio: "il coniglio" },
        { italiano: "il criceto", espanol: "el hámster", audio: "il criceto" },
        { italiano: "il pappagallo", espanol: "el loro", audio: "il pappagallo" },
        { italiano: "il pesce rosso", espanol: "el pez dorado", audio: "il pesce rosso" },
        { italiano: "la tartaruga", espanol: "la tortuga", audio: "la tartaruga" }
    ],
    granja: [
        { italiano: "il cavallo", espanol: "el caballo", audio: "il cavallo" },
        { italiano: "la mucca", espanol: "la vaca", audio: "la mucca" },
        { italiano: "il maiale", espanol: "el cerdo", audio: "il maiale" },
        { italiano: "la pecora", espanol: "la oveja", audio: "la pecora" },
        { italiano: "la capra", espanol: "la cabra", audio: "la capra" },
        { italiano: "il pollo", espanol: "el pollo", audio: "il pollo" },
        { italiano: "la gallina", espanol: "la gallina", audio: "la gallina" },
        { italiano: "l'anatra", espanol: "el pato", audio: "l'anatra" },
        { italiano: "l'oca", espanol: "el ganso", audio: "l'oca" },
        { italiano: "il tacchino", espanol: "el pavo", audio: "il tacchino" },
        { italiano: "l'asino", espanol: "el burro", audio: "l'asino" },
        { italiano: "il coniglio", espanol: "el conejo", audio: "il coniglio" }
    ],
    mamiferos: [
        { italiano: "il leone", espanol: "el león", audio: "il leone" },
        { italiano: "la tigre", espanol: "el tigre", audio: "la tigre" },
        { italiano: "l'elefante", espanol: "el elefante", audio: "l'elefante" },
        { italiano: "la giraffa", espanol: "la jirafa", audio: "la giraffa" },
        { italiano: "lo zebra", espanol: "la cebra", audio: "lo zebra" },
        { italiano: "l'orso", espanol: "el oso", audio: "l'orso" },
        { italiano: "il lupo", espanol: "el lobo", audio: "il lupo" },
        { italiano: "la volpe", espanol: "el zorro", audio: "la volpe" },
        { italiano: "il cervo", espanol: "el ciervo", audio: "il cervo" },
        { italiano: "l'alce", espanol: "el alce", audio: "l'alce" },
        { italiano: "il canguro", espanol: "el canguro", audio: "il canguro" },
        { italiano: "il koala", espanol: "el koala", audio: "il koala" },
        { italiano: "la scimmia", espanol: "el mono", audio: "la scimmia" },
        { italiano: "il gorilla", espanol: "el gorila", audio: "il gorilla" },
        { italiano: "il rinoceronte", espanol: "el rinoceronte", audio: "il rinoceronte" },
        { italiano: "l'ippopotamo", espanol: "el hipopótamo", audio: "l'ippopotamo" }
    ],
    mamiferos_marinos: [
        { italiano: "la balena", espanol: "la ballena", audio: "la balena" },
        { italiano: "il delfino", espanol: "el delfín", audio: "il delfino" },
        { italiano: "l'orca", espanol: "la orca", audio: "l'orca" },
        { italiano: "la foca", espanol: "la foca", audio: "la foca" },
        { italiano: "l'otaria", espanol: "el león marino", audio: "l'otaria" },
        { italiano: "la lontra", espanol: "la nutria", audio: "la lontra" },
        { italiano: "il tricheco", espanol: "la morsa", audio: "il tricheco" }
    ],
    aves: [
        { italiano: "l'aquila", espanol: "el águila", audio: "l'aquila" },
        { italiano: "il falco", espanol: "el halcón", audio: "il falco" },
        { italiano: "il gufo", espanol: "el búho", audio: "il gufo" },
        { italiano: "il piccione", espanol: "la paloma", audio: "il piccione" },
        { italiano: "il pappagallo", espanol: "el loro", audio: "il pappagallo" },
        { italiano: "il corvo", espanol: "el cuervo", audio: "il corvo" },
        { italiano: "il gabbiano", espanol: "la gaviota", audio: "il gabbiano" },
        { italiano: "il pinguino", espanol: "el pingüino", audio: "il pinguino" },
        { italiano: "il fenicottero", espanol: "el flamenco", audio: "il fenicottero" },
        { italiano: "il pavone", espanol: "el pavo real", audio: "il pavone" },
        { italiano: "il pellicano", espanol: "el pelícano", audio: "il pellicano" },
        { italiano: "il tucano", espanol: "el tucán", audio: "il tucano" },
        { italiano: "il colibrì", espanol: "el colibrí", audio: "il colibrì" }
    ],
    peces: [
        { italiano: "il tonno", espanol: "el atún", audio: "il tonno" },
        { italiano: "il salmone", espanol: "el salmón", audio: "il salmone" },
        { italiano: "il pesce spada", espanol: "el pez espada", audio: "il pesce spada" },
        { italiano: "lo squalo", espanol: "el tiburón", audio: "lo squalo" },
        { italiano: "la trota", espanol: "la trucha", audio: "la trota" },
        { italiano: "l'anguilla", espanol: "la anguila", audio: "l'anguilla" },
        { italiano: "il pesce pagliaccio", espanol: "el pez payaso", audio: "il pesce pagliaccio" },
        { italiano: "la sardina", espanol: "la sardina", audio: "la sardina" },
        { italiano: "l'aringa", espanol: "el arenque", audio: "l'aringa" }
    ],
    reptiles: [
        { italiano: "il coccodrillo", espanol: "el cocodrillo", audio: "il coccodrillo" },
        { italiano: "l'alligatore", espanol: "el caimán", audio: "l'alligatore" },
        { italiano: "il serpente", espanol: "la serpiente", audio: "il serpente" },
        { italiano: "la lucertola", espanol: "el lagarto", audio: "la lucertola" },
        { italiano: "l'iguana", espanol: "la iguana", audio: "l'iguana" },
        { italiano: "il camaleonte", espanol: "el camaleón", audio: "il camaleonte" },
        { italiano: "la tartaruga", espanol: "la tortuga", audio: "la tartaruga" }
    ],
    anfibios: [
        { italiano: "la rana", espanol: "la rana", audio: "la rana" },
        { italiano: "il rospo", espanol: "el sapo", audio: "il rospo" },
        { italiano: "la salamandra", espanol: "la salamandra", audio: "la salamandra" },
        { italiano: "il tritone", espanol: "el tritón", audio: "il tritone" }
    ],
    insectos: [
        { italiano: "la farfalla", espanol: "la mariposa", audio: "la farfalla" },
        { italiano: "l'ape", espanol: "la abeja", audio: "l'ape" },
        { italiano: "la formica", espanol: "la hormiga", audio: "la formica" },
        { italiano: "la coccinella", espanol: "la mariquita", audio: "la coccinella" },
        { italiano: "la libellula", espanol: "la libélula", audio: "la libellula" },
        { italiano: "lo scarabeo", espanol: "el escarabajo", audio: "lo scarabeo" },
        { italiano: "la mosca", espanol: "la mosca", audio: "la mosca" },
        { italiano: "la zanzara", espanol: "el mosquito", audio: "la zanzara" },
        { italiano: "il grillo", espanol: "el grillo", audio: "il grillo" },
        { italiano: "la cavalletta", espanol: "el saltamontes", audio: "la cavalletta" },
        { italiano: "la cicala", espanol: "la cigarra", audio: "la cicala" }
    ],
    otros_terrestres: [
        { italiano: "il ragno", espanol: "la araña", audio: "il ragno" },
        { italiano: "lo scorpione", espanol: "el escorpión", audio: "lo scorpione" },
        { italiano: "il millepiedi", espanol: "el ciempiés", audio: "il millepiedi" },
        { italiano: "la lumaca", espanol: "el caracol", audio: "la lumaca" }
    ],
    otros_marinos: [
        { italiano: "il polpo", espanol: "el pulpo", audio: "il polpo" },
        { italiano: "il calamaro", espanol: "el calamar", audio: "il calamaro" },
        { italiano: "la medusa", espanol: "la medusa", audio: "la medusa" },
        { italiano: "il granchio", espanol: "el cangrejo", audio: "il granchio" },
        { italiano: "l'aragosta", espanol: "la langosta", audio: "l'aragosta" },
        { italiano: "il gambero", espanol: "el camarón", audio: "il gambero" },
        { italiano: "l'ostrica", espanol: "la ostra", audio: "l'ostrica" },
        { italiano: "la stella marina", espanol: "la estrella de mar", audio: "la stella marina" },
        { italiano: "il cavalluccio marino", espanol: "el caballito de mar", audio: "il cavalluccio marino" }
    ],
    verbos: [
        { italiano: "abbaiare", espanol: "ladrar", audio: "abbaiare" },
        { italiano: "miagolare", espanol: "maullar", audio: "miagolare" },
        { italiano: "ruggire", espanol: "rugir", audio: "ruggire" },
        { italiano: "nitrire", espanol: "relinchar", audio: "nitrire" },
        { italiano: "muggire", espanol: "mugir", audio: "muggire" },
        { italiano: "grugnire", espanol: "gruñir", audio: "grugnire" },
        { italiano: "cinguettare", espanol: "piar", audio: "cinguettare" },
        { italiano: "gracchiare", espanol: "graznar", audio: "gracchiare" },
        { italiano: "sibilare", espanol: "silbar", audio: "sibilare" },
        { italiano: "ululare", espanol: "aullar", audio: "ululare" },
        { italiano: "ronzare", espanol: "zumbar", audio: "ronzare" }
    ]
};

// Función para crear una tarjeta de animal
function createAnimalCard(animal) {
    const card = document.createElement('div');
    card.className = 'animal-card';
    
    const textDiv = document.createElement('div');
    textDiv.innerHTML = `
        <div class="italian-word">${animal.italiano}</div>
        <div class="spanish-word">${animal.espanol}</div>
    `;
    
    const audioBtn = document.createElement('button');
    audioBtn.className = 'audio-btn';
    audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    audioBtn.onclick = () => speak(animal.audio);
    
    card.appendChild(textDiv);
    card.appendChild(audioBtn);
    
    return card;
}

// Inicializar todas las secciones
document.addEventListener('DOMContentLoaded', () => {
    // Iterar sobre cada sección en animalesData
    Object.entries(animalesData).forEach(([section, animals]) => {
        const container = document.getElementById(section);
        if (container) {
            animals.forEach(animal => {
                container.appendChild(createAnimalCard(animal));
            });
        }
    });
});
