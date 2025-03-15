// components/Auth/SignupForm.jsx
import { motion } from 'framer-motion';
import { useSignUp } from '@clerk/clerk-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const { isLoaded, signUp } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
  
    try {
      await signUp.create({
        email_address: email,
        password,
        public_metadata: { role },
        // Add required fields if needed
        username: `${email.split('@')[0]}_${Date.now().toString().slice(-4)}`
      });
      
  
      // Force complete the sign-up
      await signUp.update({
        unsafeMetadata: {
          role: role
        }
      });
  
      await signUp.prepareEmailAddressVerification();
      navigate('/verify-email');
    } catch (err) {
      console.error('Signup error:', err);
      // Handle specific Clerk errors
      if (err.errors?.[0]?.code === 'form_identifier_exists') {
        alert('Email already registered');
      }
    }
  };
  

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Create Account
      </motion.button>
    </motion.form>
  );
}