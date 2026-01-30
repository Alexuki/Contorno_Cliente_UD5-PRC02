# Exercicio 2: Xogo da Matriz - Versión Avanzada con Configuración e Cronómetro

## Obxectivo

Ampliar o xogo da matriz do exercicio 1, engadindo funcionalidades de configuración de tamaño da matriz e un cronómetro con conta atrás. O usuario debe seleccionar números en orden antes de que se esgote o tempo.

## Novas Funcionalidades

### 1. **Configuración do Tamaño da Matriz**
Permitir ao usuario escoller entre diferentes tamaños de matriz:
- 2x2 (números de 0 a 3)
- 3x3 (números de 0 a 8)
- 4x4 (números de 0 a 15)
- 5x5 (números de 0 a 24)
- 6x6 (números de 0 a 35)
- 7x7 (números de 0 a 48)
- 8x8 (números de 0 a 63)
- 9x9 (números de 0 a 80)
- 10x10 (números de 0 a 99)
Fíxate que o tamaño da matriz determinará o rango de números aleatorios xerados (0 a N²-1). Ademais os valores seleccionados deben afectar a renderización da matriz na páxina (axustando o CSS Grid en consecuencia). Tamén debes deshabilitar a selección de tamaño mentres o xogo está en curso para evitar inconsistencias. 

Na función `resetGame()` debes:
- Xenere unha nova matriz aleatoria segundo o tamaño seleccionado
- Renderice a matriz segundo o tamaño seleccionado
Os valores seleccionados poden obterse desde un selector `<select>` no HTML con id `matrixSize` para o tamaño da matriz e `timeLimit` para o tempo límite.


### 2. **Cronómetro con Conta Atrás**
Implementar un sistema de temporizador que:
- Comece a contar atrás dende un tempo límite configurable
- Opcións: 30, 60, 90, 120 ou 180 segundos
- Mostre o tempo restante en formato MM:SS
- Alerta visual cando quedan menos de 10 segundos
- Finalice o xogo se se esgota o tempo

### 3. **Rexistro de Tempo Transcorrido**
O sistema debe rexistrar:
- Tempo de inicio do xogo
- Tempo de finalización
- Tempo total empregado polo usuario
- Mostrar o tempo ao completar o xogo

## Requisitos de Implementación

### A. Estado do Xogo (gameState)
Ampliar o obxecto `gameState` para incluír:

```javascript
let gameState = {
    matriz: [],              // Matriz de números aleatorios
    matrixSize: 10,          // Tamaño da matriz (NxN)
    nextNumber: 0,           // Próximo número esperado
    errors: 0,               // Contador de erros
    isGameComplete: false,   // Xogo completado?
    isGameStarted: false,    // Xogo iniciado?
    timeLimit: 60,           // Tempo límite (segundos)
    timeRemaining: 60,       // Tempo restante (segundos)
    timerId: null,           // ID do intervalo
    startTime: null,         // Marca de tempo de inicio
    endTime: null,           // Marca de tempo de fin
    elapsedTime: 0           // Tempo total transcorrido
};
```

### B. Funcións a Implementar

#### 1. `generateRandomMatrix(size)`
- **Entrada**: `size` (tamaño da matriz NxN)
- **Saída**: Array con números de 0 a (size²-1) barallados
- Usar o algoritmo Fisher-Yates

#### 2. `renderMatrix()`
- Renderizar a matriz segundo o tamaño configurado
- Axustar a grella CSS: `grid-template-columns: repeat(N, 1fr)`
- Asociar eventos de click a cada número

#### 3. `startGame()`
- Obter a configuración (tamaño e tempo) dos selectores
- Xenerar nova matriz aleatoria
- Reiniciar contadores
- Deshabilitar controis de configuración
- Iniciar o temporizador
- Renderizar a matriz

#### 4. `startTimer()`
- Limpar calquera temporizador existente
- Gardar `startTime` con `Date.now()`
- Crear intervalo con `setInterval()` que:
  - Decremente `timeRemaining` cada segundo
  - Actualice a visualización
  - Verifique se o tempo chegou a 0

#### 5. `stopTimer()`
- Deter o intervalo con `clearInterval()`
- Gardar `endTime`
- Calcular `elapsedTime` (diferenza en segundos)

#### 6. `updateTimerDisplay()`
- Formatear o tempo restante en formato MM:SS
- Actualizar o elemento `#timer`
- Engadir clase `.warning` se quedan ≤ 10 segundos

#### 7. `handleNumberClick(numero, elemento)`
Ampliar a lógica do exercicio 1:
- Verificar se `isGameStarted` é `true`
- Se o número é correcto:
  - Marcar como correcto (fondo verde)
  - Incrementar `nextNumber`
  - Verificar se completou: `nextNumber === matrixSize²`
- Se o número é incorrecto:
  - Marcar como erro (fondo vermello)
  - Incrementar contador de erros

#### 8. `completeGame(success)`
- **Entrada**: `success` (booleano - éxito ou tempo esgotado)
- Deter o temporizador
- Calcular tempo transcorrido
- Mostrar mensaxe apropiada:
  - **Éxito**: "✅ Completaches en X:XX con Y erros"
  - **Tempo esgotado**: "⏰ Tempo esgotado! Chegaches ao número Z"
- Deshabilitar a matriz
- Habilitar o botón de inicio

#### 9. `resetGame()`
- Deter o temporizador
- Limpar todo o estado
- Habilitar controis de configuración
- Limpar mensaxes
- Mostrar mensaxe "Pulsa Iniciar Xogo"

### C. Interface HTML

A interface debe ter:
- **Selectores de configuración**:
  - `#matrixSize`: Tamaño da matriz (2-10)
  - `#timeLimit`: Tempo límite (30-180s)
- **Información do xogo**:
  - `#nextNumber`: Número esperado
  - `#timer`: Tempo restante
  - `#errorCount`: Número de erros
- **Controis**:
  - `#btnStart`: Botón "Iniciar Xogo"
  - Botón "Reiniciar"
- **Matriz**: `#matrixContainer`
- **Mensaxes**: `#completionMessage`

## Fluxo de Execución

```
1. Usuario configura tamaño e tempo
   ↓
2. Usuario pulsa "Iniciar Xogo"
   ↓
3. startGame() → xenera matriz e inicia cronómetro
   ↓
4. Usuario selecciona números en orden
   ↓
5. handleNumberClick() valida cada click
   ↓
6a. Usuario completa → completeGame(true)
   OU
6b. Tempo esgotado → completeGame(false)
   ↓
7. Mostrar resultados con tempo e erros
   ↓
8. Usuario pode reiniciar
```

## Funcionalidades Visuais

### Alerta de Tempo
Cando quedan ≤ 10 segundos:
- Engadir clase `.warning` ao elemento do timer
- CSS ten animación `pulse` para crear efecto visual

### Estados da Matriz
- **Deshabilitada**: Antes de iniciar ou despois de completar
- **Activa**: Durante o xogo
- **Verde**: Números correctos
- **Vermello**: Números incorrectos (temporal)

## Formatos e Cálculos

### Formato de Tempo (MM:SS)
```javascript
const minutes = Math.floor(seconds / 60);
const secs = seconds % 60;
const formatted = `${minutes}:${secs.toString().padStart(2, '0')}`;
```

### Cálculo de Tempo Transcorrido
```javascript
const elapsed = Math.floor((endTime - startTime) / 1000); // en segundos
```

## Rúbrica de Avaliación

| Criterio | Puntuación |
|----------|-----------|
| `generateRandomMatrix(size)` con tamaño variable | 5 pts |
| Selectores de configuración funcionais | 5 pts |
| `startGame()` inicia correctamente o xogo | 5 pts |
| `startTimer()` e `updateTimerDisplay()` funcionan | 5 pts |
| `stopTimer()` calcula tempo transcorrido | 10 pts |
| `handleNumberClick()` valida segundo configuración | 15 pts |
| `completeGame()` xestiona éxito e timeout | 15 pts |
| `resetGame()` limpa estado correctamente | 10 pts |
| Funcionamento global e usuario | 30 pts |
| **TOTAL** | **100 pts** |

## Notas Importantes

- ⚠️ Os selectores de configuración deben **deshabilitarse** durante o xogo, para isto podes empregar a propiedade `disabled` dos elementos `<select>`. Por exemplo:
  ```javascript
  document.getElementById('matrixSize').disabled = true; // Deshabilitar
  document.getElementById('matrixSize').disabled = false; // Habilitar
  ```
- ⚠️ O temporizador debe **pararse** cando o xogo finalice. Recorda usar `clearInterval()` para deter o intervalo.
- ⚠️ O tempo transcorrido debe **calcularse con Date.now()** para maior precisión e non depender do contador do temporizador. Exemplo:
  ```javascript
  gameState.startTime = Date.now(); // Ao iniciar o xogo
  gameState.endTime = Date.now();   // Ao completar o xogo
  gameState.elapsedTime = Math.floor((gameState.endTime - gameState.startTime) / 1000); // en segundos
  ```
- ⚠️ A matriz debe axustarse visualmente segundo o tamaño (CSS Grid), polo que debes modificar a propiedade `grid-template-columns` do contedor da matriz. Por exemplo:
  ```javascript
  const container = document.getElementById('matrixContainer');
  container.style.gridTemplateColumns = `repeat(${gameState.matrixSize}, 1fr)`;
  ```
- ⚠️ O botón de inicio debe cambiar o texto a "Xogando..." durante o xogo
- ⚠️ Usar `clearInterval()` para evitar fugas de memoria.

## Consellos de Implementación

1. **Comezar pola configuración**: Implementar primeiro os selectores e `startGame()`
2. **Probar o temporizador**: Crear e probar `startTimer()` de forma illada
3. **Validar tamaños**: Probar con diferentes tamaños de matriz
4. **Optimizar a visualización**: Axustar tamaños de fonte segundo a matriz
5. **Manexar estados**: Asegurarse de que `isGameStarted` controla correctamente

## Ficheiros Dispoñibles

- `index.html` - Interface con configuración e cronómetro
- `app.js` - Lógica do xogo (a completar)

 
