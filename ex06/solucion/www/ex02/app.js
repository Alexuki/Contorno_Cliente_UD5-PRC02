// Estado do xogo
let gameState = {
    matriz: [],              // Matriz de números aleatorios
    matrixSize: 10,          // Tamaño da matriz (NxN)
    nextNumber: 0,           // Próximo número que o usuario debe premer
    errors: 0,               // Contador de erros
    isGameComplete: false,   // Indica se o xogo está completo
    isGameStarted: false,    // Indica se o xogo está iniciado
    timeLimit: 60,           // Tempo límite en segundos
    timeRemaining: 60,       // Tempo restante en segundos
    timerId: null,           // ID do intervalo do temporizador
    startTime: null,         // Tempo de inicio do xogo
    endTime: null,           // Tempo de fin do xogo
    elapsedTime: 0           // Tempo transcorrido ao completar
};

/**
 * Xenera unha matriz aleatoria con números de 0 a (size²-1) sen repetición
 * @param {number} size - Tamaño da matriz (NxN)
 * @returns {number[]} Array con números aleatorios
 */
function generateRandomMatrix(size) {
    const totalNumbers = size * size;
    // Crear array con números de 0 a (size²-1)
    const numbers = Array.from({ length: totalNumbers }, (_, i) => i);
    
    // Algoritmo de Fisher-Yates para baraxar
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    return numbers;
}

/**
 * Renderiza a matriz na páxina
 */
function renderMatrix() {
    const container = document.getElementById('matrixContainer');
    container.innerHTML = '';
    
    // Establecer o número de columnas segundo o tamaño da matriz
    container.style.gridTemplateColumns = `repeat(${gameState.matrixSize}, 1fr)`;
    
    gameState.matriz.forEach((numero, index) => {
        const elemento = document.createElement('div');
        elemento.className = 'numero';
        elemento.textContent = numero;
        elemento.dataset.numero = numero;
        elemento.id = `numero-${numero}`;
        
        elemento.addEventListener('click', () => handleNumberClick(numero, elemento));
        
        container.appendChild(elemento);
    });
}

/**
 * Xestiona o click nun número
 * @param {number} numero - O número clickado
 * @param {HTMLElement} elemento - O elemento DOM do número
 */
function handleNumberClick(numero, elemento) {
    // Se o xogo non está iniciado ou xa rematou, non fai nada
    if (!gameState.isGameStarted || gameState.isGameComplete) {
        return;
    }
    
    // Se o número é o que esperamos
    if (numero === gameState.nextNumber) {
        // Marcar como correcto
        elemento.classList.add('correcta');
        elemento.classList.remove('error');
        
        // Desactivar o elemento
        elemento.style.pointerEvents = 'none';
        
        // Incrementar o número esperado
        gameState.nextNumber++;
        document.getElementById('nextNumber').textContent = gameState.nextNumber;
        
        // Verificar se completou o xogo
        const maxNumber = gameState.matrixSize * gameState.matrixSize;
        if (gameState.nextNumber === maxNumber) {
            completeGame(true);
        }
    } else {
        // Marcar como erro
        elemento.classList.add('error');
        elemento.classList.remove('correcta');
        
        // Incrementar contador de erros
        gameState.errors++;
        document.getElementById('errorCount').textContent = gameState.errors;
        
        // Animar o erro (removelo despois de uns momentos)
        setTimeout(() => {
            elemento.classList.remove('error');
        }, 600);
    }
}

/**
 * Inicia o temporizador de conta atrás
 */
function startTimer() {
    // Limpar calquera temporizador existente
    if (gameState.timerId) {
        clearInterval(gameState.timerId);
    }
    
    // Gardar o tempo de inicio
    gameState.startTime = Date.now();
    gameState.timeRemaining = gameState.timeLimit;
    
    // Actualizar a visualización inicial
    updateTimerDisplay();
    
    // Crear un novo temporizador
    gameState.timerId = setInterval(() => {
        gameState.timeRemaining--;
        updateTimerDisplay();
        
        // Verificar se o tempo se esgotou
        if (gameState.timeRemaining <= 0) {
            completeGame(false);
        }
    }, 1000);
}

/**
 * Actualiza a visualización do temporizador para o usuario, por exemplo en formato MM:SS. Tamén xestiona avisos visuais cando queda pouco tempo.   
 */
function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    const timerBox = timerElement.parentElement;
    
    // Formatear o tempo en MM:SS
    const minutes = Math.floor(gameState.timeRemaining / 60);
    const seconds = gameState.timeRemaining % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    timerElement.textContent = formattedTime;
    
    // Engadir aviso visual cando quedan menos de 10 segundos
    if (gameState.timeRemaining <= 10 && gameState.timeRemaining > 0) {
        timerBox.classList.add('warning');
    } else {
        timerBox.classList.remove('warning');
    }
}

/**
 * Detén o temporizador que é chamado ao completar o xogo ou reiniciar. 
 * Tamén calcula o tempo transcorrido.
 */
function stopTimer() {
    if (gameState.timerId) {
        clearInterval(gameState.timerId);
        gameState.timerId = null;
    }
    
    // Calcular o tempo transcorrido
    if (gameState.startTime) {
        gameState.endTime = Date.now();
        gameState.elapsedTime = Math.floor((gameState.endTime - gameState.startTime) / 1000);
    }
}

/**
 * Marca o xogo como completado. Executase cando o usuario completa o xogo con éxito ou cando esgota o tempo.
 * Ten en conta o parámetro success para determinar o tipo de finalización.
 * @param {boolean} success - Indica se completou con éxito ou se esgotou o tempo
 */
function completeGame(success) {
    gameState.isGameComplete = true;
    gameState.isGameStarted = false;
    stopTimer();
    
    const message = document.getElementById('completionMessage');
    const matrixContainer = document.getElementById('matrixContainer');
    
    // Deshabilitar a matriz
    matrixContainer.classList.add('game-disabled');
    
    if (success) {
        // Completado con éxito
        message.className = 'completion-message success';
        const timeUsed = gameState.elapsedTime;
        const minutes = Math.floor(timeUsed / 60);
        const seconds = timeUsed % 60;
        
        if (gameState.errors === 0) {
            message.textContent = `✅ ¡Perfecto! Completaches o xogo sen erros en ${minutes}:${seconds.toString().padStart(2, '0')}!`;
        } else {
            message.textContent = `✅ ¡Felicidades! Completaches o xogo con ${gameState.errors} erro${gameState.errors !== 1 ? 's' : ''} en ${minutes}:${seconds.toString().padStart(2, '0')}!`;
        }
    } else {
        // Tempo esgotado
        message.className = 'completion-message timeout';
        message.textContent = `⏰ Tempo esgotado! Chegaches ao número ${gameState.nextNumber} con ${gameState.errors} erro${gameState.errors !== 1 ? 's' : ''}.`;
    }
    
    // Habilitar o botón de inicio
    document.getElementById('btnStart').disabled = false;
    document.getElementById('btnStart').textContent = '▶️ Iniciar Xogo';
}

/**
 * Inicia o xogo
 */
function startGame() {
    // Obter a configuración
    gameState.matrixSize = parseInt(document.getElementById('matrixSize').value);
    gameState.timeLimit = parseInt(document.getElementById('timeLimit').value);
    gameState.timeRemaining = gameState.timeLimit;
    
    // Limpar estado
    gameState.matriz = generateRandomMatrix(gameState.matrixSize);
    gameState.nextNumber = 0;
    gameState.errors = 0;
    gameState.isGameComplete = false;
    gameState.isGameStarted = true;
    gameState.elapsedTime = 0;
    
    // Actualizar UI
    document.getElementById('nextNumber').textContent = '0';
    document.getElementById('errorCount').textContent = '0';
    document.getElementById('completionMessage').className = 'completion-message';
    document.getElementById('matrixContainer').classList.remove('game-disabled');
    
    // Deshabilitar controis de configuración e botón de inicio
    document.getElementById('matrixSize').disabled = true;
    document.getElementById('timeLimit').disabled = true;
    document.getElementById('btnStart').disabled = true;
    document.getElementById('btnStart').textContent = '🎮 Xogando...';
    
    // Renderizar matriz e iniciar temporizador
    renderMatrix();
    startTimer();
}

/**
 * Reinicia o xogo
 */
function resetGame() {
    // Detén o temporizador
    stopTimer();
    
    // Limpar estado
    gameState = {
        matriz: [],
        matrixSize: parseInt(document.getElementById('matrixSize').value),
        nextNumber: 0,
        errors: 0,
        isGameComplete: false,
        isGameStarted: false,
        timeLimit: parseInt(document.getElementById('timeLimit').value),
        timeRemaining: parseInt(document.getElementById('timeLimit').value),
        timerId: null,
        startTime: null,
        endTime: null,
        elapsedTime: 0
    };
    
    // Actualizar UI
    document.getElementById('nextNumber').textContent = '0';
    document.getElementById('errorCount').textContent = '0';
    updateTimerDisplay();
    document.getElementById('completionMessage').className = 'completion-message';
    document.getElementById('matrixContainer').innerHTML = '<p style="text-align: center; color: #999;">Pulsa "Iniciar Xogo" para comezar</p>';
    document.getElementById('matrixContainer').classList.remove('game-disabled');
    
    // Habilitar controis de configuración e botón de inicio
    document.getElementById('matrixSize').disabled = false;
    document.getElementById('timeLimit').disabled = false;
    document.getElementById('btnStart').disabled = false;
    document.getElementById('btnStart').textContent = '▶️ Iniciar Xogo';
}

// Inicializar ao cargar a páxina
document.addEventListener('DOMContentLoaded', () => {
    // Configurar estado inicial
    gameState.timeLimit = parseInt(document.getElementById('timeLimit').value);
    gameState.timeRemaining = gameState.timeLimit;
    updateTimerDisplay();
    
    // Mostrar mensaxe inicial
    document.getElementById('matrixContainer').innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Pulsa "Iniciar Xogo" para comezar</p>';
});
