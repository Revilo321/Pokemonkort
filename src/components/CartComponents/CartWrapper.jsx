import { useState } from "react";
import { CartDropdown } from "./CartDropdown";
import { CartIcon } from "./CartIcon";
import { Drawer } from "../Drawer";

export const CartWrapper = () => {
  const [showDropdown, setShowDropdown] = useState();
  return (
    <>
      <div onClick={() => setShowDropdown(!showDropdown)}>
        <CartIcon />
      </div>
      <Drawer isOpen={showDropdown} setIsOpen={setShowDropdown}>
        <CartDropdown setShowDropdown={setShowDropdown} />
      </Drawer>
    </>
  );
};
