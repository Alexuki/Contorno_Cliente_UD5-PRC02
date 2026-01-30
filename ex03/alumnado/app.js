// Estado do xogo
let gameState = {
    //TODO: Completar o estado do xogo cun obxecto inicial cos atributos necesarios
};

// Alfabeto completo en galego/español
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Xenera unha matriz aleatoria de 36 caracteres do alfabeto
 * Asegúrase de que o carácter obxectivo aparece polo menos 3-6 veces
 * @returns {Object} Obxecto con matriz e carácter obxectivo que será cos seguinte formato:
 * {
 *   matriz: ['A', 'B', 'C', ...], // 36 caracteres
 *   targetChar: 'X'               // Carácter obxectivo
 * }
 */
function generateMatrix() {
    const matriz = [];  // Matriz a xerar
    //TODO: Completar a función para xerar a matriz segundo as especificacións que son:
    // 1. Escoller un carácter obxectivo aleatorio
    // 2. Decidir cantas veces aparecerá o carácter obxectivo (entre 3 e 6)
    // 3. Engadir o carácter obxectivo as veces decididas
    // 4. Encher o resto con caracteres aleatorios (sen incluír o carácter obxectivo)
    // 5. Baraxar a matriz con Fisher-Yates o que fai que o carácter obxectivo estea en posicións aleatorias
    // 6. Devolver un obxecto con a matriz e o carácter obxectivo e recorda o formato indicado arriba
    
    return null; // Cambiar isto polo obxecto correcto
    
}

/**
 * Identifica as posicións onde está o carácter obxectivo para facilitar a comprobación
 * @returns {number[]} Array con índices das posicións
 */
function findTargetPositions() {
    const positions = []; // Array para gardar as posicións do carácter obxectivo
    //TODO: Recorre a matriz e engade os índices onde está o carácter obxectivo ao array positions
   
    return null; // Cambiar isto polo array correcto
}

/**
 * Renderiza a matriz na páxina
 */
function renderMatrix() {
    const container = document.getElementById('matrixContainer');
    container.innerHTML = '';
    
    //TODO: Recorre a matriz e crea os elementos DOM correspondentes
    gameState.matriz.forEach((char, index) => {
        const elemento = document.createElement('div');
        //TODO: Completar a creación do elemento (clases, contido, data-atributos, id, etc.)
        container.appendChild(elemento);
    });
}

/**
 * Xestiona o click nunha cela da matriz
 * @param {number} index - Índice da cela clickada
 * @param {HTMLElement} elemento - Elemento DOM da cela
 */
function handleCellClick(index, elemento) {
    //TODO: Se o xogo xa rematou, non fai nada
    //TODO: Se esta posición xa foi atopada, non fai nada
   
    //TODO: Verificar se a cela contén o carácter obxectivo
    
}

/**
 * Marca o xogo como completado
 */
function completeGame() {
    //TODO: Actualizar o estado do xogo como completado
    
 
    
    const message = document.getElementById('completionMessage');
    const matrixContainer = document.getElementById('matrixContainer');
    
    //TODO: Deshabilitar a matriz engade o clase 'game-disabled' ao container da matriz
     
    // Mensaxe de felicitación
    if (gameState.errors === 0) {
        message.textContent = `🎉 ¡Perfecto! Atopaches todas as ${gameState.targetPositions.length} coincidencias sen erros!`;
    } else {
        message.textContent = `✅ ¡Moi ben! Atopaches todas as ${gameState.targetPositions.length} coincidencias con ${gameState.errors} erro${gameState.errors !== 1 ? 's' : ''}!`;
    }
    message.classList.add('success');
}

/**
 * Inicia un novo xogo con nova matriz e novo carácter obxectivo
 */
function newGame() {
    // Xenerar nova matriz e carácter obxectivo
    const result = generateMatrix();
    
    //TODO: Actualizar o estado do xogo con a nova matriz e carácter obxectivo
    
    //TODO: Identificar posicións do carácter obxectivo
     
    // Actualizar UI
    document.getElementById('targetChar').textContent = gameState.targetChar;
    document.getElementById('foundCount').textContent = '0';
    document.getElementById('totalCount').textContent = gameState.targetPositions.length;
    document.getElementById('errorCount').textContent = '0';
    document.getElementById('completionMessage').className = 'completion-message';
    document.getElementById('matrixContainer').classList.remove('game-disabled');
    
    //TODO: Renderizar a matriz
  
}

/**
 * Reinicia o estado actual (mantén a mesma matriz)
 */
function resetMatrix() {
    //TODO: Limpar posicións atopadas, e o xogo esta completado e erros
 
    
    // Actualizar UI
    document.getElementById('foundCount').textContent = '0';
    document.getElementById('errorCount').textContent = '0';
    document.getElementById('completionMessage').className = 'completion-message';
    document.getElementById('matrixContainer').classList.remove('game-disabled');
    
    //TODO  : Re-renderizar a matriz
   
}

// Inicializar xogo cando se cargue a páxina
// TODO: Engadir o event listener para cargar o xogo ao cargar a páxina
