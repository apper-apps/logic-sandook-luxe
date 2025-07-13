import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { useCart } from "@/hooks/useCart"

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(item.productId)
    } else {
      updateQuantity(item.productId, newQuantity)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200"
    >
      <img
        src={item.product.images[0]}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-charcoal-900 truncate">
          {item.product.name}
        </h4>
        <p className="text-sm text-gray-600">
          {formatPrice(item.product.price)} each
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <ApperIcon name="Minus" className="h-4 w-4" />
        </Button>
        
        <span className="font-medium text-charcoal-900 w-8 text-center">
          {item.quantity}
        </span>
        
        <Button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="text-right">
        <div className="font-semibold text-charcoal-900">
          {formatPrice(item.product.price * item.quantity)}
        </div>
        <Button
          onClick={() => removeFromCart(item.productId)}
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
        >
          <ApperIcon name="Trash2" className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

export default CartItem