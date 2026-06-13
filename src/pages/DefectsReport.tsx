import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1, // espera 1 segundo antes de empezar
      staggerChildren: 0.3, // cada hijo aparece con 2 segundos de diferencia
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
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

  return (
    <div className="text-center">
      <div className={zone && zone.length > 0 ? "mt-16" : "-mt-50"}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-[#FF791B]">Defects Report</h1>
          <h1 className="text-4xl font-bold">
            Product Defects at your disposal
          </h1>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {zone && zone.length > 0 ? (
          <>
            <div className="flex justify-evenly items-center gap-12 -mt-24">
              <div className="flex flex-col justify-evenly min-h-screen">
                <motion.div variants={itemVariants}>
                  <div className="flex flex-col gap-4 w-44 ml-12">
                    <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
                      Defect
                    </p>
                    <p className="text-2xl text-[#D57F43] font-bold">
                      {firstBoxStep?.defecto}
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="flex flex-col gap-4 w-44 mr-16">
                    <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
                      Zone
                    </p>
                    <p className="text-2xl text-[#D57F43] font-bold">{zone}</p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="flex flex-col gap-4 w-44 ml-12">
                    <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
                      Process
                    </p>
                    <p className="text-2xl text-[#D57F43] font-bold">
                      {" "}
                      {firstBoxStep?.procesoDetectado}
                    </p>
                  </div>
                </motion.div>
              </div>
              <motion.div variants={itemVariants}>
                <div>
                  {boxImage ? (
                    <img
                      src={`/Product Models/${boxImage}.png`}
                      alt="Box sample"
                      width={800}
                      height={800}
                    />
                  ) : (
                    <div className="w-200 h-200 flex flex-col justify-center items-center">
                      <p className="text-[#FF791B] text-2xl">
                        Product image not available
                      </p>
                      <p className="text-[#86868B]">
                        Zone can not be found in the product
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
              <div className="flex flex-col justify-evenly min-h-screen ">
                <motion.div variants={itemVariants}>
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
                </motion.div>
                <motion.div variants={itemVariants}>
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
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="flex flex-col gap-4 w-44 mr-12">
                    <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
                      Status
                    </p>
                    <p className="text-2xl text-[#D57F43] font-bold">
                      {firstBoxStep?.status}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="w-full flex justify-evenly -mt-40">
              <motion.div variants={itemVariants}>
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
              </motion.div>
              <motion.div variants={itemVariants}>
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
              </motion.div>
            </div>
          </>
        ) : (
          <div
            className={
              zone && zone.length > 0
                ? "flex flex-col items-center gap-12"
                : "flex flex-col items-center gap-12 mt-10"
            }
          >
            <motion.div variants={itemVariants}>
              <DotLottieReact
                src="/Tick Market.json"
                autoplay
                className="w-90 h-95"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <div
                className={
                  zone && zone.length > 0
                    ? "flex flex-col justify-evenly min-h-screen -mt-50"
                    : "flex flex-col justify-evenly -mt-20"
                }
              >
                <p className="text-2xl text-[#D57F43] font-bold">
                  This product does not have associated defects
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
