import Image from 'next/image'
import React from 'react'

interface Props {
    
}

const Glasses = (props: Props) => {
    return (
        <div className='w-full flex max-sm:flex-col justify-center items-center gap-7 sm:my-[80px] my-[20px] max-sm:px-4'>
            <div className='flex max-sm:flex-row-reverse sm:flex-col  max-sm:pl-[100px] justify-center items-center overflow-hidden max-sm:border border-[#eaeaea] max-sm:rounded-3xl max-sm:shadow-lg'>
                <img
                    src='/rayban1.webp'
                    alt='rayban1'
                    className='sm:w-[370px] w-[250px]'
                />
                <div className='flex flex-col sm:items-center sm:justify-center gap-2'>
                    <p className='text-[#465A69] text-[14px]'>Ray-Ban Meta</p>
                    <h2 className='font-medium sm:text-[2.2rem] text-[1.8rem]'>Wayfarer</h2>
                </div>
            </div>

            <div className='flex max-sm:flex-row-reverse sm:flex-col  max-sm:pl-[100px] justify-center items-center overflow-hidden max-sm:border border-[#eaeaea] max-sm:rounded-3xl max-sm:shadow-lg'>
                <img
                    src='/skyler.webp'
                    alt='rayban1'
                    className='sm:w-[370px] w-[250px]'
                />
                <div className='flex flex-col sm:items-center sm:justify-center gap-2'>
                    <p className='text-[#465A69] text-[14px]'>Ray-Ban Meta</p>
                    <h2 className='font-medium sm:text-[2.2rem] text-[1.8rem]'>Skyler</h2>
                </div>
            </div>

            <div className='flex max-sm:flex-row-reverse sm:flex-col  max-sm:pl-[100px] justify-center items-center overflow-hidden max-sm:border border-[#eaeaea] max-sm:rounded-3xl max-sm:shadow-lg'>
                <img
                    src='/Headliner.webp'
                    alt='rayban1'
                    className='sm:w-[370px] w-[250px]'
                />
                <div className='flex flex-col sm:items-center sm:justify-center gap-2'>
                    <p className='text-[#465A69] text-[14px]'>Ray-Ban Meta</p>
                    <h2 className='font-medium sm:text-[2.2rem] text-[1.8rem]'>Headliner</h2>
                </div>
            </div>
            
        </div>
    )
}

export default Glasses
