'use client';

import type { Course } from '@/lib/courses';
import { motion } from 'framer-motion';
import { Award, BookOpen, ChevronRight, Clock, Lock } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
  isCompleted: boolean;
  loading?: boolean;
  delay?: number;
}

export default function CourseCard({
  course,
  isCompleted,
  delay = 0,
}: CourseCardProps) {
  const CardContent = () => (
    <div
      className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
        isCompleted
          ? 'border-green-200 shadow-green-100/50 opacity-75'
          : 'border-gray-100 hover:border-blue-500/50 hover:shadow-lg'
      }`}
    >
      <div className="p-6">
        {/* Completion Badge */}
        {isCompleted && (
          <div className="absolute top-4 right-4 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Lock className="w-4 h-4 mr-1" />
            Completed
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl ${
              isCompleted ? 'bg-green-50' : 'bg-blue-50'
            }`}
          >
            <BookOpen
              className={`h-6 w-6 ${
                isCompleted ? 'text-green-500' : 'text-blue-500'
              }`}
            />
          </div>
          <span className="text-sm text-gray-500 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </span>
        </div>

        {/* Content */}
        <h3
          className={`text-xl font-semibold mb-2 transition-colors ${
            isCompleted
              ? 'text-green-700'
              : 'text-gray-900 group-hover:text-blue-600'
          }`}
        >
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <BookOpen className="w-4 h-4 mr-1" />
              <span className="text-sm">{course.lessons} lessons</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Award className="w-4 h-4 mr-1" />
              <span className="text-sm">Certificate</span>
            </div>
          </div>
          {!isCompleted && (
            <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform text-blue-500" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={!isCompleted ? { scale: 1.02 } : {}}
      className={`group relative ${isCompleted ? 'cursor-not-allowed' : ''}`}
    >
      {isCompleted ? (
        <div>
          <CardContent />
        </div>
      ) : (
        <Link href={`/learn/${course.id}/${course.modules[0].lessons[0].id}`}>
          <CardContent />
        </Link>
      )}
    </motion.div>
  );
}
