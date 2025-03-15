// src/components/TeacherDashboard.jsx
import { motion } from 'framer-motion';
import { Button } from '@material-tailwind/react';

export default function TeacherDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add New Student
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Students</h2>
        <div className="space-y-4">
          {/* Student list would go here */}
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            Student 1 - example@student.com
          </div>
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            Student 2 - example2@student.com
          </div>
        </div>
      </div>
    </motion.div>
  );
}