import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import Axios from "axios";
import { Iproducts } from "../../../../../interFaces/products";

export const useUpdateProducts = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    const mutation = useMutation({
      mutationFn: async ({ id, productsData }: { id: number; productsData:Iproducts }) => {
        try {
          return await Axios.put(`/products/${id}`, productsData, )
        } catch {
          throw new Error(`Error updating products`);
        }
      },

      onSuccess: () => {
        messageApi.open({
          content: "Cập nhật thành công",
          type: "success",
        });
  
        // Làm mới danh sách payments
        queryClient.invalidateQueries({
          queryKey: ["payments"],
        });
      },
      
      onError: () => {
        messageApi.error({
          content: "Cập nhật thất bại",
          type: "error",
        });
      },
    });
  
    return {
      contextHolder,
      updateProducts: mutation.mutate, // Phương thức mutate để gọi khi cần update
      mutateAsync: mutation.mutateAsync, // Phương thức async/await nếu cần
    };
  };
