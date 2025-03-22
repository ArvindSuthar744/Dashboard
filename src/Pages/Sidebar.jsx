import React from 'react'

function Sidebar() {
    return (
        <div>
            <div className='w-[200px] h-lvh bg-[#032313] text-white flex flex-col gap-5 ' >

                <div className='py-5 flex gap-2.5 items-center justify-center'>
                    <i className="fa-solid fa-chart-pie text-2xl"></i>
                    <h1 className='text-xl'>Invester.com</h1>
                </div>

                <div>
                    <div className='py-1 px-7 flex gap-2.5 items-center'>
                    <i className="fa-solid fa-chart-pie text-xl"></i>
                        <h1 className='text-lg'>Dashbord</h1>
                    </div>
                    <div className='py-1 px-7 flex gap-2.5 items-center'>
                    <i className="fa-solid fa-chart-pie text-xl"></i>
                        <h1 className='text-lg'>Stocks</h1>
                    </div>
                    <div className='py-1 px-7 flex gap-2.5 items-center'>
                    <i className="fa-solid fa-chart-pie text-xl"></i>
                        <h1 className='text-lg'>Tax </h1>
                    </div>
                    <div className='py-1 px-7 flex gap-2.5 items-center'>
                    <i className="fa-solid fa-chart-pie text-xl"></i>
                        <h1 className='text-lg'>Dashbord</h1>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default Sidebar
