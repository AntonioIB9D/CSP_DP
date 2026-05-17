import { useState } from "react";
import "./App.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import SearchBox from "./components/SearchBox";
import DefectsReport from "./pages/DefectsReport";
import PressData from "./pages/PressData";
import { useQuery } from "@tanstack/react-query";
import { fetchTagsProData } from "./services/TagsProService";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ProcessRegister from "./pages/ProcessRegister";

function App() {
  const [boxId, setBoxId] = useState<string>("");

  // Si hay un BoxId podemos hacer la consulta a la API y mostrar los datos en los componentes correspondientes
  const { data: tagsProData } = useQuery({
    queryKey: ["tagsProData", boxId],
    queryFn: () => fetchTagsProData(Number(boxId)),
    enabled: !!boxId, // Solo ejecutar la consulta si boxId no es vacío
  });

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

  return (
    <div className="w-full justify-center items-center">
      {/* <Header /> */}
      <section
        className={`${productModel !== "Not assigned" ? "mt-12" : "mt-6"} flex min-h-full w-full justify-center -mb-20 sticky top-6 z-50`}
      >
        <SearchBox onSearch={setBoxId} />
      </section>
      {tagsProData && tagsProData.length > 0 ? (
        <>
          <section className="flex justify-evenly items-center min-h-screen">
            <LeftPanel tagsProData={tagsProData} />
            <RightPanel tagsProData={tagsProData} />
          </section>

          {productModel !== "Not assigned" && (
            <section className="flex flex-col justify-start min-h-screen text-center">
              <PressData />
            </section>
          )}
          {productModel !== "Not assigned" && (
            <section className="flex justify-evenly items-center min-h-screen">
              <ProcessRegister tagsProData={tagsProData}/>
            </section>
          )}
          {productModel !== "Not assigned" && (
            <section className="flex justify-evenly items-center min-h-screen">
              <DefectsReport
                tagsProData={tagsProData}
                productModel={productModel}
              />
            </section>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 justify-center items-center mt-38 h-full">
            <h1 className="text-4xl font-bold">
              Welcome to <span className="text-[#D22D25]">CSP</span> Product{" "}
              <span className="text-[#009DFE]">Details</span>
            </h1>
            <p className="text-[#778A96]">
              Try searching a box ID to get the product information
            </p>

            <DotLottieReact
              src="/Global Network.json"
              autoplay
              loop
              className="-mt-28 w-175 h-175"
            />
            <div className="w-full flex flex-col justify-center items-center gap-4 -mt-28">
              <div className="flex justify-evenly items-center w-full">
                <div className="flex flex-col justify-center items-center gap-2 p-4 bg-[#171717] border border-[#262626] rounded-xl">
                  <div className="flex justify-evenly items-center w-full">
                    {/* <div className="bg-[#D70B60] rounded-xl p-2 w-10 h-10 flex justify-center items-center">
                      <i className="bi bi-router text-xl"></i>
                    </div> */}
                    <p className="text-[#D5D3D3] font-bold">Factory Info.</p>
                  </div>
                  <p className="text-[#949A9C]">
                    Get the factory details of the <br />
                    product
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 p-4 bg-[#171717] border border-[#262626] rounded-xl">
                  <div className="flex justify-evenly items-center w-full">
                    {/*  <div className="bg-[#FF6A32] rounded-xl p-2 w-10 h-10 flex justify-center items-center">
                      <i className="bi bi-exclamation-triangle text-xl"></i>
                    </div> */}
                    <p className="text-[#D5D3D3] font-bold">Product Defect</p>
                  </div>
                  <p className="text-[#949A9C]">
                    Get the defect associated to that <br />
                    product
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 p-4 bg-[#171717] border border-[#262626] rounded-xl">
                  <div className="flex justify-center items-center gap-2 w-full">
                    {/* <div className="bg-[#0076DF] rounded-xl p-2 w-10 h-10 flex justify-center items-center">
                      <i className="bi bi-clock text-xl"></i>
                    </div> */}
                    <p className="text-[#D5D3D3] font-bold">Time Line</p>
                  </div>
                  <p className="text-[#949A9C]">
                    Get the time line of this product in <br />
                    the process{" "}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 p-4 bg-[#171717] border border-[#262626] rounded-xl">
                  <div className="flex justify-center items-center gap-2 w-full">
                    {/* <div className="bg-[#0076DF] rounded-xl p-2 w-10 h-10 flex justify-center items-center">
                      <i className="bi bi-clock text-xl"></i>
                    </div> */}
                    <p className="text-[#D5D3D3] font-bold">Press Data</p>
                  </div>
                  <p className="text-[#949A9C]">
                    Get the parameters of the press used to <br /> mold this
                    product
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
