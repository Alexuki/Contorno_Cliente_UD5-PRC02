// Estado do xogo
let gameState = {
    matriz: [],              // Matriz de caracteres (36 elementos)
    targetChar: '',          // Carácter obxectivo a buscar
    targetPositions: [],     // Posicións onde está o carácter obxectivo
    foundPositions: [],      // Posicións xa atopadas polo usuario
    errors: 0,               // Contador de erros
    isGameComplete: false    // Indica se o xogo está completo
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
    
    // Escoller un carácter obxectivo aleatorio
    const caracterObxectivo = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    
    // Decidir cantas veces aparecerá o carácter obxectivo (entre 3 e 6)
    const repeticionsCaracterObxetivo = Math.floor(Math.random() * 4) + 3; // 3-6
    
    // Engadir o carácter obxectivo as veces decididas
    for (let i = 0; i < repeticionsCaracterObxetivo; i++) {
        matriz.push(caracterObxectivo);
    }
    
    // Encher o resto con caracteres aleatorios (sen incluír o carácter obxectivo)
    const posicionsLibres = 36 - repeticionsCaracterObxetivo;
    for (let i = 0; i < posicionsLibres; i++) {
        let caracterAleatorio;
        do {
            caracterAleatorio = ALPHABET[Math.floor(Math.random() * ALPHABET.length)]; // Escoller carácter aleatorio do alfabeto entre A-Z
        } while (caracterAleatorio === caracterObxectivo);
        matriz.push(caracterAleatorio);
    }
    
    // Baraxar a matriz con Fisher-Yates o que fai que o carácter obxectivo estea en posicións aleatorias
    for (let i = matriz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [matriz[i], matriz[j]] = [matriz[j], matriz[i]];
    }
    
    return {
        matriz: matriz,
        targetChar: caracterObxectivo
    };
}

/**
 * Identifica as posicións onde está o carácter obxectivo
 * @returns {number[]} Array con índices das posicións
 */
function findTargetPositions() {
    const positions = [];
    gameState.matriz.forEach((char, index) => {
        if (char === gameState.targetChar) {
            positions.push(index);
        }
    });
    return positions;
}

/**
 * Renderiza a matriz na páxina
 */
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

/**
 * Xestiona o click nunha cela da matriz
 * @param {number} index - Índice da cela clickada
 * @param {HTMLElement} elemento - Elemento DOM da cela
 */
function handleCellClick(index, elemento) {
    // Se o xogo xa rematou, non fai nada
    if (gameState.isGameComplete) {
        return;
    }
    
    // Se esta posición xa foi atopada, non fai nada
    if (gameState.foundPositions.includes(index)) {
        return;
    }
    
    // Verificar se a cela contén o carácter obxectivo
    if (gameState.targetPositions.includes(index)) {
        // Correcto! Atopouse unha coincidencia
        elemento.classList.add('found');
        elemento.style.pointerEvents = 'none';
        
        gameState.foundPositions.push(index);
        document.getElementById('foundCount').textContent = gameState.foundPositions.length;
        
        // Verificar se se atoparon todas as coincidencias
        if (gameState.foundPositions.length === gameState.targetPositions.length) {
            completeGame();
        }
    } else {
        // Erro! Non é o carácter correcto
        elemento.classList.add('error');
        gameState.errors++;
        document.getElementById('errorCount').textContent = gameState.errors;
        
        // Remover a clase de erro despois dunha animación
        setTimeout(() => {
            elemento.classList.remove('error');
        }, 500);
    }
}

/**
 * Marca o xogo como completado
 */
function completeGame() {
    gameState.isGameComplete = true;
    
    const message = document.getElementById('completionMessage');
    const matrixContainer = document.getElementById('matrixContainer');
    
    // Deshabilitar a matriz
    matrixContainer.classList.add('game-disabled');
    
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
    
    gameState = {
        matriz: result.matriz,
        targetChar: result.targetChar,
        targetPositions: [],
        foundPositions: [],
        errors: 0,
        isGameComplete: false
    };
    
    // Identificar posicións do carácter obxectivo
    gameState.targetPositions = findTargetPositions();
    
    // Actualizar UI
    document.getElementById('targetChar').textContent = gameState.targetChar;
    document.getElementById('foundCount').textContent = '0';
    document.getElementById('totalCount').textContent = gameState.targetPositions.length;
    document.getElementById('errorCount').textContent = '0';
    document.getElementById('completionMessage').className = 'completion-message';
    document.getElementById('matrixContainer').classList.remove('game-disabled');
    
    // Renderizar a matriz
    renderMatrix();
}

/**
 * Reinicia o estado actual (mantén a mesma matriz)
 */
function resetMatrix() {
    // Limpar posicións atopadas e erros
    gameState.foundPositions = [];
    gameState.errors = 0;
    gameState.isGameComplete = false;
    
    // Actualizar UI
    document.getElementById('foundCount').textContent = '0';
    document.getElementById('errorCount').textContent = '0';
    document.getElementById('completionMessage').className = 'completion-message';
    document.getElementById('matrixContainer').classList.remove('game-disabled');
    
    // Re-renderizar a matriz
    renderMatrix();
}

// Inicializar xogo cando se cargue a páxina
document.addEventListener('DOMContentLoaded', () => {
    newGame();
});
