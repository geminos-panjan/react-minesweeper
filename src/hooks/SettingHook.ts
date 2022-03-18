import { useState } from "react";
import { getStorage, setStorage } from "../storage/BlockTableStorage";

const defaultRow = 10;
const defaultColumn = 10;
const defaultMinePercent = 20;

const minRow = 0;
const maxRow = 1000;
const minColumn = 0;
const maxColumn = 1000;
const minMinePercent = 0;
const maxMinePercent = 99;

const useSettingState: () => [
  number,
  number,
  number,
  boolean,
  (e: React.FormEvent<HTMLInputElement>) => void,
  (e: React.FormEvent<HTMLInputElement>) => void,
  (e: React.FormEvent<HTMLInputElement>) => void,
  () => void,
  () => void,
  () => void,
  () => void,
] = () => {
  const s = getStorage();

  const [row, setRow] = useState(s.row);
  const [column, setColumn] = useState(s.column);
  const [minePercent, setMinePercent] = useState(s.minePercent);
  const [isShowSetting, setIsShowSetting] = useState(false);

  const openSetting = () => {
    setIsShowSetting(!isShowSetting);
  }

  const closeSetting = () => {
    const s = getStorage();
    setRow(s.row);
    setColumn(s.column);
    setMinePercent(s.minePercent);
    setIsShowSetting(false);
  }

  const constrain = (
    num: number, min: number, max: number
  ) => {
    if (num < min) {
      return min;
    } else if (max < num) {
      return max;
    } else {
      return num;
    }
  };

  const inputRow = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const row = constrain(
      Number(e.currentTarget.value),
      minRow, maxRow
    )
    setRow(row);
  };

  const inputColumn = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const column = constrain(
      Number(e.currentTarget.value),
      minColumn,
      maxColumn
    );
    setColumn(column);
  };

  const inputMinePercent = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const minePercent = constrain(
      Number(e.currentTarget.value),
      minMinePercent,
      maxMinePercent
    );
    setMinePercent(minePercent);
  };


  const setAll = (
    row: number, column: number, minePercent: number
  ) => {
    setRow(row);
    setColumn(column);
    setMinePercent(minePercent);
  }

  const applySetting = () => {
    setStorage(row, column, minePercent);
  }

  const resetSetting = () => {
    setStorage(defaultRow, defaultColumn, defaultMinePercent);
    setAll(defaultRow, defaultColumn, defaultMinePercent);
  }

  return [
    row, column, minePercent, isShowSetting,
    inputRow, inputColumn, inputMinePercent,
    applySetting, resetSetting,
    openSetting, closeSetting,
  ];
};

export default useSettingState;
