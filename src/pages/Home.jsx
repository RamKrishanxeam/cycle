import { useEffect } from "react";
import Layout from "../layout/Layout";
import Banner from "./Banner";
import ExclusiveOffer from "./ExclusiveOffer";
import Sellers from "./Sellers";

const Home = () => {
  return (
    <>
      <Layout>
        <Banner />
        <ExclusiveOffer />
        {/* <Sellers /> */}
      </Layout>
    </>
  );
};
export default Home;
