// import Image from "next/image";
// import React, { useState } from "react";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
// import Link from "next/link";
// import { Button } from "../ui/button";



// const MostViewsCard = ({ product,key}:any) => {

//   const products = [
//     {
//       _id: "1",
//       name: "Product A",
//       category: { name: "Category 1" },
//       shortDescription: "This is a short description for Product A.",
//       stock: 10,
//       price: 25.99,
//       image: "https://img.freepik.com/premium-photo/fruits-splash-flying-fall-juice-isolated-white-background_145182-5236.jpg?w=900", // Placeholder image
//     },
//     {
//       _id: "2",
//       name: "Product B",
//       category: { name: "Category 2" },
//       shortDescription: "This is a short description for Product B.",
//       stock: 5,
//       price: 45.99,
//       image: "https://media.istockphoto.com/id/1408371627/photo/relaxed-woman-with-healthy-food-in-the-room-with-plants.jpg?s=2048x2048&w=is&k=20&c=jYKH1j_t_RXrQkv9uh9vrCoWFL0LvRv0kjPdJ1gfUHE=", // Placeholder image
//     },
//     {
//       _id: "3",
//       name: "Product C",
//       category: { name: "Category 3" },
//       shortDescription: "This is a short description for Product C.",
//       stock: 0,
//       price: 15.99,
//       image: "https://img.freepik.com/premium-psd/poster-frame-living-room-psd-mockup_1150-60423.jpg?w=900", // Placeholder image
//     },
//     {
//       _id: "4",
//       name: "Product A",
//       category: { name: "Category 1" },
//       shortDescription: "This is a short description for Product A.",
//       stock: 10,
//       price: 25.99,
//       image: "https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?t=st=1733375975~exp=1733379575~hmac=fcf1adbf6f6add354b211848484937181268b8179bf5325573dea8c402ade98d&w=1380", // Placeholder image
//     },
//     {
//       _id: "5",
//       name: "Product B",
//       category: { name: "Category 2" },
//       shortDescription: "This is a short description for Product B.",
//       stock: 5,
//       price: 45.99,
//       image: "https://img.freepik.com/premium-photo/young-hipsters-riding-shopping-cart_251859-15693.jpg?w=900", // Placeholder image
//     },
//     {
//       _id: "6",
//       name: "Product C",
//       category: { name: "Category 3" },
//       shortDescription: "This is a short description for Product C.",
//       stock: 0,
//       price: 15.99,
//       image: "https://img.freepik.com/premium-psd/poster-frame-living-room-psd-mockup_1150-60423.jpg?w=900", // Placeholder image
//     },
//     {
//       _id: "7",
//       name: "Product C",
//       category: { name: "Category 3" },
//       shortDescription: "This is a short description for Product C.",
//       stock: 0,
//       price: 15.99,
//       image: "https://img.freepik.com/premium-photo/ingredients-cooking-garlic-pepper-spices-rosemary_661712-103.jpg?w=900", // Placeholder image
//     },
//     {
//       _id: "8",
//       name: "Product A",
//       category: { name: "Category 1" },
//       shortDescription: "This is a short description for Product A.",
//       stock: 10,
//       price: 25.99,
//       image: "https://img.freepik.com/free-vector/realistic-ftuiys-juice-splash-burst-composition-with-spray-images-ripe-tropical-fruits-blank_1284-29364.jpg?t=st=1733377187~exp=1733380787~hmac=dfc768ee627e0baab9af375ca0623e8aa628766e705393486fbc30d72a42c8a5&w=740", // Placeholder image
//     },
//     {
//       _id: "9",
//       name: "Product B",
//       category: { name: "Category 2" },
//       shortDescription: "This is a short description for Product B.",
//       stock: 5,
//       price: 45.99,
//       image: "https://img.freepik.com/free-photo/large-set-isolated-vegetables-white-background_485709-44.jpg?t=st=1733377037~exp=1733380637~hmac=5fbd0bfde8acbfea77ffaac8c093358eba285de8bf843fdf32743198310f0dbe&w=740", // Placeholder image
//     },
//     {
//       _id: "10",
//       name: "Product C",
//       category: { name: "Category 3" },
//       shortDescription: "This is a short description for Product C.",
//       stock: 0,
//       price: 15.99,
//       image: "https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg?t=st=1733377025~exp=1733380625~hmac=2b8e4cfd69b0816a7af9d80c9c43b725692912db3351bf27d63fb33306676805&w=900", // Placeholder image
//     },
//   ];

//   const [pImg, setPImg] = useState(product[0]); // Default to the first product image

//   const getRandomProduct = (index: number) => {
//     return product[key];
//   };

//   return (
//     <div className="section-margin-top">
  
//       <div className="lg:flex gap-5 items-center">
//         <div className="lg:w-1/3 relative">
//           <img
//             className="w-full lg:h-[600px] h-[400px] object-cover"
//             src={pImg.image}
//             alt={pImg.name}
//           />
//           <h2 className="text-4xl font-bold bg-green-700/30 backdrop-blur-lg w-full text-center py-5 text-white absolute bottom-0 z-40">
//             {pImg.name}
//           </h2>
//         </div>

//         {/* Display the list of products in a table */}
//         <div className="h-[600px] lg:w-2/3 ml-auto overflow-hidden hover:overflow-y-auto hover:transition-all hover:duration-300 custom-scrollbar">
//           <Table>
//             <TableHeader className="h-[100px]">
//               <TableRow>
//                 <TableHead>Image</TableHead>
//                 <TableHead>Serial</TableHead>
//                 <TableHead>Name & Category</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Total Items</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead className="text-right">Action</TableHead>
//               </TableRow>
//             </TableHeader>

//             {/* Map through the products and display each one in a table row */}
//             <TableBody>
//               {products.map((product, i) => (
//                 <TableRow
//                   key={product._id}
//                   onMouseEnter={() => setPImg(getRandomProduct(i))}
//                 >
//                   <TableCell>
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   </TableCell>
//                   <TableCell className="font-medium">{i + 1}</TableCell>
//                   <TableCell className="uppercase flex flex-col">
//                     <h5 className="text-md font-bold mb-1">{product.name}</h5>
//                     <p className="mini-active bg-gray-200 rounded-lg px-2 py-1 ">{product.category.name}</p>
//                   </TableCell>
//                   <TableCell className="uppercase">
//                     {product.shortDescription}
//                   </TableCell>
//                   <TableCell
//                     className={product.stock === 0 ? "text-red-500" : ""}
//                   >
//                     {product.stock}
//                   </TableCell>
//                   <TableCell>${product.price.toFixed(2)}</TableCell>
//                   <TableCell className="text-right">
//                     {/* Button to view single product details */}
//                     <Link href={`/single-product/${product._id}`}>
//                       <Button className="hover:bg-black bg-[#7fad39]">View Items</Button>
//                     </Link>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MostViewsCard;
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Link from "next/link";
import { Button } from "../ui/button";

const MostViewsCard = () => {
 
  const products = [
    {
      _id: "1",
      name: "Product A",
      category: { name: "Category 1" },
      shortDescription: "This is a short description for Product A.",
      stock: 10,
      price: 25.99,
      image: "https://img.freepik.com/premium-photo/fruits-splash-flying-fall-juice-isolated-white-background_145182-5236.jpg?w=900", // Placeholder image
    },
    {
      _id: "2",
      name: "Product B",
      category: { name: "Category 2" },
      shortDescription: "This is a short description for Product B.",
      stock: 5,
      price: 45.99,
      image: "https://media.istockphoto.com/id/1408371627/photo/relaxed-woman-with-healthy-food-in-the-room-with-plants.jpg?s=2048x2048&w=is&k=20&c=jYKH1j_t_RXrQkv9uh9vrCoWFL0LvRv0kjPdJ1gfUHE=", // Placeholder image
    },
    {
      _id: "3",
      name: "Product C",
      category: { name: "Category 3" },
      shortDescription: "This is a short description for Product C.",
      stock: 0,
      price: 15.99,
      image: "https://img.freepik.com/premium-psd/poster-frame-living-room-psd-mockup_1150-60423.jpg?w=900", // Placeholder image
    },
    {
      _id: "4",
      name: "Product A",
      category: { name: "Category 1" },
      shortDescription: "This is a short description for Product A.",
      stock: 10,
      price: 25.99,
      image: "https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?t=st=1733375975~exp=1733379575~hmac=fcf1adbf6f6add354b211848484937181268b8179bf5325573dea8c402ade98d&w=1380", // Placeholder image
    },
    {
      _id: "5",
      name: "Product B",
      category: { name: "Category 2" },
      shortDescription: "This is a short description for Product B.",
      stock: 5,
      price: 45.99,
      image: "https://img.freepik.com/premium-photo/young-hipsters-riding-shopping-cart_251859-15693.jpg?w=900", // Placeholder image
    },
    {
      _id: "6",
      name: "Product C",
      category: { name: "Category 3" },
      shortDescription: "This is a short description for Product C.",
      stock: 0,
      price: 15.99,
      image: "https://img.freepik.com/premium-psd/poster-frame-living-room-psd-mockup_1150-60423.jpg?w=900", // Placeholder image
    },
    {
      _id: "7",
      name: "Product C",
      category: { name: "Category 3" },
      shortDescription: "This is a short description for Product C.",
      stock: 0,
      price: 15.99,
      image: "https://img.freepik.com/premium-photo/ingredients-cooking-garlic-pepper-spices-rosemary_661712-103.jpg?w=900", // Placeholder image
    },
    {
      _id: "8",
      name: "Product A",
      category: { name: "Category 1" },
      shortDescription: "This is a short description for Product A.",
      stock: 10,
      price: 25.99,
      image: "https://img.freepik.com/free-vector/realistic-ftuiys-juice-splash-burst-composition-with-spray-images-ripe-tropical-fruits-blank_1284-29364.jpg?t=st=1733377187~exp=1733380787~hmac=dfc768ee627e0baab9af375ca0623e8aa628766e705393486fbc30d72a42c8a5&w=740", // Placeholder image
    },
    {
      _id: "9",
      name: "Product B",
      category: { name: "Category 2" },
      shortDescription: "This is a short description for Product B.",
      stock: 5,
      price: 45.99,
      image: "https://img.freepik.com/free-photo/large-set-isolated-vegetables-white-background_485709-44.jpg?t=st=1733377037~exp=1733380637~hmac=5fbd0bfde8acbfea77ffaac8c093358eba285de8bf843fdf32743198310f0dbe&w=740", // Placeholder image
    },
    {
      _id: "10",
      name: "Product C",
      category: { name: "Category 3" },
      shortDescription: "This is a short description for Product C.",
      stock: 0,
      price: 15.99,
      image: "https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg?t=st=1733377025~exp=1733380625~hmac=2b8e4cfd69b0816a7af9d80c9c43b725692912db3351bf27d63fb33306676805&w=900", // Placeholder image
    },
  ];

  // Default to the first product in the array
  const [pImg, setPImg] = useState(products[0]);

  // Function to get a product by index
  const getRandomProduct = (index: number) => {
    return products[index];
  };

  return (
    <div className="section-margin-top">
      <div className="lg:flex gap-5 items-center">
        {/* Product Image and Name */}
        <div className="lg:w-1/3 relative">
          <img
            className="w-full lg:h-[600px] h-[400px] object-cover"
            src={pImg.image}
            alt={pImg.name}
          />
          <h2 className="text-4xl font-bold bg-green-700/30 backdrop-blur-lg w-full text-center py-5 text-white absolute bottom-0 z-40">
            {pImg.name}
          </h2>
        </div>

        {/* Product List */}
        <div className="h-[600px] lg:w-2/3 ml-auto overflow-hidden hover:overflow-y-auto hover:transition-all hover:duration-300 custom-scrollbar">
          <Table>
            <TableHeader className="h-[100px]">
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Serial</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Total Items</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, i) => (
                <TableRow
                  key={product._id}
                  onMouseEnter={() => setPImg(getRandomProduct(i))}
                >
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="uppercase flex flex-col">
                    <h5 className="text-md font-bold mb-1">{product.name}</h5>
                    <p className="mini-active bg-gray-200 rounded-lg px-2 py-1">
                      {product.category.name}
                    </p>
                  </TableCell>
                  <TableCell className="uppercase">
                    {product.shortDescription}
                  </TableCell>
                  <TableCell className={product.stock === 0 ? "text-red-500" : ""}>
                    {product.stock}
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/single-product/${product._id}`}>
                      <Button className="hover:bg-black bg-[#7fad39]">View Items</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MostViewsCard;
