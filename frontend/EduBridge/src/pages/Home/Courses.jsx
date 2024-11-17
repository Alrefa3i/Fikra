import React from 'react';

const CourseCard = ({
    image,
    price,
    title,
    category,
    rating,
    students,
}) => {
    return (
        <div className="card bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <div className="p-4">
                <div className="text-xs text-red-500 uppercase font-bold text-end">{category}</div>
                <h3 className="text-md font-semibold my-2 text-end">{title}</h3>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                    <span>${price}</span>
                    <div>
                        <span className="text-yellow-500">⭐ {rating}</span>
                        <span className="ml-2">👥 {students.toLocaleString()} الطلاب </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Courses = () => {
    const courses = [
        {
            image: "/assets/Courses/C2.png",
            price: 57,
            title: "دورة بايثون: بناء 10 تطبيقات واقعية",
            category: "تطوير",
            rating: 5.0,
            students: 265700,
        },
        {
            image: "/assets/Courses/C3.png",
            price: 57,
            title: "إعلانات وتسويق فيسبوك المتقدم 2021",
            category: "تكنولوجيا المعلومات والبرمجيات",
            rating: 5.0,
            students: 265700,
        },
        {
            image: "/assets/Courses/C4.png",
            price: 57,
            title: "دورة بايثون الكاملة 2021 من الصفر للاحتراف",
            category: "تطوير",
            rating: 5.0,
            students: 265700,
        },
        {
            image: "/assets/Courses/C1.png",
            price: 57,
            title: "كيف تصل إلى مستوى الماس في SoloQ | لعبة ليج",
            category: "تسويق",
            rating: 5.0,
            students: 265700,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-center text-2xl font-bold mb-6">احدث الجلسات المقدمة من المعلمين</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        image={course.image}
                        price={course.price}
                        title={course.title}
                        category={course.category}
                        rating={course.rating}
                        students={course.students}
                    />
                ))}
            </div>
            <div className="text-center mt-6">
                <button className="btn btn-outline btn-primary">تصفح باقي الدورات</button>
            </div>
        </div>
    );
};

export default Courses;
