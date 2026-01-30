# Exercicio 4: Xogo de Busca con Contador de Tempo (30s)

## Obxectivo

Completar os **TODO** do ficheiro **alumnado/app.js** para que o xogo teña un contador de 30 segundos e se poida iniciar desde un botón.

## O que se entrega

- Ficheiro base: **alumnado/app.js** con varios **TODO**.
- A túa tarefa é completar eses TODO e facer que o xogo funcione.

## TODOs a completar (alumnado/app.js)

### 1) `startTimer()`
- Inicia a conta atrás.
- Decrementa `gameState.timeRemaining` cada segundo.
- Actualiza o display chamando `updateTimerDisplay()`.
- Se o tempo chega a 0 → chama `completeGame(false)`.

### 2) `updateTimerDisplay()`
- Actualiza o elemento HTML `#timer` co tempo restante.
- Se quedan ≤ 10 segundos, engade a clase `warning` ao contedor do temporizador (id `timerBox`).
- Se non, elimina esa clase.

### 3) `stopTimer()`
- Deter o intervalo do temporizador con `clearInterval()`.
- Limpar `gameState.timerId`.

### 4) `completeGame(success)`
- Antes de mostrar a mensaxe, **deter o temporizador** (chamando `stopTimer()`).

### 5) `setStartButtonState(enabled, label)`
- Habilita/deshabilita o botón **Iniciar Xogo** (id `btnStart`).
- Actualiza o texto do botón co valor de `label`.

### 6) `startGame()`
- Evita iniciar se o xogo xa está en curso.
- Marca `gameState.isGameStarted = true`.
- Deshabilita o botón e cambia o texto a **"Xogando..."**.
- Inicia o temporizador chamando `startTimer()`.

## Requisitos de funcionamento

- O tempo **non comeza** ata premer **Iniciar Xogo**.
- Ao chegar a 0 segundos, o xogo **detense**.
- O usuario non pode seguir pulsando se o xogo terminou.
- O botón de inicio debe reactivarse cando o xogo remata.

## Fluxo de execución

1. Cargar páxina → `newGame()`
2. Xérase matriz e carácter obxectivo
3. Usuario preme **Iniciar Xogo**
4. Inicia temporizador (30s)
5. Usuario busca coincidencias
6. Se tempo = 0 → parar xogo
7. Se atopa todas antes → completar con éxito

---

**Obxectivo final:** completar os TODO de alumnado/app.js para ter un xogo funcional con temporizador de 30 segundos.
