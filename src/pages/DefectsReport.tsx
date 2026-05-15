import {
  ldSideA,
  ldSideB,
  ldSideC,
  ldSideD,
  sdSideA,
  sdSideB,
  sdSideC,
  sdSideD,
} from "../data/boxesZones";
import type { TagsData } from "../schemas/tagsPro.schema";

type DefectsReportPros = {
  tagsProData: TagsData | null | undefined;
  productModel:
    | "AK050"
    | "AK030"
    | "AK010"
    | "AK060"
    | "AK040"
    | "AK020"
    | "Not assigned";
};

export default function DefectsReport({
  tagsProData,
  productModel,
}: DefectsReportPros) {
  const firstBoxStep = tagsProData ? tagsProData[0] : null;
  const zone = firstBoxStep?.zona;
  const arraysld = { ldSideA, ldSideB, ldSideC, ldSideD };
  const arrayssd = { sdSideA, sdSideB, sdSideC, sdSideD };
  let foundIn: [string, string[]] | undefined;

  if (
    productModel === "AK020" ||
    productModel === "AK040" ||
    productModel === "AK060"
  ) {
    foundIn = Object.entries(arraysld).find(([, arr]) => {
      if (zone === undefined) return false;
      return Array.isArray(zone)
        ? zone.some((z) => arr?.includes(z))
        : arr?.includes(zone);
    });
  } else if (
    productModel === "AK010" ||
    productModel === "AK030" ||
    productModel === "AK050"
  ) {
    foundIn = Object.entries(arrayssd).find(([, arr]) => {
      if (zone === undefined) return false;
      return Array.isArray(zone)
        ? zone.some((z) => arr?.includes(z))
        : arr?.includes(zone);
    });
  } else {
    return null;
  }

  const boxImage =
    foundIn?.[0] === "ldSideA"
      ? "LD Side A"
      : foundIn?.[0] === "ldSideB"
        ? "LD Side B"
        : foundIn?.[0] === "ldSideC"
          ? "LD Side C"
          : foundIn?.[0] === "ldSideD"
            ? "LD Side D"
            : foundIn?.[0] === "sdSideA"
              ? "SD Side A"
              : foundIn?.[0] === "sdSideB"
                ? "SD Side B"
                : foundIn?.[0] === "sdSideC"
                  ? "SD Side C"
                  : foundIn?.[0] === "sdSideD"
                    ? "SD Side D"
                    : "";

  console.log("boxImage: ", boxImage);

  return (
    <div className="text-center">
      <div className="mt-16">
        <h1 className="text-2xl font-bold text-[#FF791B]">Defects Report</h1>
        <h1 className="text-4xl font-bold">Product Defects at your disposal</h1>
      </div>
      <div className="flex justify-evenly items-center gap-12 -mt-24">
        <div className="flex flex-col justify-evenly min-h-screen">
          <div className="flex flex-col gap-4 w-44 ml-12">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Defect
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">
              {firstBoxStep?.defecto}
            </p>
          </div>
          <div className="flex flex-col gap-4 w-44 mr-16">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Zone
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">{zone}</p>
          </div>
          <div className="flex flex-col gap-4 w-44 ml-12">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Process
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">
              {" "}
              {firstBoxStep?.procesoDetectado}
            </p>
          </div>
        </div>
        <div>
          <img
            src={`/Product Models/${boxImage}.png`}
            alt="Box sample"
            width={800}
            height={800}
          />
        </div>
        <div className="flex flex-col justify-evenly min-h-screen ">
          <div className="flex flex-col gap-4 w-44 mr-12">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Quality Release Date
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">
              {firstBoxStep?.qcFechaLibera[0] !== null
                ? firstBoxStep?.qcFechaLibera[0]
                : "NO DATA"}
            </p>
          </div>
          <div className="flex flex-col gap-4 w-44 ml-16">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Quality Inspector
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">
              {firstBoxStep?.qcLibera[0] !== null
                ? firstBoxStep?.qcLibera[0]
                : "NO DATA"}
            </p>
          </div>
          <div className="flex flex-col gap-4 w-44 mr-12">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Status
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">
              {firstBoxStep?.status}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-evenly -mt-40">
        <div className="flex flex-col gap-4 w-56">
          <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
            Rework Start Time
          </p>
          <p className="text-2xl text-[#D57F43] font-bold">
            {firstBoxStep?.rwFechaRecibe[0] !== null
              ? firstBoxStep?.rwFechaRecibe[0]
              : "NO DATA"}
          </p>
        </div>
        <div className="flex flex-col gap-4 w-56">
          <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
            Rework End Time
          </p>
          <p className="text-2xl text-[#D57F43] font-bold">
            {firstBoxStep?.rwFechaLibera[0] !== null
              ? firstBoxStep?.rwFechaLibera[0]
              : "NO DATA"}
          </p>
        </div>
      </div>
    </div>
  );
}
