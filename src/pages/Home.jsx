import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';
import MainFeature from '../components/MainFeature';

export default function Home() {
  const navigate = useNavigate();

  const worlds = [
    {
      id: 'math',
      title: 'Math Castle',
      description: 'Solve puzzles and conquer numbers in the magical Math Castle!',
      icon: 'Calculator',
      color: 'from-primary to-pink-500',
      path: '/math'
    },
    {
      id: 'reading',
      title: 'Reading Forest',
      description: 'Discover stories and words in the enchanted Reading Forest!',
      icon: 'BookOpen',
      color: 'from-secondary to-green-500',
      path: '/reading'
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-accent/20 via-white to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1 }}
            className="inline-block mb-4"
          >
            <ApperIcon name="Sparkles" size={48} className="text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-heading text-gray-800 mb-4">
            Welcome to Quest Academy!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your adventure and start learning! Complete lessons, earn rewards, 
            and become the ultimate learning champion.
          </p>
        </motion.div>

        {/* World Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {worlds.map((world, index) => (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(world.path)}
              className="relative overflow-hidden rounded-2xl shadow-3d cursor-pointer group"
            >
              <div className={`bg-gradient-to-br ${world.color} p-8 text-white relative`}>
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                  <ApperIcon name={world.icon} size={80} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <ApperIcon name={world.icon} size={24} />
                    </div>
                    <h2 className="text-2xl font-heading">{world.title}</h2>
                  </div>
                  <p className="text-white/90 mb-6">{world.description}</p>
                  <div className="flex items-center space-x-2 text-white/80">
                    <span className="font-medium">Start Adventure</span>
                    <ApperIcon name="ArrowRight" size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <MainFeature />
      </div>
    </div>
  );
}