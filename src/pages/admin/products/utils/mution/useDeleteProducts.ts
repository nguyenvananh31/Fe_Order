import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import Axios from "axios";

export const useDeleteProducts = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async (id: number) => {
        try {
          return await Axios.delete(`/products/${id}`);
        } catch {
          throw new Error("Error deleting payment");
        }
      },
      onSuccess: () => {
        messageApi.open({
          content: "Xóa thành công",
          type: "success",
        });
  
        // Làm mới lại danh sách payments sau khi xóa thành công
        queryClient.invalidateQueries({
          queryKey: ["payments"],
        });
      },
      onError: () => {
        messageApi.open({
          content: "Xóa thất bại",
          type: "error",
        });
      },
    });
  
    return {
      contextHolder,
      isPending:mutation.isPending,
      deleteProducts: mutation.mutate, // Phương thức mutate để gọi khi cần xóa
      mutateAsync: mutation.mutateAsync, // Dùng với async/await nếu cần
    };
  };