import classNames from "classnames";
import { useRef } from "react";
import Block from "../classes/Block";
import { getStorage } from "../storage/BlockTableStorage";

type Props = {
  block: Block,
  isShow: boolean,
  onClickClose: () => void,
  onClickOpenBlock: () => void,
  onClickFlagBlock: () => void,
};

const Action = ({
  block,
  isShow,
  onClickClose,
  onClickOpenBlock,
  onClickFlagBlock,
}: Props) => {
  const s = getStorage();
  const row = s.row;
  const column = s.column;

  const posHorizon = useRef(-1);
  const posVertical = useRef(-1);

  const actionStyle = () => {
    const actionStyle = {
      top: "128px",
      left: "calc(50% - 100px)",
    };
    const table = document.querySelector(".block-table");
    if (table === null) {
      return actionStyle;
    }
    const rect = table.getBoundingClientRect();
    const blockWidth = 32;
    const actionWidth = 224;
    const actionHeight = 64;
    posHorizon.current  = (block.posHorizon > -1) ? block.posHorizon : posHorizon.current;
    posVertical.current  = (block.posVertical > -1) ? block.posVertical : posVertical.current;
    const x = (posHorizon.current > -1) ? posHorizon.current : 0;
    const y = (posVertical.current > -1) ? posVertical.current : 0;
    let left = (x + 1) * blockWidth + rect.left + window.scrollX;
    let top = (y + 3) * blockWidth + rect.top + window.scrollY;
    if (posHorizon.current > Math.floor(column / 2) - 1) {
      left -= actionWidth - blockWidth;
    }
    if (posVertical.current > Math.floor(row / 2) - 1) {
      top -= actionHeight + blockWidth * 3;
    }
    actionStyle.left = left + "px";
    actionStyle.top = top + "px";
    return actionStyle;
  };

  const actionClassNames = classNames({
    "action": true,
    "show-action": isShow
  });

  return (
    <div className={actionClassNames} style={actionStyle()}>
      <div className="close-button" onClick={onClickClose}></div>
      <button className="button" onClick={onClickOpenBlock}>🔨Open</button>
      <button className="button" onClick={onClickFlagBlock}>🚩Flag</button>
    </div>
)};

export default Action;
