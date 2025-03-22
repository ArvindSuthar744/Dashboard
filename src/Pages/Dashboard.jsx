import React from 'react'

function Dashboard() {
  return (
    <>
      <div className='w-[100%] border border-red-500 px-5 '>
        <div className='py-4'>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
        </div>

        <div className='flex items-center justify-center gap-3'>
          <div className='w-[33%] border py-2 px-4 rounded-2xl'>
            <h2 className='text-2xl text-bold'>&#x20B9; 150000</h2>
            <p>Invested</p>
          </div>
          <div className='w-[33%] border py-2 px-4 rounded-2xl'>
            <h2 className='text-2xl text-bold'>&#x20B9; 150000</h2>
            <p>Current Value</p>
          </div>
          <div className='w-[33%] border py-2 px-4 rounded-2xl'>
            <h2 className='text-2xl text-bold'>&#x20B9; 150000</h2>
            <p>Total P/L</p>
          </div>
        </div>

        <div className='my-3 flex items-center gap-3'>
         
            <div className='w-[100%] flex items-center  gap-3 '>

              <div className='w-2/4 '>
              <div className=' px-2 pb-2'>
                <h3 className='text-md font-bold'>Chart Stocks</h3>
                
              </div>

                <div className='px-2 pb-2'>
                <h3 className='text-md font-bold'>Top Performing Stocks</h3>
                <ul className='pt-1 flex flex-col gap-2'>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                </ul>
              </div>

              </div>



              <div className='w-2/4'>

              <div className=' px-2 pb-2'>
                <h3 className='text-md font-bold'>Market Stocks</h3>
                <ul className='pt-1 flex flex-col gap-2'>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                </ul>
              </div>
              <div className=' px-2 pb-2'>
                <h3 className='text-md font-bold'>Low Performing Stocks</h3>
                <ul className='pt-1 flex flex-col gap-2'>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                <li className='border py-1 px-2 rounded-lg'>Sampe</li>
                </ul>
              </div>


              </div>
            </div>

          <div className='mt-3 w-[400px] h-[68vh] py-1 px-3 text-xl border rounded-xl flex flex-col justify-between'>
            <div  className='text-center'>
              <h2>Ai Assistant</h2>
            </div>

            <div>
              <p>message</p>
            </div>

            <div className='flex items-center gap-3'>
              <input type="text" name="inp" id="inp" className='border rounded-lg'/>
              <button>
              <i class="fa-solid fa-check"></i>
              </button>
            </div>
          </div>


        </div>



      </div>

    </>
  )
}

export default Dashboard
