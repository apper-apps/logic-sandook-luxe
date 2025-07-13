import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry,
  className = "" 
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-red-50 rounded-full p-4 mb-6">
        <ApperIcon name="AlertCircle" className="h-12 w-12 text-red-500" />
      </div>
      
      <h3 className="font-display text-xl font-semibold text-charcoal-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} className="inline-flex items-center gap-2">
          <ApperIcon name="RefreshCw" className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </motion.div>
  )
}

export default Error