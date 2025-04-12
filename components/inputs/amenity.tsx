import { useCallback } from "react";
import { IconType } from "react-icons";

interface AmenityInputProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  amenities: string[];
  onClick: (value: string[]) => void;
}

export const AmenityInput: React.FC<AmenityInputProps> = ({
  label,
  icon: Icon,
  selected,
  amenities,
  onClick,
}) => {
  let selections = [...amenities];

  const handleClick = useCallback(
    (label: string) => {
      if (amenities.includes(label)) {
        selections = selections.filter((amenity) => amenity !== label);
      } else {
        selections.push(label);
      }
      onClick(selections);

      console.log("selections:", selections);
    },
    [label, amenities]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
      onClick={() => handleClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      } `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};
