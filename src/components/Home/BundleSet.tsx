
import Link from "next/link";

const BundleSet = () => {
  return (
    <div className="bg-gray-100 mt-16">
      <header className="flex flex-col md:flex-row items-center justify-between px-4">
        <h2 className="lg:text-4xl text-2xl font-bold tracking-tight text-gray-900 lg:text-start text-center">
          Combo Set
        </h2>
      </header>

      <div className="flex flex-col md:flex-row justify-center gap-5 px-4 mt-10">
        <div className="relative">
          <div className="absolute mt-[13%] md:ml-16 ml-4 ">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#243F2F]">
              Tasty <span className="text-[#00AA63]">Honey</span> <br /> From
              Farm Sellers
            </h1>
            <p className="mt-2 font-semibold text-sm sm:text-base">
              100% natural honey and bee products expertly crafted <br /> to
              nourish your skin and boost your health.
            </p>
            <Link href="/all-products">
              <button className="bg-[#80b500] py-2 px-4 mt-5 text-white rounded-lg font-bold">
                Shop Now
              </button>
            </Link>
          </div>
          <img
            src="https://i.postimg.cc/7LFZd7dC/tastydaily-1352292262.jpg"
            alt="Tasty Honey"
            className="mt-10 h-[300px] sm:h-[400px] md:h-[300px] rounded-xl w-full object-cover"
          />
        </div>

        <div className="relative">
          <div className="absolute mt-[13%] md:ml-16 ml-4 pt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#243F2F]">
              <span className="text-[#00AA63]">Kiwi</span> Jam
            </h1>
            <p className="mt-2 font-semibold text-sm sm:text-base">
              For health conscious <br />
              families. Spoon it on a crisp <br />
              toast, roll in parathas, or just <br />
              scoop it over vanilla ice.
            </p>
            <Link href="/all-products">
              <button className="bg-[#80b500] py-2 px-4 mt-5 text-white rounded-lg font-bold">
                Shop Now
              </button>
            </Link>
          </div>
          <img
            src="https://i.postimg.cc/SNxkZDRT/tastydaily-1352562261.jpg"
            alt="Kiwi Jam"
            className="mt-10 h-[300px] sm:h-[400px] md:h-[300px] rounded-xl w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-5 px-4 mt-10">
        <div className="relative">
          <div className="absolute mt-[5%] md:ml-16 ml-4 pt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#243F2F]">
              Spices Set
            </h1>
            <p className="mt-2 font-semibold text-sm sm:text-base">
              Give a unique flavor to your food!!
            </p>
            <Link href="/all-products">
              <button className="bg-[#80b500] py-2 px-4 mt-5 text-white rounded-lg font-bold">
                Shop Now
              </button>
            </Link>
          </div>
          <img
            src="https://i.postimg.cc/4NWL51H1/tastydaily-florence22.jpg"
            alt="Spices Set"
            className="mt-5 h-[300px] sm:h-[350px] md:h-[300px] rounded-xl w-full object-cover"
          />
        </div>

        <div className="relative">
          <div className="absolute mt-[5%] md:ml-16 ml-4 pt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#243F2F]">
              Italian <span className="text-[#00AA63]">Pasta</span> from
              Florence.
            </h1>
            <p className="mt-2 font-semibold text-sm sm:text-base">
              Non-GMO. Absolutely Nature!
            </p>
            <Link href="/all-products">
              <button className="bg-[#80b500] py-2 px-4 mt-5 text-white rounded-lg font-bold">
                Shop Now
              </button>
            </Link>
          </div>
          <img
            src="https://i.postimg.cc/qR2DxV2t/tastydaily-florence.jpg"
            alt="Italian Pasta"
            className="mt-5 h-[300px] sm:h-[350px] md:h-[300px] rounded-xl w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default BundleSet;
