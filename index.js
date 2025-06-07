//Dom ELements
const skipButton = document.getElementById("skip-button");
const pngText = document.getElementById("pnj-text");
const menu = document.getElementById("menu");
const content = document.getElementById("content");
const menuSelection = document.getElementById("menu-selection");
const clock = document.getElementById("clock");
const date = document.getElementById("date");
const batteryText = document.getElementById("battery");

//  Jeux -> Menu avec les differents minis jeux
//  Etudes -> Road map avec quetes principales et side quest
//  Projects -> 
//  Experiences -> 
//  Competences -> Skill tree


//States
let isMenuSelected = true;
let isScreenOn = false;

const Menu = {
    numberOfRows: 1,
    selectedElement: 1,
    elements: ["Competences", "Projets", "Mini-Jeux", "Experiences", "Etudes"],
    selectNextElement() {
        let next = (this.selectedElement + 1) % this.elements.length;
        this.render(next);
    },
    selectPrevElement() {
        let prev = (this.selectedElement - 1 + this.elements.length) % this.elements.length;
        this.render(prev);
    },
    unselectElements() {
        this.render(-1);
    },
    selectFirstElements() {
        this.render(0);
    },
    render(selectedIndex = 0){
        menuSelection.innerHTML = "";
        this.elements.forEach((item, idx) => {
            const h3 = document.createElement("h3");
            h3.textContent = item;
            if (idx === selectedIndex) {
                h3.textContent = `> ${item} <`;
            }
            menuSelection.appendChild(h3);
        });
        this.selectedElement = selectedIndex;
    },
}


async function say() {
    await speak(pngText, "Salut, moi c'est Octave ! <...>");
    await speak(pngText, "Bienvenue sur mon portfolio interactif <...>");
    await speak(pngText, "Pour commencer clique sur le menu de séléction et utilise les flèches <...>");
    await speak(pngText, "Il y aura bientôt mon parcours et des minis jeux ici <...>");
    await speak(pngText, "Je te conseille de revenir dans quelque jours <...>");
    await speak(pngText, "Quand j'aurais fini de faire le site !");
}

async function speak(element, text) {
    let textPrinted = "";
    let skip = false;

    const skipHandler = () => { skip = true; };
    skipButton.addEventListener('click', skipHandler);

    for (let i = 0; i < text.length; i++) {
        textPrinted += text[i];
        element.textContent = textPrinted + "_";
        if (skip) break;
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    element.textContent = text;
    skipButton.removeEventListener('click', skipHandler);

    await new Promise(resolve => {
        const nextHandler = () => {
            skipButton.removeEventListener('click', nextHandler);
            resolve();
        };
        skipButton.addEventListener('click', nextHandler);
    });
}

function setupSelection(){
    const menuSelectedHandler = () => {
        isMenuSelected = true;
        console.log("Menu is clicked");
        menu.removeEventListener('click', menuSelectedHandler);
        content.addEventListener('click', contentSelectedHandler);
        Menu.selectFirstElements();
    }

    const contentSelectedHandler = () => {
        isMenuSelected = false;
        console.log("Content is clicked");
        content.removeEventListener('click', contentSelectedHandler);
        menu.addEventListener('click', menuSelectedHandler);
        Menu.unselectElements();
    }
    if(isMenuSelected) content.addEventListener('click', contentSelectedHandler);
    else menu.addEventListener('click', menuSelectedHandler);
}


function setupKeyboard() {
    document.addEventListener('keydown', event => {
        if (!isMenuSelected) return;
        if (event.key === "ArrowDown" || event.key === "s") {
            Menu.selectNextElement();
        } else if (event.key === "ArrowUp" || event.key === "z" || event.key === "w") {
            Menu.selectPrevElement();
        }else if (event.key === "Enter" || event.key === "ArrowRight"){
            toggleScreen();
        }
    });
}

function setDate(){
    let now = new Date();
    date.textContent = String(now.getDay()+1) + "." + String(now.getMonth()+1) + "." + String(now.getFullYear());
}

function upDateClock(){
    let now = new Date();
    let hours = now.getHours().toString().padStart(2,0);
    let minutes = now.getMinutes().toString().padStart(2,0);
    clock.textContent = hours + ":" + minutes;
}

async function updateBattery() {
    if(!("getBattery" in navigator)) return;
    let battery = await navigator.getBattery();
    console.log(battery.level);
    batteryText.textContent = String(battery.level*100) +"%";
}

function toggleScreen() {
    const screen = document.querySelector('.screen');
    const viewport = document.querySelector('.viewport');
    
    if (isScreenOn) {
        // Allumer l'écran
        screen.classList.remove('off');
        screen.classList.add('on');
        viewport.classList.add('on');
    } else {
        // Éteindre l'écran
        screen.classList.remove('on');
        screen.classList.add('off');
        viewport.classList.remove('on');
    }

    isScreenOn = !isScreenOn;
}

//Execution
function init() {
    say();
    setupSelection();
    setupKeyboard();
    setDate();
    Menu.render();
    upDateClock();
    setInterval(upDateClock,1000)
    updateBattery();
    toggleScreen();
}

init();