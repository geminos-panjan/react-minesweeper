export const getMine = (
  row: number, column: number, minePercent: number
) => {
  return Math.round(row * column * minePercent / 100);
};
