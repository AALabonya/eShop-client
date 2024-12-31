"use client";

export default function AboutUs() {
    return (
        <div className="w-full mt-[30px] z-10 px-4 md:px-10 lg:px-20">
            <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                    <img
                        src="https://i.ibb.co.com/dj1HnPB/discount-voucher.jpg"
                        alt="About Us"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
                {/* Content Section */}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        About Us
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        Welcome to <span className="font-semibold text-green-500">Eshop Application</span>!
                        We are dedicated to providing you with the best shopping experience, offering a
                        wide range of products, exceptional customer service, and an intuitive online
                        platform. Our mission is to make online shopping easy, fast, and enjoyable for
                        everyone.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        With years of expertise, we aim to bring quality and affordability to your
                        doorstep. From the latest gadgets to everyday essentials, we have everything
                        you need at competitive prices.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition duration-200"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}
