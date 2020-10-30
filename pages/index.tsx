import { NextPage } from "next";
import Head from "next/head";
import { useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import { fetchAreas } from "../redux/thunk";
import { getAreasSl } from "../redux/selectors";
import AreaItemList from "../components/AreaItemList";
import Header from "../components/Header";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useState } from "react";
import { Area } from "../redux/types";
import FormSheet from "../components/FormSheet";
import AreaForm from "../components/AreaForm";

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  await store.dispatch(fetchAreas());
});

const Home: NextPage = () => {
  const areas: Area[] = useSelector(getAreasSl);
  const [areasFiltered, setAreasFiltered] = useState<Area[]>(areas);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const screen = useBreakpoint();

  const onFilterChange = (value: string) => {
    if (value !== "") {
      setLoading(true);
      const filteredAreas = areas.filter(
        (area) => area.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      setAreasFiltered(filteredAreas);
      setLoading(false);
    } else {
      setAreasFiltered(areas);
    }
  };

  return (
    <>
      <Head>
        <title>Cable Man</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title="Cable Man"
        back={false}
        filter={onFilterChange}
        loading={loading}
        isMobile={screen.xs}
        setIsOpen={setIsFormOpen}
      />
      <div className="main">
        <AreaItemList areas={areasFiltered} isMobile={screen.xs} />
      </div>
      <FormSheet isOpen={isFormOpen} setIsOpen={setIsFormOpen}>
        <AreaForm setIsOpen={setIsFormOpen} />
      </FormSheet>
    </>
  );
};

export default Home;
