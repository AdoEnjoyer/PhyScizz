let tog = 1;
let rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
let winSound = new Audio('winharpsichord-39642.mp3');

let p1sum = 0;
let p2sum = 0;

const questions = [
    { q: "These are the abundant gases in the stellar evolution.", options: ["Nitrogen and Chlorine", "Helium and Hydrogen"], answer: 1 },
    { q: "When carbon fuses, what element is formed?", options: ["Neon", "Hydrogen"], answer: 0 },
    { q: "In stellar nucleosynthesis, when silicon fuses what element is formed?", options: ["Iron", "Magnesium"], answer: 0 },
    { q: "In the main sequence star, what happens if the fusion stops?", options: ["The energy in the core increases.", "The chemical reaction in the core stops."], answer: 1 },
    { q: "The energy detected in star formation.", options: ["Infrared radiation", "Ultraviolet ray"], answer: 0 },
    { q: "When magnesium fuses, what element is formed?", options: ["Neon", "Silicon"], answer: 1 },
    { q: "It is a device used to speed up protons using magnetic and electrical fields.", options: ["Spectroscopy", "Particle Accelerator"], answer: 1 },
    { q: "He created a classification of elements based on atomic weight.", options: ["Moseley", "Mendeleev"], answer: 1 },
    { q: "It is a one-dimensional point which contains a huge mass in an infinitely small space.", options: ["Nucleosynthesis", "Singularity"], answer: 1 },
    { q: "He noticed that shooting electrons at elements caused them to release x-rays at unique frequencies.", options: ["Mendeleev", "Moseley"], answer: 1 },
    { q: "What do you call the relative ability of a bonded atom to attract shared electron pairs?", options: ["Electron affinity", "Electronegativity"], answer: 1 },
    { q: "Which of the following molecules is tetrahedral?", options: ["BF3", "CH4"], answer: 1 },
    { q: "Which of the following IMFAs is considered as the weakest?", options: ["H-bonding", "London forces"], answer: 1 },
    { q: "Which of the following substances will dissolve most likely in water?", options: ["Vinegar (CH3COOH)", "Carbon tetrachloride (CCl4)"], answer: 0 },
    { q: "Which of the following molecules has high melting point?", options: ["BCl3", "BeCl2"], answer: 1 },
    { q: "What is the smallest particle of an element that retains its chemical properties?", options: ["Atom", "Molecule"], answer: 0 },
    { q: "Which law states that the volume of a gas is inversely proportional to its pressure at constant temperature?", options: ["Boyle's Law", "Charles' Law"], answer: 0 },
    { q: "What type of chemical bond involves the sharing of electron pairs between atoms?", options: ["Ionic Bond", "Covalent Bond"], answer: 1 },
    { q: "Which subatomic particle is negatively charged?", options: ["Proton", "Electron"], answer: 1 },
    { q: "Which of the following is an example of a homogeneous mixture?", options: ["Saltwater", "Salad"], answer: 0 },
    { q: "Which form of energy is associated with the movement of charged particles?", options: ["Thermal Energy", "Electrical Energy"], answer: 1 },
    { q: "Which scientist formulated the laws of motion?", options: ["Isaac Newton", "Albert Einstein"], answer: 0 },
    { q: "Which of the following is a property of nonmetals?", options: ["Good conductor of heat", "Poor conductor of electricity"], answer: 1 },
    { q: "What is the most abundant element in the Earth's crust?", options: ["Oxygen", "Silicon"], answer: 0 },
    { q: "Which of the following electromagnetic waves has the highest frequency?", options: ["Radio waves", "Gamma rays"], answer: 1 },
    { q: "What is the SI unit of energy?", options: ["Newton", "Joule"], answer: 1 },
    { q: "Which of the following forces is responsible for objects staying in orbit?", options: ["Friction", "Gravity"], answer: 1 },
    { q: "What type of chemical reaction involves a substance combining with oxygen to release energy?", options: ["Combustion", "Decomposition"], answer: 0 },
    { q: "What is the name of the force that resists the motion of objects moving through air?", options: ["Tension", "Air resistance"], answer: 1 },
    { q: "What subatomic particle has a positive charge?", options: ["Electron", "Proton"], answer: 1 },
    { q: "Which law states that an object at rest stays at rest unless acted upon by an external force?", options: ["Newton's First Law", "Newton's Third Law"], answer: 0 },
    { q: "Which of the following is an example of potential energy?", options: ["A moving car", "A stretched rubber band"], answer: 1 },
    { q: "Which of the following is a renewable source of energy?", options: ["Coal", "Solar"], answer: 1 },
    { q: "Which part of the atom contains protons and neutrons?", options: ["Nucleus", "Electron cloud"], answer: 0 },
    { q: "What happens to the pressure of a gas if its temperature increases while volume is kept constant?", options: ["Increases", "Decreases"], answer: 0 },
    { q: "What type of reaction involves two elements or compounds combining to form a more complex substance?", options: ["Synthesis", "Decomposition"], answer: 0 }
];


function askQuestion(callback) {
    if (askedQuestions.size === questions.length) {
        askedQuestions.clear(); // Reset when all questions are asked
    }
    let qIndex;
    do {
        qIndex = Math.floor(Math.random() * questions.length);
    } while (askedQuestions.has(qIndex));
    
    askedQuestions.add(qIndex);
    let qObj = questions[qIndex];
    
    let questionBox = document.getElementById("questionBox");
    let questionText = document.getElementById("questionText");
    let optionA = document.getElementById("optionA");
    let optionB = document.getElementById("optionB");
    
    questionText.innerText = qObj.q;
    optionA.innerText = qObj.options[0];
    optionB.innerText = qObj.options[1];
    
    questionBox.style.display = "block";
    
    optionA.onclick = () => checkAnswer(0, qObj.answer, callback);
    optionB.onclick = () => checkAnswer(1, qObj.answer, callback);
}




function selectCharacter(element, characterName, characterImage) {
    if (!localStorage.getItem('player1Character')) {
        localStorage.setItem('player1Character', JSON.stringify({ name: characterName, image: characterImage }));
        alert('Player 1 selected ' + characterName);
    } else if (!localStorage.getItem('player2Character')) {
        localStorage.setItem('player2Character', JSON.stringify({ name: characterName, image: characterImage }));
        alert('Player 2 selected ' + characterName);
    } else {
        alert('Both players have already selected characters!');
    }
    element.classList.add('selected');
}

function displaySelectedCharacters() {
    let player1Character = JSON.parse(localStorage.getItem('player1Character'));
    let player2Character = JSON.parse(localStorage.getItem('player2Character'));

    if (player1Character) {
        document.getElementById('player1Image').src = player1Character.image;
        document.getElementById('player1Name').innerText = player1Character.name;
    }
    if (player2Character) {
        document.getElementById('player2Image').src = player2Character.image;
        document.getElementById('player2Name').innerText = player2Character.name;
    }
}

function askQuestion(callback) {
    let qIndex = Math.floor(Math.random() * questions.length);
    let qObj = questions[qIndex];
    
    let questionBox = document.getElementById("questionBox");
    let questionText = document.getElementById("questionText");
    let optionA = document.getElementById("optionA");
    let optionB = document.getElementById("optionB");
    
    questionText.innerText = qObj.q;
    optionA.innerText = qObj.options[0];
    optionB.innerText = qObj.options[1];
    
    questionBox.style.display = "block";
    
    optionA.onclick = () => checkAnswer(0, qObj.answer, callback);
    optionB.onclick = () => checkAnswer(1, qObj.answer, callback);
}

function checkAnswer(selected, correct, callback) {
    document.getElementById("questionBox").style.display = "none";
    if (selected === correct) {
        alert("Correct! You may move.");
        callback(true);
    } else {
        alert("Wrong! You lose your turn.");
        callback(false);
    }
}

function play(player, psum, correction, num) {
    let sum;
    if (psum === 'p1sum') {
        p1sum += num;
        if (p1sum > 100) p1sum -= num;
        sum = p1sum;
    } else {
        p2sum += num;
        if (p2sum > 100) p2sum -= num;
        sum = p2sum;
    }
    
    if (sum === 100) {
        winSound.play();
        alert(`${player === 'p1' ? 'Player 1' : 'Player 2'} Won!!`);
        location.reload();
    }

    document.getElementById(player).style.transition = `linear all .5s`;

    let row = Math.floor((sum - 1) / 10);
    let col = (sum - 1) % 10;
    if (row % 2 !== 0) col = 9 - col;

    document.getElementById(player).style.left = `${col * 62}px`;
    document.getElementById(player).style.top = `${-row * 62 - correction}px`;
}

document.getElementById("diceBtn").addEventListener("click", function () {
    rollingSound.play();
    let num = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerText = num;

    askQuestion(correct => {
        if (!correct) {
            tog++;
            document.getElementById('tog').innerText = tog % 2 === 0 ? "Player 2's Turn:" : "Player 1's Turn:";
            return;
        }

        if (tog % 2 !== 0) {
            document.getElementById('tog').innerText = "Player 2's Turn:";
            play('p1', 'p1sum', 0, num);
        } else {
            document.getElementById('tog').innerText = "Player 1's Turn:";
            play('p2', 'p2sum', 55, num);
        }
        tog++;
    });
});

window.onload = function () {
    displaySelectedCharacters();
};
