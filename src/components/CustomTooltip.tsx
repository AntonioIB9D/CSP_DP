import { Progress } from "@heroui/react";
import { useMediaQuery } from "@react-hook/media-query";
import type { TooltipProps } from "recharts";

type NormalizedRow = {
  name: number;
  // cada ciclo tendrá su valor numérico
  [cycle: string]: number | string | null;
};

type CustomPayloadEntry = {
  dataKey?: string;
  name?: string;
  value?: number;
  color?: string;
  payload: NormalizedRow; // 👈 aquí decimos que payload es tu fila completa
};

export const CustomTooltip: React.FC<
  TooltipProps<number, string> & {
    payload?: CustomPayloadEntry[];
    label?: string | number;
    max: number;
    min: number;
    prom: number;
  }
> = (props) => {
  const { active, payload, label, max, min, prom } = props;
  const isMobile = useMediaQuery("(max-width: 900px)");

  if (active && payload && payload.length) {
    return (
      <div
        className={`bg-[#15181E] rounded-3xl shadow-md text-white flex flex-col gap-1 border-2 border-[#21242C] ${isMobile ? "w-34" : "w-100"}`}
      >
        <div className="flex items-center gap-4 p-2 border-b-2 border-[#21242C]">
          <div className="w-8 h-8 rounded-full bg-[#2A0F45] flex justify-center items-center">
            <i className="bi bi-graph-up text-[#0068FF] text-lg"></i>
          </div>
          <div className="flex flex-col">
            <h1 className={`font-bold text-md}`}>Chart Data</h1>
            <p className="text-[#949A9C] text-sm">Point #{label}</p>
          </div>
        </div>
        {!isMobile ? (
          <div className="flex justify-between pl-2 pr-2 pt-1 pb-1 border-b-2 border-[#21242C] gap-2">
            <div className="flex items-center gap-2">
              <i className="bi bi-bar-chart-line text-sm text-[#949A9C]"></i>
              <p className="text-sm text-[#949A9C]">AVG</p>
              <p className="text-sm text-white font-bold">{prom.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <i className="bi bi-arrow-up-short text-sm text-[#28A745]"></i>
              <p className="text-sm text-[#949A9C]">MAX</p>
              <p className="text-sm text-white font-bold">{max}</p>
            </div>
            <div className="flex items-center gap-2">
              <i className="bi bi-arrow-down-short text-sm text-[#D22D25]"></i>
              <p className="text-sm text-[#949A9C]">MIN</p>
              <p className="text-sm text-white font-bold">{min}</p>
            </div>
          </div>
        ) : null}
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-end gap-3 pr-2">
            <div className="text-sm text-[#949A9C]">
              <i className="bi bi-clock"></i> Start
            </div>
            <div className="text-sm text-[#949A9C]">
              <i className="bi bi-clock-history"></i> End
            </div>
          </div>
          <div className="flex flex-col gap-1 p-2">
            {payload.map((entry: (typeof payload)[0]) => (
              <div
                key={entry.dataKey}
                className="flex justify-between items-center"
              >
                <div
                  className={`rounded-full w-3 h-3 ${entry.color === "#F31260" ? "bg-[#F31260]" : entry.color === "#17C964" ? "bg-[#17C964]" : entry.color === "#F5A524" ? "bg-[#F5A524]" : entry.color === "#FF56AD" ? "bg-[#FF56AD]" : "bg-[#006FEE]"}`}
                ></div>
                <p className="text-sm text-[#949A9C] ">{entry.name}</p>
                {!isMobile ? (
                  <Progress
                    aria-label="Loading..."
                    className="w-32"
                    size="md"
                    value={entry.value}
                    maxValue={max}
                    color={
                      entry.color === "#F31260"
                        ? "danger"
                        : entry.color === "#17C964"
                          ? "success"
                          : entry.color === "#F5A524"
                            ? "warning"
                            : entry.color === "#FF56AD"
                              ? "secondary"
                              : "primary"
                    }
                    classNames={{
                      indicator:
                        entry.color === "#FF56AD" ? "bg-[#FF56AD]" : "",
                    }}
                  />
                ) : null}

                <p className="text-white font-bold">{entry.value}</p>
                <p>{`${
                  entry.payload?.[`${entry.dataKey}_inicio`]
                    ? (
                        entry.payload?.[`${entry.dataKey}_inicio`] as string
                      ).substring(0, 5)
                    : "-"
                }`}</p>

                <p>{` ${
                  entry.payload?.[`${entry.dataKey}_final`]
                    ? (
                        entry.payload?.[`${entry.dataKey}_final`] as string
                      ).substring(0, 5)
                    : "-"
                }`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
};
