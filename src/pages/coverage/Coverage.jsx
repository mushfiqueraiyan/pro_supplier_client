import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useLoaderData } from "react-router";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://static.vecteezy.com/system/resources/thumbnails/022/493/602/small_2x/location-pin-icon-3d-render-isolated-on-transparent-background-file-format-png.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",

  iconSize: [30, 30],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

const FlyToDistrict = ({ coords }) => {
  const map = useMap();

  if (coords) {
    map.flyTo(coords, 10, { duration: 1.5 });
  }
  return null;
};

const Coverage = () => {
  const address = useLoaderData();

  const [searchText, setSearchText] = useState("");
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  //console.log(address);

  const position = [23.685, 90.3563];

  const handleSearch = (e) => {
    e.preventDefault();

    const warehouse = address.find((d) =>
      d.district.toLowerCase().includes(searchText.toLowerCase())
    );
    if (warehouse) {
      setActiveCoords([warehouse.latitude, warehouse.longitude]);
      setActiveDistrict(warehouse.district);
    }
  };

  return (
    <div className="h-screen">
      <div className="bg-white rounded-3xl p-15 ">
        <div>
          <h1 className="font-extrabold text-4xl mb-10 text-[#03373D]">
            We are available in {address.length} districts
          </h1>

          {/* Search section */}

          <div>
            <form
              onSubmit={handleSearch}
              className="my-5 flex items-center gap-2"
            >
              <input
                type="search"
                placeholder="Search"
                name="search"
                className="input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <input
                type="submit"
                value="Search"
                className="btn bg-[#CAEB66]"
              />
            </form>
          </div>

          {/* Map layer section */}

          <hr className="text-gray-200" />

          <h2 className="text-xl font-bold my-5 text-[#03373D]">
            We deliver almost all over Bangladesh
          </h2>
        </div>

        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom
          className=" w-full h-150 mx-auto rounded-5xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyToDistrict coords={activeCoords} />
          {address.map((district, idx) => {
            return (
              <Marker
                key={idx}
                position={[district.latitude, district.longitude]}
              >
                <Popup autoOpen={district.district === activeDistrict}>
                  Our Location {district.covered_area.join(", ")}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
