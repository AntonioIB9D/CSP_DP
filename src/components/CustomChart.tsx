import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type CustomChartProps = {
  iconType: string;
  chartName: string;
  codeChart: string;
  pressNumber?: string;
  /* data: PressData; */
};

export default function CustomChart({
  iconType,
  chartName,
  codeChart,
  /* pressNumber, */
}: CustomChartProps) {
  return (
    <div>
      <div className="flex gap-4  mt-10 ml-8">
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
            data={/* chartData ? chartData : */ []} // Usamos solo el primer grupo de datos para el chart
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
            /*  domain={
              pressNumber === "1" && chartName === "Platen Tonnage"
                ? [0, 3500]
                : pressNumber === "2" && chartName === "Platen Tonnage"
                  ? [0, 3500]
                  : pressNumber === "3" && chartName === "Platen Tonnage"
                    ? [0, 4000]
                    : [0, "auto"]
            } */
            />
            <Tooltip
            /* content={
              <CustomTooltip max={stats.max} min={stats.min} prom={stats.avg} />
            } */
            />
            {/*   <Legend
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
              3210
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
              06:11 a.m.
            </span>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <p className="font-bold text-[#86868B]">Molding time end</p>
            <span className="text-[#FF791B] text-3xl font-bold">
              06:11 a.m.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
