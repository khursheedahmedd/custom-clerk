// src/pages/Signup.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SignupForm from '../components/Auth/SignupForm';

export default function Signup() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center"
    >
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Create New Account
          </h2>
        </motion.div>
        
        <SignupForm />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-4"
        >
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}