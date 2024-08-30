import { useQuery, useQueryClient } from "@tanstack/react-query"
import Axios from "../../configs/Axios"

const DashboardPayments = () => {
  const queryClient = useQueryClient()

  const {} = useQuery({
    queryKey:["payments"],
    queryFn:async()=>{
      try {
        return await Axios.get(`payments`)
      } catch (error) {
        throw new Error ("Kết nối thất bại")
      }
    }
  })



  return (
    <div>
      
    </div>
  )
}

export default DashboardPayments
