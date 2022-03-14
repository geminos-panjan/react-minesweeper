class Block {
  blockID: number;
  posHorizon: number;
  posVertical: number;
  minesAround: number;
  hasMine: boolean;
  isFlagged: boolean;
  isOpened: boolean;

  constructor(
    blockID: number,
    posHorizon: number,
    posVertical: number,
  ) {
    this.blockID = blockID;
    this.posHorizon = posHorizon;
    this.posVertical = posVertical;
    this.minesAround = 0;
    this.hasMine = false;
    this.isFlagged = false;
    this.isOpened = false;
  }

  setMinesAround(minesAround: number) {
    this.minesAround = minesAround;
  }

  setMine() {
    this.hasMine = true;
  }

  changeFlag() {
    this.isFlagged = !this.isFlagged;
  }

  open() {
    this.isOpened = true;
  }
}

export default Block;
