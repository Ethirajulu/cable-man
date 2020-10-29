import { NextPage } from "next";
import Head from "next/head";
import { useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import { fetchAreas } from "../redux/thunk";

import { getAreasSl } from "../redux/selectors";
import AreaItemList from "../components/AreaItemList";
import Header from "../components/Header";

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  await store.dispatch(fetchAreas());
});

const Home: NextPage = () => {
  const areas = useSelector(getAreasSl);
  return (
    <>
      <Head>
        <title>Collector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title="Collector"
        back={false}
        filter={() => {}}
        loading={false}
      />
      <AreaItemList areas={areas} />
    </>
  );
};

export default Home;
