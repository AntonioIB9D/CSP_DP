import { ProgressBar } from "@heroui/react";
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
  boxId: string;
};

export const CustomTooltip: React.FC<
  TooltipProps<number, string> & {
    payload?: CustomPayloadEntry[];
    label?: string | number;
    max: number;
    min: number;
    prom: number;
    boxId: string;
  }
> = (props) => {
  const { active, payload, label, max, boxId } = props;
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

        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between gap-6 pr-2">
            <div className="text-sm text-[#949A9C] ml-4">Box Id</div>
            <div className="text-sm text-[#949A9C]">Value</div>
          </div>
          <div className="flex flex-col gap-1 p-2">
            {payload.map((entry: (typeof payload)[0]) => (
              <div
                key={entry.dataKey}
                className="flex justify-between items-center"
              >
                {/* <div
                  className={`rounded-full w-3 h-3 ${entry.color === "#F31260" ? "bg-[#F31260]" : entry.color === "#17C964" ? "bg-[#17C964]" : entry.color === "#F5A524" ? "bg-[#F5A524]" : entry.color === "#FF56AD" ? "bg-[#FF56AD]" : "bg-[#006FEE]"}`}
                ></div> */}
                <p className="text-sm text-[#949A9C] ">
                  {/* {entry.name} */} {boxId}
                </p>
                {!isMobile ? (
                  <ProgressBar
                    aria-label="Loading"
                    className="w-40"
                    value={entry.value}
                    maxValue={max}
                  >
                    {/* <ProgressBar.Output /> */}
                    <ProgressBar.Track>
                      <ProgressBar.Fill />
                    </ProgressBar.Track>
                  </ProgressBar>
                ) : null}

                <p className="text-white font-bold">{entry.value}</p>
                {/*  <p>{`${
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
                }`}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
};
