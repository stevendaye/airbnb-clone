"use client";

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  );
};
