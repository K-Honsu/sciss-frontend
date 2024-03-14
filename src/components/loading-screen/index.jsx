import { useEffect, useRef, useState } from "react";
import StaggeredText from "../anim/StaggeredText";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./style.module.css"
function Loading() {
  const long = "www.welcometomysite.com"
  const link = "bit.ly"
  const [current, setCurrent] = useState("long")
  const [left, setLeft] = useState(long)
  const right = "/user"
  const [sPosition, setSPosition] = useState(null)
  let scissorsRef = useRef()
  return (
    <AnimatePresence>
      <motion.div id="loading" className={styles.loading} exit={{opacity: 0}}>
        <div className={styles.text}>
          {current == "long" && <StaggeredText text={left.split("")} layoutId="left" once={true} />}
          {current == "link" && <StaggeredText text={link.split("")} layoutId="left" once={true} />}
          <StaggeredText text={right.split("")} once={true} delay={(long.length - 1) * 0.1} callback={(ref) => {
            setSPosition(() => ({
              x: ref.current.getBoundingClientRect().left,
              y: ref.current.getBoundingClientRect().top
            }))
            console.log(ref.current)
          }}
          />
        </div>
        {sPosition && 
          <motion.div initial={{
            top: sPosition.y + 60,
            left: sPosition.x - 10,
            opacity: 1
          }}
          animate={{
            top: sPosition.y - 10,
            transition: {delay: 1, duration: 0.5}
          }}
          onAnimationStart={() => {
            scissorsRef.current.playbackRate = 0.5
            scissorsRef.current.play()
          }}
          onAnimationComplete={() => {
            scissorsRef.current.pause()
            setCurrent("link")
            setSPosition(null)
          }} className={styles.scissors2}>
              <video ref={scissorsRef} src="scissors2.webm" muted loop playsInline disablePictureInPicture></video>
          </motion.div>
        }
        <div className={styles.dots}>
          {Array.from({length: 3}, (_, i) => i + 1 ).map(_ => (
            <motion.div
            key={_}
            style={{
              backgroundColor: '#009254',
              borderRadius: 999,
              width: 10,
              height: 10
            }}
            animate={{
              y: [0, -10, 0],
              transition: {duration: 0.4, delay: 0.5 + (_ - 1) * 0.2, easing: 'easeOutInCirc', repeat: Infinity}
            }}
            >
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
  function s() {
    scissors.style.left = x - 10 + "px"
    video.playbackRate = 0.25
    video.play();
    anime({
      targets: wrapElem(".text .left .long"),
      opacity: 0.3,
      direction: "forward",
      delay: 200,
      duration: 500
    })
  }
}

export default Loading;