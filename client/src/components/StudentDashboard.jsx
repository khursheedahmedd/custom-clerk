// src/components/StudentDashboard.jsx
import { motion } from 'framer-motion';

export default function StudentDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            Mathematics - Friday 10:00 AM
          </div>
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            Science - Monday 2:00 PM
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Results</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            Mathematics: 95/100
          </div>
        </div>
      </div>
    </motion.div>
  );
}