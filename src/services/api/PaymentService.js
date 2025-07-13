import { toast } from "react-toastify"

export const PaymentService = {
  // Initialize Razorpay payment
  async initializeRazorpayPayment({ amount, currency = "INR", order_id, customerInfo, onSuccess, onFailure }) {
    try {
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded")
      }

      const options = {
        key: "rzp_test_9999999999", // Replace with your actual Razorpay key
        amount: Math.round(amount * 100), // Convert to paise
        currency: currency,
        name: "Sandook Luxe",
        description: "Luxury Jewelry Purchase",
        order_id: order_id,
        handler: function (response) {
          // Payment successful
          PaymentService.handlePaymentSuccess(response, onSuccess)
        },
        prefill: {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          contact: customerInfo.phone
        },
        theme: {
          color: "#D4AF37"
        },
        modal: {
          ondismiss: function() {
            onFailure(new Error("Payment cancelled by user"))
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response) {
        PaymentService.handlePaymentFailure(response.error, onFailure)
      })

      rzp.open()
    } catch (error) {
      onFailure(error)
    }
  },

  // Handle successful payment
  async handlePaymentSuccess(response, onSuccess) {
    try {
      // In a real implementation, verify payment on backend
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const paymentDetails = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        status: "completed"
      }

      onSuccess(paymentDetails)
    } catch (error) {
      toast.error("Payment verification failed")
      throw error
    }
  },

  // Handle failed payment
  handlePaymentFailure(error, onFailure) {
    const errorMessage = error.description || error.reason || "Payment failed"
    onFailure(new Error(errorMessage))
  },

  // Create order for Razorpay
  async createRazorpayOrder(amount, currency = "INR") {
    try {
      // Simulate order creation - in real implementation, call your backend
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return {
        id: `order_${Date.now()}`,
        amount: Math.round(amount * 100),
        currency: currency,
        status: "created"
      }
    } catch (error) {
      throw new Error("Failed to create order")
    }
  },

  // Process Stripe payment (existing functionality)
  async processStripePayment({ amount, paymentInfo, customerInfo }) {
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      return {
        id: `pi_${Date.now()}`,
        status: "succeeded",
        amount: amount,
        payment_method: "card"
      }
    } catch (error) {
      throw new Error("Stripe payment failed")
    }
  }
}