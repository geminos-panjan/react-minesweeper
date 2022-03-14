import Block from "../classes/Block";
import classNames from "classnames";

type Props = {
  block: Block,
  isSelecting: boolean,
  onClick: () => void,
};

const BlockElement = ({
  block,
  isSelecting,
  onClick,
}: Props) => {

  const blockClassNames = classNames({
    "block": true,
    "block-selecting": isSelecting,
    "block-closing": block.isOpened === false,
    "safety": block.isOpened && block.minesAround < 1,
    "warning": block.isOpened && block.minesAround === 1,
    "serious": block.isOpened && block.minesAround === 2,
    "danger": block.isOpened && block.minesAround > 2,
    "mine": block.isOpened && block.hasMine,
  });

  return (
    <div className={blockClassNames} onClick={onClick}>
      {block.isOpened ? (
          block.hasMine ? "💣" : block.minesAround
        ) : (
          block.isFlagged && "🚩"
        )
      }
    </div>
  )
}

export default BlockElement;
