import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useClassSelcet = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useAuth();

  const { refetch, data: selectedClasses = [] } = useQuery({
    queryKey: ["course", user?.email],
    enabled: !loading,

    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/student/classes?email=${user?.email}`
      );
      // console.log("res from axios", res);
      return res.data;
    },
  });

  return [selectedClasses, refetch];
};
export default useClassSelcet;
