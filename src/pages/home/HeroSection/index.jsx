import AnimatedLink from '../../../components/common/AnimatedLink';
import StaggeredText from '../../../components/common/StaggeredText';
import { CreateLink } from '../../../hooks/useCreateLink';
import { motion } from 'framer-motion'
import { useState } from 'react';
import styles from "./style.module.css"
function HeroSection() {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [alias, setAlias] = useState("");
  return (
    <section className='px-16 py-8 flex justify-between gap-8 relative'>
      <div className='basis-full'>
        <h1 className="text-dark-700 text-7xl font-bold leading-[118%]">
          <span className='inline-flex gap-x-2'>
            <StaggeredText text={'Cut the'.split('')} once={true} />
            <motion.span initial={{ opacity: 0 }} transition={{ delay: 1.5, duration: 1 }} animate={{ opacity: 1 }} className='text-primary self-end overflow-hidden'>
              <AnimatedLink
                title='Clutter,'
                isLink={false}
              />
            </motion.span>
          </span>
          <StaggeredText text={'Share with'.split('')} once={true} />
          <StaggeredText text={'Flair.'.split('')} once={true} />
        </h1>
      </div>
      <div className='basis-full'>
        <div>
          <div className='-mb-1 z-10 relative inline-flex bg-gradient-to-br from-[#60EFFF] to-[#00FF87] gap-x-2 pl-4 pr-8 py-[10px] rounded-t-[20px]'>
            <span>
              <img
                src="icons/link.svg"
                width="24"
                height="24"
                alt="link icon"
              />
            </span>
            <span className='text-white text-xl font-semibold'>Shorten URL</span>
          </div>
          <div className='relative min-w-96 rounded-[20px] rounded-tl-none px-8 py-6 border-4 border-neutral shadow-[4px_4px_0px_0px] shadow-primary-200 flex flex-col gap-y-8'>
            <div className='left-16 -z-10 -top-2 absolute w-[350px] -translate-y-full aspect-[20/13]'>
              <img
                src='icons/trail_1.svg'
                fill='layout'
              />
            </div>
            <div className='-right-16 -z-10 -bottom-4 translate-y-full absolute w-[300px] aspect-[17/13]'>
              <img
                src='icons/trail_2.svg'
                fill='layout'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-dark-500 text-xl font-semibold'>Paste a long URL</span>
              <input className='p-4 border-2 transition-colors ease-in border-neutral rounded-lg focus:border-primary outline-none' placeholder='https://www.a-really-long-url/to-short' name='url' />
            </div>
            <div className='flex gap-2 items-end'>
              <div className='flex flex-col gap-2'>
                <span className='text-dark-500 text-xl font-semibold'>Domain</span>
                <input className='p-4 border-2 transition-colors ease-in border-neutral rounded-lg focus:border-primary outline-none' disabled value='qlnkr.vercel.app' name='url' />
              </div>
              <span className='my-4 text-dark-500 text-2xl font-semibold'>/</span>
              <div className='basis-full flex flex-col gap-2'>
                <span className='text-dark-500 text-xl font-semibold'>Enter a back-half<span>(optional)</span></span>
                <input className='p-4 border-2 transition-colors ease-in border-neutral rounded-lg focus:border-primary outline-none' placeholder='https://www.a-really-long-url/to-short' name='url' />
              </div>
            </div>
            <button className='mt-6 text-primary-darker font-medium text-xl rounded-lg py-4 bg-gradient-to-tl from-[#60EFFF] to-[#00FF87] hover:from-[#00FF87] hover:to-[#60EFFF]'>Sign up to continue</button>
          </div>
        </div>
      </div>
      <div className='left-0 top-[200px] absolute -z-10 w-[300px] aspect-[419/589]'>
        <img
          src='/images/patch.svg'
          className=''
          fill='layout'
          alt='patch'
          quality={100}
          unoptimized
        />
      </div>
    </section>
  );
}

export default HeroSection;