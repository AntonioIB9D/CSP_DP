import CustomChart from "../components/CustomChart";

export default function PressData() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-[#FF791B]">
          Molding parameters
        </h1>
        <h1 className="text-4xl font-bold">Parameters at your disposal</h1>
      </div>
      {/* Component Call */}
      <CustomChart
        iconType="tonnage"
        chartName="Platen Tonnage"
        codeChart="G3B"
      />
      <CustomChart
        iconType="shroudVac"
        chartName="Shroud Vacuum"
        codeChart="G5D"
      />
      <CustomChart
        iconType="referencedPos"
        chartName="Platen Referenced Position"
        codeChart="G5D"
      />
      <CustomChart iconType="tankVac" chartName="Tank Vacuum" codeChart="G5D" />
    </>
  );
}
