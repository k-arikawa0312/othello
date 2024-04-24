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
] as const;

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
    let n = 0;
    let m = 0; //変数増やさ（ざるをえ）ない
    let direction = 0;
    for (direction of directions[n]) {
      if (board[y][x] !== 0) return;
      const newboard = structuredClone(board);
      while (n < 8) {
        console.log(directions[n][0]);
        console.log(directions[n][1]);
        if (
          board[y + directions[n][0] + n * directions[n][0]][
            x + directions[n][1] + n * directions[n][1]
          ] !== undefined &&
          board[y + n * directions[n][0]][x + n * directions[n][1]] === 2 / turncolor
        ) {
          if (
            board[y + 1 + n * directions[n][0]][x + 1 + n * directions[n][1]] !== undefined &&
            board[y + 1 + n * directions[n][0]][x + 1 + n * directions[n][1]] === turncolor &&
            board[y + 1 + n * directions[n][0]][x + n * directions[n][1]] !== 0
          ) {
            newboard[y][x] = turncolor;
            while (n + 1 > m) {
              newboard[y + m * directions[n][0]][x + m * directions[n][1]] = turncolor;
              setturncolor(2 / turncolor);
              if (board[y + m * directions[n][0] + 1][x + m * directions[n][1] + 1] === turncolor) {
                break;
              }
              m = m + 1;
            }
          }
        }
        n = n + 1;
      }
      setboard(newboard);
    }
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
