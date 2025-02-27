import { useEffect } from "react";
import Layout from "../layout/Layout";
import Banner from "./Banner";
import ExclusiveOffer from "./ExclusiveOffer";

const Home = () => {
  return (
    <>
      <Layout>
        <Banner />
        <ExclusiveOffer />
      </Layout>
    </>
  );
};
export default Home;
