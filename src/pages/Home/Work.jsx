import { TruckIcon } from "lucide-react";
import React from "react";
import tuckLocation from "../../assets/truck.png";

const Work = () => {
  const worksInfo = [
    {
      id: 1,
      icon: tuckLocation,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 2,
      icon: tuckLocation,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 3,
      icon: tuckLocation,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 4,
      icon: tuckLocation,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  return (
    <div className="p-2 lg:p-15">
      <h1 className="font-bold text-2xl md:text-3xl text-[#03373D] my-8">
        How it Works
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {worksInfo.map((work) => {
          return (
            <div
              key={work.id}
              className="bg-white px-6 pt-10 pb-12 rounded-3xl"
            >
              <div>
                <img src={work.icon} alt="" />
              </div>
              <h1 className="my-4 font-bold text-xl text-[#03373D]">
                {work.title}
              </h1>
              <p className="pr-20">{work.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Work;
