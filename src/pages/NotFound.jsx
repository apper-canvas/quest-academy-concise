import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-white to-primary/10 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mb-8"
        >
          <ApperIcon name="MapPin" size={120} className="text-gray-300 mx-auto" />
        </motion.div>
        
        <h1 className="text-6xl font-heading text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          It looks like you've wandered off the learning path! Don't worry, let's get you back to your adventure.
        </p>
        
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Go Home
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}