import { IconType } from "react-icons";

export type Amenity = {
  icon: IconType;
  label: string;
  description: string;
};

interface ListingAmenitiesProps {
  amenities: Amenity[];
}

export const ListingAmenities: React.FC<ListingAmenitiesProps> = ({
  amenities,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-bold">What this place offers</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {amenities.map((amenity) => (
          <div key={amenity.label} className="flex items-center gap-4">
            <amenity.icon size={30} className="text-neutral-600" />

            <div className="flex flex-col">
              <div className="text-base font-medium">{amenity.label}</div>
              <div className="text-neutral-500 font-light hidden">
                {amenity.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
