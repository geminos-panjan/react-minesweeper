import { useState } from "react";

const usePopupState: () => [
  string,
  boolean,
  (text: string) => void,
] = () => {
  const [text, setText] = useState("");
  const [isShow, setIsShow] = useState(false);

  const reserve = 1500;

  const show = (text: string) => {
    setText(text);
    setIsShow(true);
    setTimeout(() => {
      setIsShow(false);
    }, reserve);
  }

  return [
    text, isShow, show
  ]
};

export default usePopupState;
