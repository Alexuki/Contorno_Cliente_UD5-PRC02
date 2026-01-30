// Estado do xogo
let gameState = {
    matriz: [],     // Matriz de números aleatorios
    nextNumber: 0, // Próximo número que o usuario debe premer
    errors: 0,     // Contador de erros
    isGameComplete: false // Indica se o xogo está completo
};

/**
 * Xenera unha matriz aleatoria con números de 0 a 99 sen repetición
 * @returns {number[]} Array con 100 números aleatorios
 */
function generateRandomMatrix() {
    // Crear array con números de 0 a 99
    const numbers = Array.from({ length: 100 }, (_, i) => i);
    
    // Algoritmo de Fisher-Yates para baraxar
    // Este algoritmo percorre o array de atrás para adiante,
    // intercambiando cada elemento cun outro elemento aleatorio que vén antes del (ou el mesmo)
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i (incluído)
        // Intercambiar numbers[i] con numbers[j]
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
    // Se o xogo xa rematou, non fai nada
    if (gameState.isGameComplete) {
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
        if (gameState.nextNumber === 100) {
            completeGame();
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
 * Marca o xogo como completado
 */
function completeGame() {
    gameState.isGameComplete = true;
    
    const message = document.getElementById('completionMessage');
    if (gameState.errors === 0) {
        message.textContent = '✅ ¡Perfecto! Completaches o xogo sen erros!';
    } else {
        message.textContent = `✅ ¡Felicidades! Completaches o xogo con ${gameState.errors} error${gameState.errors !== 1 ? 's' : ''}!`;
    }
    message.classList.add('success');
}

/**
 * Reinicia o xogo
 */
function resetGame() {
    // Limpar estado
    gameState = {
        matriz: generateRandomMatrix(),
        nextNumber: 0,
        errors: 0,
        isGameComplete: false
    };
    
    // Actualizar UI
    document.getElementById('nextNumber').textContent = '0';
    document.getElementById('errorCount').textContent = '0';
    document.getElementById('completionMessage').classList.remove('success');
    
    // Renderizar nova matriz
    renderMatrix();
}

// Inicializar xogo cando se cargue a páxina
document.addEventListener('DOMContentLoaded', () => {
    resetGame();
});
