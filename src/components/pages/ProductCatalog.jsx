import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import ProductCard from "@/components/molecules/ProductCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { useProducts } from "@/hooks/useProducts"

const ProductCatalog = () => {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search")

  const { products, loading, error, refetch } = useProducts()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sortBy, setSortBy] = useState("name")
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { name: "All Products", slug: "" },
    { name: "Precious Gemstone", slug: "precious-gemstone" },
    { name: "CZ Jewellery", slug: "cz-jewellery" },
    { name: "Fine Jewellery", slug: "fine-jewellery" }
  ]

  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "price-low", label: "Price (Low to High)" },
    { value: "price-high", label: "Price (High to Low)" },
    { value: "featured", label: "Featured First" }
  ]

  useEffect(() => {
    let filtered = products

    // Filter by category
    if (category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().replace(/\s+/g, "-") === category
      )
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "featured":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(filtered)
  }, [products, category, searchQuery, sortBy, priceRange])

  const getCategoryName = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`
    const cat = categories.find(c => c.slug === category)
    return cat ? cat.name : "All Products"
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 shimmer rounded w-1/3 mb-8" />
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64">
              <div className="space-y-4">
                <div className="h-32 shimmer rounded" />
                <div className="h-24 shimmer rounded" />
              </div>
            </div>
            <div className="flex-1">
              <Loading type="products" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <Error message={error} onRetry={refetch} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-900 mb-4">
            {getCategoryName()}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full"
              >
                <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              {/* Categories */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-charcoal-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => window.location.href = cat.slug ? `/shop/${cat.slug}` : "/shop"}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        (category === cat.slug || (!category && !cat.slug))
                          ? "bg-gold-100 text-gold-800 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-charcoal-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-charcoal-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <Empty
                title="No products found"
                description={
                  searchQuery 
                    ? `We couldn't find any products matching "${searchQuery}".`
                    : "No products match your current filters."
                }
                actionText="View All Products"
                actionLink="/shop"
                icon="Search"
              />
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCatalog