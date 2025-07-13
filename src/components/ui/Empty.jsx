import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "No items found",
  description = "We couldn't find what you're looking for.",
  actionText = "Browse Products",
  actionLink = "/shop",
  icon = "Package",
  className = "" 
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-br from-gold-50 to-gold-100 rounded-full p-6 mb-6">
        <ApperIcon name={icon} className="h-16 w-16 text-gold-600" />
      </div>
      
      <h3 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {description}
      </p>
      
      <Button asChild>
        <Link to={actionLink} className="inline-flex items-center gap-2">
          <ApperIcon name="ArrowRight" className="h-4 w-4" />
          {actionText}
        </Link>
      </Button>
    </motion.div>
  )
}

export default Empty