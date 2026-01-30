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
    //TODO: Crear array con números de 0 a (size²-1)
     
    //TODO:  Algoritmo de Fisher-Yates para baraxar
   
    return null; // Retornar array baraxado
}

/**
 * Renderiza a matriz na páxina
 */
function renderMatrix() {
    const container = document.getElementById('matrixContainer');
    container.innerHTML = '';
    
    // Establecer o número de columnas segundo o tamaño da matriz
    container.style.gridTemplateColumns = `repeat(${/*TODO:completar alumnado*/ 0}, 1fr)`;
    
    gameState.matriz.forEach((numero, index) => {
        //ITERAR sobre os números da matriz e crear os elementos DOM
        const elemento = document.createElement('div');
         //TODO: engadir clase, texto, dataset e id ao elemento
        
         //TODO: engadir evento click ao elemento
         //TODO: engadir o elemento ao container con appendChild
        
       
    });
}

/**
 * Xestiona o click nun número
 * @param {number} numero - O número clickado
 * @param {HTMLElement} elemento - O elemento DOM do número
 */
function handleNumberClick(numero, elemento) {
    //TODO: Se o xogo non está iniciado ou xa rematou, non fai nada
     
    
    // TODO: Se o número é o que esperamos debemos facer:
        // Marcar como correcto
        // Desactivar o elemento
        // Incrementar o número esperado
        // Verificar se completou o xogo
    //TODO: Se o número non é o que esperamos debemos facer:
        // Marcar como erro
        // Incrementar contador de erros
        // Animar o erro (borralo despois de uns momentos)
    
    
}

/**
 * Inicia o temporizador de conta atrás ten en conta a configuración do usuario 
 */
function startTimer() {
    //TODO:  Limpar calquera temporizador existente
   
    
    //TODO:  Gardar o tempo de inicio
  
    //TODO:  Actualizar a visualización inicial emprega a funcionn updateTimerDisplay()
     
    
    //TODO:     Crear un novo temporizador para decrementar o tempo restante cada segundo.
     
}

/**
 * Actualiza a visualización do temporizador para o usuario, por exemplo en formato MM:SS. Tamén xestiona avisos visuais cando queda pouco tempo.   
 */
function updateTimerDisplay() {
    //Acedemos ao elemento do temporizador na páxina
    const timerElement = document.getElementById('timer');
    const timerBox = timerElement.parentElement; // Caixa contenedora do temporizador
    
    //TODO: Formatear o tempo en MM:SS
 
 
    
    //TODO Engadir aviso visual cando quedan menos de 10 segundos
    
}

/**
 * Detén o temporizador que é chamado ao completar o xogo ou reiniciar. 
 * Tamén calcula o tempo transcorrido.
 */
function stopTimer() {
   //TODO: Limpar o temporizador se existe
   //TODO:  Gardar o tempo de fin
   //TODO: Calcular o tempo transcorrido
    
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

// Inicializar ao cargar a páxina debe mostrar mensaxe inicial e inicializar temporizador
document.addEventListener('DOMContentLoaded', () => {
    //TODO: Configurar estado inicial para o tempo limite e tempo restante. Actualizar a visualización do temporizador con updateTimerDisplay()
   
    
    // Mostrar mensaxe inicial
    document.getElementById('matrixContainer').innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Pulsa "Iniciar Xogo" para comezar</p>';
});
