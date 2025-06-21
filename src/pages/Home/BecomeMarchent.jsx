import React from "react";
import bg from "../../assets/bg-marchent.png";
import rightImage from "../../assets/rightImg.png";

const BecomeMarchent = () => {
  return (
    <div className="p-0 md:p-0 lg:p-12">
      <div className="bg-[#03373D] rounded-2xl p-10 md:p-16 mt-10 overflow-hidden relative">
        <img
          src={bg}
          alt="Background pattern"
          className="absolute top-0 left-0  object-cover  "
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Merchant and Customer Satisfaction <br /> is Our First Priority
            </h1>
            <p className="text-base md:text-lg mb-6 text-gray-200">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pro Supplier courier delivers
              your parcels in every corner of Bangladesh right on time.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="bg-[#DFF768] text-[#03373D] font-semibold px-6 py-3 rounded-full hover:bg-[#cde84a] transition">
                Become a Merchant
              </button>
              <button className="border border-[#DFF768] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#dff7681a] transition">
                Earn with Pro Supplier Courier
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src={rightImage}
              alt="Delivery boxes"
              className="w-full max-w-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeMarchent;
