import { create } from "zustand";

interface ListingLocationStore {
  category: string;
  region: string;
  country: string;
  onSetLocation: (data: Partial<ListingLocationStore>) => void;
}

const useListingLocation = create<ListingLocationStore>((set) => ({
  category: "",
  region: "",
  country: "",
  onSetLocation: (data) => set((state) => ({ ...state, ...data })),
}));

export default useListingLocation;
