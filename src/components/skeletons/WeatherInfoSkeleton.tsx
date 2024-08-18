const WeatherInfoSkeleton = () => {
    return (
        <>
            <div className="flex flex-row items-end animate-pulse">
                <div className='w-full xs:w-[45%]'>
                    <div className="h-4 bg-gray-400/70 dark:bg-gray-500/50 rounded w-1/3 mb-2"></div>

                    {/* main temp skeleton */}
                    <div className="h-12 xs:h-16 bg-gray-400/70 dark:bg-gray-500/50 rounded mb-2"></div>

                    {/* high and low temp skeleton */}
                    <div className="h-4 bg-gray-400/70 dark:bg-gray-500/50 rounded w-1/2 mb-2"></div>

                    {/* location skeleton */}
                    <div className="h-4 bg-gray-400/70 dark:bg-gray-500/50 rounded w-3/4 mb-2"></div>
                    </div>

                    <div className='flex flex-col-reverse xs:flex-row mt-2 justify-between w-full gap-2 items-end xs:text-center'>
                    {/* date time skeleton */}
                    <div className="h-4 bg-gray-400/70 dark:bg-gray-500/50 rounded w-1/3 mb-2"></div>

                    {/* humidity skeleton */}
                    <div className="h-4 bg-gray-400/70 dark:bg-gray-500/50 rounded w-1/4 mb-2"></div>

                    {/* weather status skeleton */}
                    <div className="h-4 bg-gray-400/70 dark:bg-gray-500/50 rounded w-1/2 mb-2"></div>
                </div>
            </div>

            {/* image skeleton */}
            <div className="w-36 h-36 xs:w-44 xs:h-44 bg-gray-400/70 dark:bg-gray-500/50 rounded-full absolute top-[-12%] right-5 xs:top-[-6%] xs:right-5 animate-pulse"></div>
        </>
    )
}

export default WeatherInfoSkeleton