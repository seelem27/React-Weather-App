import { ReactNode } from 'react'

// Maximum width wrapper component
const MaxWidthWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className='mx-auto w-full max-w-screen-md px-2.5 md:px-20'>
            { children }
        </div>
    )
}

export default MaxWidthWrapper