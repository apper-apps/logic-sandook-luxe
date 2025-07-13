import { toast } from 'react-toastify'

export const ProductService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "category" } },
          { field: { Name: "price" } },
          { field: { Name: "images" } },
          { field: { Name: "description" } },
          { field: { Name: "specifications" } },
          { field: { Name: "in_stock" } },
          { field: { Name: "featured" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      }
      
      const response = await apperClient.fetchRecords("product", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      if (!response.data || response.data.length === 0) {
        return []
      }
      
      // Transform data to match frontend expectations
      return response.data.map(item => ({
        Id: item.Id,
        name: item.Name || '',
        Tags: item.Tags || '',
        Owner: item.Owner || '',
        category: item.category || '',
        price: item.price || 0,
        images: item.images ? item.images.split(',').map(img => img.trim()) : [],
        description: item.description || '',
        specifications: item.specifications ? JSON.parse(item.specifications) : {},
        inStock: item.in_stock || false,
        featured: item.featured || false
      }))
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to load products")
      return []
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "category" } },
          { field: { Name: "price" } },
          { field: { Name: "images" } },
          { field: { Name: "description" } },
          { field: { Name: "specifications" } },
          { field: { Name: "in_stock" } },
          { field: { Name: "featured" } }
        ]
      }
      
      const response = await apperClient.getRecordById("product", parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        throw new Error("Product not found")
      }
      
      if (!response.data) {
        throw new Error("Product not found")
      }
      
      // Transform data to match frontend expectations
      const item = response.data
      return {
        Id: item.Id,
        name: item.Name || '',
        Tags: item.Tags || '',
        Owner: item.Owner || '',
        category: item.category || '',
        price: item.price || 0,
        images: item.images ? item.images.split(',').map(img => img.trim()) : [],
        description: item.description || '',
        specifications: item.specifications ? JSON.parse(item.specifications) : {},
        inStock: item.in_stock || false,
        featured: item.featured || false
      }
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error)
      throw error
    }
  },

  async getByCategory(category) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "category" } },
          { field: { Name: "price" } },
          { field: { Name: "images" } },
          { field: { Name: "description" } },
          { field: { Name: "specifications" } },
          { field: { Name: "in_stock" } },
          { field: { Name: "featured" } }
        ],
        where: [
          {
            FieldName: "category",
            Operator: "Contains",
            Values: [category.toLowerCase().replace(/-/g, " ")]
          }
        ]
      }
      
      const response = await apperClient.fetchRecords("product", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      if (!response.data || response.data.length === 0) {
        return []
      }
      
      // Transform and filter data
      return response.data
        .map(item => ({
          Id: item.Id,
          name: item.Name || '',
          Tags: item.Tags || '',
          Owner: item.Owner || '',
          category: item.category || '',
          price: item.price || 0,
          images: item.images ? item.images.split(',').map(img => img.trim()) : [],
          description: item.description || '',
          specifications: item.specifications ? JSON.parse(item.specifications) : {},
          inStock: item.in_stock || false,
          featured: item.featured || false
        }))
        .filter(p => p.category.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase())
    } catch (error) {
      console.error("Error fetching products by category:", error)
      toast.error("Failed to load products")
      return []
    }
  },

  async search(query) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "category" } },
          { field: { Name: "price" } },
          { field: { Name: "images" } },
          { field: { Name: "description" } },
          { field: { Name: "specifications" } },
          { field: { Name: "in_stock" } },
          { field: { Name: "featured" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "Name",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "description",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "category",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              }
            ]
          }
        ]
      }
      
      const response = await apperClient.fetchRecords("product", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      if (!response.data || response.data.length === 0) {
        return []
      }
      
      // Transform data to match frontend expectations
      return response.data.map(item => ({
        Id: item.Id,
        name: item.Name || '',
        Tags: item.Tags || '',
        Owner: item.Owner || '',
        category: item.category || '',
        price: item.price || 0,
        images: item.images ? item.images.split(',').map(img => img.trim()) : [],
        description: item.description || '',
        specifications: item.specifications ? JSON.parse(item.specifications) : {},
        inStock: item.in_stock || false,
        featured: item.featured || false
      }))
    } catch (error) {
      console.error("Error searching products:", error)
      toast.error("Failed to search products")
      return []
    }
  },

  async create(productData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const params = {
        records: [
          {
            Name: productData.name || '',
            Tags: productData.Tags || '',
            Owner: productData.Owner || '',
            category: productData.category || '',
            price: productData.price || 0,
            images: Array.isArray(productData.images) ? productData.images.join(', ') : productData.images || '',
            description: productData.description || '',
            specifications: typeof productData.specifications === 'object' ? JSON.stringify(productData.specifications) : productData.specifications || '{}',
            in_stock: productData.inStock || false,
            featured: productData.featured || false
          }
        ]
      }
      
      const response = await apperClient.createRecord("product", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulRecords.length > 0) {
          const createdRecord = successfulRecords[0].data
          toast.success("Product created successfully!")
          return {
            Id: createdRecord.Id,
            name: createdRecord.Name || '',
            Tags: createdRecord.Tags || '',
            Owner: createdRecord.Owner || '',
            category: createdRecord.category || '',
            price: createdRecord.price || 0,
            images: createdRecord.images ? createdRecord.images.split(',').map(img => img.trim()) : [],
            description: createdRecord.description || '',
            specifications: createdRecord.specifications ? JSON.parse(createdRecord.specifications) : {},
            inStock: createdRecord.in_stock || false,
            featured: createdRecord.featured || false
          }
        }
      }
      
      throw new Error("Failed to create product")
    } catch (error) {
      console.error("Error creating product:", error)
      throw error
    }
  },

  async update(id, productData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields plus Id
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: productData.name || '',
            Tags: productData.Tags || '',
            Owner: productData.Owner || '',
            category: productData.category || '',
            price: productData.price || 0,
            images: Array.isArray(productData.images) ? productData.images.join(', ') : productData.images || '',
            description: productData.description || '',
            specifications: typeof productData.specifications === 'object' ? JSON.stringify(productData.specifications) : productData.specifications || '{}',
            in_stock: productData.inStock || false,
            featured: productData.featured || false
          }
        ]
      }
      
      const response = await apperClient.updateRecord("product", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulUpdates.length > 0) {
          const updatedRecord = successfulUpdates[0].data
          toast.success("Product updated successfully!")
          return {
            Id: updatedRecord.Id,
            name: updatedRecord.Name || '',
            Tags: updatedRecord.Tags || '',
            Owner: updatedRecord.Owner || '',
            category: updatedRecord.category || '',
            price: updatedRecord.price || 0,
            images: updatedRecord.images ? updatedRecord.images.split(',').map(img => img.trim()) : [],
            description: updatedRecord.description || '',
            specifications: updatedRecord.specifications ? JSON.parse(updatedRecord.specifications) : {},
            inStock: updatedRecord.in_stock || false,
            featured: updatedRecord.featured || false
          }
        }
      }
      
      throw new Error("Failed to update product")
    } catch (error) {
      console.error("Error updating product:", error)
      throw error
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord("product", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulDeletions.length > 0) {
          toast.success("Product deleted successfully!")
          return true
        }
      }
      
      throw new Error("Failed to delete product")
    } catch (error) {
      console.error("Error deleting product:", error)
      throw error
    }
  }
}