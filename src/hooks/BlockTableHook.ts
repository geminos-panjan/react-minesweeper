import { useRef, useState } from "react";
import Block from "../classes/Block";
import { getStorage } from "../storage/BlockTableStorage";
import { getMine } from "../util/MineUtil";
import usePopupState from "./PopupHook";

const useBlockTableStatus: () => [
  Block[][],
  string,
  boolean,
  (block: Block) => void,
  (block: Block) => void,
  (block: Block) => void,
  (miss: boolean) => void,
  () => number,
  () => void,
] = () => {
  const row = useRef(0);
  const column = useRef(0);
  const mine = useRef(0);

  const initialTable = () => {
    const s = getStorage();
    row.current = s.row;
    column.current = s.column;
    mine.current = getMine(row.current, column.current, s.minePercent);
    const emptyTable: Block[][] = [];
    for (let i = 0; i < row.current; i++) {
      emptyTable.push([]);
      for (let j = 0; j < column.current; j++) {
        emptyTable[i].push(new Block(i * column.current + j, j, i));
      }
    }
    return emptyTable;
  }

  const openBlock = (block: Block) => {
    const x = block.posHorizon;
    const y = block.posVertical
    if (x < 0 || y < 0) {
      return;
    }
    if (block.isOpened) {
      return;
    }
    block.open();
    if (block.hasMine) {
      showPopup("BOMB!");
      return;
    }
    if (block.minesAround < 1) {
      for (let dy = -1; dy <= 1; dy++) {
        const y = block.posVertical + dy
        if (y < 0 || y >= row.current) {
          continue;
        }
        for (let dx = -1; dx <= 1; dx++) {
          const x = block.posHorizon + dx;
          if (x < 0 || x >= column.current || (dx === 0 && dy === 0)) {
            continue;
          }
          openBlock(blockTable[y][x]);
        }
      }
    }
  };

  const setMine = (block: Block) => {
    const mineList: number[] = [];
    const timeout = 100;
    let j = 0;
    for (let i = 0; i < mine.current; i++) {
      const x = Math.floor(Math.random() * column.current)
      const y = Math.floor(Math.random() * row.current)
      const blockID = y * column.current + x;
      const diffHorizon = Math.abs(x - block.posHorizon);
      const diffVertical = Math.abs(y - block.posVertical);
      if (
        diffHorizon < 2 || diffVertical < 2
        || mineList.includes(blockID)
      ) {
        i--;
        j++;
        if (j > timeout) {
          break;
        }
        continue;
      }
      blockTable[y][x].setMine();
      mineList.push(blockID);
    }

    for (const blockRow of blockTable) {
      for (const block of blockRow) {
        setMinesAround(block);
      }
    }
  }

  const setMinesAround = (block: Block) => {
    for (let dy = -1; dy <= 1; dy++) {
      const y = block.posVertical + dy
      if (y < 0 || y >= row.current) {
        continue;
      }
      for (let dx = -1; dx <= 1; dx++) {
        const x = block.posHorizon + dx;
        if (x < 0 || x >= column.current || (dx === 0 && dy === 0)) {
          continue;
        }
        const minesAround =
          block.minesAround
          + ((blockTable[y][x].hasMine) ? 1 : 0);
        block.setMinesAround(minesAround);
      }
    }
  }

  const flagBlock = (block: Block) => {
    if (block.isOpened === false) {
      block.changeFlag();
      setBlockTable([...blockTable]);
    }
  }

  const countFlags = () => {
    let count = 0;
    for (const blockRow of blockTable) {
      count += blockRow.filter((block) =>
        block.isFlagged).length;
    }
    return count;
  }

  const countMines = () => {
    let count = 0;
    for (const blockRow of blockTable) {
      count += blockRow.filter((block) =>
        (block.hasMine && block.isOpened) || block.isOpened === false).length;
    }
    return count;
  }

  const checkEnding = (miss: boolean) => {
    const message = miss ? "END!" : "CLEAR!";
    if (isEnding === false && countMines() <= mine.current) {
      setIsEnding(true);
      showPopup(message);
    }
  }

  const resetGame = () => {
    setBlockTable(initialTable());
    setIsEnding(false);
  }

  const [blockTable, setBlockTable] = useState<Block[][]>(initialTable());
  const [isEnding, setIsEnding] = useState(false);
  const [
    text, isShow, showPopup
  ] = usePopupState();

  return [
    blockTable, text, isShow, setMine, openBlock, flagBlock, checkEnding,
    countFlags, resetGame,
  ];
};

export default useBlockTableStatus;