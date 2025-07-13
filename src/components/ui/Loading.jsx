import { motion } from "framer-motion"

const Loading = ({ type = "default", className = "" }) => {
  if (type === "products") {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square shimmer" />
            <div className="p-4 space-y-3">
              <div className="h-4 shimmer rounded w-3/4" />
              <div className="h-3 shimmer rounded w-1/2" />
              <div className="flex justify-between items-center">
                <div className="h-5 shimmer rounded w-20" />
                <div className="h-8 shimmer rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === "page") {
    return (
      <div className={`space-y-8 ${className}`}>
        <div className="h-8 shimmer rounded w-1/3" />
        <div className="space-y-4">
          <div className="h-4 shimmer rounded" />
          <div className="h-4 shimmer rounded w-5/6" />
          <div className="h-4 shimmer rounded w-4/6" />
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gold-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Loading