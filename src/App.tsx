import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import SearchBox from "./components/SearchBox";
import DefectsReport from "./pages/DefectsReport";
import PressData from "./pages/PressData";
import { useQuery } from "@tanstack/react-query";
import { fetchTagsProData } from "./services/TagsProService";

function App() {
  const [boxId, setBoxId] = useState<string>("");

  // Si hay un BoxId podemos hacer la consulta a la API y mostrar los datos en los componentes correspondientes
  const { data: tagsProData } = useQuery({
    queryKey: ["tagsProData", boxId],
    queryFn: () => fetchTagsProData(Number(boxId)),
    enabled: !!boxId, // Solo ejecutar la consulta si boxId no es vacío
  });

  console.log(tagsProData);

  return (
    <div className="w-full justify-center items-center">
      <Header />
      <section className="sticky top-4 z-50 flex min-h-full w-full justify-center mt-12 -mb-16">
        <SearchBox onSearch={setBoxId} />
      </section>
      {tagsProData && tagsProData.length > 0 ? (
        <>
          <section className="flex justify-evenly items-center min-h-screen">
            <LeftPanel tagsProData={tagsProData} />
            <RightPanel tagsProData={tagsProData} />
          </section>
          <section className="flex flex-col justify-start min-h-screen text-center">
            <PressData />
          </section>
          <section className="flex justify-evenly items-center min-h-screen">
            <DefectsReport />
          </section>
        </>
      ) : (
        <>{console.log("Entre aqui")}</>
      )}
    </div>
  );
}

export default App;
