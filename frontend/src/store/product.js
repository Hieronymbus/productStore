import { create } from "zustand";

export const useProductStore =  create((set) => ({
    products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((prev) => ({ products: [...prev.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	}, 
	fetchProducts: async () => {
		const response = await fetch("/api/products");
		const data = await response.json();
		set({ products: data.data })
	},
	deleteProduct: async (pid) => {
		const response = await fetch(`/api/products/${pid}`,{
			method: "DELETE",
		})
		const data = await response.json();
		if(!data.success) return ( { success: false, message: data.message } );

		//update the UI imediatly, without needing a refresh
		set(prev => ({ 
			products: prev.products.filter((product)=>{
				return product._id !== pid
			})
		}))

		return { success: true, message: data.message}
	},
	updateProduct: async (pid, updatedProduct) => {
		const response = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(updatedProduct)
		} ) 
		const data = await response.json();
		if (!data.success) return ({ success: false, message: data.message});

	//update the UI imediatly, without needing a refresh
		set (prev => ({
			products: prev.products.map(product => {
				return product._id === pid ? data.data : product
			})
		}))

		return { success: true, message: data.message };
	}
})) 