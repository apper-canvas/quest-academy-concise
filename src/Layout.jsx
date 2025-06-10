import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './components/ApperIcon';
import { routeArray } from './config/routes';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 h-16 bg-white border-b-2 border-primary/20 z-40 relative">
        <div className="flex items-center justify-between px-4 h-full max-w-full">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Sparkles" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-heading text-primary">Quest Academy</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {routeArray.map((route) => (
              <NavLink
                key={route.id}
                to={route.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:bg-primary/10 hover:text-primary hover:scale-105'
                  }`
                }
              >
                <ApperIcon name={route.icon} size={20} />
                <span className="font-medium">{route.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon 
              name={mobileMenuOpen ? "X" : "Menu"} 
              size={24} 
              className="text-gray-600"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Menu Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-16 right-0 bottom-0 w-64 bg-white shadow-xl z-50 md:hidden"
              >
                <nav className="p-4 space-y-2">
                  {routeArray.map((route) => (
                    <NavLink
                      key={route.id}
                      to={route.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-white shadow-lg'
                            : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
                        }`
                      }
                    >
                      <ApperIcon name={route.icon} size={20} />
                      <span className="font-medium">{route.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-full"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}