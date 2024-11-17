import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
const Profile = () => {
    const { isAuthorized } = useAuth();
    const scrollToSection = (targetId) => {
        document.querySelector(targetId)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <div class="">
                <div class="p-3 bg-base-200 shadow mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* Avatar Animation */}
                        <motion.div
                            className="relative"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-48 h-48 bg-base-300 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-base-content">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-24 w-24"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Text Animation */}
                        <motion.div
                            className="mt-28 md:mt-0 lg:mt-0"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <input
                                type="text"
                                disabled={true}
                                className="input input-bordered w-full max-w-xs text-2xl font-bold text-red-500 disabled:text-base-content"
                                value={"Abdulmajeed Alrefa3ee "}
                            />
                            <input
                                type="text"
                                className="input font-normal text-base disabled:text-base-content"
                                disabled={true}
                                value={"Software Engineer "}
                            />
                        </motion.div>
                    </div>


                    <div>
                        {/* Animated Paragraph */}
                        <motion.div
                            className="mt-12 flex flex-col justify-start"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="text-base-content text-start font-light lg:px-16">
                                As a young individual, I embarked on a journey into programming from an early age, a passion that persisted throughout my education. After completing my high school education, I eagerly pursued higher learning in the field of Computer Science at the university. Alongside my studies, I enthusiastically engaged with technology as a volunteer and instructor, contributing to a tech center. My extensive experience in coding, coupled with my dedication to sharing knowledge, enabled me to not only excel academically but also make meaningful contributions to the tech community. My journey reflects a deep commitment to learning, teaching, and the ever-evolving world of technology. I can help in:
                                <br />
                                <br />
                                ~ HTML, CSS, JavaScript, React JS {">"} as Frontend developer
                                <br />
                                ~ Python, Django, FastAPI, MongoDB, Web Scraping as Backend developer
                                <br />
                                ~ Automation Applications, Entry data, Data manager
                            </p>
                        </motion.div>

                        {/* Animated Tabs */}
                        <motion.div
                            role="tablist"
                            className="tabs mt-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {/* Tab Items */}
                            {["Schedule", "Reviews", "Chat"].map((tab, index) => (
                                <motion.a
                                    key={tab}
                                    role="tab"
                                    className={`tab ${tab === "Reviews" ? "tab-active" : ""}`}
                                    onClick={() => scrollToSection(`#${tab}`)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {tab}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                    <div>

                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-10 scroll-smooth h-screen"
                        id="Schedule"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-base-content dark:text-gray-200">Schedule</h2>
                        <div className="bg-base-200 dark:bg-gray-800 p-4 rounded-lg shadow">
                            <p className="text-base-content dark:text-gray-300">Monday - Friday: 9:00 AM - 5:00 PM</p>
                            <p className="text-base-content dark:text-gray-300">Saturday: 10:00 AM - 2:00 PM</p>
                            <p className="text-base-content dark:text-gray-300">Sunday: Closed</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-10 h-screen"
                        id="Reviews"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-base-content dark:text-gray-200">Reviews</h2>
                        <div className="bg-base-200 dark:bg-gray-800 p-4 rounded-lg shadow">
                            <p className="text-base-content dark:text-gray-300">"Great teacher, very knowledgeable!" - Student A</p>
                            <p className="text-base-content dark:text-gray-300">"Helped me understand complex topics easily." - Student B</p>
                            <p className="text-base-content dark:text-gray-300">"Highly recommend for anyone looking to learn programming." - Student C</p>
                        </div>
                    </motion.div>

                    <h2
                        className='text-2xl font-bold mb-4 text-base-content dark:text-gray-200'
                    >
                        Chat
                    </h2>
                    {isAuthorized ?

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`mt-10 container mx-auto min-h-96 overflow-scroll`}
                            id="Chat"
                        >
                            <div className="flex flex-col flex-auto h-full p-6 dark:bg-gray-900">
                                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 dark:bg-gray-800 h-full p-4 relative">
                                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                                        <div className="flex flex-col h-full">
                                            <div className="grid grid-cols-12 gap-y-2 h-full">
                                                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                    <div className="flex flex-row items-center">
                                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                                                        <div className="relative ml-3 text-sm bg-white dark:bg-gray-700 py-2 px-4 shadow rounded-xl">
                                                            <div className="dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, in.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                    <div className="flex items-center justify-start flex-row-reverse">
                                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                                                        <div className="relative mr-3 text-sm bg-indigo-100 dark:bg-gray-700 py-2 px-4 shadow rounded-xl">
                                                            <div className="dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing. ?</div>
                                                            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500 dark:text-gray-400">Seen</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center h-16 rounded-xl bg-white dark:bg-gray-800 w-full px-4 sticky bottom-0">
                                        <div className="flex-grow ml-4">
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 dark:bg-gray-700 dark:text-gray-300"
                                                />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                                <span>Send</span>
                                                <span className="ml-2">
                                                    <svg
                                                        className="w-4 h-4 transform rotate-45 -mt-px"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div> :
                        (<motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`mt-10 container mx-auto min-h-96 overflow-scroll skeleton`}
                            id="Chat">
                            <div role="alert" className="alert alert-warning w-1/3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>Warning: <Link className='font-bold underline ' to={"/login"}>Login</Link> To Using Chat</span>
                            </div>
                        </motion.div>)

                    }



                </div>
            </div>
        </div >
    )
}

export default Profile;