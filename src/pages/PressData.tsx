import { motion } from "framer-motion";
import { forwardRef, useImperativeHandle, useRef } from "react";
import CustomChart, { type CustomChartRef } from "../components/CustomChart";
import type { PressDataS, TagsData } from "../schemas/tagsPro.schema";

type PressDataPros = {
  tagsProData: TagsData | null | undefined;
  pressNumber: string;
  boxId: string;
};

export type PressDataRef = {
  getReportImages: () => Promise<Record<string, string>>;
};

const PressData = forwardRef<PressDataRef, PressDataPros>(
  ({ tagsProData, pressNumber, boxId }, ref) => {
    const PressDataList = tagsProData?.DataPressGrouped;
    const isEmpty =
      !PressDataList || Object.entries(PressDataList).length === 0;

    // 1. Crear 4 refs para las 4 gráficas
    const tonnageRef = useRef<CustomChartRef>(null);
    const shroudVacRef = useRef<CustomChartRef>(null);
    const refPosRef = useRef<CustomChartRef>(null);
    const tankVacRef = useRef<CustomChartRef>(null);

    // 2. Exponer la función getReportImages que tomará la captura de las 4 gráficas
    useImperativeHandle(ref, () => ({
      getReportImages: async () => {
        const images: Record<string, string> = {};

        if (tonnageRef.current) {
          const img = await tonnageRef.current.getChartImage();
          if (img) images["Platen Tonnage"] = img;
        }
        if (shroudVacRef.current) {
          const img = await shroudVacRef.current.getChartImage();
          if (img) images["Shroud Vacuum"] = img;
        }
        if (refPosRef.current) {
          const img = await refPosRef.current.getChartImage();
          if (img) images["Platen Referenced Position"] = img;
        }
        if (tankVacRef.current) {
          const img = await tankVacRef.current.getChartImage();
          if (img) images["Tank Vacuum"] = img;
        }

        return images;
      },
    }));

    return (
      <div>
        {/* Título: aparece primero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-[#FF791B]">
            Molding parameters{" "}
            <span className="text-[#86868B]">(Experimental)</span>
          </h1>
          <h1 className="text-4xl font-bold">Parameters at your disposal</h1>
        </motion.div>

        {!isEmpty ? (
          <>
            {/* Cada chart se revela solo cuando entra en pantalla */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <CustomChart
                ref={tonnageRef}
                iconType="tonnage"
                chartName="Platen Tonnage"
                codeChart="G3B"
                data={PressDataList as PressDataS}
                pressNumber={pressNumber}
                boxId={boxId}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <CustomChart
                ref={shroudVacRef}
                iconType="shroudVac"
                chartName="Shroud Vacuum"
                codeChart="G5D"
                data={PressDataList as PressDataS}
                boxId={boxId}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <CustomChart
                ref={refPosRef}
                iconType="referencedPos"
                chartName="Platen Referenced Position"
                codeChart="G5D"
                data={PressDataList as PressDataS}
                boxId={boxId}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <CustomChart
                ref={tankVacRef}
                iconType="tankVac"
                chartName="Tank Vacuum"
                codeChart="G5D"
                data={PressDataList as PressDataS}
                boxId={boxId}
              />
            </motion.div>
          </>
        ) : (
          <div className="flex flex-col justify-evenly min-h-screen -mt-50">
            <h1 className="text-2xl text-[#D57F43]">
              This product does not have press information to display
            </h1>
          </div>
        )}
      </div>
    );
  },
);

export default PressData;
