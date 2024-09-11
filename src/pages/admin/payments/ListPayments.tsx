import { useQuery } from "@tanstack/react-query";
import instance from "../../../configs/axios";

const ListPayments = () => {
  // Sử dụng useQuery
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await instance.get("/admin/payments");
      return response.data;
    },
    refetchInterval: 60000,
  });

  console.log(data?.data);
  

  if (isLoading) return <p>Đang tải...</p>;
  if (isError) return <p>Lỗi: {error?.message}</p>;

  return (
   <h1>cc</h1>
  );
};

export default ListPayments;
