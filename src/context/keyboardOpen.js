import React from "react";

const KeyboardOpenContext = React.createContext();
KeyboardOpenContext.displayName = "keyboardOpen";

const resizeHandler = (setKeyboardOpen) => () => {
  const isMobile = window.matchMedia(
    "@media (pointer: none), (pointer: coarse)"
  );
  setKeyboardOpen(
    isMobile && window.screen.height - 300 > window.visualViewport.height
  );
};

const KeyboardOpenProvider = ({ children }) => {
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);

  React.useEffect(() => {
    window.visualViewport.addEventListener(
      "resize",
      resizeHandler(setKeyboardOpen)
    );
    return () =>
      window.visualViewport.removeEventListener(
        "resize",
        resizeHandler(setKeyboardOpen)
      );
  }, []);

  return (
    <KeyboardOpenContext.Provider value={[keyboardOpen, setKeyboardOpen]}>
      {children}
    </KeyboardOpenContext.Provider>
  );
};

const useKeyboardOpen = () => React.useContext(KeyboardOpenContext);

export { KeyboardOpenProvider, useKeyboardOpen };
