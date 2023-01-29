import { useRouter } from "next/router";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/product";

interface slugProps {
  addToCart: any;
  product: any;
  error: any;
}

const Post = ({ addToCart, product, error }: slugProps) => {
  const router = useRouter();
  const { slug } = router.query;
  // console.log(product);
  return (
    <div>
      {/* {product == null && 'Not found.'} */}
      <div className="text-lg">{error}</div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="container mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 h-auto w-full lg:pl-10 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-4">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>
                <button
                  className="button ml-auto"
                  onClick={() => {
                    addToCart(slug, product.name, product.price, 1, product.img);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Post;

export async function getServerSideProps(context: any) {
  await connectDb();
  let product = await Product.findOne({ _id: context.query.slug });
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
