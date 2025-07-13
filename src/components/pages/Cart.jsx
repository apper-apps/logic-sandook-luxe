import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import CartItem from "@/components/molecules/CartItem"
import Empty from "@/components/ui/Empty"
import { useCart } from "@/hooks/useCart"

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 25000 ? 0 : 500
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Empty
          title="Your cart is empty"
          description="Add some beautiful jewelry pieces to your cart to get started."
          actionText="Shop Now"
          actionLink="/shop"
          icon="ShoppingBag"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-charcoal-900">
            Shopping Cart
          </h1>
          <Button
            onClick={clearCart}
            variant="ghost"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <CartItem key={`${item.productId}`} item={item} />
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 sticky top-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST 18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                {shipping === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="flex items-center gap-2 text-green-700 text-sm">
                      <ApperIcon name="CheckCircle" className="h-4 w-4" />
                      <span>You qualify for free shipping!</span>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-charcoal-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full">
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ApperIcon name="ArrowRight" className="h-5 w-5 ml-2" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link to="/shop">
                    <ApperIcon name="ArrowLeft" className="h-5 w-5 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ApperIcon name="Shield" className="h-5 w-5 text-green-600" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart