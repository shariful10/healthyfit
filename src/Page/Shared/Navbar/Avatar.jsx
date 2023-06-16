import AvatarImg from "../../../assets/images/placeholder.jpg";
import useAuth from "../../../hooks/useAuth";

const Avatar = () => {
  const { user } = useAuth();
  return (
    <img
      className="rounded-full"
      referrerPolicy="no-referrer"
      src={user && user?.photoURL ? user?.photoURL : AvatarImg}
      alt="Profile"
      height="30"
      width="30"
    />
  );
};

export default Avatar;
