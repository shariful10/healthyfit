// save user to database
export const saveUser = (user) => {
  const currentUser = {
    email: user?.email,
    name: user?.displayName,
  };
  fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const getRole = async (email) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/users/admin/${email}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
  const user = await res.json();
  return user?.role;
};
