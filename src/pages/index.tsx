import { useState } from 'react';
import styles from './index.module.css';
let isValid = 0;

const finish = [0];

const directions = [
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [1, 0],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];
function canPut(x: number, y: number, board: number[][], turnColor: number) {
  if (board[y][x] === 1 || board[y][x] === 2) return;
  for (const direction of directions) {
    const currentPos = [0, 0];

    const [dy, dx] = direction;

    currentPos[1] = x + dx;
    currentPos[0] = y + dy;
    let findOpponent: boolean = false;

    let count = 0;

    while (count < 8 && board[currentPos[0]] !== undefined) {
      count++;

      const stone = board[currentPos[0]][currentPos[1]];
      if (stone === 2 / turnColor) {
        findOpponent = true;
        currentPos[1] += dx;
        currentPos[0] += dy;
        continue;
      }
      if (stone === 0 || stone === 3) {
        break;
      }
      if (stone === turnColor) {
        if (findOpponent) {
          return true;
        }
      }
      break;
    }
  }
}

const suggest = (board: number[][], turnColor: number) => {
  isValid = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x] === 3) board[y][x] = 0;
      if (canPut(x, y, board, 3 - turnColor)) {
        board[y][x] = 3;
        isValid += 1;
      }
    }
  }
};

const Home = () => {
  const [turnColor, setturncolor] = useState(1);
  const [board, setboard] = useState([
    [1, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],

    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 3, 0, 0, 0],
    // [0, 0, 0, 1, 2, 3, 0, 0],
    // [0, 0, 3, 2, 1, 0, 0, 0],
    // [0, 0, 0, 3, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const blackCount = board.flat().filter((cell) => cell === 1).length;
  const whiteCount = board.flat().filter((cell) => cell === 2).length;

  const clickHandler = (x: number, y: number) => {
    if (finish[0] === 1) {
      alert('ゲーム終了');
    }
    if (board[y][x] === 1 || board[y][x] === 2) return;
    const newboard = structuredClone(board);
    finish[0] = 0;
    for (const direction of directions) {
      const currentPos = [0, 0];
      const [dx, dy] = direction;

      currentPos[0] = x + dx;
      currentPos[1] = y + dy;
      let findOpponent: boolean = false;

      while (currentPos[0] >= 0 && currentPos[0] < 8 && currentPos[1] >= 0 && currentPos[1] < 8) {
        const stone = board[currentPos[1]][currentPos[0]];

        if (stone === 0 || stone === 3) break;
        if (stone === turnColor) {
          if (findOpponent) {
            for (let n = 0; n < 8; n++) {
              if (
                x + dx * n < 0 ||
                x + dx * n >= 8 ||
                y + dy * n < 0 ||
                y + dy * n >= 8 ||
                board[y + dy * n][x + dx * n] === turnColor
              )
                break;
              newboard[y + dy * n][x + dx * n] = turnColor;
            }

            setturncolor(2 / turnColor);
          }
          break;
        }

        findOpponent = true;
        currentPos[0] += dx;
        currentPos[1] += dy;
      }
    }
    if (newboard[y][x] !== 0) {
      suggest(newboard, turnColor);

      if (isValid === 0) {
        setturncolor(turnColor);
        suggest(newboard, 3 - turnColor);
        setboard(newboard);
        if (isValid === 0) {
          finish[0]++;
        }
      }
    }
    setboard(newboard);
    console.log(newboard[4]);
  };

  return (
    <div className={styles.container}>
      <div id="info">
        <p>
          <span id="currentPlayer">{{ 1: '黒', 2: '白' }[turnColor]}の番です</span>
        </p>
        <p>
          黒の数: <span id="blackCount">{blackCount}</span>
        </p>
        <p>
          白の数: <span id="whiteCount">{whiteCount}</span>
        </p>
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color === 3 && <div className={styles.area} />}
              {color !== 0 && color !== 3 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};
export default Home;
