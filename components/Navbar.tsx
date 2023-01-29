import Link from "next/link";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

interface cartProps {
  cart: any;
  addToCart: any;
  removeFromCart: any;
  subTotal: number;
}

const Navbar = ({ cart, addToCart, removeFromCart, subTotal }: cartProps) => {
  // console.log(cart)
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef<any>();
  return (
    <nav className="bg-[#cf1521] text-white font-theme overflow-x-hidden sticky top-0 z-40 shadow-xl mb-4">
      <div className="max-w-screen-xl mx-auto h-16 flex items-center justify-between px-2 lg:px-0">
        <div className="flex items-center">
          <button className="flex items-center text-2xl mr-1 md:hidden">
            {navOpen ? (
              <GiCancel
                onClick={() => {
                  setNavOpen(!navOpen);
                }}
              />
            ) : (
              <FaBars
                onClick={() => {
                  setNavOpen(!navOpen);
                }}
              />
            )}
          </button>
          <h1 className="text-2xl font-bold">Elite BookShop</h1>
        </div>
        <ul className="md:flex gap-10 hidden">
          <li
            className={`${
              router.pathname == "/" ? "text-white" : "text-gray-200"
            }`}
          >
            <Link href={"/"}>Home</Link>
          </li>
          <li
            className={`${
              router.pathname == "/about" ? "text-white" : "text-gray-200"
            }`}
          >
            <Link href={"/about"}>About</Link>
          </li>
          <li
            className={`${
              router.pathname == "/products" ? "text-white" : "text-gray-200"
            }`}
          >
            <Link href={"/products"}>Products</Link>
          </li>
          <li
            className={`${
              router.pathname == "/contact" ? "text-white" : "text-gray-200"
            }`}
          >
            <Link href={"/contact"}>Contact</Link>
          </li>
        </ul>
        <div className="flex items-center text-2xl gap-1">
          {/* <GiCancel /> */}
          <button onClick={toggleCart}>
            <BsFillCartFill />
          </button>
        </div>
        <ul
          className={`fixed top-16 ${
            navOpen ? "left-0" : "-left-full"
          } bg-[#940a1f] shadow-2xl h-screen w-full text-center text-xl transition-all z-50`}
        >
          <li
            className={`my-20 ${
              router.pathname == "/" ? "text-white" : "text-gray-200"
            }`}
          >
            <Link href={"/"}>Home</Link>
          </li>
          <li
            className={`my-20 ${
              router.pathname == "/about" ? "text-white" : "text-gray-200"
            }`}
          >
            <Link href={"/about"}>About</Link>
          </li>
          <li
            className={`my-20 ${
              router.pathname == "/products" ? "text-white" : "text-gray-200"
            }`}
          >
            <Link href={"/products"}>Products</Link>
          </li>
          <li
            className={`my-20 ${
              router.pathname == "/contact" ? "text-white" : "text-gray-200"
            }`}
          >
            <Link href={"/contact"}>Contact</Link>
          </li>
        </ul>
        <div
          // className={`bg-[#f74d40] fixed h-screen ${
          //   cartOpen ? "right-0" : "-right-full"
          // } w-[300px] top-0 transition-all z-[100] translate-x-0`}
          className={`bg-[#f74d40] fixed h-screen right-0 w-[300px] top-0 z-[100] transition-transform ${
            Object.keys(cart).length !== 0
              ? "translate-x-0"
              : "translate-x-full"
          }`}
          ref={ref}
        >
          <div className="flex items-center my-4 justify-between mx-6">
            <h1 className="text-xl">Cart</h1>
            <button className="text-2xl">
              <GiCancel onClick={toggleCart} />
            </button>
          </div>
          <ul className="mx-2">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 font-semibold">Your cart is empty!</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li className="flex justify-between items-center" key={k}>
                  <div className="flex gap-1 items-center">
                    <img
                      src={cart[k].img}
                      alt="Item-Img"
                      className="rounded w-12 h-12"
                    />
                    <div>
                      <p className="text-lg text-ellipsis w-40 overflow-hidden whitespace-nowrap">{cart[k].name}</p>
                      <p>₹{cart[k].price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        addToCart(
                          k,
                          cart[k].name,
                          cart[k].price,
                          cart[k].qty,
                          cart[k].img
                        );
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
                </li>
              );
            })}
          </ul>
          {Object.keys(cart).length > 0 && (
            <div className="absolute bottom-0 mb-4 px-4 flex justify-between w-[300px]">
              <p className="text-lg">
                SubTotal: <span className="font-semibold">₹{subTotal}</span>
              </p>
              <Link href={"/checkout"} className="button hover:bg-red-600">
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
