import classNames from "classnames";

type Props = {
  row: number,
  column: number,
  mine: number,
  isShow: boolean,
  onInputRow: (e: React.FormEvent<HTMLInputElement>) => void,
  onInputColumn: (e: React.FormEvent<HTMLInputElement>) => void,
  onInputMine: (e: React.FormEvent<HTMLInputElement>) => void,
  onClickOpen: () => void,
  onClickClose: () => void,
  onClickApply: () => void,
  onClickReset: () => void,
}

const Setting = ({
  row,
  column,
  mine,
  isShow,
  onInputRow,
  onInputColumn,
  onInputMine,
  onClickOpen,
  onClickClose,
  onClickApply,
  onClickReset,
}: Props) => {
  const settingClassNames = classNames({
    "setting": true,
    "show-setting": isShow,
  });
  return (
    <>
      <div className="open-button" onClick={onClickOpen}>
        <div className="button-center-line"></div>
      </div>
      <div className={settingClassNames}>
        <div className="caption">Setting</div>
        <div className="close-button close-setting-button" onClick={onClickClose}></div>
        <div>
          <div className="input">
            <div className="label">Row</div>
            <input type="number" value={row} onInput={onInputRow}/>
          </div>
          <div className="input">
            <div className="label">Column</div>
            <input type="number" value={column} onInput={onInputColumn}/>
          </div>
          <div className="input">
            <div className="label">Mine</div>
            <input type="number" value={mine} onInput={onInputMine}/>%
          </div>
        </div>
        <div className="setting-buttons">
          <button className="button" onClick={onClickApply}>Apply</button>
          <button className="button" onClick={onClickReset}>Default</button>
        </div>
      </div>
    </>
  )
}

export default Setting;
