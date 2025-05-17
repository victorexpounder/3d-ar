import React from 'react'

interface Props {
    
}

const Header = (props: Props) => {
    return (
        <div className='w-full py-3 px-5 bg-white flex justify-between items-center text-[#1c2b33] border-b border-[#eaeaea]'>
            <div className='text-[1.5rem] font-medium ml-3.5 ' >AI glasses</div>
            <div className='flex items-center gap-8'>
                <div>
                    Starting at <br /> <span className='text-[1rem] font-bold'>$299 USD</span>
                </div>
                <div className='py-[10px] px-[22px] flex bg-[#0064E3] text-white font-semibold justify-center items-center rounded-3xl cursor-pointer hover:bg-[#0062e3c6] transition-all duration-200 ease-in-out'>
                    Shop all styles
                </div>
            </div>
            
        </div>
    )
}

export default Header
