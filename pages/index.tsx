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
import { Area } from "../redux/types";
import FormSheet from "../components/FormSheet";
import AreaForm from "../components/area/AreaForm";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { setLoading } from "../redux/actions";
import { useForm } from "antd/lib/form/Form";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    await store.dispatch(getAreasThunk());
  }
);

const Home: NextPage = () => {
  const areas: Area[] = useSelector(getAreasSl);
  const loading: boolean = useSelector(getLoadingSl);
  const dispatch = useDispatch();
  const [areasFiltered, setAreasFiltered] = useState<Area[]>(areas);
  const [curArea, setCurArea] = useState<Area>({ name: null });
  const [type, setType] = useState<string>("Add");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const screen = useBreakpoint();

  const onFilterChange = (value: string) => {
    if (value !== "") {
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

  const reset = () => {
    setCurArea({ name: null });
    setIsFormOpen(false);
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <Head>
        <title>Cable Man</title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div className="wrapper">
        <div className="header">
          <Header
            title="Cable Man"
            back={false}
            showAdd
            filter={onFilterChange}
            loading={loading}
            isMobile={screen.xs}
            setIsOpen={setIsFormOpen}
            setType={setType}
          />
        </div>
        <div className="content">
          <Spin spinning={loading} indicator={antIcon}>
            <AreaItemList
              areas={areasFiltered}
              setType={setType}
              setIsOpen={setIsFormOpen}
              setCurArea={setCurArea}
            />
          </Spin>
        </div>
        <FormSheet
          title={`${type} Area`}
          isOpen={isFormOpen}
          isMobile={screen.xs}
          onClose={reset}
        >
          <AreaForm area={curArea} isMobile={screen.xs} type={type} />
        </FormSheet>
      </div>
    </>
  );
};

export default Home;
