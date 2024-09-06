import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const useFetchProducts = () => {
  const queryClient = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        return await Axios.get("/products");
 
      } catch {
        throw new Error("Error fetching products");
      }
    },
  });

  return {
    dataProducts:queryClient.data,
    isLoading: queryClient.isLoading,
    isError: queryClient.isError,
    error: queryClient.error,
  };
};
