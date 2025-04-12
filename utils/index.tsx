import { TbBeach, TbGolf, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarbecue,
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond, IoTvOutline, IoWifiOutline } from "react-icons/io5";
import {
  PiHairDryer,
  PiSwimmingPoolLight,
  PiElevatorLight,
  PiWashingMachineLight,
  PiCarProfileLight,
  PiBathtubLight,
  PiFirstAidKit,
  PiThermometerColdLight,
  PiFanLight,
  PiCookingPotLight,
  PiOvenLight,
  PiForkKnife,
  PiFireExtinguisherLight,
  PiFireSimple,
} from "react-icons/pi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { LuMicrowave } from "react-icons/lu";
import { GrToast } from "react-icons/gr";
import { LiaBlenderSolid } from "react-icons/lia";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    label: "Golfing",
    icon: TbGolf,
    description: "This property has golfing fields",
  },

  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake",
  },

  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities ",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in the arctic",
  },

  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious",
  },
];

export const amenities = [
  {
    label: "Wifi",
    icon: IoWifiOutline,
    description: "This property has wifi",
  },
  {
    label: "Dryer",
    icon: PiHairDryer,
    description: "This property has a hair dryer",
  },
  {
    label: "Pool",
    icon: PiSwimmingPoolLight,
    description: "This property has a pool",
  },
  {
    label: "Elevator",
    icon: PiElevatorLight,
    description: "This property has an elevator",
  },
  {
    label: "TV",
    icon: IoTvOutline,
    description: "This property has a TV",
  },
  {
    label: "Washer",
    icon: PiWashingMachineLight,
    description: "This property has a washer",
  },
  {
    label: "Parking",
    icon: PiCarProfileLight,
    description: "This property has free car parking",
  },
  {
    label: "Bathhub",
    icon: PiBathtubLight,
    description: "This property has a bathhub",
  },
  {
    label: "Aid",
    icon: PiFirstAidKit,
    description: "This property has a first aid kit",
  },
  {
    label: "AC",
    icon: PiThermometerColdLight,
    description: "This property has a air conditioner",
  },
  {
    label: "Fan",
    icon: PiFanLight,
    description: "This property has celling fans",
  },
  {
    label: "Kitchen",
    icon: PiCookingPotLight,
    description: "This property has a kitchen",
  },
  {
    label: "Refrigerator",
    icon: CgSmartHomeRefrigerator,
    description: "This property has a refrigerator",
  },
  {
    label: "Microwave",
    icon: LuMicrowave,
    description: "This property has a microwave ",
  },
  {
    label: "Dishes",
    icon: PiForkKnife,
    description: "This property has a freezer ",
  },
  {
    label: "Oven",
    icon: PiOvenLight,
    description: "This property has an oven ",
  },
  {
    label: "Toaster",
    icon: GrToast,
    description: "This property has a toaster ",
  },
  {
    label: "Blender",
    icon: LiaBlenderSolid,
    description: "This property has a blender ",
  },
  {
    label: "Barbecue",
    icon: GiBarbecue,
    description: "This property has barbecue utensils",
  },
  {
    label: "Alarm",
    icon: PiFireSimple,
    description: "This property has a smoke alarm ",
  },
  {
    label: "Extenguisher",
    icon: PiFireExtinguisherLight,
    description: "This property has a fire extenguisher ",
  },
];
