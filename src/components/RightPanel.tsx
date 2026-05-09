import FactoryOption from "./FactoryOption";

export default function RightPanel() {
  return (
    <div className="flex justify-center">
      <div className="bg-[#121214] p-4 rounded-2xl w-full">
        <div className="flex w-full justify-end">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold">
          What factory features does this <br />
          box have?
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <FactoryOption factoryOptionName="Product Model" value="AK050" />
          <FactoryOption
            factoryOptionName="Window Zones"
            value="PO1, PO2"
            icon="bi bi-fullscreen"
          />
          <FactoryOption factoryOptionName="Box Type" value="Short Deck" />
          <FactoryOption
            factoryOptionName="Manufacturing date"
            value="03/03/2026"
            icon="bi bi-calendar3"
          />
          <FactoryOption
            factoryOptionName="Festoon SMC"
            value="0428602513"
            icon="bi bi-upc-scan"
          />
          <FactoryOption
            factoryOptionName="Mold/Cavity"
            value="2"
            icon="bi bi-aspect-ratio"
          />
          <FactoryOption factoryOptionName="Press" value="3" />
          <FactoryOption
            factoryOptionName="Festoon Supplier"
            value="Grabill"
            icon="bi bi-box-seam"
          />
        </div>
      </div>
    </div>
  );
}
