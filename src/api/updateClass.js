// // update a room
// export const updateClass = async (classUpdate, id) => {
//   const response = await fetch(
//     `${import.meta.env.VITE_API_URL}/classUpdate/${id}`,
//     {
//       method: "PUT",
//       headers: {
//         "content-type": "application/json",
//         authorization: `Bearer ${localStorage.getItem("access-token")}`,
//       },
//       body: JSON.stringify(classUpdate),
//     }
//   );
//   const data = await response.json();
//   return data;
// };
