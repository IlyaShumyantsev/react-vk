import { useState } from "react";

export default function useButton(state = null) {
  const [activeButton, setButtonState] = useState(state);

  const onBtnClick = (callback) => (e) => {
    const year = +e.currentTarget.innerText;
    isNaN(year) ? callback(null) : callback(year);
  };

  const onBtnChange = (index = null) => {
    index === -1 ? setButtonState(null) : setButtonState(index);
  };

  return {
    activeButton,
    onBtnClick,
    onBtnChange,
  };
}
