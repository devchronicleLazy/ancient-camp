'use client';

import { motion } from 'framer-motion';
import { getAllCourses } from '@/lib/courses';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useCompletedCourses } from '@/hooks/use-completed-course';
import CourseCard from './course-card';


export default function CourseList() {
    const [searchQuery, setSearchQuery] = useState('');
    const { address } = useAccount();
    const { completedCourses, loading } = useCompletedCourses(address);

    const courses = getAllCourses();
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Featured Courses
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Start your blockchain journey with our expert-crafted courses
                    </motion.p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-12">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {filteredCourses.map((course, index) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isCompleted={completedCourses?.includes(Number(course.id))}
                            loading={loading}
                            delay={index * 0.1}
                        />
                    ))}
                </motion.div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No courses found matching your search.</p>
                    </div>
                )}
            </div>
        </section>
    );
}