import React from "react";
import { useForm } from "react-hook-form";
import deliveryman from "../../assets/deliveryman.png";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/AxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/GetAuth";

const AddRider = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const wareHouse = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const regions = [...new Set(wareHouse.map((w) => w.region))];

  const specificWareHouse = (region) => {
    return wareHouse.filter((w) => w.region === region).map((w) => w.district);
  };

  const riderRegion = watch("region");

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      create_at: new Date().toISOString(),
      status: "pending",
      role: "user",
    };
    //console.log(formData);

    axiosSecure.post("riders", riderData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Rider Applicationj Submitted",
          text: "Please wait untile your application has been approved",
        });
      }
    });
  };

  return (
    <div className="h-screen">
      <section className="bg-white rounded-2xl shadow-md p-10  my-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - text and form */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Be a Rider
            </h2>
            <p className="text-gray-600 mb-6">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>

            <hr className="text-gray-100 my-10" />

            <h1 className="font-bold text-gray-700 text-xl my-5">
              Tell us about yourself
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Your Age"
                  {...register("age", { required: "Age is required" })}
                  className="input input-bordered w-full"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={user.email}
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("region", { required: "Region is required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your region</option>
                  {regions.map((region) => {
                    return (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    );
                  })}
                </select>
                {errors.region && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.region.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="NID No"
                  {...register("nid", { required: "NID is required" })}
                  className="input input-bordered w-full"
                />
                {errors.nid && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nid.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Contact"
                  {...register("contact", { required: "Contact is required" })}
                  className="input input-bordered w-full"
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <select
                  {...register("warehouse", {
                    required: "Warehouse selection is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Which warehouse do you want to work?</option>
                  {specificWareHouse(riderRegion).map((district) => {
                    return (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    );
                  })}
                </select>
                {errors.warehouse && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.warehouse.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn bg-[#CAEB66] border-none text-black w-full md:col-span-2"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right side - image */}
          <div className="flex justify-center">
            <img
              src={deliveryman}
              alt="Rider Illustration"
              className="w-100 rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddRider;
