import { useEffect, useState, useContext, createContext, useCallback } from "react";
const PopupContext = createContext()
function PopupProvider({children}) {
  const [isShown, setIsShown] = useState(false)
  const set = () => {
    setIsShown(true)
  }
  const close = () => {
    setIsShown(false)
  }
  return (
    <PopupContext.Provider value={{set, close}}>
      <div className="fixed h-screen w-screen top-0 left-0 z-99">
        hello
      </div>
      {children}
    </PopupContext.Provider>
  );
}
const usePopup = () => useContext(PopupContext)
function Popup() {
  return (
    <div>

    </div>
  );
}
export default usePopup
export {PopupProvider};