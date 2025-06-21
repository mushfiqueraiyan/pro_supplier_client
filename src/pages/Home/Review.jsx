import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Review = () => {
  const swiperRef = useRef();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const reviewInfo = [
    {
      review:
        "Absolutely loved the UI and how easy it is to navigate. Everything just works.",
      name: "Sophia Khan",
      position: "UX Designer at Creatix",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      review:
        "Customer service is responsive and helpful. Solved my issue in less than 10 minutes!",
      name: "Ethan Brooks",
      position: "Operations Lead at NextStep",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      review:
        "Highly recommend this tool for startups. It's lightweight and powerful.",
      name: "Priya Mehta",
      position: "Co-founder at LaunchPad",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      review:
        "Clean design, smooth transitions, and zero bugs so far. Great job!",
      name: "David Lee",
      position: "Frontend Developer at SoftHaus",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      review:
        "Honestly, I didn’t expect it to be this good. It's now an essential part of our workflow.",
      name: "Emily Santos",
      position: "Marketing Manager at DigiGo",
      image: "https://randomuser.me/api/portraits/women/48.jpg",
    },
    {
      review:
        "Very customizable and developer-friendly. Documentation is on point.",
      name: "Zayn Malik",
      position: "Full Stack Developer at TechVerse",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      review:
        "Using this tool saved us countless hours. Love the analytics dashboard!",
      name: "Chloe Bennett",
      position: "Data Analyst at InsightIQ",
      image: "https://randomuser.me/api/portraits/women/19.jpg",
    },
    {
      review: "Simple onboarding, and the team keeps pushing great updates.",
      name: "Jake Turner",
      position: "Founder at ScaleNow",
      image: "https://randomuser.me/api/portraits/men/37.jpg",
    },
    {
      review:
        "It’s the little things that make a big difference. Super intuitive interface.",
      name: "Maya Patel",
      position: "UI Engineer at PixelForge",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      review:
        "Never experienced a crash or lag. Very stable even under high traffic.",
      name: "Lucas Nguyen",
      position: "Backend Engineer at CodeSnap",
      image: "https://randomuser.me/api/portraits/men/30.jpg",
    },
    {
      review:
        "Everything just works. From sign-up to daily use, it’s seamless.",
      name: "Isabella Rossi",
      position: "Product Owner at AgileTrack",
      image: "https://randomuser.me/api/portraits/women/56.jpg",
    },
    {
      review:
        "Honestly, one of the most polished apps I’ve used in a while. Great job, team!",
      name: "Mohammad Rahman",
      position: "CTO at DevCore",
      image: "https://randomuser.me/api/portraits/men/60.jpg",
    },
  ];

  return (
    <div className=" py-26 px-4 relative justify-items-center">
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-y-full flex justify-center items-center gap-4 mt-6 z-10">
        <button
          ref={prevRef}
          className="bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="text-[#03373D]" />
        </button>

        <div className="custom-pagination flex gap-2" />

        <button
          ref={nextRef}
          className="bg-lime-300 shadow p-2 rounded-full hover:bg-lime-400"
        >
          <ChevronRight className="text-[#03373D]" />
        </button>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },

          768: {
            slidesPerView: 4,
          },
        }}
      >
        {reviewInfo.map((user, idx) => (
          <SwiperSlide key={idx}>
            {({ isActive }) => (
              <div
                className={`transition-all duration-300 rounded-2xl  ease-in-out  shadow-lg p-6 bg-white text-center ${
                  isActive
                    ? "scale-100 opacity-100 "
                    : "scale-90 opacity-40 mt-10"
                }`}
              >
                <div className="bg-white p-6 rounded-2xl  text-center h-full flex flex-col justify-between min-h-[280px]">
                  <p className="text-gray-600 mb-4">
                    <span className="text-4xl text-[#03373D] font-bold">“</span>
                    {user.review}
                  </p>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center gap-4 justify-center">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-12 h-12 rounded-full border-2 border-[#03373D]"
                      />
                      <div className="text-left">
                        <h3 className="text-[#03373D] font-semibold">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-500">{user.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
