import mockProducts from "@/services/mockData/products.json"

export const ProductService = {
  async getAll() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...mockProducts]
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const product = mockProducts.find(p => p.Id === parseInt(id))
    if (!product) {
      throw new Error("Product not found")
    }
    return { ...product }
  },

  async getByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 250))
    return mockProducts.filter(p => 
      p.category.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase()
    ).map(p => ({ ...p }))
  },

  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const searchTerm = query.toLowerCase()
    return mockProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    ).map(p => ({ ...p }))
  },

  async create(productData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newId = Math.max(...mockProducts.map(p => p.Id)) + 1
    const newProduct = {
      ...productData,
      Id: newId,
      createdAt: new Date().toISOString()
    }
    mockProducts.push(newProduct)
    return { ...newProduct }
  },

  async update(id, productData) {
    await new Promise(resolve => setTimeout(resolve, 350))
    const index = mockProducts.findIndex(p => p.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Product not found")
    }
    mockProducts[index] = { ...mockProducts[index], ...productData }
    return { ...mockProducts[index] }
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    const index = mockProducts.findIndex(p => p.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Product not found")
    }
    mockProducts.splice(index, 1)
    return true
  }
}