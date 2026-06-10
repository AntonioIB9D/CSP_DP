import type { TagsData } from "../schemas/tagsPro.schema";
import FactoryOption from "./FactoryOption";

type RightPanelPros = {
  tagsProData: TagsData | null | undefined;
};

export default function RightPanel({ tagsProData }: RightPanelPros) {
  const firstBoxStep = tagsProData ? tagsProData[0] : null;

  const cavidad = firstBoxStep?.cavidad[0] || "-";

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

  const boxType =
    productModel === "AK010" ||
    productModel === "AK030" ||
    productModel === "AK050"
      ? "Short Deck"
      : productModel === "AK020" ||
          productModel === "AK040" ||
          productModel === "AK060"
        ? "Long Deck"
        : "-";

  const windowsZones =
    productModel === "AK010"
      ? "-"
      : productModel === "AK020"
        ? "-"
        : productModel === "AK030"
          ? "BL2, BL1"
          : productModel === "AK040"
            ? "BL2, BL1"
            : productModel === "AK050"
              ? "PO1, PO2, CP2, BL1, BL2"
              : productModel === "AK060"
                ? "PO1, PO2, CP2, BL1, BL2"
                : "-";

  const manufacturingDate = firstBoxStep?.time_stamp.split(" ") || "-";

  const pressNumberCut = firstBoxStep?.tag.charAt(0) || "-";
  const pressNumber =
    pressNumberCut === "1"
      ? "1"
      : pressNumberCut === "2"
        ? "2"
        : pressNumberCut === "3"
          ? "3"
          : "4";

  const shippingTape =
    productModel === "AK010"
      ? "8"
      : productModel === "AK020"
        ? "10"
        : productModel === "AK030"
          ? "8"
          : productModel === "AK040"
            ? "10"
            : productModel === "AK050"
              ? "8"
              : productModel === "AK060"
                ? "9"
                : "-";

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
          product have?
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <FactoryOption
            factoryOptionName="Product Model"
            value={productModel}
          />
          <FactoryOption
            factoryOptionName="Window Zones"
            value={windowsZones}
            icon="bi bi-fullscreen"
          />
          <FactoryOption factoryOptionName="Box Type" value={boxType} />
          <FactoryOption
            factoryOptionName="Manufacturing date"
            value={manufacturingDate[0]}
            icon="bi bi-calendar3"
          />
          <FactoryOption
            factoryOptionName="Festoon SMC"
            value={firstBoxStep?.serie}
            icon="bi bi-upc-scan"
          />
          <FactoryOption
            factoryOptionName="Mold/Cavity"
            value={cavidad}
            icon="bi bi-aspect-ratio"
          />
          <FactoryOption factoryOptionName="Press" value={pressNumber} />
          <FactoryOption
            factoryOptionName="Festoon Supplier"
            value={firstBoxStep?.supplierName}
            icon="bi bi-box-seam"
          />
          <FactoryOption
            factoryOptionName="Shipping Tape"
            value={shippingTape}
            /* icon="bi bi-box-seam" */
          />
        </div>
      </div>
    </div>
  );
}
