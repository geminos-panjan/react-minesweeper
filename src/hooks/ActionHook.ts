import { useState } from "react";
import Block from "../classes/Block";

const useActionState: () => [
  Block,
  number,
  boolean,
  boolean,
  () => void,
  (block: Block) => void,
  () => void,
  () => void,
] = () => {
  const dummyBlock = new Block(-1, -1, -1);

  const [selecting, setSelecting] = useState<Block>(dummyBlock);
  const [click, setClick] = useState(0);
  const [miss, setMiss] = useState(false);
  const [isShowAction, setIsShowAction] = useState(false);

  const closeAction = () => {
    setIsShowAction(false);
    setSelecting(dummyBlock);
  }

  const selectBlock = (block: Block) => {
    if (block.isOpened) {
      return;
    }
    setIsShowAction(true);
    setSelecting(block);
  };

  const resetGame = () => {
    setClick(0);
    setMiss(false);
    setIsShowAction(false);
    setSelecting(dummyBlock);
  };

  const checkGame = () => {
    if (miss === false) {
      setMiss(selecting.hasMine);
    }
    setClick(click + 1);
  }

  return [
    selecting, click, miss, isShowAction,
    closeAction, selectBlock, resetGame, checkGame,
  ];
};

export default useActionState;
