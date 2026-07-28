import { useRef, useState } from "react";
import "./App.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import SearchBox from "./components/SearchBox";
import DefectsReport from "./pages/DefectsReport";
import PressData, { type PressDataRef } from "./pages/PressData";
import { useQuery } from "@tanstack/react-query";
import { fetchTagsProData } from "./services/TagsProService";
import ProcessRegister from "./pages/ProcessRegister";
import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import SearchFestoon from "./components/SearchFestoon";

function App() {
  const [boxId, setBoxId] = useState<string>("");

  // 1. Ref hacia PressData
  const pressDataRef = useRef<PressDataRef>(null);

  // Si hay un BoxId podemos hacer la consulta a la API y mostrar los datos en los componentes correspondientes
  const {
    data: tagsProData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tagsProData", boxId],
    queryFn: () => fetchTagsProData(Number(boxId)),
    enabled: !!boxId, // Solo ejecutar la consulta si boxId no es vacío
  });

  const firstBoxStep = tagsProData?.data ? tagsProData.data[0] : null;
  const pressNumber = boxId.split("")[0];

  const ak050 =
    firstBoxStep?.product[0] && firstBoxStep?.product[0].includes("AK050");
  const ak030 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK030");
  const ak010 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK010");
  const ak060 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK060");
  const ak040 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK040");
  const ak020 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK020");

  // Option to product model
  const productModel =
    firstBoxStep?.parte === 10 || ak050
      ? "AK050"
      : firstBoxStep?.parte === 11 || ak030
        ? "AK030"
        : firstBoxStep?.parte === 12 || ak010
          ? "AK010"
          : firstBoxStep?.parte === 20 || ak060
            ? "AK060"
            : firstBoxStep?.parte === 21 || ak040
              ? "AK040"
              : firstBoxStep?.parte === 22 || ak020
                ? "AK020"
                : "Not assigned";

  // 2. Función puente que llamará SearchBox
  const handlePrepareReportImages = async (): Promise<
    Record<string, string>
  > => {
    if (pressDataRef.current) {
      return await pressDataRef.current.getReportImages();
    }
    return {};
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col items-center gap-2 min-h-screen justify-center">
        <Spinner color="accent" />
        <span className="text-muted">Loading data, please wait ...</span>
      </div>
    );
  }

  const hasData =
    Array.isArray(tagsProData?.data) && tagsProData.data.length > 0;
  // CASO 1: Hay datos y el proceso es 1
  const isProcessOne = hasData && firstBoxStep?.proceso === 1;
  // CASO 2: Se realizó una búsqueda (boxId existe), la API respondió, pero NO trajo datos (o el proceso no es 1)
  const isFestoonCase =
    !isLoading &&
    !isFetching &&
    !!boxId &&
    !isProcessOne &&
    (!hasData || firstBoxStep?.proceso !== 1);

  return (
    <div className="w-full justify-center items-center ">
      {/* <Header /> */}
      <section
        className={`${productModel !== "Not assigned" ? "mt-12" : "mt-6"} flex min-h-full w-full justify-center -mb-20 sticky top-6 z-50`}
      >
        <SearchBox
          onSearch={setBoxId}
          tagsProData={tagsProData}
          onPrepareReportImages={handlePrepareReportImages}
        />
      </section>
      {isProcessOne ? (
        <>
          <section className="flex justify-evenly items-center min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <LeftPanel tagsProData={tagsProData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <RightPanel tagsProData={tagsProData} />
            </motion.div>
          </section>

          {productModel !== "Not assigned" && (
            <section className="flex flex-col justify-start min-h-screen text-center">
              <PressData
                ref={pressDataRef}
                tagsProData={tagsProData}
                pressNumber={pressNumber}
                boxId={boxId}
              />
            </section>
          )}
          {productModel !== "Not assigned" && (
            <section className="flex justify-evenly items-center min-h-[70vh]">
              <ProcessRegister tagsProData={tagsProData} />
            </section>
          )}
          {productModel !== "Not assigned" && (
            <section className="flex justify-evenly items-center min-h-[70vh]">
              <DefectsReport
                tagsProData={tagsProData}
                productModel={productModel}
              />
            </section>
          )}
        </>
      ) : isFestoonCase ? (
        <>
          <section className="flex justify-evenly items-center min-h-screen">
            {/*  */}
            <SearchFestoon boxId={boxId} />
          </section>
        </>
      ) : (
        <>
          <div className="flex gap-4 justify-evenly items-center h-full min-h-screen -mb-8">
            <div className="flex flex-col justify-evenly items-center gap-30">
              <div className="flex flex-col gap-4 p-2">
                <h1 className="text-5xl font-bold text-center">
                  Welcome to <span className="text-[#D22D25]">CSP</span> Product{" "}
                  <span className="text-[#009DFE]">Details</span>
                </h1>
                <p className="text-[#778A96] text-center">
                  Try searching a box ID to get the product information
                </p>
              </div>
              <div className="">
                <div className="flex justify-evenly items-center w-full gap-4 mt-4">
                  <div className="flex flex-col justify-center items-center gap-2 p-4 bg-[#15181E] rounded-xl">
                    <div className="flex flex-col gap-2 w-full justify-center items-center">
                      <div className="bg-[#132135] rounded-xl p-2 w-10 h-10 flex justify-center items-center">
                        <i className="bi bi-router text-xl text-[#50A2FF]"></i>
                      </div>
                      <p className="text-[#D5D3D3] font-bold">
                        Factory Information
                      </p>
                    </div>
                    <p className="text-[#949A9C] text-sm">
                      Get the factory details of the <br />
                      product
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2 p-4 bg-[#15181E] rounded-xl">
                    <div className="flex flex-col gap-2 w-full justify-center items-center">
                      <div className="bg-[#331516] rounded-xl p-2 w-10 h-10 flex justify-center items-center">
                        <i className="bi bi-exclamation-triangle text-xl text-[#FF6467]"></i>
                      </div>
                      <p className="text-[#D5D3D3] font-bold">Product Defect</p>
                    </div>
                    <p className="text-[#949A9C] text-sm">
                      Get the defect associated to that <br />
                      product
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2 p-4 bg-[#15181E] rounded-xl">
                    <div className="flex flex-col gap-2 w-full justify-center items-center">
                      <div className="bg-[#122B22] rounded-xl p-2 w-10 h-10 flex justify-center items-center">
                        <i className="bi bi-clock text-xl text-[#00D391]"></i>
                      </div>
                      <p className="text-[#D5D3D3] font-bold ">Time Line</p>
                    </div>
                    <p className="text-[#949A9C] text-sm">
                      Get the time line of this product in <br />
                      the process{" "}
                    </p>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <div className="flex justify-evenly items-center gap-2 p-4 bg-[#15181E] rounded-xl">
                    <div className="flex flex-col gap-2 justify-center items-center">
                      <div className="bg-[#301936] rounded-xl p-2 w-10 h-10 flex justify-center items-center">
                        <i className="bi bi bi-speedometer text-xl text-[#C17AFE]"></i>
                      </div>
                      <p className="text-[#D5D3D3] font-bold">Press Data</p>
                    </div>
                    <p className="text-[#949A9C] text-sm">
                      Get the parameters of the press used to mold this product
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              {/* <DotLottieReact
                src="/Group working character animation.json"
                autoplay
                loop
                className="w-155 h-165"
              /> */}
              <img
                src="/Drill Entrance Edited.png"
                alt="Data Illustration"
                className="w-210 h-145 rounded-none blur-[2px] opacity-65 lg:flex hidden"
              />
            </div>
          </div>
        </>
      )}
      <div className="w-full text-[#7E8A9B] italic">
        CSP DP v2.1b powered by <b>IT Department</b> ©
      </div>
    </div>
  );
}

export default App;
