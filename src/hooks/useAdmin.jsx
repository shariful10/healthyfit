import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");
  const [axiosSecure] = useAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],

    queryFn: async () => {
      if (!user || !token) {
        return false;
      }
      const res = await axiosSecure.get(`/users/admin/${user?.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("is admin response", res);
      return res.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};
export default useAdmin;
