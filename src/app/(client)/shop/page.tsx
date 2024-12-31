// "use client"

// import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";
// import Views from "@/views/MyOrderView";
// import { useState } from "react";

// const Shop = () => {
//      const [query, setQuery] = useState({
//         page: 1,
//         limit: 10,
//         isBlackListed: "",
//         searchTerm: "",
//         role: "VENDOR",
//       });
    
//       const { page, limit, searchTerm, role, isBlackListed } = query;
    
//       const { data, isFetching } = useGetAllTypeUsersQuery({
//         page,
//         limit,
//         searchTerm,
//         role,
//         isBlackListed,
//       });
    
    
//       const vendorData = data?.data?.filter((user) => user.role === "VENDOR");
//     console.log(vendorData);
    
//   return (
//     <div>
//   <div
//   className="w-full md:h-[300px] h-[200px] rounded-[18px] mt-5 relative"
//   style={{
//     backgroundImage: "url('https://img.freepik.com/premium-photo/portrait-young-woman-with-arms-raised-standing-against-yellow-background_1048944-8617235.jpg?w=1060')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   }}
// >
//   <div
//     className="absolute top-1/2 left-[20%] md:left-[40%] transform -translate-y-1/2 text-white font-bold text-5xl"
//   >
//     All Shop
//   </div>
// </div>

// <div className="flex max-w-[350px] flex-col items-center justify-center space-y-4 rounded-xl bg-white p-8 shadow-lg dark:bg-[#18181B] mt-5">
//             <div className="group relative">
//                 <img width={110} height={110} className="h-[110px] w-[110px] rounded-full bg-slate-500 object-cover" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop" alt="card navigate ui" />
//                 <span className="absolute bottom-3 right-0 h-5 w-5 rounded-full border-[3px] border-white bg-[#80b500] dark:border-[#18181B]"></span>
//                 <span className="absolute bottom-3 right-0 h-5 w-5 animate-ping rounded-full bg-[#80b500]"></span>
//             </div>
//             <div className="space-y-1 text-center">
//                 <h1 className="text-2xl text-gray-700 dark:text-white/90">Nullify</h1>
//                 <p className="text-sm text-gray-400">UI/UX Designer</p>
//             </div>
//             {/* <div className="flex w-full justify-between py-2">
//                 <div className="space-y-1 text-center">
//                     <p className="text-gray-500 dark:text-white/70">Posts</p>
//                     <p className="font-mono text-xl text-gray-700 dark:text-white/50">11</p>
//                 </div>
//                 <div className="space-y-1 text-center">
//                     <p className="text-gray-500 dark:text-white/70">Following</p>
//                     <p className="font-mono text-xl text-gray-700 dark:text-white/50">250</p>
//                 </div>
//                 <div className="space-y-1 text-center ">
//                     <p className="text-gray-500 dark:text-white/70">Followers</p>
//                     <p className="font-mono text-xl text-gray-700 dark:text-white/50">11</p>
//                 </div>
//             </div> */}
//             {/* bio  */}
//             <p className="pb-2 text-center text-sm text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore error ipsum officiis debitis quo odio?</p>
//             {/* social icons  */}
//            <div className="flex gap-5">
//            <button type="button" className="group relative h-11 w-28 rounded overflow-hidden border-2 border-[#80b500] text-xl text-white hover:text-white bg-[#80b500] animate-pulse">Follow</button>
//            <button className="group relative flex w-28 items-center rounded border-2 border-[#80b500] p-2 text-black"><span>Visit Shop</span><span className="absolute right-3 box-content flex w-1/6 justify-center rounded-md bg-[#80b500] duration-300 group-hover:w-5/6"><svg viewBox="0 0 24 24" fill="none" className="w-10" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></g></svg></span></button>
//            </div>
//             </div>
          
//         </div>

//   );
// };

// export default Shop;
// "use client";

// import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";
// import Link from "next/link";
// import { useState } from "react";

// const Shop = () => {
//   const [query, setQuery] = useState({
//     page: 1,
//     limit: 10,
//     isBlackListed: "",
//     searchTerm: "",
//     role: "VENDOR",
//   });

//   const { page, limit, searchTerm, role, isBlackListed } = query;

//   const { data, isFetching } = useGetAllTypeUsersQuery({
//     page,
//     limit,
//     searchTerm,
//     role,
//     isBlackListed,
//   });
// console.log(data?.data,"data");

//   const vendorData = data?.data?.filter((user) => user.role === "VENDOR");
//   console.log(vendorData);
  
// const params = new URLSearchParams();
//   return (
//     <div className="p-5">
//       {/* Header Section */}
//       <div
//         className="w-full md:h-[300px] h-[200px] rounded-[18px] mt-5 relative"
//         style={{
//           backgroundImage:
//             "url('https://img.freepik.com/premium-photo/portrait-young-woman-with-arms-raised-standing-against-yellow-background_1048944-8617235.jpg?w=1060')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <div className="absolute top-1/2 left-[20%] md:left-[40%] transform -translate-y-1/2 text-white font-bold text-5xl">
//           All Shop
//         </div>
//       </div>

//       {/* Vendor Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 border-t">
//         {isFetching ? (
//           <p>Loading vendors...</p>
//         ) : vendorData?.length ? (
//           vendorData?.map((vendor) => (
//             <div
//               key={vendor.id}
//               className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg dark:bg-[#18181B]"
//             >
//               <div className="relative mb-4">
//                 <img
//                   width={110}
//                   height={110}
//                   className="h-[110px] w-[110px] rounded-full bg-slate-500 object-cover"
//                   src={
//                     vendor?.vendor?.logo ||
//                     "https://via.placeholder.com/110?text=No+Logo"
//                   }
//                   alt={vendor.name}
//                 />
//                                 <span className="absolute bottom-3 right-0 h-5 w-5 rounded-full border-[3px] border-white bg-[#80b500] dark:border-[#18181B]"></span>
//                                <span className="absolute bottom-3 right-0 h-5 w-5 animate-ping rounded-full bg-[#80b500]"></span>
//               </div>
//               <div className="text-center">
//                 <h1 className="text-2xl text-gray-700 dark:text-white/90">
//                   {vendor.name}
//                 </h1>
//                 <p className="text-sm text-gray-400">{vendor.email}</p>
//                 {vendor?.vendor?.shopName && (
//                   <p className="text-sm text-gray-500 mt-1">
//                     Shop: {vendor.vendor?.shopName}
//                   </p>
//                 )}
//               </div>
//               <div className="flex gap-3 mt-4">
//                 <button
//                   type="button"
//                   className="h-11 px-5 rounded border-2 border-[#80b500] bg-[#80b500] text-white hover:bg-green-600"
//                 >
//                   Follow
//                 </button>
//                 <Link
//                                             href={`/shop-page?${params.toString()}`}
//                                         >  <button
//                                         className="h-11 px-5 rounded border-2 border-[#80b500] text-[#80b500] hover:bg-[#80b500] hover:text-white"
//                                       >
//                                         Visit Shop
//                                       </button></Link>
              
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No vendors found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Shop;
"use client";

import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";
import Link from "next/link";
import { useState } from "react";

const Shop = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    isBlackListed: "",
    searchTerm: "",
    role: "VENDOR",
  });

  const { page, limit, searchTerm, role, isBlackListed } = query;

  const { data, isFetching } = useGetAllTypeUsersQuery({
    page,
    limit,
    searchTerm,
    role,
    isBlackListed,
  });

  console.log(data?.data, "check");

  const vendorData = data?.data?.filter((user) => user.role === "VENDOR");
  console.log(vendorData, "data");

  return (
    <div className="p-5">
      {/* Header Section */}
      <div
        className="w-full md:h-[300px] h-[200px] rounded-[18px] mt-5 relative"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/portrait-young-woman-with-arms-raised-standing-against-yellow-background_1048944-8617235.jpg?w=1060')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-1/2 left-[20%] md:left-[40%] transform -translate-y-1/2 text-white font-bold text-5xl">
          All Shop
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 border-t">
        {isFetching ? (
          <p>Loading vendors...</p>
        ) : vendorData?.length ? (
          vendorData?.map((vendor) => {
            // Create dynamic query parameters for each vendor
            const params = new URLSearchParams();
            if (vendor?.vendor?.id) {
                params.append("shop", vendor.vendor.id);
              }

            return (
              <div
                key={vendor.id}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg dark:bg-[#18181B]"
              >
                <div className="relative mb-4">
                  <img
                    width={110}
                    height={110}
                    className="h-[110px] w-[110px] rounded-full bg-slate-500 object-cover"
                    src={
                      vendor?.vendor?.logo ||
                      "https://via.placeholder.com/110?text=No+Logo"
                    }
                    alt={vendor.name}
                  />
                  <span className="absolute bottom-3 right-0 h-5 w-5 rounded-full border-[3px] border-white bg-[#80b500] dark:border-[#18181B]"></span>
                  <span className="absolute bottom-3 right-0 h-5 w-5 animate-ping rounded-full bg-[#80b500]"></span>
                </div>
                <div className="text-center">
                  <h1 className="text-2xl text-gray-700 dark:text-white/90">
                    {vendor.name}
                  </h1>
                  <p className="text-sm text-gray-400">{vendor.email}</p>
                  {vendor?.vendor?.shopName && (
                    <p className="text-sm text-gray-500 mt-1">
                      Shop: {vendor.vendor?.shopName}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    className="h-11 px-5 rounded border-2 border-[#80b500] bg-[#80b500] text-white hover:bg-green-600"
                  >
                    Follow
                  </button>
                  <Link href={`/shop-page?${params.toString()}`}>
                    <button className="h-11 px-5 rounded border-2 border-[#80b500] text-[#80b500] hover:bg-[#80b500] hover:text-white">
                      Visit Shop
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>No vendors found.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
