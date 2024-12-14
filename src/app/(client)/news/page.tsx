import Image from "next/image";
import React from "react";

const NewsFeed = () => {
  const newsDetails = [
    {
      image: "https://img.freepik.com/free-psd/4th-july-landing-page-template-design_23-2149436956.jpg?t=st=1733344604~exp=1733348204~hmac=d4c7deaacb72c49c47c90b2e3f6eefedef2391b42157a1a451ab653d6499fd3f&w=1380",
      title:
        "Adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      paragraph:
        "Organic and healthy snack options like dried fruits, nuts, granola, as well as beverages like cold-pressed juices and herbal teas.",
    },
    {
      image: "https://img.freepik.com/free-photo/flowers-buds-with-camera-table_23-2148043898.jpg?t=st=1733344561~exp=1733348161~hmac=17805a5bd3f0ce8f58f6312e7b322eff6e2d5c272f6018ddaf7b6e0993ca08de&w=740",
      title:
        "Magna aliqua. Ut enim ad minim venia m, quis nostrud exercitation ullamco",
      paragraph:
        "A wide range of organic dairy products such as milk, butter, yogurt, and free-range eggs, all sourced from local farms.",
    },
    {
      image: "https://img.freepik.com/premium-photo/donald-trump-posts-ai-fakes-implying-taylor-swift-endorsement_861346-78639.jpg?w=740",
      title:
        "Adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      paragraph:
        "A collection of organic rice, lentils, beans, and flour, catering to health-conscious consumers.",
    },
    {
        image: "https://img.freepik.com/free-photo/assortment-vegetables-green-herbs-market-vegetables-basket_2829-13998.jpg?t=st=1733344538~exp=1733348138~hmac=c56a900a014759a53b275a14adfe3255eb5ab5e825f061e47a41cac41f2195f6&w=900",
        title:
          "Adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        paragraph:
          "Organic and healthy snack options like dried fruits, nuts, granola, as well as beverages like cold-pressed juices and herbal teas.",
      },
      {
        image: "https://img.freepik.com/free-photo/beautiful-girl-making-drip-coffee-sunrise-viewpoint-pha-hi-village-chiang-rai-province-thailand_335224-1145.jpg?t=st=1733344771~exp=1733348371~hmac=51aba78ae79b192415909245b47d2d09b70253fdede0e04ac2de2ca7f9008475&w=900",
        title:
          "Magna aliqua. Ut enim ad minim venia m, quis nostrud exercitation ullamco",
        paragraph:
          "A wide range of organic dairy products such as milk, butter, yogurt, and free-range eggs, all sourced from local farms.",
      },
      {
        image: "https://img.freepik.com/premium-photo/newscasters-team-reveal-ai-progress_482257-90739.jpg?w=900",
        title:
          "Adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        paragraph:
          "A collection of organic rice, lentils, beans, and flour, catering to health-conscious consumers.",
      },
  ];

  return (
    <div className="bg-gray-50">

    {/* Hero Section */}
    <div className="bg-[#f6f6e8] py-16">
  <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
    {/* Left Content */}
    <div className="text-center lg:text-left space-y-6">
      <h2 className="text-lg font-medium text-[#7fad39]">30% OFF SALE</h2>
      <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 leading-tight">
        Grow Green and Be Safe
      </h1>
      <p className="text-gray-600">
        Bring nature closer to your home. Grab your rubber plant now at an
        exclusive discount!
      </p>
      <button className="bg-[#7fad39] hover:bg-[#d3721a] px-6 py-3 text-white font-medium rounded-md transition duration-300">
        SHOP NOW
      </button>
    </div>

    {/* Center Image */}
    <div className="flex justify-center">
      <Image
        src="https://img.freepik.com/free-photo/beautiful-woman-with-dog_144627-5904.jpg?t=st=1733344918~exp=1733348518~hmac=ed5dbe779504a5e93ec2fa90af326e003f9c0c2b8f39c0dd8a110af416cf8e1b&w=740"
        width={400}
        height={400}
        layout="intrinsic"
        alt="tree"
        className="rounded-lg shadow-lg"
      />
    </div>

    {/* Right Content */}
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <div className="bg-[#7fad39] p-3 rounded-full">
          <span className="text-white font-bold">F</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Feeding</h3>
          <p className="text-sm text-gray-600">
            Feeding food refers to the process of providing nourishment to
            sustain life.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="bg-[#7fad39] p-3 rounded-full">
          <span className="text-white font-bold">L</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Light</h3>
          <p className="text-sm text-gray-600">
            Light is essential for growth, providing energy through
            photosynthesis.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="bg-[#7fad39] p-3 rounded-full">
          <span className="text-white font-bold">C</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Care</h3>
          <p className="text-sm text-gray-600">
            Proper care ensures healthy growth and a vibrant green look.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

  
    {/* News Section */}
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
        Latest News & Updates
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {newsDetails.map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={200}
              layout="responsive"
              className="rounded-md"
            />
            <h3 className="text-lg font-semibold mt-4 text-gray-800 hover:text-[#ad5c08] transition duration-200">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{item.paragraph}</p>
            <button className="mt-4 text-sm font-medium text-[#7fad39] hover:underline">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  
  </div>
  
  );
};

export default NewsFeed;
