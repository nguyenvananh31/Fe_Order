import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const useFetchProductDetails = (id: string | number) => {
  const queryClient = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      try {
        const response = await Axios.get(`/products/${id}`);
        return response.data;
      } catch {
        throw new Error("Error fetching products details");
      }
    },
    enabled: !!id, // Chỉ gọi API khi id tồn tại
  });

  return {
    dataPaymentDetails: queryClient.data,

  };
};