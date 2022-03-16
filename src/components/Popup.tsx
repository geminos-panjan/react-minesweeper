import classNames from "classnames"

type Props = {
  text: string,
  isShow: boolean,
};

const Popup = ({
  text,
  isShow,
}: Props) => {
  const popupClassNames = classNames({
    "popup": true,
    "show-popup": isShow,
  });

  return (
    <div className={popupClassNames}>{text}</div>
  );
};

export default Popup;
