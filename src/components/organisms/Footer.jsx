import { Link } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold mb-4">
              <span className="text-gold-500">SANDOOK</span> LUXE
            </h2>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover exquisite luxury jewelry crafted with precision and passion. 
              From precious gemstones to fine jewelry, we bring you timeless elegance 
              from the heart of Delhi & Panchkula, India.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-gold-500 hover:bg-gold-500/10">
                <ApperIcon name="Instagram" className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-gold-500 hover:bg-gold-500/10">
                <ApperIcon name="Facebook" className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-gold-500 hover:bg-gold-500/10">
                <ApperIcon name="Twitter" className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-gold-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop/precious-gemstone" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Precious Gemstone
                </Link>
              </li>
              <li>
                <Link to="/shop/cz-jewellery" className="text-gray-300 hover:text-gold-500 transition-colors">
                  CZ Jewellery
                </Link>
              </li>
              <li>
                <Link to="/shop/fine-jewellery" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Fine Jewellery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ApperIcon name="MapPin" className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Delhi, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Mail" className="h-5 w-5 text-gold-500" />
                <a 
                  href="mailto:contact@sandookluxe.com" 
                  className="text-gray-300 hover:text-gold-500 transition-colors text-sm"
                >
                  contact@sandookluxe.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Phone" className="h-5 w-5 text-gold-500" />
                <a 
                  href="tel:+918076775423" 
                  className="text-gray-300 hover:text-gold-500 transition-colors text-sm"
                >
                  +91 80767 75423
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © {currentYear} Sandook Luxe. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer