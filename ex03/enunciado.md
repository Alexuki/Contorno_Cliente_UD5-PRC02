#  Exercicio 3: Xogo de Busca de Caracteres

## Obxectivo

Crear unha aplicación web interactiva que mostre unha matriz de 36 caracteres do alfabeto e permita ao usuario detectar e marcar todas as coincidencias dun carácter específico indicado.

## Descrición

O xogo presenta unha matriz de 6x6 (36 celas) con letras do alfabeto. Unha letra é seleccionada aleatoriamente como **carácter obxectivo**, e o usuario debe identificar e clickar en todas as celas que conteñan ese carácter.

### Características Principais

- Matriz de **36 caracteres** aleatorios do alfabeto
- Un **carácter obxectivo** aparece entre **3 e 6 veces** na matriz
- O usuario debe **detectar todas as coincidencias**
- Sistema de **validación en tempo real**
- Contador de **aciertos** e **erros**
- Mensaxe de **felicitación** ao completar

## Requisitos de Implementación

### A. Estado do Xogo (gameState)

```javascript
let gameState = {
    matriz: [],              // Array de 36 caracteres
    targetChar: '',          // Carácter obxectivo a buscar
    targetPositions: [],     // Índices onde está o carácter obxectivo
    foundPositions: [],      // Índices xa atopados polo usuario
    errors: 0,               // Contador de erros
    isGameComplete: false    // Indica se o xogo está completo
};
```

### B. Constante do Alfabeto

```javascript
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
```

### C. Funcións a Implementar

#### 1. `generateMatrix()`

**Obxectivo**: Crear unha matriz aleatoria de 36 caracteres

**Lógica**:
1. Escoller un carácter obxectivo aleatorio do alfabeto
2. Decidir cantas veces aparecerá (entre 3 e 6)
   ```javascript
   const targetCount = Math.floor(Math.random() * 4) + 3; // 3-6
   ```
3. Engadir o carácter obxectivo esas veces á matriz
4. Encher o resto (36 - targetCount) con caracteres aleatorios **diferentes** do obxectivo
5. Baraxar a matriz completa con algoritmo **Fisher-Yates**

**Retorna**:
```javascript
{
    matriz: ['A', 'B', 'A', 'C', ...],  // 36 caracteres
    targetChar: 'A'                      // Carácter obxectivo
}
```

#### 2. `findTargetPositions()`

**Obxectivo**: Identificar as posicións (índices) onde está o carácter obxectivo

**Lógica**:
- Percorrer `gameState.matriz`
- Gardar os índices onde `matriz[i] === targetChar`

**Retorna**: Array de índices, p.ex. `[0, 5, 12, 23, 30]`

#### 3. `renderMatrix()`

**Obxectivo**: Renderizar a matriz na interface

**Lóxica**:
1. Obter o container `#matrixContainer`
2. Limpar o contido (`innerHTML = ''`)
3. Para cada carácter na matriz:
   - Crear un `<div>` con clase `.char-cell`
   - Establecer o texto co carácter
   - Gardar o índice en `dataset.index`
   - Asociar evento de click
   - Engadir ao container

#### 4. `handleCellClick(index, elemento)`

**Obxectivo**: Xestionar o click nunha cela

**Validacións**:
- Se `isGameComplete` → non facer nada
- Se o índice xa está en `foundPositions` → non facer nada

**Lógica**:
- **Se o índice está en `targetPositions`** (acierto):
  1. Engadir clase `.found` (fondo verde)
  2. Desactivar a cela (`pointerEvents = 'none'`)
  3. Engadir índice a `foundPositions`
  4. Actualizar contador de atopados
  5. Se `foundPositions.length === targetPositions.length` → `completeGame()`

- **Se NON está en `targetPositions`** (erro):
  1. Engadir clase `.error` (fondo vermello)
  2. Incrementar `errors`
  3. Actualizar contador de erros
  4. Remover clase `.error` tras 500ms

#### 5. `completeGame()`

**Obxectivo**: Finalizar o xogo e mostrar resultados

**Lógica**:
1. Marcar `isGameComplete = true`
2. Deshabilitar a matriz (clase `.game-disabled`)
3. Mostrar mensaxe:
   - Se `errors === 0`: "🎉 ¡Perfecto! Atopaches todas as X coincidencias sen erros!"
   - Se `errors > 0`: "✅ ¡Moi ben! Atopaches todas as X coincidencias con Y erro(s)!"
4. Engadir clase `.success` á mensaxe

#### 6. `newGame()`

**Obxectivo**: Iniciar un novo xogo con nova matriz e novo carácter

**Lógica**:
1. Chamar `generateMatrix()` para obter nova matriz e carácter
2. Resetear `gameState` con novos valores
3. Chamar `findTargetPositions()` para identificar posicións
4. Actualizar UI:
   - Carácter obxectivo (`#targetChar`)
   - Contador de atopados a 0
   - Contador total (`#totalCount`)
   - Contador de erros a 0
   - Limpar mensaxes
5. Chamar `renderMatrix()`

#### 7. `resetMatrix()`

**Obxectivo**: Reiniciar o xogo actual (mantén a mesma matriz)

**Lógica**:
1. Limpar `foundPositions` e `errors`
2. Marcar `isGameComplete = false`
3. Actualizar contadores na UI
4. Limpar mensaxes
5. Re-renderizar a matriz

### D. Interface HTML

Elementos importantes:
- `#targetChar` - Mostra o carácter obxectivo
- `#foundCount` - Contador de coincidencias atopadas
- `#totalCount` - Total de coincidencias a atopar
- `#errorCount` - Contador de erros
- `#matrixContainer` - Container da matriz 6x6
- `#completionMessage` - Mensaxe de finalización

## Fluxo de Execución

```
1. Ao cargar a páxina → newGame()
   ↓
2. Xérase matriz aleatoria con carácter obxectivo
   ↓
3. Móstrase carácter obxectivo e matriz barallada
   ↓
4. Usuario clicka nas celas
   ↓
5. handleCellClick() valida cada click
   ↓
6a. Acierto → marca en verde, incrementa contador
   OU
6b. Erro → anima en vermello, incrementa erros
   ↓
7. Cando atopa todas → completeGame()
   ↓
8. Usuario pode:
   - "Novo Xogo" → nova matriz e carácter
   - "Reiniciar Actual" → mesma matriz, resetear estado
```

## Funcionalidades Visuais

### Cores e Estados
- **Cela normal**: Fondo branco, borde gris
- **Cela atopada**: Fondo verde (#27ae60), desactivada
- **Cela erro**: Fondo vermello temporal con animación shake

### Animacións CSS
```css
@keyframes foundPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
```

### Carácter Obxectivo Destacado
- Mostrarse nun cadro grande con gradiente
- Fonte moi grande (4em)
- Borde branco e sombra

## Consideracións Técnicas

### Xeración da Matriz
1. **Garantir presenza do obxectivo**: O carácter obxectivo debe aparecer polo menos 3 veces
2. **Evitar repetición**: Os caracteres de recheo NON deben ser o carácter obxectivo
3. **Barallado correcto**: Usar Fisher-Yates para distribución uniforme

### Validación de Clicks
1. **Evitar reclicks**: Non permitir clickar dúas veces a mesma cela atopada
2. **Bloqueo final**: Deshabilitar toda a matriz ao completar
3. **Feedback inmediato**: Animación instantánea en cada click

## Exemplos de Uso

### Exemplo 1: Carácter 'A' aparece 4 veces
```
Matriz: A B C D E F
        G H A I J K
        L M N O P Q
        R A S T U V
        W X A Y Z A
        B C D E F G

Obxectivo: Atopar as 4 'A'
```

## Rúbrica de Avaliación

| Criterio | Puntuación |
|----------|-----------|
| `generateMatrix()` xera matriz correcta | 5 pts |
| `findTargetPositions()` identifica posicións | 10 pts |
| `renderMatrix()` mostra matriz interactiva | 5 pts |
| `handleCellClick()` valida correctamente | 25 pts |
| `completeGame()` mostra resultados | 10 pts |
| `newGame()` reinicia correctamente | 10 pts |
| `resetMatrix()` limpa sen cambiar matriz | 10 pts |
|  Funcionamento global da APP | 25 pts |
| **TOTAL** | **100 pts** |

## Notas Importantes

- ⚠️ O carácter obxectivo debe aparecer **entre 3 e 6 veces**
- ⚠️ Os caracteres de recheo NON deben ser o carácter obxectivo
- ⚠️ A matriz debe estar **completamente barallada** (Fisher-Yates)
- ⚠️ As animacións de erro deben ser **temporais** (500ms)
- ⚠️ Ao completar, toda a matriz debe **deshabilitarse**
- ⚠️ "Novo Xogo" cambia matriz e carácter; "Reiniciar" mantén a mesma

## Consellos de Implementación

1. **Comezar pola xeración**: Implementar e probar `generateMatrix()` primeiro
2. **Verificar posicións**: Usar `console.log()` para validar `targetPositions`
3. **Probar validación**: Asegurarse de que só as posicións correctas se marcan
4. **Animacións suaves**: Usar `setTimeout()` para efectos temporais
5. **Responsive**: Probar en diferentes tamaños de pantalla

## Ficheiros Dispoñibles

- `index.html` - Interface con matriz 6x6 e controis
- `app.js` - Lógica do xogo (a completar)

 