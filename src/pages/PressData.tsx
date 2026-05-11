import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function PressData() {
  return (
    <div className="text-center min-h-screen">
      <h1 className="text-2xl font-bold text-[#FF791B]">Molding parameters</h1>
      <h1 className="text-4xl font-bold">Parameters at your disposal</h1>
      <div className="mt-4">
        <ResponsiveContainer width="98%" height={325}>
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
      </div>
      <div className="mt-4">
        <ResponsiveContainer width="98%" height={325}>
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
      </div>
      <div className="mt-4">
        <ResponsiveContainer width="98%" height={325}>
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
      </div>
      <div className="mt-4">
        <ResponsiveContainer width="98%" height={325}>
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
      </div>
    </div>
  );
}
