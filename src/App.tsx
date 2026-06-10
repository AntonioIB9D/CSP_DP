import { useState } from "react";
import "./App.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import SearchBox from "./components/SearchBox";
import DefectsReport from "./pages/DefectsReport";
import PressData from "./pages/PressData";
import { useQuery } from "@tanstack/react-query";
import { fetchTagsProData } from "./services/TagsProService";
/* import { DotLottieReact } from "@lottiefiles/dotlottie-react"; */
import ProcessRegister from "./pages/ProcessRegister";
import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";

function App() {
  const [boxId, setBoxId] = useState<string>("");

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

  console.log("tagsProData:", tagsProData);

  const firstBoxStep = tagsProData ? tagsProData[0] : null;

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

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col items-center gap-2 min-h-screen justify-center">
        <Spinner color="accent" />
        <span className="text-muted">Loading data, please wait ...</span>
      </div>
    );
  }

  /*  if (error) {
    return toast.error(
      "Error fetching data for the selected press. Please try again.",
    );
  } */

  return (
    <div className="w-full justify-center items-center ">
      {/* <Header /> */}
      <section
        className={`${productModel !== "Not assigned" ? "mt-12" : "mt-6"} flex min-h-full w-full justify-center -mb-20 sticky top-6 z-50`}
      >
        <SearchBox onSearch={setBoxId} />
      </section>
      {tagsProData && tagsProData.length > 0 ? (
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
              <PressData />
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
      ) : tagsProData && tagsProData.length === 0 ? (
        <>
          <div className="flex flex-col gap-4 justify-center items-center h-full min-h-screen -mb-8">
            <h1 className="text-[#FF791B] font-bold text-5xl">Ooooooops!</h1>
            <p className="text-[#D5D3D3] text-2xl">
              Sorry, we do not have information about this product
            </p>
            <p className="text-[#6A889B] text-sm">
              Try searching another box ID or contact the IT department for more
              information
            </p>
          </div>
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
                className="w-230 h-165 rounded-none blur-[2px] opacity-65 lg:flex hidden"
              />
            </div>
          </div>
        </>
      )}
      <div className="w-full mt-2 text-[#7E8A9B] italic">
        CSP DP v1.1b powered by <b>IT Department</b> ©
      </div>
    </div>
  );
}

export default App;
