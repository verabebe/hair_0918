import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    isLoading: false,
    errorMessages: "",
    // 用於紀錄Pinia是否已經讀取過資料
    loaded: false,
  }),
  getters: {
    getProductById: (state) => {
      return (id) => {
        return state.products.find(
            product => 
                product.id === Number(id)
        )
      }
    },
    getProductByCategory: (state) => {
      return (category) => {
        return state.products.filter(
          product => 
            product.category === category
        )
      }
    }
  },
  actions: {
    async fetchProducts() {

      if (this.loaded) {
        return
      }

      this.isLoading = true
      this.errorMessage = ""

      try {

        const response = await fetch("/data/products.json")

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()

        this.products = data
        this.loaded = true

      } catch (error) {

        console.error(error)

        this.errorMessages = error.message

      } finally {

        this.isLoading = false
      }
    }
    
  }
}

)
