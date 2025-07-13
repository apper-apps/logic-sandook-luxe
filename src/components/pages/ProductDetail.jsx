import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ProductCard from "@/components/molecules/ProductCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { useProducts } from "@/hooks/useProducts"
import { useCart } from "@/hooks/useCart"
import { toast } from "react-toastify"

const ProductDetail = () => {
  const { id } = useParams()
  const { products, loading, error, refetch } = useProducts()
  const { addToCart } = useCart()
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = products.find(p => p.Id === parseInt(id))
  const relatedProducts = products
    .filter(p => p.Id !== parseInt(id) && p.category === product?.category)
    .slice(0, 4)

  useEffect(() => {
    setSelectedImage(0)
    setQuantity(1)
  }, [id])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    if (!product.inStock) return
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    
    toast.success(`${product.name} added to cart!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square shimmer rounded-lg" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square shimmer rounded" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 shimmer rounded w-3/4" />
              <div className="h-6 shimmer rounded w-1/2" />
              <div className="space-y-2">
                <div className="h-4 shimmer rounded" />
                <div className="h-4 shimmer rounded w-5/6" />
                <div className="h-4 shimmer rounded w-4/6" />
              </div>
              <div className="h-12 shimmer rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <Error message={error} onRetry={refetch} />
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="Package" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gold-600">Home</Link>
          <ApperIcon name="ChevronRight" className="h-4 w-4" />
          <Link to="/shop" className="hover:text-gold-600">Shop</Link>
          <ApperIcon name="ChevronRight" className="h-4 w-4" />
          <Link 
            to={`/shop/${product.category.toLowerCase().replace(/\s+/g, "-")}`} 
            className="hover:text-gold-600"
          >
            {product.category}
          </Link>
          <ApperIcon name="ChevronRight" className="h-4 w-4" />
          <span className="text-charcoal-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-lg">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                        selectedImage === index 
                          ? "border-gold-500" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-3xl font-bold text-charcoal-900">
                  {product.name}
                </h1>
                {product.featured && (
                  <Badge className="bg-gold-500 text-white border-gold-500">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-4">
                {product.category}
              </p>
              <div className="text-3xl font-display font-bold text-gold-600">
                {formatPrice(product.price)}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-charcoal-900 mb-3">Specifications</h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="text-charcoal-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium text-charcoal-900">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <ApperIcon name="Minus" className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <ApperIcon name="Plus" className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  size="lg"
                  className="flex-1"
                >
                  <ApperIcon name="ShoppingCart" className="h-5 w-5 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button variant="outline" size="lg" className="px-6">
                  <ApperIcon name="Heart" className="h-5 w-5" />
                </Button>
              </div>

              {!product.inStock && (
                <p className="text-sm text-red-600">
                  This item is currently out of stock. Please check back later.
                </p>
              )}
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ApperIcon name="Truck" className="h-4 w-4" />
                <span>Free shipping on orders over ₹25,000</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Shield" className="h-4 w-4" />
                <span>1 year warranty included</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="RotateCcw" className="h-4 w-4" />
                <span>30-day return policy</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductDetail