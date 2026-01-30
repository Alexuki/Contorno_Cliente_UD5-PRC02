# Exercicio: Xogo da Matriz - Números en Orde

## Obxectivo

Crear unha aplicación web interactiva que permita ao usuario xogar un xogo onde debe seleccionar números ordenadamente de 0 a 99 nunha matriz aleatoria.

É necesario implementar a lóxica do xogo en JavaScript, xestionar o estado do xogo, e actualizar a interface de usuario en función das accións do usuario..

## Requisitos

### 0. **Configuración Inicial**
- Crear un ficheiro `app.js` e enlazalo no `index.html`
- Asegurarse de que o ficheiro JavaScript se carga correctamente ao abrir a páxina poderás implementalo dentro dun evento `DOMContentLoaded`. Exemplo este fragmento de código:
    ```javascript
    document.addEventListener('DOMContentLoaded', () => {
        // Código de inicialización do xogo aquí
    });
    ```
- Definir un obxecto `gameState` para xestionar o estado do xogo que terá os seguintes atributos:
  - `matriz`: Array que conterá os números aleatorios
  - `nextNumber`: Número que o usuario debe premer a continuación (inicialmente 0)
  - `errors`: Contador de erros (inicialmente 0)
  - `isGameComplete`: Indicador de se o xogo foi completado (inicialmente false)

### 1. **Xeneración da Matriz Aleatoria**
- Crear unha matriz coa función `generateRandomMatrix()` que:
  - Contén 100 números (0 a 99)
  - Cada número aparece **só unha vez** (sen repetición)
  - Os números están **ordenados aleatoriamente**
  - Implementar o algoritmo **Fisher-Yates** para baraxar, podes consultar máis información  [nesta ligazón de Wikipedia](https://es.wikipedia.org/wiki/Algoritmo_de_Fisher-Yates)

### 2. **Visualización da Matriz**
- Implementar a función `renderMatrix()` que:
  - Renderice a matriz nunha grella visual na páxina
  - Cada número teña un identificador único
  - Cada número sexa clickable para que o usuario poida interactuar con el  verificar se é o número correcto. 
  - Asociar un evento de click a cada elemento que chame a `handleNumberClick(numero, elemento)` que se encargará de xestionar a lóxica do xogo ao premer un número (ver seguinte punto).

### 3. **Xestión de Clics**
Implementar a función `handleNumberClick(numero, elemento)` que:

- **Se o número é correcto** (é o que toca):
  - Cambiar o fondo a **verde**
  - Desactivar ese número (non se pode premer doutro xeito). Polo tanto, eliminar o evento de click dese elemento.
  - Incrementar o "Número que espera" é decir `nextNumber`, se é 99 chamar a `completeGame()`. 
 
- **Se o número é incorrecto**:
  - Cambiar o fondo a **vermello**
  - Incrementar o contador de **erros**
  - Remover o color vermello tras una animación de 500ms (volvendo ao estado inicial), para isto emprega o seguinte código:
    ```javascript
    setTimeout(() => {
        elemento.classList.remove('error');
    }, 500);
    ```
 - Ten en conta que para o marcado de correcta ou incorrecta podes empregar as clases CSS `.correcta` e `.error` respectivamente. Por exemplo para marcar como correcta:
    ```javascript
    elemento.classList.add('correcta');
    elemento.classList.remove('error');
    ```

- **Validación**: O xogo non debe aceptar clics se xa foi completado

### 4. **Finalización do Xogo**
Implementar a función `completeGame()` que:
- Marque o xogo como completado
- Mostre unha mensaxe de felicitación
- Indique o número de erros (se os hai)
- Bloquee novos clics na matriz . 
- Por exemplo podes actualizar o contido do elemento `#completionMessage` para mostrar a mensaxe de finalización co seguinte código:
    ```javascript
    const message = document.getElementById('completionMessage');
    if (gameState.errors === 0) {
        message.textContent = '✅ ¡Perfecto! Completaches o xogo sen erros!';
    } else {
        message.textContent = `✅ ¡Felicidades! Completaches o xogo con ${gameState.errors} error${gameState.errors !== 1 ? 's' : ''}!`;
    }
    message.classList.add('success');
    ```

### 5. **Reinicio do Xogo**
Implementar a función `resetGame()` que:
- Xenere unha nova matriz aleatoria e a renderice. Para isto chama a `generateRandomMatrix()` e `renderMatrix()`.
- Resetee o contador de erros a 0
- Resetee o número esperado a 0
- Limpie o estado do xogo
- Renderice a nova matriz.

### 6. **Estado da Aplicación**
Xestionar o obxecto `gameState` con:
- `matriz`: Array con números aleatorios
- `nextNumber`: Número que o usuario debe premer a continuación
- `errors`: Contador de erros
- `isGameComplete`: Indicador de finalización

## Interface Proporcionada

O arquivo `index.html` xa está dispoñible con:
- Container para a matriz (`#matrixContainer`)
- Elemento para mostrar o próximo número (`#nextNumber`)
- Elemento para mostrar erros (`#errorCount`)
- Botón para reiniciar o xogo (`resetGame()`)
- Zona de mensaxe de finalización (`#completionMessage`)
- Estilos CSS para visualización:
  - `.numero`: Estilo base do número
  - `.correcta`: Clase ao acertar (fondo verde)
  - `.error`: Clase ao errar (fondo vermello)

## Fluxo de Execución

1. Ao cargar a páxina, execútase o evento `DOMContentLoaded`
2. Chámase `resetGame()` para inicializar
3. Móstrase a matriz renderizada
4. Usuario prema números ordenadamente
5. Sistema valida e actualiza o estado
6. Ao acadar 100 números correctos, finaliza o xogo
7. Usuario pode premer "Novo Xogo" para reiniciar

## Algoritmo Fisher-Yates (Referencia)

```javascript
// Barallar un array de n elementos
for (let i = n - 1; i > 0; i--) {
    // Escoller un índice aleatorio entre 0 e i (incluído)
    const j = Math.floor(Math.random() * (i + 1));
    // Intercambiar elemento en posición i co elemento en posición j
    [array[i], array[j]] = [array[j], array[i]];
}
```

## Rúbrica de Avaliación

| Criterio | Puntuación |
|----------|-----------|
| `generateRandomMatrix()` implementada correctamente | 10 pts |
| `renderMatrix()` crea elementos interactivos | 10 pts |
| `handleNumberClick()` valida correctamente | 25 pts |
| `completeGame()` mostra mensaxe apropiada | 5 pts |
| `resetGame()` limpa e reinicia estado | 15 pts |
| Funcionamento global e usuario | 35 pts |
| **TOTAL** | **100 pts** |

## Notas Importantes

- ⚠️ O xogo debe baraxarse de novo cada vez que se reinicia
- ⚠️ Os números non se deben poder premer máis dunha vez
- ⚠️ O contador de erros só incremente se se preme un número incorrecto
- ⚠️ A animación do erro (vermello) debe ser temporal
- ⚠️ O xogo debe bloquease ao completarse

## Ficheiros Dispoñibles

- `index.html` - Páxina HTML coa interface
- `app.js` - Ficheiro de JavaScript (a completar)

 
