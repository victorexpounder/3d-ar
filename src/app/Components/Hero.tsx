import React from 'react'

interface Props {
    
}

const Hero = (props: Props) => {
    return (
        <div className='w-full flex gap-4 flex-col justify-center mt-[40px] max-sm:p-[16px] sm:items-center sm:mt-[80px] '>
            <h2 className='text-[2rem] sm:text-[3rem] text-[#1c2b33] font-medium'>
                Find your perfect pair 
            </h2>
            <p className='text-[#1c2b33] text-[1.125rem] font-normal sm:text-center '>
            Choose from multiple styles and colors. Available with <a href="">prescription lenses.</a> 
            </p>
            <div className='py-[14px] px-[30px] sm:py-[10px] sm:px-[22px] w-fit flex gap-3 bg-[#0064E3] text-white font-semibold justify-center items-center rounded-4xl cursor-pointer hover:bg-[#0062e3c6] transition-all duration-200 ease-in-out'>
                <svg viewBox="0 0 24 24" fill="currentColor" width="1.8em" height="1.8em" aria-hidden="true" className="x1lliihq x1heor9g xxk0z11 xvy4d1p x1nrll8i x10l6tqk xwa60dl x11lhmoz" role="img"><path fill-rule="evenodd" clip-rule="evenodd" d="m1.999 12.117.408 1.633a4 4 0 0 0 4.242 3.013l.867-.079a4 4 0 0 0 3.497-2.93l.308-1.11a.604.604 0 0 1 .116-.24.75.75 0 0 1 1.126 0c.06.069.092.154.116.24l.308 1.11a4 4 0 0 0 3.497 2.93l.867.08a4 4 0 0 0 4.242-3.014l.409-1.633.445-.223A1 1 0 0 0 23 11v-1a1 1 0 0 0-.758-.97l-1.964-.491-.201-.068a9.219 9.219 0 0 0-3.957-.414c-.925.055-1.845.216-2.743.486l-.515.154a3 3 0 0 1-1.724 0l-.515-.154a11.997 11.997 0 0 0-2.744-.486 9.219 9.219 0 0 0-3.956.414l-.201.068-1.965.49A1 1 0 0 0 1 10v1a1 1 0 0 0 .553.895l.446.223zm2.218-1.633a10 10 0 0 1 3.49-.433 7.223 7.223 0 0 1 1.666.407c.24.09.371.347.304.593l-.594 2.176a2 2 0 0 1-1.748 1.466l-.867.078a2 2 0 0 1-2.121-1.506l-.506-2.024a.65.65 0 0 1 .376-.757zm12.076-.433a10 10 0 0 1 3.49.433.651.651 0 0 1 .376.757l-.506 2.024a2 2 0 0 1-2.121 1.506l-.867-.078a2 2 0 0 1-1.748-1.466l-.594-2.176a.494.494 0 0 1 .304-.593c.54-.203 1.1-.339 1.666-.407z"></path></svg>   
                Virtual try-on
            </div>
        </div>
    )
}

export default Hero
