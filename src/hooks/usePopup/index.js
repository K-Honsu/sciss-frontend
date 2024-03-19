import { useEffect, useState, useContext, createContext, useCallback } from "react";
const PopupContext = createContext()
function PopupProvider({children}) {
  const [user, setUser] = useState(null)

  const logIn = useCallback(({email, password}) => {
    login({email, password}).then(({data: res}) => {
      console.log(res)
      setUser(res.data.user)
      router.replace('/dashboard')
        
    })
    .catch(err => {
        if (err.response) {
            console.log(err.response)
        }
        else {
            //axios error
            console.log(err)
        }
    })
  }, [])
  const signOut = useCallback(() => {
    setUser(null)
    router.replace('/')
  }, [])
  return (
    <PopupContext.Provider value={{set, close}}>
      <div className="fixed h-screen w-screen top-0 left-0 z-99">

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