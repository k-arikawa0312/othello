import { useState } from 'react';
import styles from './index.module.css';
let canPut = 0; //0でおけない1でおける

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

const Home = () => {
  const [turncolor, setturncolor] = useState(1);
  const [board, setboard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 0) return;
    const newboard = structuredClone(board);
    for (const direction of directions) {
      const currentPos = [0, 0];
      const [dx, dy] = direction;

      currentPos[0] = x + dx;
      currentPos[1] = y + dy;
      let findOpponent: boolean = false;
      canPut = 0;
      while (currentPos[0] >= 0 && currentPos[0] < 8 && currentPos[1] >= 0 && currentPos[1] < 8) {
        const stone = board[currentPos[1]][currentPos[0]];

        if (stone === 0) break;
        if (stone === turncolor) {
          if (findOpponent) {
            newboard[y][x] = turncolor;
            newboard[y + dy][x + dx] = turncolor;
            canPut = 1;
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
            setboard(newboard);
            setturncolor(2 / turncolor);
          }
          break;
        }

        findOpponent = true;
        currentPos[0] += dx;
        currentPos[1] += dy;
      }
    }
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
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
              <div />
            </div>
          )),
        )}
      </div>
    </div>
  );
};
export default Home;
