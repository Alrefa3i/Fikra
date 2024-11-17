import React from 'react'
import style from './home.module.css';
import { Link } from "react-router-dom";
import { CategoriesData as cardsData } from './Data';


const Categories = () => {
    return (
        <div className="container mx-auto px-8 py-6">
            <h2 className="text-3xl font-bold text-center mb-4">التصنيفات</h2>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-content-center ${style.shadows}`}>
                {
                    cardsData.map((card, index) => (
                        <Link to={'#'} key={index} >
                            <Category key={index} title={card.title} count={card.count} icon={card.icon} bgColor={card.bgColor} />
                        </Link>
                    ))
                }
            </div>
            <p className="w-full my-3 flex justify-center"><Link to={'#'} className="px-1 text-orange-500 hover:underline font-semibold " >تصفح الكل </Link>
                لدينا الكثير من الفئات
            </p>
        </div >
    )
}
const Category = ({ title, count, icon, bgColor }) => {
    return (
        <div className={`border px-4 py-7 flex items-center justify-between ${bgColor} dark:bg-gray-800 dark:border-gray-700`}>
            <div>
                <h2 className="text-lg font-semibold  text-gray-900 dark:text-gray-100">{title}</h2>
                <p className="text-gray-400 text-sm pt-1 dark:text-gray-300">{count} معلم</p>
            </div>
            <div className="text-red-400 dark:text-orange-400 text-2xl">
                {icon}
            </div>
        </div>



    )
}

export default Categories