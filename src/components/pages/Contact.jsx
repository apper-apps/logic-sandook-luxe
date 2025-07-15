import { useState } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import { toast } from "react-toastify"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success("Thank you for your message! We'll get back to you soon.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      })
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "919876543210" // WhatsApp number
    const message = "Hi! I'm interested in your jewelry collection."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-50 to-gold-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our jewelry collection? Want to schedule a consultation? 
              We'd love to hear from you and help you find the perfect piece.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Name *"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                  <FormField
                    label="Email *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                  <FormField
                    label="Subject *"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-800 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-colors"
                    placeholder="Tell us about your requirements or questions..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <ApperIcon name="Loader2" className="h-5 w-5 mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Visit our showroom or reach out to us through any of the following channels. 
                  Our team is here to assist you with your jewelry needs.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 rounded-lg p-3">
                    <ApperIcon name="MapPin" className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      New Delhi<br />
                      Delhi 110005, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 rounded-lg p-3">
                    <ApperIcon name="Phone" className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">Phone</h3>
                    <a 
                      href="tel:+918076775423" 
                      className="text-gray-600 hover:text-gold-600 transition-colors"
                    >
                      +91 80767 75423
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 rounded-lg p-3">
                    <ApperIcon name="Mail" className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">Email</h3>
                    <a 
                      href="mailto:contact@sandookluxe.com" 
                      className="text-gray-600 hover:text-gold-600 transition-colors"
                    >
                      contact@sandookluxe.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 rounded-lg p-3">
                    <ApperIcon name="Clock" className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">Store Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                      <p>Sunday: 11:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-500 rounded-lg p-3">
                    <ApperIcon name="MessageCircle" className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900">WhatsApp Support</h3>
                    <p className="text-sm text-gray-600">Get instant assistance</p>
                  </div>
                </div>
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  <ApperIcon name="MessageCircle" className="h-5 w-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="p-3">
                    <ApperIcon name="Instagram" className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-3">
                    <ApperIcon name="Facebook" className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-3">
                    <ApperIcon name="Twitter" className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-charcoal-900 mb-4">
              Visit Our Showroom
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our exquisite collection in person at our Delhi showroom. 
              Our expert consultants are ready to help you find the perfect piece.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-200 rounded-lg h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <ApperIcon name="MapPin" className="h-12 w-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-600">Interactive map will be integrated here</p>
              <p className="text-sm text-gray-500 mt-2">
                Karol Bagh, New Delhi, Delhi 110005, India
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact