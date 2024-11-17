import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import api from '../../api';

const BecomeTeacher = () => {
    const [step, setStep] = useState(1);
    const [availability, setAvailability] = useState([
        { day_of_week: 'Monday', start_time: '', end_time: '' },
    ]);
    const [profilePicture, setProfilePicture] = useState(null);
    const [videoIntroduction, setVideoIntroduction] = useState(null);

    // Step 1: Personal Info Formik
    const personalInfoFormik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            phone_number: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().required('Password is required'),
            phone_number: Yup.string().required('Phone number is required'),
        }),
        onSubmit: (values) => {
            console.log('Step 1 data:', values);
            setStep(2); // Move to the next step
        },
    });

    // Step 2: Teacher Info Formik
    const teacherInfoFormik = useFormik({
        initialValues: {
            specialty: '',
            experience_years: '',
        },
        validationSchema: Yup.object({
            specialty: Yup.string().required('Specialty is required'),
            experience_years: Yup.number()
                .required('Experience is required')
                .min(1, 'Experience must be at least 1 year'),
        }),
        onSubmit: (values) => {
            console.log('Step 2 data:', values);
            setStep(3); // Move to the next step
        },
    });

    // Step 3: Availability Handling
    const handleAvailabilityChange = (index, field, value) => {
        const newAvailability = [...availability];
        newAvailability[index][field] = value;
        setAvailability(newAvailability);
    };

    const addAvailabilitySlot = () => {
        setAvailability([...availability, { day_of_week: 'Monday', start_time: '', end_time: '' }]);
    };

    // Step 3: Profile Picture & Video Introduction
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (e.target.name === 'profile_picture') {
            setProfilePicture(file);
        } else {
            setVideoIntroduction(file);
        }
    };

    const handleFinalSubmit = async () => {
        const formData = new FormData();
        formData.append("user", JSON.stringify({
            username: personalInfoFormik.values.username,
            email: personalInfoFormik.values.email,
            password: personalInfoFormik.values.password,
        }))
        formData.append('phone_number', personalInfoFormik.values.phone_number);
        formData.append('specialty', teacherInfoFormik.values.specialty);
        formData.append('experience_years', teacherInfoFormik.values.experience_years);
        if (profilePicture) formData.append('profile_picture', profilePicture);
        if (videoIntroduction) formData.append('video_introduction', videoIntroduction);

        formData.append('availability', JSON.stringify(JSON.stringify(
            availability.map((slot) => ({
                day_of_week: slot.day_of_week,
                start_time: slot.start_time,
                end_time: slot.end_time,
            })),

        )));

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/teacher/register/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Teacher registered successfully:', response.data);
            setStep(1); // Reset to the first step after successful submission
        } catch (error) {
            console.error('Error registering teacher:', error.response?.data || error);
        }
    };

    return (
        <div className="steps">
            {/* Step 1: Personal Info */}
            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <form onSubmit={personalInfoFormik.handleSubmit}>
                        <div>
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                onChange={personalInfoFormik.handleChange}
                                value={personalInfoFormik.values.username}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={personalInfoFormik.handleChange}
                                value={personalInfoFormik.values.email}
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={personalInfoFormik.handleChange}
                                value={personalInfoFormik.values.password}
                            />
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone_number"
                                onChange={personalInfoFormik.handleChange}
                                value={personalInfoFormik.values.phone_number}
                            />
                        </div>
                        <button type="submit">Next</button>
                    </form>
                </motion.div>
            )}

            {/* Step 2: Teacher Info */}
            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <form onSubmit={teacherInfoFormik.handleSubmit}>
                        <div>
                            <label>Specialty</label>
                            <input
                                type="text"
                                name="specialty"
                                onChange={teacherInfoFormik.handleChange}
                                value={teacherInfoFormik.values.specialty}
                            />
                        </div>
                        <div>
                            <label>Experience (years)</label>
                            <input
                                type="number"
                                name="experience_years"
                                onChange={teacherInfoFormik.handleChange}
                                value={teacherInfoFormik.values.experience_years}
                            />
                        </div>
                        <button type="submit">Next</button>
                    </form>
                </motion.div>
            )}

            {/* Step 3: Availability & File Uploads */}
            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div>
                        <label>Availability</label>
                        {availability.map((slot, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name={`day_of_week_${index}`}
                                    value={slot.day_of_week}
                                    onChange={(e) => handleAvailabilityChange(index, 'day_of_week', e.target.value)}
                                />
                                <input
                                    type="time"
                                    name={`start_time_${index}`}
                                    value={slot.start_time}
                                    onChange={(e) => handleAvailabilityChange(index, 'start_time', e.target.value)}
                                />
                                <input
                                    type="time"
                                    name={`end_time_${index}`}
                                    value={slot.end_time}
                                    onChange={(e) => handleAvailabilityChange(index, 'end_time', e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addAvailabilitySlot}>Add Another Slot</button>
                    </div>
                    <div>
                        <label>Profile Picture</label>
                        <input type="file" name="profile_picture" onChange={handleFileChange} />
                    </div>
                    <div>
                        <label>Video Introduction</label>
                        <input type="file" name="video_introduction" onChange={handleFileChange} />
                    </div>
                    <button type="button" onClick={handleFinalSubmit}>Submit</button>
                </motion.div>
            )}
        </div>
    );
};

export default BecomeTeacher;
