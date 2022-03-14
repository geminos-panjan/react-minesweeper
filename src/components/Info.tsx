import { getStorage } from "../storage/BlockTableStorage";
import { getMine } from "../util/MineUtil";

type Props = {
  flag: number,
  onClickReset: () => void,
};

const Info = ({
  flag,
  onClickReset
}: Props) => {
  const s = getStorage();
  const mine = getMine(s.row, s.column, s.minePercent);
  return (
    <div className="info">
      <div className="reset-game-button">
        <button className="button" onClick={onClickReset}>Reset Game</button>
      </div>
      <div className="info-num">
        <div>{s.column}x{s.row}</div>
        <div>💣Mines: {mine}</div>
        <div>🚩Flags: {flag}</div>
      </div>
    </div>
  );
};

export default Info;