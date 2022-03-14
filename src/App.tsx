import BlockTable from "./components/BlockTable";
import useBlockTableStatus from "./hooks/BlockTableHook";
import Action from "./components/Action";
import Setting from "./components/Setting";
import useActionState from "./hooks/ActionHook";
import useSettingState from "./hooks/SettingHook";
import Info from "./components/Info";

const App = () => {
  const [
    row, column, minePercent, isShowSetting,
    inputRow, inputColumn, inputMinePercent,
    applySetting, resetSetting,
    openSetting, closeSetting,
  ] = useSettingState();

  const [
    blockTable, setMine, openBlock, flagBlock,
    checkEnding, countFlags, resetTable,
  ] = useBlockTableStatus(row, column, minePercent);

  const [
    selecting, click, miss, isShowAction,
    closeAction, selectBlock, resetGame, checkGame,
  ] = useActionState();

  const clickOpenBlockButton = () => {
    if (selecting.isFlagged || selecting.isOpened) {
      return;
    }
    if (click < 1) {
      setMine(selecting);
    }
    openBlock(selecting);
    checkGame();
    checkEnding(miss);
  };

  const clickFlagBlockButton = () => {
    flagBlock(selecting);
  };

  const clickResetGameButton = () => {
    if (window.confirm("Reset Game?") === false) {
      return;
    }
    resetTable();
    resetGame();
  };

  const clickApplySetting = () => {
    if (window.confirm("Reset Game?") === false) {
      return;
    }
    applySetting();
    resetTable();
    resetGame();
    closeSetting();
  }

  const clickResetSetting = () => {
    if (window.confirm("Reset Game?") === false) {
      return;
    }
    resetSetting();
    resetTable();
    resetGame();
    closeSetting();
  }

  return (
    <>
      <Setting
        row={row} column={column} mine={minePercent}
        isShow={isShowSetting}
        onInputRow={inputRow}
        onInputColumn={inputColumn}
        onInputMine={inputMinePercent}
        onClickOpen={openSetting}
        onClickClose={closeSetting}
        onClickApply={clickApplySetting}
        onClickReset={clickResetSetting}
      />
      <Info
        flag={countFlags()}
        onClickReset={clickResetGameButton}/>
      <Action
        block={selecting}
        row={row}
        column={column}
        isShow={isShowAction}
        onClickClose={closeAction}
        onClickOpenBlock={clickOpenBlockButton}
        onClickFlagBlock={clickFlagBlockButton}/>
      <BlockTable blockTable={blockTable}
        selectingID={Number(selecting?.blockID)}
        onClick={selectBlock}/>
    </>
  );
}

export default App;
