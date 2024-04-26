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

// const flipStones = (board: number[][], turnColor: number, x: number, y: number) => {};

const Home = () => {
  const [turncolor, setturncolor] = useState(1);
  const [board, setboard] = useState([
    //空白0 白1 黒2 row=行 for 調べる
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 1, 2, 0, 0, 0],
    // [0, 0, 0, 2, 1, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 2, 1],
    [0, 0, 0, 0, 0, 1, 2, 1],
    [0, 0, 0, 0, 2, 1, 2, 1],
    [0, 0, 0, 1, 2, 1, 2, 1],
    [0, 0, 2, 1, 2, 1, 2, 1],
    [0, 2, 1, 2, 1, 2, 1, 2],
  ]);

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    if (board[y][x] !== 0) return;
    const newboard = structuredClone(board);
    for (const direction of directions) {
      const currentPos = [0, 0];
      const [dx, dy] = direction;

      currentPos[0] = x + dx;
      currentPos[1] = y + dy;
      let findOpponent: boolean = false;
      while (currentPos[0] >= 0 && currentPos[0] < 8 && currentPos[1] >= 0 && currentPos[1] < 8) {
        const stone = board[currentPos[1]][currentPos[0]];

        if (stone === 0) break;
        if (stone === turncolor) {
          if (findOpponent) {
            newboard[y][x] = turncolor;
            newboard[y + dy][x + dx] = turncolor;
            for (let n = 0; n < 8; n++) {
              console.log(n);
              if (x + dx * n < 0 || x + dx * n >= 8 || y + dy * n < 0 || y + dy * n >= 8) break;
              console.log(500);
              console.log(x + dx * n, y + dy * n);
              newboard[y + dy * n][x + dx * n] = turncolor;
            }
          }
          break;
        }

        findOpponent = true;
        currentPos[0] += dx;
        currentPos[1] += dy;
      }
    }
    setboard(newboard);
    setturncolor(2 / turncolor);
  };

  return (
    <div className={styles.container}>
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
            </div>
          )),
        )}
      </div>
    </div>
  );
};
export default Home;
