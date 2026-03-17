import React from 'react'
import NavBar from './shared/NavBar'
import Job from './Job';

const RandomJobs = [1, 2, 3];
const Browse = () => {
  return (
    <div>
        <NavBar/>
        <div className='max-w-6xl mx-auto my-10'>
            <h1 className='font-bold text-xl my-10'>Search Results {RandomJobs.length}</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                RandomJobs.map((items, index) => {
                    return (
                        <Job key={index}/>
                    )
                })
            }
            </div>
            
        </div>
    </div>
  )
}
export default Browse