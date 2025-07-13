import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import { useCart } from "@/hooks/useCart"
import { toast } from "react-toastify"

const ProductCard = ({ product, className = "" }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
    >
      <Link to={`/product/${product.Id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-gold-500 text-white border-gold-500">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge variant="destructive" className="text-white bg-red-600 border-red-600">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-2 group-hover:text-gold-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-bold text-gold-600">
              {formatPrice(product.price)}
            </span>
            
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ApperIcon name="ShoppingCart" className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard