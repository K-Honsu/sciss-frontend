import { useEffect, useState } from "react";
import Loading from "../../components/loading-screen";
import { AnimatePresence } from "framer-motion";

import FeatureSection from "./FeatureSection";
import HeroSection from "./HeroSection";
import Header from "../../components/common/header";
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
      <Header />
      <HeroSection />
      <FeatureSection />
    </>
  );
}

export default Home;