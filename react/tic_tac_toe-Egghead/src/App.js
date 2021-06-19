import React from 'react'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Tic Tac Toe</h1>
       <h2>...of death</h2> 
      </header>
      <Game />
    </div>
  );
}

const clone = x => JSON.parse(JSON.stringify(x))

function generateGrid(rows, columns, mapper) {
  return Array(rows).fill().map(() =>
    Array(columns).fill().map(mapper))
}

const newTicTacToeGrid = () => 
  generateGrid(3, 3, () => null)

function checkThree(a, b, c) {
  if (!a || !b || !c) return false
  return a === b && b === c
}

const flatten = arr => arr.reduce((acc, cur) => [...acc, ...cur], [])

function checkForWin(flatGrid) {
  const [nw, n, ne, w, c, e, sw, s, se] = flatGrid


  return (
    checkThree(n, nw, ne) ||
    checkThree(w, c, e) ||
    checkThree(sw, s, se) ||
    checkThree(n, c, s) ||
    checkThree(ne, e, se) ||
    checkThree(nw, w, sw) ||
    checkThree(ne, c, sw) ||
    checkThree(nw, c, se)
  )
}

function checkForDraw(flatGrid) {
  return(
    !checkForWin(flatGrid) &&
    flatGrid.filter(Boolean).length === flatGrid.length
  )
}

const NEXT_TURN = {
  X: 'O',
  O: 'X'
}

const getIinitialState = () => ({
  grid: newTicTacToeGrid(),
  status: 'inProgress',
  turn: 'X'

})

const reducer = (state, action) => { 
  if (
    state.status === 'success' &&
    action.type !== 'RESET'
  ) {
    return state
  }
  switch (action.type) {
    case 'RESET': {
      return getIinitialState()
    }
    case 'CLICK': {
      const { x, y } = action.payload
      const { grid, turn } = state
      if (grid[y][x]) {
        return state
      }

      const nextState = clone(state)
      nextState.grid[y][x] = turn
      
      const flatGrid = flatten(nextState.grid)

      if (checkForWin(flatGrid)) {
        nextState.status = 'success'
        return nextState
      }
      if (checkForDraw(flatGrid)) {
        return getIinitialState()
      }
      nextState.turn = NEXT_TURN[turn]
      return nextState
    }
    default:
      return state
  }
}

function Game() {
  const [state, dispatch] = React.useReducer(
    reducer,
    getIinitialState()
  )

  const {grid, status, turn} = state

  const handleClick = (x, y) => {
    dispatch({ type: 'CLICK', payload: { x, y }})
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <div style={{display: 'inline-block'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div>Next turn: {turn}</div>
        <div>
          {status === 'success'
            ? `${turn} won!`
            : null}
        </div>
        <button onClick={reset} type="button">
          RESET
        </button>
      </div>
      <Grid grid={grid} handleClick={handleClick} />
    </div>
  )
}

function Grid({ grid, handleClick }) {
  return (
    <div style={{ display: 'inline-block' }}>
      <div style={{
        backgroundColor: '#444',
        display: 'grid',
        gridTemplateRows: `repeat(${grid.length}, 1fr)`,
        gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
        gridGap: 2
      }}
      >
        {grid.map((row, rowIdx) =>
          row.map((value, colIdx) => (
            <Cell
              key={`${colIdx}-${rowIdx}`}
              onClick={() => {
                handleClick(colIdx, rowIdx)
              }}
              value={value}
            />
          ))
        )}
      </div>
    </div>
  )
}

function Cell({ onClick, value }) {
  return (
    <div
      style={{ 
        backgroundColor: '#fff',
        width: 100,
        height: 100
      }}
    >
      <button
        style={{
          width: '100%',
          height: '100%'
        }}
        onClick={onClick}
        type="button">
          {value}
        </button>
    </div>
  )
}


export default App;
