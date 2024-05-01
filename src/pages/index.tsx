import { useState } from 'react';
import styles from './index.module.css';

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
  console.log(x, y);
  console.log(board);

  if (board[y][x] === 1 || board[y][x] === 2) return;
  for (const direction of directions) {
    const currentPos = [0, 0];

    const [dy, dx] = direction;
    // console.log(dy, dx);
    // console.log(direction);
    currentPos[1] = x + dx;
    currentPos[0] = y + dy;
    let findOpponent: boolean = false;

    let count = 0;
    // currentPos[0] >= 0 && currentPos[0] < 8 && currentPos[1] >= 0 && currentPos[1] < 8
    while (count < 8 && board[currentPos[0]] !== undefined) {
      count++;
      // console.log(currentPos);
      console.log(currentPos);
      const stone = board[currentPos[0]][currentPos[1]];
      console.log(stone);
      // console.log([currentPos[1]][currentPos[0]]);
      if (stone === 2 / turnColor) {
        console.log(10);
        findOpponent = true;
        currentPos[1] += dx;
        currentPos[0] += dy;
        continue;
      }
      if (stone === 0 || stone === 3) {
        console.log('no');
        break;
      }
      if (stone === turnColor) {
        if (findOpponent) {
          console.log('passed');
          return true;
        }
      }
      break;
    }

    // currentPos[0] += dx;
    // currentPos[1] += dy;
  }
}

const Home = () => {
  const [turncolor, setturncolor] = useState(1);
  const [board, setboard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const clickHandler = (x: number, y: number) => {
    if (board[y][x] === 1 || board[y][x] === 2) return;
    const newboard = structuredClone(board);

    for (const direction of directions) {
      const currentPos = [0, 0];
      const [dx, dy] = direction;

      currentPos[0] = x + dx;
      currentPos[1] = y + dy;
      let findOpponent: boolean = false;

      while (currentPos[0] >= 0 && currentPos[0] < 8 && currentPos[1] >= 0 && currentPos[1] < 8) {
        const stone = board[currentPos[1]][currentPos[0]];

        if (stone === 0 || stone === 3) break;
        if (stone === turncolor) {
          if (findOpponent) {
            for (let n = 0; n < 8; n++) {
              if (
                x + dx * n < 0 ||
                x + dx * n >= 8 ||
                y + dy * n < 0 ||
                y + dy * n >= 8 ||
                board[y + dy * n][x + dx * n] === turncolor
              )
                break;
              newboard[y + dy * n][x + dx * n] = turncolor;
            }

            setturncolor(2 / turncolor);
          }
          break;
        }

        findOpponent = true;
        currentPos[0] += dx;
        currentPos[1] += dy;
      }
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (newboard[i][j] === 3) {
          newboard[i][j] = 0;
        }
      }
    }
    for (let ty = 0; ty < 8; ty++) {
      for (let tx = 0; tx < 8; tx++) {
        if (canPut(tx, ty, newboard, 3 - turncolor)) {
          newboard[ty][tx] = 3;
        }
      }
    }
    // canPut(7, 4, newboard, 1);

    setboard(newboard);
  };
  const blackCount = board.flat().filter((cell) => cell === 1).length;
  const whiteCount = board.flat().filter((cell) => cell === 2).length;
  return (
    <div className={styles.container}>
      <div id="info">
        <p>
          <span id="currentPlayer">{{ 1: '黒', 2: '白' }[turncolor]}の番です</span>
        </p>
        <p>
          黒の石の数: <span id="blackCount">{blackCount}</span>
        </p>
        <p>
          白の石の数: <span id="whiteCount">{whiteCount}</span>
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
