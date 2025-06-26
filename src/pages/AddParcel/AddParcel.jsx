import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/GetAuth";
import useAxiosSecure from "../../hooks/AxiosSecure";

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

const AddParcel = () => {
  const wareHouseData = useLoaderData();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm();

  const [cost, setCost] = useState(null);

  const uniqueRegions = [...new Set(wareHouseData.map((w) => w.region))];

  const getDistrictRegions = (region) => {
    return wareHouseData
      .filter((w) => w.region === region)
      .map((w) => w.district);
  };

  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  /// Submit form section ---------------------------

  const onSubmit = (data) => {
    const weight = parseFloat(data.parcelWeight) || 0;
    const isSameDistrict = data.sender_center === data.receiver_center;

    let baseCost = 0;
    let extraCost = 0;
    let breakdown = "";

    if (data.parcelType === "document") {
      baseCost = isSameDistrict ? 60 : 80;
      breakdown = `Document delivery ${
        isSameDistrict ? "within" : "outside"
      } the district.`;
    } else {
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;
        breakdown = `Non-document up to 3kg ${
          isSameDistrict ? "within" : "outside"
        } the district.`;
      } else {
        const extraKg = weight - 3;
        const perKgCharge = extraKg * 40;
        const districtExtra = isSameDistrict ? 0 : 40;

        baseCost = isSameDistrict ? 110 : 150;
        extraCost = perKgCharge + districtExtra;

        breakdown = `Non-document over 3kg ${
          isSameDistrict ? "within" : "outside"
        } the district.\nExtra: ৳40 x ${extraKg.toFixed(
          1
        )}kg = ৳${perKgCharge}${
          districtExtra ? `\n+ ৳40 for outside district` : ""
        }`;
      }
    }

    const totalCost = baseCost + extraCost;
    setCost(totalCost);

    Swal.fire({
      title: "Delivery Cost Breakdown",
      icon: "info",
      html: `
      <div class="text-left text-base space-y-2">
        <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Delivery Zone:</strong> ${
          isSameDistrict ? "Within Same District" : "Outside District"
        }</p>
        <hr class="my-2"/>
        <p><strong>Base Cost:</strong> ৳${baseCost}</p>
        ${
          extraCost > 0
            ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>`
            : ""
        }
        <div class="text-gray-500 text-sm">${breakdown}</div>
        <hr class="my-2"/>
        <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
      </div>
    `,
      showDenyButton: true,
      confirmButtonText: "💳 Proceed to Payment",
      denyButtonText: "✏️ Continue Editing",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#d3d3d3",
      customClass: {
        popup: "rounded-xl shadow-md px-6 py-6",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: totalCost,
          created_by: user.email,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          creation_date: new Date().toISOString(),
          tracking_id: generateTrackingID(),
        };

        axiosSecure.post("parcels", parcelData).then((res) => {
          // console.log(res.data);
          if (res.data.insertedId) {
            // TODO: redirect to a payment page
            Swal.fire({
              title: "Redirecting...",
              text: "Proceeding to payment gateway.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });

            reset();
            setCost(null);
          }
        });

        // console.log("Ready for payment:", parcelData);
      }
    });

    console.log(data, cost);
  };

  return (
    <div className="h-screen">
      <div className="bg-white p-10 rounded-2xl">
        <h1 className="font-bold text-4xl">Add Parcel</h1>

        <hr className="mt-10 text-gray-300" />
        {/* Form for add parcel */}

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-semibold mt-10 mb-6">
              Enter your parcel details
            </h2>

            {/* Radio Buttons */}
            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="document"
                    {...register("parcelType", {
                      required: "Please select parcel type",
                    })}
                    className="appearance-none w-5 h-5 border-2 border-[#d3d3d3] rounded-full checked:border-4 checked:border-[#43792e] transition-all duration-200"
                    defaultChecked
                  />
                  <span className="label-text ml-2">Document</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="Not-Document"
                    {...register("parcelType", {
                      required: "Please select parcel type",
                    })}
                    className="appearance-none w-5 h-5 border-2 border-[#d3d3d3] rounded-full checked:border-4 checked:border-[#43792e] transition-all duration-200 "
                  />
                  <span className="label-text ml-2">Not-Document</span>
                </label>
              </div>
              {errors.parcelType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parcelType.message}
                </p>
              )}
            </div>

            {/* Parcel Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <input
                  type="text"
                  placeholder="Parcel Name"
                  {...register("parcelName", {
                    required: "Parcel name is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.parcelName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.parcelName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Parcel Weight (KG)"
                  {...register("parcelWeight", {
                    required: "Parcel weight is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.parcelWeight && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.parcelWeight.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sender */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Sender Details</h3>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Sender Name"
                    {...register("senderName", {
                      required: "Sender name is required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.senderName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.senderName.message}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("senderAddress", {
                      required: "Address is required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.senderAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.senderAddress.message}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Sender Contact No"
                    {...register("senderContact", {
                      required: "Contact number is required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.senderContact && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.senderContact.message}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <select
                    {...register("senderRegion", { required: true })}
                    className="select select-bordered w-full mb-2"
                  >
                    <option value="">Select Region</option>
                    {uniqueRegions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  <select
                    {...register("sender_center", { required: true })}
                    className="select select-bordered w-full mb-2"
                  >
                    <option value="">Select Service Center</option>
                    {getDistrictRegions(senderRegion).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.senderRegion && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.senderRegion.message}
                    </p>
                  )}
                </div>

                <textarea
                  {...register("pickupInstruction")}
                  className="textarea textarea-bordered w-full"
                  placeholder="Pickup Instruction"
                ></textarea>
              </div>

              {/* Receiver */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Receiver Details</h3>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Receiver Name"
                    {...register("receiverName", {
                      required: "Receiver name is required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.receiverName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiverName.message}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("receiverAddress", {
                      required: "Receiver address is required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.receiverAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiverAddress.message}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Receiver Contact No"
                    {...register("receiverContact", {
                      required: "Contact number is required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.receiverContact && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiverContact.message}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <select
                    {...register("receiverRegion", { required: true })}
                    className="select select-bordered w-full mb-2"
                  >
                    <option value="">Select Region</option>
                    {uniqueRegions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errors.receiverRegion && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiverRegion.message}
                    </p>
                  )}
                  <select
                    {...register("receiver_center", { required: true })}
                    className="select select-bordered w-full mb-2"
                  >
                    <option value="">Select Service Center</option>
                    {getDistrictRegions(receiverRegion).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.receiver_center && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiver_center.message}
                    </p>
                  )}
                </div>

                <textarea
                  {...register("deliveryInstruction")}
                  className="textarea textarea-bordered w-full"
                  placeholder="Delivery Instruction"
                ></textarea>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4 mb-6">
              ⏰ PickUp Time 4pm–7pm Approx.
            </p>

            <button
              type="submit"
              className="btn bg-[#CAEB66] text-black rounded-xl"
            >
              Proceed to Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddParcel;
