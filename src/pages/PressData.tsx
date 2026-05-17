import { motion } from "framer-motion";
import CustomChart from "../components/CustomChart";

export default function PressData() {
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
          Molding parameters
        </h1>
        <h1 className="text-4xl font-bold">Parameters at your disposal</h1>
      </motion.div>

      {/* Cada chart se revela solo cuando entra en pantalla */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <CustomChart
          iconType="tonnage"
          chartName="Platen Tonnage"
          codeChart="G3B"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <CustomChart
          iconType="shroudVac"
          chartName="Shroud Vacuum"
          codeChart="G5D"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <CustomChart
          iconType="referencedPos"
          chartName="Platen Referenced Position"
          codeChart="G5D"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <CustomChart
          iconType="tankVac"
          chartName="Tank Vacuum"
          codeChart="G5D"
        />
      </motion.div>
    </div>
  );
}
