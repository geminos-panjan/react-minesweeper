const defaultRow = 10;
const defaultColumn = 10;
const defaultMinePercent = 20;

export const setStorage = (
  row: number, column: number, minePercent: number
) => {
  window.localStorage.setItem("tableRow", String(row));
  window.localStorage.setItem("tableColumn", String(column));
  window.localStorage.setItem("tableMinePercent", String(minePercent));
}

export const getStorage = () => {
  const rowStorage = window.localStorage.getItem("tableRow");
  const columnStorage = window.localStorage.getItem("tableColumn");
  const minePercentStorage = window.localStorage.getItem("tableMinePercent");
  if (
    rowStorage === null
    || columnStorage === null
    || minePercentStorage === null
  ) {
    setStorage(defaultRow, defaultColumn, defaultMinePercent);
    return {
      row: defaultRow,
      column: defaultColumn,
      minePercent: defaultMinePercent
    };
  }
  const thisRow = Number(rowStorage);
  const thisColumn = Number(columnStorage);
  const thisMinePercent = Number(minePercentStorage);

  return {
    row: thisRow,
    column: thisColumn,
    minePercent: thisMinePercent,
  };
};
