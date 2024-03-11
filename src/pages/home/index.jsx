import { useEffect, useState } from "react";
import Loading from "../../components/loading-screen";
import { AnimatePresence } from "framer-motion";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 7000)
  }, [])
  return (
    <>
      {!isLoaded && <Loading />}
    </>
  );
}

export default Home;