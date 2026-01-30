# Exercicio 5: Estatísticas en sessionStorage

## Obxectivo

Modificar o xogo para **gardar en sessionStorage as estatísticas de cada xogo**. As estatísticas deben rexistrarse cando o xogo remata (por éxito ou por tempo esgotado).

## O que se entrega

- Ficheiro base: **alumnado/app.js** con TODOs.
- A túa tarefa é completar eses TODO para gardar estatísticas en `sessionStorage`.

## Requisitos principais

### 1) Gardar estatísticas en sessionStorage
Ao finalizar unha partida, debes gardar un rexistro cunha estrutura similar a:

```javascript
{
    id: Date.now(),
    success: true|false,
    targetChar: 'A',
    totalTargets: 5,
    found: 5,
    errors: 2,
    timeUsed: 18
}
```

- O campo `timeUsed` debe calcularse como:
    $\text{timeUsed} = \text{timeLimit} - \text{timeRemaining}$

### 2) Funcións a completar (TODOs en alumnado/app.js)

#### `loadStats()`
- Ler as estatísticas desde `sessionStorage`.
- Se non hai datos, devolver un array baleiro.

#### `saveStats(stats)`
- Gardar o array completo de estatísticas en `sessionStorage`.

#### `recordGameStats(success)`
- Crear o rexistro da partida.
- Engadilo á lista actual.
- Gardar de novo en `sessionStorage`.
- Actualizar a lista chamando `renderStats()`.

#### `toggleStats()`
- Amosar ou agochar o panel de estatísticas.
- Se se amosa, chamar `renderStats()`.

#### `renderStats()`
- Pintar a lista de estatísticas no panel.
- Se non hai datos, mostrar unha mensaxe de “Non hai estatísticas”.

#### `completeGame(success)`
- Chamar a `recordGameStats(success)` cando remata o xogo.

## Clave de sessionStorage

Usa a clave:

```javascript
const STATS_KEY = 'xogoEstatisticas';
```

## UI requerida

- Engadir un botón **Ver estatísticas** (id `btnStats`).
- Engadir un panel (id `statsPanel`) con unha lista (id `statsList`).
- O panel debe poder mostrarse/agocharse co botón.

## Fluxo de execución

1. O usuario xoga a partida.
2. O xogo remata (éxito ou tempo esgotado).
3. Chámase `recordGameStats(success)`.
4. O rexistro gárdase en `sessionStorage`.
5. Ao premer **Ver estatísticas**, móstranse os rexistros gardados.

---

**Obxectivo final:** completar os TODO de alumnado/app.js para gardar estatísticas de cada xogo en `sessionStorage` e amosalas baixo demanda.
