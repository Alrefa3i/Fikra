import React from "react";
import axios from "axios";
import { teachers } from "./Data";


// TeacherCard Component
const TeacherCard = ({ name, role, rating, students, image }) => {
    return (
        <div className="bg-white dark:bg-gray-800 dark:text-gray-300 shadow-lg rounded-lg p-6 text-center max-w-xs">
            <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold dark:text-white">{name}</h3>
            <p className="text-gray-500 dark:text-gray-400">{role}</p>
            <div className="mt-2 flex justify-center space-x-4 text-sm text-gray-700 dark:text-gray-300">
                <span>⭐ {rating}</span>
                <span>{students.toLocaleString()} students</span>
            </div>
        </div>
    );
};

// Teachers Component
const Teachers = () => {

    const [teachers, setTeachers] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://randomuser.me/api/?results=5')
            .then(response => {
                const data = response.data.results;
                const t = data.map(teacher => ({
                    name: `${teacher.name.title} ${teacher.name.first} ${teacher.name.last}`,
                    role: teacher.location.city,
                    rating: Math.floor(Math.random() * 5) + 1,
                    students: Math.floor(Math.random() * 10000),
                    image: teacher.picture.large,
                }));
                setTeachers(t);
            })
            .catch(error => console.error(error));

        console.log(teachers);
    }, []);


    return (
        <div className="py-12 text-center bg-base-200">
            <h2 className="text-2xl font-bold mb-8">أفضل المعلمين في الوطن العربي</h2>
            <div className="flex justify-center flex-wrap gap-6">
                {teachers.map((teacher, index) => (
                    <TeacherCard
                        key={index}
                        name={teacher.name}
                        role={teacher.role}
                        rating={teacher.rating}
                        students={teacher.students}
                        image={teacher.image}
                    />
                ))}
            </div>
        </div>
    );
};



export default Teachers;