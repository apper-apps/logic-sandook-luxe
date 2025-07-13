import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import { useCart } from "@/hooks/useCart"
import { toast } from "react-toastify"
import { PaymentService } from "@/services/api/PaymentService"

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  })

  const [paymentInfo, setPaymentInfo] = useState({
    method: "stripe",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 25000 ? 0 : 500
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "pincode"]
    const missingFields = requiredFields.filter(field => !shippingInfo[field])
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields")
      return
    }

    setStep(2)
  }

const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      let paymentResult

      if (paymentInfo.method === "razorpay") {
        // Handle Razorpay payment
        const order = await PaymentService.createRazorpayOrder(total)
        
        paymentResult = await new Promise((resolve, reject) => {
          PaymentService.initializeRazorpayPayment({
            amount: total,
            order_id: order.id,
            customerInfo: shippingInfo,
            onSuccess: (paymentDetails) => {
              resolve(paymentDetails)
            },
            onFailure: (error) => {
              reject(error)
            }
          })
        })
      } else {
        // Handle Stripe payment
        if (!paymentInfo.nameOnCard || !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
          toast.error("Please fill in all card details")
          return
        }

        paymentResult = await PaymentService.processStripePayment({
          amount: total,
          paymentInfo,
          customerInfo: shippingInfo
        })
      }

      // Create order after successful payment
      const order = {
        Id: Date.now(),
        items: cartItems,
        shipping: shippingInfo,
        payment: {
          ...paymentInfo,
          paymentDetails: paymentResult
        },
        subtotal,
        shipping: shipping,
        tax,
        total,
        status: "confirmed",
        createdAt: new Date().toISOString()
      }

      // Clear cart
      clearCart()
      
      toast.success("Order placed successfully!")
      navigate("/", { replace: true })
      
    } catch (error) {
      toast.error(error.message || "Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (cartItems.length === 0) {
    navigate("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl font-bold text-charcoal-900 mb-8">
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? "bg-gold-500 text-white" : "bg-gray-300 text-gray-600"
            }`}>
              {step > 1 ? <ApperIcon name="Check" className="h-4 w-4" /> : "1"}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-600">Shipping</span>
          </div>
          
          <div className={`h-px w-16 mx-4 ${step >= 2 ? "bg-gold-500" : "bg-gray-300"}`} />
          
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? "bg-gold-500 text-white" : "bg-gray-300 text-gray-600"
            }`}>
              {step > 2 ? <ApperIcon name="Check" className="h-4 w-4" /> : "2"}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-600">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-6">
                  Shipping Information
                </h2>

                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="First Name *"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                      required
                    />
                    <FormField
                      label="Last Name *"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Email *"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      required
                    />
                    <FormField
                      label="Phone *"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      required
                    />
                  </div>

                  <FormField
                    label="Address *"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      label="City *"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      required
                    />
                    <FormField
                      label="State *"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                      required
                    />
                    <FormField
                      label="PIN Code *"
                      value={shippingInfo.pincode}
                      onChange={(e) => setShippingInfo({...shippingInfo, pincode: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Continue to Payment
                    <ApperIcon name="ArrowRight" className="h-5 w-5 ml-2" />
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-charcoal-900">
                    Payment Information
                  </h2>
                  <Button
                    onClick={() => setStep(1)}
                    variant="ghost"
                    size="sm"
                  >
                    <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-charcoal-800 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentInfo.method === "stripe" ? "border-gold-500 bg-gold-50" : "border-gray-200"
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="stripe"
                        checked={paymentInfo.method === "stripe"}
                        onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value})}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <ApperIcon name="CreditCard" className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Stripe Payment Gateway</p>
                    </label>

                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentInfo.method === "razorpay" ? "border-gold-500 bg-gold-50" : "border-gray-200"
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={paymentInfo.method === "razorpay"}
                        onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value})}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <ApperIcon name="Smartphone" className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">UPI / Wallet</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Razorpay Gateway</p>
                    </label>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  {paymentInfo.method === "stripe" && (
                    <>
                      <FormField
                        label="Name on Card *"
                        value={paymentInfo.nameOnCard}
                        onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                        required
                      />

                      <FormField
                        label="Card Number *"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          label="Expiry Date *"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                          placeholder="MM/YY"
                          required
                        />
                        <FormField
                          label="CVV *"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                          placeholder="123"
                          required
                        />
                      </div>
                    </>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <ApperIcon name="Loader2" className="h-5 w-5 mr-2 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Lock" className="h-5 w-5 mr-2" />
                        Place Order - {formatPrice(total)}
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ApperIcon name="Shield" className="h-5 w-5 text-green-600" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </motion.div>
            )}
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

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-charcoal-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
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
                <div className="flex justify-between text-lg font-semibold text-charcoal-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout