import Image from "next/image";
import router from "next/router";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface productProps {
  cart: any;
  addToCart: any;
  removeFromCart: any;
  subTotal: number;
}

const Checkout = ({
  cart,
  addToCart,
  removeFromCart,
  subTotal,
}: productProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phnumber, setPhnumber] = useState("");
  const [faddress, setFaddress] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pin, setPin] = useState("");

  const handleName = (e: any) => {
    setName(e.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePhNum = (e: any) => {
    setPhnumber(e.target.value);
  };
  const handleFAddress = (e: any) => {
    setFaddress(e.target.value);
  };
  const handleState = (e: any) => {
    setState(e.target.value);
  };
  const handleDistrict = (e: any) => {
    setDistrict(e.target.value);
  };
  const handlePin = (e: any) => {
    setPin(e.target.value);
  };

  const handleClick = () => {
    if (
      name == "" ||
      email == "" ||
      phnumber == "" ||
      faddress == "" ||
      state == "" ||
      district == "" ||
      pin == ""
    ) {
      toast.warn('Please fill up valid credentials', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1 className="text-center text-3xl font-semibold">Checkout</h1>
      <div className="container mx-auto px-2">
        {/* {redirect()} */}
        <div>
          <p className="text-xl my-4">1. Where to deliver</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Name"
              className="border h-8 rounded col-span-2"
              onChange={handleName}
            />
            <input
              type="text"
              placeholder="Email"
              className="border h-8 rounded md:col-span-1 col-span-2"
              onChange={handleEmail}
            />
            <input
              type="text"
              placeholder="Phone Number (India)"
              className="border h-8 rounded md:col-span-1 col-span-2"
              onChange={handlePhNum}
            />
            <textarea
              name="Full Address"
              className="border col-span-2"
              rows={4}
              placeholder="Full Address"
              onChange={handleFAddress}
            ></textarea>
            <input
              type="text"
              className="border h-8 rounded md:col-span-1 col-span-2"
              placeholder="State"
              onChange={handleState}
            />
            <input
              type="text"
              className="border h-8 rounded md:col-span-1 col-span-2"
              placeholder="District"
              onChange={handleDistrict}
            />
            <input
              type="text"
              className="border h-8 rounded md:col-span-1 col-span-2"
              placeholder="Pincode"
              onChange={handlePin}
            />
          </div>
        </div>
        <div>
          <p className="text-xl my-4">2. Review Products</p>
          <div className="bg-[#ff3e28] container mx-auto h-56 px-2 rounded overflow-y-auto overflow-x-hidden">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 font-semibold text-white">
                Your cart is empty!
              </div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <div className="flex gap-1 items-center my-2">
                  <img
                    src={cart[k].img}
                    alt="Item-Img"
                    className="rounded w-12 h-12"
                  />
                  <div className="text-white">
                    <p className="text-xs sm:text-base md:lext:lg w-[300px] xsm:w-[100px] smmd:w-[605px] lg:w-[1100px] whitespace-nowrap overflow-x-hidden text-ellipsis">
                      {cart[k].name}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-white">
                    <button
                      onClick={() => {
                        addToCart(k, cart[k].name, cart[k].price, cart[k].qty);
                      }}
                    >
                      <AiOutlinePlusCircle />
                    </button>

                    <p>{cart[k].qty}</p>
                    <button
                      onClick={() => {
                        removeFromCart(k, cart[k].qty);
                      }}
                    >
                      <AiOutlineMinusCircle />
                    </button>
                  </div>
                </div>
              );
            })}
            <p className="absolute bottom-0 text-white">Subtotal: {subTotal}</p>
          </div>
          <button className="button my-2" onClick={handleClick}>Order Now ( Cash on Delivery )</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
