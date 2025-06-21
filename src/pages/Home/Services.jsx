import React from "react";
import serviceIcon from "../../assets/service.png";

const Services = () => {
  const serviceInfo = [
    {
      id: 1,
      title: "Express  & Standard Delivery",
      description:
        "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
      icon: serviceIcon,
    },
    {
      id: 2,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      icon: serviceIcon,
    },
    {
      id: 3,
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      icon: serviceIcon,
    },
    {
      id: 4,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      icon: serviceIcon,
    },
    {
      id: 5,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
      icon: serviceIcon,
    },
    {
      id: 6,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      icon: serviceIcon,
    },
  ];

  return (
    <div>
      <div className="bg-[#03373D] p-8 md:p-10 lg:p-18 rounded-2xl mt-10">
        <div>
          <div className="text-white text-center max-w-190 mx-auto">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p>
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {serviceInfo.map((service, i) => {
              const isSecondBox = i === 1;
              return (
                <div
                  key={service.id}
                  className={`${
                    isSecondBox ? "bg-[#CAEB66] " : "bg-white"
                  } rounded-2xl text-center justify-items-center p-8`}
                >
                  <img src={service.icon} alt="" />

                  <h1 className="text-2xl font-bold my-5 text-[#03373D]">
                    {service.title}
                  </h1>
                  <p className="text-[#606060]">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
