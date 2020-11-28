import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../redux/store";
import { getAreasThunk } from "../redux/thunk";
import { getAreasSl, getLoadingSl } from "../redux/selectors";
import AreaItemList from "../components/area/AreaItemList";
import Header from "../components/Header";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useEffect, useState } from "react";
import { ADD_LABEL, Area, EMPTY_STRING } from "../redux/types";
import FormSheet from "../components/FormSheet";
import AreaForm from "../components/area/AreaForm";
import { Spin } from "antd";
import { setLoading } from "../redux/actions";
import AreaFooter from "../components/area/AreaFooter";
import { getTodaysCollectionThunk } from "../utils";
import { loadingIcon } from "../components/UtilComps";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    await store.dispatch(getAreasThunk());
    const totalAmount = await getTodaysCollectionThunk();
    return {
      props: {
        totalAmount,
      },
    };
  }
);

const EMPTY_AREA: Area = {
  name: null,
};

export interface HomeProps {
  totalAmount: number;
}

const Home: NextPage<HomeProps> = ({ totalAmount }) => {
  const areas: Area[] = useSelector(getAreasSl);
  const loading: boolean = useSelector(getLoadingSl);
  const dispatch = useDispatch();
  const [areasFiltered, setAreasFiltered] = useState<Area[]>(areas);
  const [curArea, setCurArea] = useState<Area>(EMPTY_AREA);
  const [type, setType] = useState<string>(ADD_LABEL);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const screen = useBreakpoint();

  const onFilterChange = (value: string) => {
    if (value !== EMPTY_STRING) {
      dispatch(setLoading(true));
      const filteredAreas = areas.filter(
        (area) => area.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      setAreasFiltered(filteredAreas);
      dispatch(setLoading(false));
    } else {
      setAreasFiltered(areas);
    }
  };

  useEffect(() => {
    reset();
    dispatch(setLoading(false));
    setAreasFiltered(areas);
  }, [areas]);

  const onAddClick = () => {
    setCurArea({ ...EMPTY_AREA });
    setIsFormOpen(true);
    setType(ADD_LABEL);
  };

  const reset = () => {
    setCurArea({ name: null });
    setIsFormOpen(false);
  };

  return (
    <>
      <Head>
        <title>Cable Man</title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>

      <div className="header">
        <Header
          title="Cable Man"
          back={false}
          showAdd
          filter={onFilterChange}
          loading={loading}
          isMobile={screen.xs}
          onAddClick={onAddClick}
        />
      </div>
      <div className="content_area">
        <Spin spinning={loading} indicator={loadingIcon}>
          <AreaItemList
            areas={areasFiltered}
            setType={setType}
            setIsOpen={setIsFormOpen}
            setCurArea={setCurArea}
          />
        </Spin>
      </div>
      <div className="footer_area">
        <AreaFooter totalAmount={totalAmount} />
      </div>
      <FormSheet
        title={`${type} Area`}
        isOpen={isFormOpen}
        isMobile={screen.xs}
        onClose={reset}
      >
        <AreaForm area={curArea} isMobile={screen.xs} type={type} />
      </FormSheet>
    </>
  );
};

export default Home;
