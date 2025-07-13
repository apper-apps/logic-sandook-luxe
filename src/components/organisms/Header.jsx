import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import { useCart } from "@/hooks/useCart"
import { AuthContext } from '@/App'
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const { user, isAuthenticated } = useSelector((state) => state.user)

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`)
    }
  }

  const categories = [
    { name: "Precious Gemstone", slug: "precious-gemstone" },
    { name: "CZ Jewellery", slug: "cz-jewellery" },
    { name: "Fine Jewellery", slug: "fine-jewellery" }
  ]

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg" 
            : "bg-white/80 backdrop-blur-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-charcoal-900">
                <span className="text-gold-600">SANDOOK</span> LUXE
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <div className="relative group">
                <button className="font-medium text-charcoal-700 hover:text-gold-600 transition-colors flex items-center gap-1">
                  Shop
                  <ApperIcon name="ChevronDown" className="h-4 w-4" />
                </button>
                
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2">
                  <div className="p-2">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        to={`/shop/${category.slug}`}
                        className="block px-4 py-3 text-charcoal-700 hover:text-gold-600 hover:bg-gold-50 rounded-md transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link
                      to="/shop"
                      className="block px-4 py-3 text-charcoal-700 hover:text-gold-600 hover:bg-gold-50 rounded-md transition-colors border-t border-gray-100 mt-2"
                    >
                      View All Products
                    </Link>
                  </div>
                </div>
              </div>
              
              <Link to="/contact" className="font-medium text-charcoal-700 hover:text-gold-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <SearchBar onSearch={handleSearch} />
            </div>

{/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* User Info & Logout */}
              {isAuthenticated && (
                <div className="hidden lg:flex items-center space-x-3">
                  <span className="text-sm text-charcoal-700">
                    Welcome, {user?.firstName || user?.name || 'User'}
                  </span>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    size="sm"
                    className="text-charcoal-700 hover:text-gold-600"
                  >
                    <ApperIcon name="LogOut" className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              )}

              {/* Cart */}
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <ApperIcon name="ShoppingBag" className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <ApperIcon name="Menu" className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-xl font-bold text-charcoal-900">Menu</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ApperIcon name="X" className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-3">Shop</h3>
                    <div className="space-y-2 ml-4">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          to={`/shop/${category.slug}`}
                          className="block text-charcoal-700 hover:text-gold-600 transition-colors py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                      <Link
                        to="/shop"
                        className="block text-charcoal-700 hover:text-gold-600 transition-colors py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        All Products
                      </Link>
                    </div>
                  </div>
<Link
                    to="/contact"
                    className="block text-charcoal-700 hover:text-gold-600 transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>

                  {/* Mobile Logout */}
                  {isAuthenticated && (
                    <div className="pt-6 border-t border-gray-200">
                      <div className="mb-3">
                        <p className="text-sm text-charcoal-600">
                          Signed in as: {user?.firstName || user?.name || 'User'}
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          logout()
                          setIsMobileMenuOpen(false)
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <ApperIcon name="LogOut" className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header