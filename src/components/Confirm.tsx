import classNames from "classnames"

type Props = {
  question: string,
  yes: string,
  no: string,
  isShow: boolean,
  onClickYes: () => void,
  onClickNo: () => void,
};

const Confirm = ({
  question,
  yes,
  no,
  isShow,
  onClickYes,
  onClickNo,
}: Props) => {
  const confirmClassNames = classNames({
    "confirm": true,
    "show-confirm": isShow,
  });

  return (
    <div className={confirmClassNames}>
      <div className="question">{question}</div>
      <div className="confirm-buttons">
        <button className="button reset-button" onClick={onClickYes}>{yes}</button>
        <button className="button" onClick={onClickNo}>{no}</button>
      </div>
    </div>
  )
};

export default Confirm;
