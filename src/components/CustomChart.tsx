import { useImperativeHandle, forwardRef, useRef } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toPng } from "html-to-image";
import type { PressDataS, PressItem } from "../schemas/tagsPro.schema";
import { CustomTooltip } from "./CustomTooltip";

type CustomChartProps = {
  iconType: string;
  chartName: string;
  codeChart: string;
  pressNumber?: string;
  data: PressDataS;
  boxId: string;
};

export type CustomChartRef = {
  getChartImage: () => Promise<string | null>;
};

const CustomChart = forwardRef<CustomChartRef, CustomChartProps>(
  ({ iconType, chartName, codeChart, data, pressNumber, boxId }, ref) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    // Exponemos la función getChartImage hacia el componente padre mediante la ref
    useImperativeHandle(ref, () => ({
      getChartImage: async () => {
        if (!chartContainerRef.current) return null;
        try {
          return await toPng(chartContainerRef.current, {
            cacheBust: true,
            backgroundColor: "#0d1117", // Fondo oscuro si tu interfaz usa dark theme
          });
        } catch (error) {
          console.error("Error capturando gráfica:", error);
          return null;
        }
      },
    }));

    type NormalizedRow = {
      name: number;
      // cada ciclo tendrá su valor numérico
      [cycle: string]: number | string | null;
    };

    const fieldMap: Record<string, keyof PressItem> = {
      "Platen Tonnage": "g3b_c2",
      "Shroud Vacuum": "g5d_c1",
      "Platen Referenced Position": "g5d_c3",
      "Tank Vacuum": "g5d_c4",
    };

    const firstValueArray = Object.values(data)[0];
    const startTime = firstValueArray.map((d) => d.inicio)[0];
    const endTime = firstValueArray.map((d) => d.final)[0];

    // Normalizacion de la data
    function normalizePressData(data: PressDataS, chartName: string) {
      const tiroKeys = Object.keys(data);
      const field = fieldMap[chartName]; // selecciona el campo correcto
      const length = Math.min(...tiroKeys.map((k) => data[k].length));

      const result: NormalizedRow[] = [];
      for (let i = 0; i < length && i < 500; i++) {
        const row: NormalizedRow = { name: i + 1 };
        tiroKeys.forEach((tiroKey, idx) => {
          const value = data[tiroKey][i][field];
          row[`Cycle ${idx + 1}`] = typeof value === "number" ? value : 0;
          row[`Cycle ${idx + 1}_inicio`] = data[tiroKey][i].inicio ?? null;
          row[`Cycle ${idx + 1}_final`] = data[tiroKey][i].final ?? null;
        });
        result.push(row);
      }
      return result;
    }

    // Calculo de Max, Min, AVG
    function calculateStats(data: NormalizedRow[]) {
      // Aplanamos todos los valores numéricos de los tiros
      const values: number[] = [];

      data.forEach((row) => {
        Object.entries(row).forEach(([key, value]) => {
          if (key !== "name" && typeof value === "number") {
            values.push(value);
          }
        });
      });

      const max = Math.max(...values);
      const min = Math.min(...values);
      const avg = values.reduce((sum, v) => sum + v, 0) / values.length;

      return { max, min, avg };
    }
    // Data para la grafica
    const chartData = data ? normalizePressData(data, chartName) : [];
    // Normalizacion de calc.Max Min AVG
    const stats = chartData
      ? calculateStats(chartData)
      : { max: 0, min: 0, avg: 0 };

    return (
      <div ref={chartContainerRef} className="p-4 bg-[#141414] rounded-xl">
        <div className="flex gap-4 mt-10 ml-8">
          <div className="bg-[#1E2229] p-4 rounded-2xl w-16 h-16">
            {iconType === "tonnage" ? (
              <i className="bi bi-speedometer text-3xl text-[#7E8A9A]"></i>
            ) : iconType === "shroudVac" ? (
              <i className="bi bi-fan text-3xl text-[#7E8A9A]"></i>
            ) : iconType === "referencedPos" ? (
              <i className="bi bi-geo-alt text-3xl text-[#7E8A9A]"></i>
            ) : (
              <i className="bi bi-box text-3xl text-[#7E8A9A]"></i>
            )}
          </div>
          <div className="flex flex-col gap-2 text-left">
            <p className="font-bold text-[#FFFFFF]">{chartName}</p>
            <p className="text-[#7E8A9A] font-bold">{codeChart}</p>
          </div>
        </div>
        <div className="flex justify-evenly items-center mr-8">
          <ResponsiveContainer width="85%" height={500}>
            <AreaChart
              data={chartData ? chartData : []} // Usamos solo el primer grupo de datos para el chart
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                {/* <linearGradient id="gradientValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />{" "} */}
                {/* verde */}
                {/*  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient> */}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
              <XAxis dataKey="name" />
              <YAxis
                domain={
                  pressNumber === "1" && chartName === "Platen Tonnage"
                    ? [0, 3500]
                    : pressNumber === "2" && chartName === "Platen Tonnage"
                      ? [0, 3500]
                      : pressNumber === "3" && chartName === "Platen Tonnage"
                        ? [0, 4000]
                        : [0, "auto"]
                }
              />
              <Tooltip
                content={
                  <CustomTooltip
                    max={stats.max}
                    min={stats.min}
                    prom={stats.avg}
                    boxId={boxId}
                  />
                }
              />
              {/*    <Legend
            iconType="none"
            onClick={(e) => {
              if (typeof e.dataKey === "string") {
                toggleCycle(e.dataKey);
              }
            }}
            formatter={(value) => (
              <span
                style={{
                  opacity: activeCycles.includes(value) ? 1 : 0.3,
                }}
              >
                <div className="flex justify-center items-center gap-2 ">
                  <div className={`rounded-full w-3 h-3`}></div>
                  <p className="font-bold text-sm hover:cursor-pointer">
                    {value}
                  </p>
                </div>
              </span>
            )}
          /> */}
              <Area
                type="monotone"
                dataKey="Cycle 1" // Usamos el primer valor del array para el dataKey
                stroke="#F31260"
                fill="url(#gradientValue)"
                strokeWidth={2}
                /* hide={!activeCycles.includes("Cycle 1")} */
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-evenly gap-16 h-full">
            <div className="flex flex-col gap-2 p-2">
              <p className="font-bold text-[#86868B]">
                {chartName === "Platen Tonnage"
                  ? " Max tonnage used"
                  : chartName === "Shroud Vacuum"
                    ? "Max inHg used"
                    : chartName === "Platen Referenced Position"
                      ? "Max mm used"
                      : "Max inHg used"}
              </p>
              <span className="text-[#FF791B] text-3xl font-bold">
                {stats.max}
                <span className="text-[#FF791B] text-sm">
                  {chartName === "Platen Tonnage"
                    ? "Tons"
                    : chartName === "Shroud Vacuum"
                      ? "inHg"
                      : chartName === "Platen Referenced Position"
                        ? "mm"
                        : "inHg"}
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <p className="font-bold text-[#86868B]">Molding time start</p>
              <span className="text-[#FF791B] text-3xl font-bold">
                {`${startTime?.split(":")[0]}:${startTime?.split(":")[1]}`} a.m.
              </span>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <p className="font-bold text-[#86868B]">Molding time end</p>
              <span className="text-[#FF791B] text-3xl font-bold">
                {`${endTime?.split(":")[0]}:${endTime?.split(":")[1]}`} a.m.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default CustomChart;
