import { useState } from 'react';
import styles from './index.module.css';
let isValid = 0;
const n = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const memoryPos: string | number | number[][] = [];
const preMemoryPos: number[][] = [];

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
  memoryPos.length = 0;
  const flag = [0, 0];
  let findOpponent: boolean = false;
  if (board[y][x] === 1 || board[y][x] === 2) return;
  for (const direction of directions) {
    preMemoryPos.length = 0;
    const currentPos = [0, 0];

    const [dy, dx] = direction;

    currentPos[1] = x + dx;
    currentPos[0] = y + dy;

    let count = 0;

    while (count < 8 && board[currentPos[0]] !== undefined) {
      count++;

      const stone = board[currentPos[0]][currentPos[1]];
      if (stone === 2 / turnColor) {
        findOpponent = true;
        preMemoryPos.push([currentPos[0], currentPos[1]]);

        currentPos[1] += dx;
        currentPos[0] += dy;

        console.log(findOpponent);
      }
      console.log(findOpponent);
      if (stone === 0 || stone === 3) {
        break;
      }
      console.log(findOpponent);
      console.log(preMemoryPos);
      if (stone === turnColor && findOpponent) {
        // console.log(preMemoryPos);
        for (const pos of preMemoryPos) {
          console.log(pos);
          memoryPos.push(pos);
        }
        flag[0] = 1;
      }

      break;
    }
  }
  if (flag[0] === 1) return true;
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
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const blackCount = board.flat().filter((cell) => cell === 1).length;
  const whiteCount = board.flat().filter((cell) => cell === 2).length;

  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(board);

    if (canPut(x, y, newBoard, turnColor)) {
      newBoard[y][x] = turnColor;
      console.log(memoryPos);
      newBoard[memoryPos[1]][memoryPos[0]] = turnColor;
      setboard(newBoard);
      setturncolor(2 / turnColor);
    }
    if (newBoard[y][x] !== 0) {
      suggest(newBoard, turnColor);

      if (isValid === 0) {
        setturncolor(turnColor);
        suggest(newBoard, 3 - turnColor);
        setboard(newBoard);
        if (isValid === 0) {
          finish[0]++;
        }
      }
    }
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
