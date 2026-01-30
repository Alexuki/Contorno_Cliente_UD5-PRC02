// Estado do xogo
let gameState = {
    //TODO - Engadir propiedades necesarias
};

/**
 * Xenera unha matriz aleatoria con números de 0 a 99 sen repetición
 * @returns {number[]} Array con 100 números aleatorios
 */
function generateRandomMatrix() {
    // TODO - Implementar función segundo o enunciado
    return [];

}

/**
 * Renderiza a matriz na páxina
 */
function renderMatrix() {
    const container = document.getElementById('matrixContainer');
    container.innerHTML = '';
    
    gameState.matriz.forEach((numero, index) => {
       //TODO - Crear elementos DOM para cada número e engadir eventos de click
       // Lembrar engadir clases e IDs necesarios
    });
}

/**
 * Xestiona o click nun número
 * @param {number} numero - O número clickado
 * @param {HTMLElement} elemento - O elemento DOM do número
 */
function handleNumberClick(numero, elemento) {
   //TODO - Implementar función segundo o enunciado
   //Recorda verificar se o xogo está completo e tamén actualizar o estado do xogo
  
      
}

/**
 * Marca o xogo como completado
 */
function completeGame() {
     //TODO - Implementar función segundo o enunciado e mostrar mensaxe de éxito
}

/**
 * Reinicia o xogo
 */
function resetGame() {
    // TODO Limpar estado e inicializar variables
    
    
    // TODO Actualizar a interface o numero esperado e erros
  
    
    //TODO Renderizar nova matriz
    
}

//TODO  Inicializar xogo cando se cargue a páxina

