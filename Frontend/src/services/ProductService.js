import { api } from "./api";

/**
 * Fetch all active products.
 * Returns the API response payload ({ success: true, data: [...] }).
 */
export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};
