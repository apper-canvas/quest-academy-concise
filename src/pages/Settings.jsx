import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';

export default function Settings() {
  const settingsOptions = [
    {
      id: 'sound',
      title: 'Sound Effects',
      description: 'Play sounds during lessons and activities',
      icon: 'Volume2',
      enabled: true
    },
    {
      id: 'music',
      title: 'Background Music',
      description: 'Play background music while learning',
      icon: 'Music',
      enabled: false
    },
    {
      id: 'notifications',
      title: 'Learning Reminders',
      description: 'Receive daily reminders to practice',
      icon: 'Bell',
      enabled: true
    },
    {
      id: 'difficulty',
      title: 'Auto-Adjust Difficulty',
      description: 'Automatically adjust lesson difficulty based on performance',
      icon: 'Target',
      enabled: true
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-accent/20 via-white to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center"
            >
              <ApperIcon name="Settings" size={32} className="text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-heading text-gray-800">Settings</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customize your learning experience to make it perfect for you!
          </p>
        </motion.div>

        {/* Settings Categories */}
        <div className="space-y-8">
          {/* Audio & Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary to-secondary p-4">
              <h2 className="text-xl font-heading text-white">Audio & Notifications</h2>
            </div>
            <div className="p-6 space-y-6">
              {settingsOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ApperIcon name={option.icon} size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{option.title}</h3>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                      option.enabled ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: option.enabled ? 24 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-secondary to-accent p-4">
              <h2 className="text-xl font-heading text-white">Profile</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <ApperIcon name="User" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Learning Explorer</h3>
                  <p className="text-gray-600">Age: 7 years old</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <ApperIcon name="Palette" size={20} className="text-primary" />
                  <span className="font-medium text-gray-700">Change Avatar</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-secondary/50 hover:bg-secondary/5 transition-all"
                >
                  <ApperIcon name="RotateCcw" size={20} className="text-secondary" />
                  <span className="font-medium text-gray-700">Reset Progress</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Help & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-accent to-warning p-4">
              <h2 className="text-xl font-heading text-white">Help & Support</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-2 p-4 border-2 border-gray-200 rounded-lg hover:border-info/50 hover:bg-info/5 transition-all"
                >
                  <ApperIcon name="HelpCircle" size={24} className="text-info" />
                  <span className="font-medium text-gray-700">How to Play</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-2 p-4 border-2 border-gray-200 rounded-lg hover:border-success/50 hover:bg-success/5 transition-all"
                >
                  <ApperIcon name="MessageCircle" size={24} className="text-success" />
                  <span className="font-medium text-gray-700">Contact Us</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-2 p-4 border-2 border-gray-200 rounded-lg hover:border-warning/50 hover:bg-warning/5 transition-all"
                >
                  <ApperIcon name="Star" size={24} className="text-warning" />
                  <span className="font-medium text-gray-700">Rate App</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}