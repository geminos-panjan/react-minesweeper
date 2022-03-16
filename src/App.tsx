import BlockTable from "./components/BlockTable";
import useBlockTableStatus from "./hooks/BlockTableHook";
import Action from "./components/Action";
import Setting from "./components/Setting";
import useActionState from "./hooks/ActionHook";
import useSettingState from "./hooks/SettingHook";
import Info from "./components/Info";
import Popup from "./components/Popup";
import Confirm from "./components/Confirm";
import useConfirmState from "./hooks/ConfirmHook";

const App = () => {
  const [
    row, column, minePercent, isShowSetting,
    inputRow, inputColumn, inputMinePercent,
    applySetting, resetSetting,
    openSetting, closeSetting,
  ] = useSettingState();

  const [
    blockTable, popupText, popupIsShow, setMine, openBlock, flagBlock,
    checkEnding, countFlags, resetTable,
  ] = useBlockTableStatus(row, column, minePercent);

  const [
    selecting, click, miss, isShowAction,
    closeAction, selectBlock, resetGame, checkGame,
  ] = useActionState();

  const [
    isShowConfirm, callback, closeConfirm, showConfirm, setCallback
  ] = useConfirmState();

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
    setCallback(() => () => {});
    showConfirm();
  };

  const clickApplySetting = () => {
    setCallback(() => applySetting);
    showConfirm();
  }

  const clickResetSetting = () => {
    setCallback(() => resetSetting);
    showConfirm();
  }

  const clickConfirmReset = () => {
    callback();
    closeConfirm();
    resetTable();
    resetGame();
  }

  const clickConfirmCancel = () => {
    closeConfirm();
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
      <Popup text={popupText} isShow={popupIsShow}/>
      <Confirm
        question="Reset Game?"
        yes="Reset"
        no="Cancel"
        isShow={isShowConfirm}
        onClickYes={clickConfirmReset}
        onClickNo={clickConfirmCancel}
        />
      <BlockTable blockTable={blockTable}
        selectingID={Number(selecting?.blockID)}
        onClick={selectBlock}/>
    </>
  );
}

export default App;
