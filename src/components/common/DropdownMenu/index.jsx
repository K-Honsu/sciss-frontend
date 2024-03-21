import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usebackendStore } from "../../../store/store";

function DropdownMenu() {
  const userInformation = usebackendStore((state) => state.user)
  const [isShown, setIsShown] = useState(false)
  return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" onClick={() => setIsShown(!isShown)} className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
          <span className='aspect-square w-10 bg-gray-700 rounded-full flex items-center justify-center text-xl text-neutral-200'>{userInformation.userName[0]}</span>
          {userInformation.userName}
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {
          isShown ? (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1"
            >
              <div className="py-1" role="log_out">
                <a href="/signout" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-7">Log out</a>
              </div>
            </motion.div>
          ) : null
        }
      </AnimatePresence>
    </div>
  );
}

export default DropdownMenu;