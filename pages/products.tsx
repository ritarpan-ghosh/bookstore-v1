import Image from "next/image";
import Link from "next/link";
import connectDb from "../middleware/mongoose";
import Product from "../models/product";

interface productsProps {
  addToCart: any;
  products: any;
}

const Products = ({ addToCart, products }: productsProps) => {
  // console.log(products);
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.length === 0 && "There is no product."}
          {products.map((item: any) => {
            return (
              <div key={item._id} className="border rounded w-full mx-auto">
                <Link href={`/product/${item._id}`}>
                  <div className="h-60 md:h-64">
                    <Image
                      src={item.img}
                      alt=""
                      height={230}
                      width={230}
                      className="mx-auto"
                    />
                  </div>
                </Link>
                <div className="bg-gray-50 pt-2 pb-8 px-2">
                  <Link href={`/product/${item._id}`}>
                    <h1 className="text-xl mb-2 text-ellipsis lg:text-2xl overflow-hidden whitespace-nowrap">
                      {item.name}
                    </h1>
                  </Link>
                  <Link href={`/product/${item._id}`}>
                    <p className="text-lg">₹{item.price}</p>
                  </Link>
                  <button
                    className="button mt-4"
                    onClick={() => {
                      addToCart(item._id, item.name, item.price, 1, item.img);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;

export async function getServerSideProps(context: any) {
  await connectDb();
  let products = await Product.find();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}
