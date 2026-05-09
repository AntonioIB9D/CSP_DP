import "./App.css";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import SearchBox from "./components/SearchBox";
import DefectsReport from "./pages/DefectsReport";
import PressData from "./pages/PressData";

function App() {
  return (
    <div className="w-full justify-center items-center">
      <Header />
      <section className=" sticky top-4 z-50 flex min-h-full w-full justify-center mt-12 -mb-16">
        <SearchBox />
      </section>
      <section className="flex justify-evenly items-center min-h-screen">
        <LeftPanel />
        <RightPanel />
      </section>
      <section>
        <PressData />
      </section>
      <section>
        <DefectsReport />
      </section>
    </div>
  );
}

export default App;
