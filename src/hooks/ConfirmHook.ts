import { useState } from "react";

const useConfirmState: () => [
  boolean,
  () => void,
  () => void,
  () => void,
  React.Dispatch<React.SetStateAction<() => void>>,
] = () => {
  const [isShow, setIsShow] = useState(false);
  const [callback, setCallback] = useState<() => void>(() => () => {})

  const close = () => {
    setIsShow(false);
  };

  const show = () => {
    setIsShow(true);
  };

  return [
    isShow, callback, close, show, setCallback
  ];
};

export default useConfirmState;
