// import { TbFidgetSpinner } from "react-icons/tb";
// import { Player } from "@lottiefiles/react-lottie-player";
// import AnimationLottie from "../../assets/addClass.json";
// const UpdateClassForms = ({
//   handleSubmit,
//   handleImageChange,
//   loading = false,
//   uploadButtonText,
//   user,
// }) => {
//   return (
//     <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl px-5 bg-gray-50">
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <div className="space-y-6">
//             <div className="space-y-1 text-sm">
//               <label htmlFor="location" className="block text-gray-600">
//                 Class name
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
//                 name="className"
//                 id="className"
//                 type="text"
//                 placeholder="Class Name"
//                 required
//               />
//             </div>
//             <div className="mx-auto w-[80%]">
//               <Player autoplay loop src={AnimationLottie}></Player>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="space-y-1 text-sm">
//               <label htmlFor="title" className="block text-gray-600">
//                 Instructor name
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
//                 name="instructorName"
//                 id="instructorName"
//                 type="text"
//                 placeholder="Instructor Name"
//                 required
//                 defaultValue={user?.displayName}
//               />
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="price" className="block text-gray-600">
//                 Instructor email
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
//                 name="instructorEmail "
//                 id="instructorEmail"
//                 type="text"
//                 placeholder="Instructor Email "
//                 required
//                 defaultValue={user?.email}
//               />
//             </div>

//             <div className=" p-4 bg-white w-full  m-auto rounded-lg">
//               <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
//                 <div className="flex flex-col w-max mx-auto text-center">
//                   <label>
//                     <input
//                       onChange={(event) =>
//                         handleImageChange(event.target.files[0])
//                       }
//                       className="text-sm cursor-pointer w-36 hidden"
//                       type="file"
//                       name="classImage"
//                       id="image"
//                       accept="image/*"
//                       hidden
//                     />
//                     <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
//                       {uploadButtonText}
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="flex  justify-between gap-2">
//               <div className="space-y-1 w-full text-sm">
//                 <label htmlFor="bedrooms" className="block text-gray-600">
//                   Available seats
//                 </label>
//                 <input
//                   className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
//                   name="availableSeats"
//                   id="availableSeats"
//                   type="number"
//                   placeholder="Available Seats"
//                   required
//                 />
//               </div>

//               <div className="space-y-1 w-full text-sm">
//                 <label htmlFor="bathrooms" className="block text-gray-600">
//                   Price
//                 </label>
//                 <input
//                   className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
//                   name="price"
//                   id="price"
//                   type="number"
//                   placeholder="Price"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="text-center">
//           <button
//             type="submit"
//             className="w-1/2 p-3 mt-5 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md py-3 text-white"
//           >
//             {loading ? (
//               <TbFidgetSpinner className="m-auto animate-spin" size={24} />
//             ) : (
//               "Add A Class"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateClassForms;
