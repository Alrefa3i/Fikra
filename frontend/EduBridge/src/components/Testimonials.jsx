import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'


const Testimonials = () => {
    const { theme } = useTheme()
    // const [theme] = useState(null)
    // useEffect(() => {
    //     const theme = localStorage.getItem('theme') || 'light'
    //     if (theme) {
    //         setTheme(theme)
    //     }
    // }, [])
    return (
        <section className="relative isolate overflow-hidden px-6 py-10 sm:py-12 lg:px-8 bg-base text-base-content dark:bg-gray-800">
            <div className="absolute inset-0 -z-10  opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10  mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] shadow-xl shadow-indigo-200/10 ring-1 ring-indigo-200 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <div className='flex justify-center items-center gap-3'>
                    <img
                        alt=""
                        src={`../assets/${theme}.svg`}
                        className="h-12"
                    />
                    <h1 className='font-extrabold text-3xl'> Fikra Online</h1>
                </div>
                <figure className="mt-10">
                    <blockquote className="text-center text-xl/8 font-semibold  sm:text-2xl/9 dark:text-gray-200">
                        <p>
                            “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
                            molestiae. Numquam corrupti in laborum sed rerum et corporis.”
                        </p>
                    </blockquote>
                    <figcaption className="mt-10">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="mx-auto size-10 rounded-full"
                        />
                        <div className="mt-4 flex items-center justify-center space-x-3 text-base ">
                            <div className="font-semibold">Judith Black</div>
                            <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-base-content">
                                <circle r={1} cx={1} cy={1} />
                            </svg>
                            <div className="text-gray-400">CEO of Workcation</div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </section>

    )
}

export default Testimonials