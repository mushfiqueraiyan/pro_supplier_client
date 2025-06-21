import React from "react";
import parcel from "../../assets/parsel.png";
import delivery from "../../assets/delivery.png";
const Feature = () => {
  const featureInfo = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      img: delivery,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      img: parcel,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      img: parcel,
    },
  ];

  return (
    <div className="p-5 md:p-5 lg:p-14">
      {featureInfo.map((feature) => {
        return (
          <div className="flex flex-col md:flex-col lg:flex-row items-center gap-15 bg-white mt-10 p-12 rounded-3xl">
            <div className="border-r-1 border-none md:border-none lg:pr-10 lg:border-dashed border-[#03373d80]">
              <img src={feature.img} className="w-40" alt={feature.title} />
            </div>
            <div>
              <h1 className="font-bold text-3xl text-[#03373D] mb-3">
                {feature.title}
              </h1>
              <p>{feature.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feature;
