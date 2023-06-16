import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useEnrollmentClass = () => {
  const { user, loaindg } = useAuth();
  const { refetch, data: enrooledClass = [] } = useQuery({
    queryKey: ["payment", user?.email],
    enabled: !loaindg,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/enrolled-classes?email=${user?.email}`
      );
      // console.log("res from axios", res);
      return res.data;
    },
  });

  return [enrooledClass, refetch];
};

export default useEnrollmentClass;
