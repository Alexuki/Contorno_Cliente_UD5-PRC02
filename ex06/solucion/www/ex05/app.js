// Estado do xogo
let gameState = {
    matriz: [],
    targetChar: '',
    targetPositions: [],
    foundPositions: [],
    errors: 0,
    isGameComplete: false,
    isGameStarted: false,
    timeLimit: 30,
    timeRemaining: 30,
    timerId: null
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const STATS_KEY = 'xogoEstatisticas';

function loadStats() {
    const raw = sessionStorage.getItem(STATS_KEY);
    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveStats(stats) {
    sessionStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function recordGameStats(success) {
    const stats = loadStats();
    const timeUsed = Math.max(0, gameState.timeLimit - gameState.timeRemaining);

    stats.push({
        id: Date.now(),
        success,
        targetChar: gameState.targetChar,
        totalTargets: gameState.targetPositions.length,
        found: gameState.foundPositions.length,
        errors: gameState.errors,
        timeUsed
    });

    saveStats(stats);
    renderStats();
}

function toggleStats() {
    const panel = document.getElementById('statsPanel');
    panel.classList.toggle('visible');
    if (panel.classList.contains('visible')) {
        renderStats();
    }
}

function renderStats() {
    const list = document.getElementById('statsList');
    const stats = loadStats();

    list.innerHTML = '';

    if (stats.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.className = 'stats-item';
        emptyItem.textContent = 'Non hai estatísticas nesta sesión.';
        list.appendChild(emptyItem);
        return;
    }

    stats.slice().reverse().forEach((entry) => {
        const item = document.createElement('li');
        item.className = 'stats-item';
        const status = entry.success ? '✅' : '⏰';
        const timeText = `${entry.timeUsed}s`;

        item.innerHTML = `
            <span>${status} Obxectivo: ${entry.targetChar}</span>
            <span>Atopadas: ${entry.found}/${entry.totalTargets}</span>
            <span>Erros: ${entry.errors}</span>
            <span>Tempo: ${timeText}</span>
        `;

        list.appendChild(item);
    });
}

function generateMatrix() {
    const matriz = [];
    const targetChar = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    const targetCount = Math.floor(Math.random() * 4) + 3; // 3-6

    for (let i = 0; i < targetCount; i++) {
        matriz.push(targetChar);
    }

    const remainingCount = 36 - targetCount;
    for (let i = 0; i < remainingCount; i++) {
        let randomChar;
        do {
            randomChar = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        } while (randomChar === targetChar);
        matriz.push(randomChar);
    }

    for (let i = matriz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [matriz[i], matriz[j]] = [matriz[j], matriz[i]];
    }

    return { matriz, targetChar };
}

function findTargetPositions() {
    const positions = [];
    gameState.matriz.forEach((char, index) => {
        if (char === gameState.targetChar) {
            positions.push(index);
        }
    });
    return positions;
}

function renderMatrix() {
    const container = document.getElementById('matrixContainer');
    container.innerHTML = '';

    gameState.matriz.forEach((char, index) => {
        const elemento = document.createElement('div');
        elemento.className = 'char-cell';
        elemento.textContent = char;
        elemento.dataset.index = index;
        elemento.id = `char-${index}`;

        elemento.addEventListener('click', () => handleCellClick(index, elemento));
        container.appendChild(elemento);
    });
}

function handleCellClick(index, elemento) {
    if (gameState.isGameComplete || !gameState.isGameStarted) {
        return;
    }

    if (gameState.foundPositions.includes(index)) {
        return;
    }

    if (gameState.targetPositions.includes(index)) {
        elemento.classList.add('found');
        elemento.style.pointerEvents = 'none';

        gameState.foundPositions.push(index);
        document.getElementById('foundCount').textContent = gameState.foundPositions.length;

        if (gameState.foundPositions.length === gameState.targetPositions.length) {
            completeGame(true);
        }
    } else {
        elemento.classList.add('error');
        gameState.errors++;
        document.getElementById('errorCount').textContent = gameState.errors;

        setTimeout(() => {
            elemento.classList.remove('error');
        }, 500);
    }
}

function startTimer() {
    stopTimer();
    gameState.timeRemaining = gameState.timeLimit;
    updateTimerDisplay();

    gameState.timerId = setInterval(() => {
        gameState.timeRemaining--;
        updateTimerDisplay();

        if (gameState.timeRemaining <= 0) {
            completeGame(false);
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    const timerBox = document.getElementById('timerBox');

    timerElement.textContent = gameState.timeRemaining;

    if (gameState.timeRemaining <= 10 && gameState.timeRemaining > 0) {
        timerBox.classList.add('warning');
    } else {
        timerBox.classList.remove('warning');
    }
}

function stopTimer() {
    if (gameState.timerId) {
        clearInterval(gameState.timerId);
        gameState.timerId = null;
    }
}

function completeGame(success) {
    gameState.isGameComplete = true;
    gameState.isGameStarted = false;
    stopTimer();
    recordGameStats(success);

    const message = document.getElementById('completionMessage');
    const matrixContainer = document.getElementById('matrixContainer');

    matrixContainer.classList.add('game-disabled');

    if (success) {
        message.textContent = gameState.errors === 0
            ? `✅ Perfecto! Atopaches todas as ${gameState.targetPositions.length} coincidencias!`
            : `✅ Moi ben! Atopaches todas as ${gameState.targetPositions.length} coincidencias con ${gameState.errors} erro${gameState.errors !== 1 ? 's' : ''}.`;
        message.className = 'completion-message success';
    } else {
        message.textContent = `⏰ Tempo esgotado! Atopaches ${gameState.foundPositions.length} de ${gameState.targetPositions.length}.`;
        message.className = 'completion-message timeout';
    }

    setStartButtonState(false, 'Iniciar Xogo');
}

function setStartButtonState(enabled, label) {
    const startButton = document.getElementById('btnStart');
    startButton.disabled = !enabled;
    if (label) {
        startButton.textContent = label;
    }
}

function startGame() {
    if (gameState.isGameComplete || gameState.isGameStarted) {
        return;
    }

    gameState.isGameStarted = true;
    document.getElementById('matrixContainer').classList.remove('game-disabled');
    document.getElementById('completionMessage').className = 'completion-message';

    setStartButtonState(false, 'Xogando...');
    startTimer();
}

function newGame() {
    const result = generateMatrix();

    gameState = {
        matriz: result.matriz,
        targetChar: result.targetChar,
        targetPositions: [],
        foundPositions: [],
        errors: 0,
        isGameComplete: false,
        isGameStarted: false,
        timeLimit: 30,
        timeRemaining: 30,
        timerId: null
    };

    gameState.targetPositions = findTargetPositions();

    document.getElementById('targetChar').textContent = gameState.targetChar;
    document.getElementById('foundCount').textContent = '0';
    document.getElementById('totalCount').textContent = gameState.targetPositions.length;
    document.getElementById('errorCount').textContent = '0';
    document.getElementById('completionMessage').className = 'completion-message';
    document.getElementById('matrixContainer').classList.add('game-disabled');

    renderMatrix();
    updateTimerDisplay();
    setStartButtonState(true, 'Iniciar Xogo');
}

function resetMatrix() {
    gameState.foundPositions = [];
    gameState.errors = 0;
    gameState.isGameComplete = false;
    gameState.isGameStarted = false;

    document.getElementById('foundCount').textContent = '0';
    document.getElementById('errorCount').textContent = '0';
    document.getElementById('completionMessage').className = 'completion-message';
    document.getElementById('matrixContainer').classList.add('game-disabled');

    renderMatrix();
    stopTimer();
    gameState.timeRemaining = gameState.timeLimit;
    updateTimerDisplay();
    setStartButtonState(true, 'Iniciar Xogo');
}

document.addEventListener('DOMContentLoaded', () => {
    newGame();
});
