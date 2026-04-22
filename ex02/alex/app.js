// ─── Estado do xogo ───────────────────────────────────────────────────────────

const gameState = {
    matrix: [],
    matrixSize: 10,
    nextNumber: 0,
    errors: 0,
    status: 0,       // 0: novo, 1: iniciado, 2: rematado
    timeLimit: 60,
    timeRemaining: 60,
    timer: null,
};

// ─── Inicialización ───────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    fillMatrixSizeSelect();
    fillTimeLimitSelect();
    updateTimer();
    document.getElementById("btnStart").addEventListener("click", startGame);
    document.getElementById("btnReset").addEventListener("click", resetGame);
    document.getElementById("btnReset").disabled = true;
});

// ─── Selects de configuración ─────────────────────────────────────────────────

function fillMatrixSizeSelect() {
    const select = document.getElementById("matrixSize");
    for (let i = 2; i <= 10; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${i} x ${i}`;
        option.selected = i === gameState.matrixSize;
        select.appendChild(option);
    }
}

function fillTimeLimitSelect() {
    const select = document.getElementById("timeLimit");
    for (let i = 30; i <= 180; i += 30) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${i} segundos`;
        option.selected = i === gameState.timeLimit;
        select.appendChild(option);
    }
}

// ─── Temporizador ─────────────────────────────────────────────────────────────

function initTimer() {
    gameState.timer = setInterval(() => {
        gameState.timeRemaining--;
        updateTimer();
        if (gameState.timeRemaining <= 0) completeGame(false);
    }, 1000);
}

function stopTimer() {
    clearInterval(gameState.timer);
    gameState.timer = null;
}

function updateTimer() {
    const timer = document.getElementById("timer");
    const timerBox = timer.parentElement;
    timer.textContent = formatTime(gameState.timeRemaining);
    timerBox.classList.toggle("warning", gameState.timeRemaining <= 10 && gameState.status === 1);
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m} : ${s}`;
}

// ─── Flujo de xogo ────────────────────────────────────────────────────────────

function startGame() {
    const isRestart = gameState.status === 0 && gameState.matrix.length > 0;

    gameState.matrixSize = parseInt(document.getElementById("matrixSize").value);
    gameState.timeLimit = parseInt(document.getElementById("timeLimit").value);
    gameState.timeRemaining = gameState.timeLimit;
    gameState.nextNumber = 0;
    gameState.errors = 0;
    gameState.status = 1;

    stopTimer();
    clearCompletionMessage();
    updateNextNumber();
    updateErrors();
    updateTimer();

    if (isRestart) {
        // Reusar a matriz existente: só restaurar estado visual das celdas
        document.getElementById("matrixContainer").classList.remove("game-disabled");
        document.querySelectorAll(".numero").forEach(el => {
            el.classList.remove("correcta", "error");
            el.style.pointerEvents = "";
        });
    } else {
        renderMatrix();
    }

    initTimer();

    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnReset").disabled = false;
}

function resetGame() {
    stopTimer();
    gameState.status = 0;
    gameState.timeRemaining = gameState.timeLimit;
    gameState.nextNumber = 0;
    gameState.errors = 0;

    clearCompletionMessage();
    updateNextNumber();
    updateErrors();
    updateTimer();

    document.getElementById("matrixContainer").classList.remove("game-disabled");
    document.querySelectorAll(".numero").forEach(el => {
        el.classList.remove("correcta", "error");
        el.style.pointerEvents = "";
    });

    document.getElementById("btnStart").disabled = false;
    document.getElementById("btnReset").disabled = true;
}

function completeGame(success) {
    gameState.status = 2;
    stopTimer();

    document.getElementById("matrixContainer").classList.add("game-disabled");

    const message = document.getElementById("completionMessage");
    if (success) {
        const timeUsed = gameState.timeLimit - gameState.timeRemaining;
        const errText = gameState.errors === 0
            ? "sen erros"
            : `con ${gameState.errors} erro${gameState.errors !== 1 ? "s" : ""}`;
        message.className = "completion-message success";
        message.textContent = `✅ ¡Felicidades! Completaches o xogo ${errText} en ${formatTime(timeUsed)}!`;
    } else {
        message.className = "completion-message timeout";
        message.textContent = `⏰ Tempo esgotado! Chegaches ao número ${gameState.nextNumber} con ${gameState.errors} erro${gameState.errors !== 1 ? "s" : ""}.`;
    }

    document.getElementById("btnStart").disabled = false;
    document.getElementById("btnReset").disabled = false;
}

// ─── Matriz ───────────────────────────────────────────────────────────────────

function createMatrix() {
    const numbers = [...Array(gameState.matrixSize ** 2).keys()];
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
}

function renderMatrix(matrix = null) {
    const matrixContainer = document.getElementById("matrixContainer");
    matrixContainer.querySelectorAll(".numero").forEach(el => el.remove());
    matrixContainer.style.gridTemplateColumns = `repeat(${gameState.matrixSize}, 1fr)`;

    document.getElementById("infoText").classList.add("hide");

    gameState.matrix = matrix ?? createMatrix();
    gameState.matrix.forEach(number => {
        const el = document.createElement("div");
        el.textContent = number;
        el.className = "numero";
        el.addEventListener("click", () => handleNumberClick(el));
        matrixContainer.appendChild(el);
    });
}

function handleNumberClick(element) {
    const value = parseInt(element.textContent);

    if (value === gameState.nextNumber) {
        element.classList.add("correcta");
        element.style.pointerEvents = "none";
        gameState.nextNumber++;
        updateNextNumber();
        if (gameState.nextNumber === gameState.matrixSize ** 2) completeGame(true);
    } else {
        element.classList.add("error");
        gameState.errors++;
        updateErrors();
        setTimeout(() => element.classList.remove("error"), 1000);
    }
}

// ─── Actualización de UI ──────────────────────────────────────────────────────

function updateNextNumber() {
    document.getElementById("nextNumber").textContent = gameState.nextNumber;
}

function updateErrors() {
    document.getElementById("errorCount").textContent = gameState.errors;
}

function clearCompletionMessage() {
    const message = document.getElementById("completionMessage");
    message.className = "completion-message";
    message.textContent = "";
}