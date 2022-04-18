import React from "react";

const KeyboardOpenContext = React.createContext();
KeyboardOpenContext.displayName = "keyboardOpen";

const KeyboardOpenProvider = ({ children }) => {
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);

  React.useEffect(() => {
    const resizeHandler = () => {
      const isMobile = window.matchMedia(
        "@media (pointer: none), (pointer: coarse)"
      );
      setKeyboardOpen(
        isMobile && window.screen.height - 300 > window.visualViewport.height
      );
    };
    window.visualViewport.addEventListener("resize", resizeHandler);
    return () =>
      window.visualViewport.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <KeyboardOpenContext.Provider value={[keyboardOpen, setKeyboardOpen]}>
      {children}
    </KeyboardOpenContext.Provider>
  );
};

const useKeyboardOpen = () => React.useContext(KeyboardOpenContext);

export { KeyboardOpenProvider, useKeyboardOpen };
