import type { TagsData } from "../schemas/tagsPro.schema";

type ProcessRegisterPros = {
  tagsProData: TagsData | null | undefined;
};

export default function ProcessRegister({ tagsProData }: ProcessRegisterPros) {
  const firstBoxStep = tagsProData ? tagsProData : null;

  const processOneData = firstBoxStep?.find((step) => step.proceso === 1);
  const processTwoData = firstBoxStep?.find((step) => step.proceso === 2);
  const processThreeData = firstBoxStep?.find((step) => step.proceso === 3);
  const processFourData = firstBoxStep?.find((step) => step.proceso === 4);
  const processFiveData = firstBoxStep?.find((step) => step.proceso === 5);
  const processSixData = firstBoxStep?.find((step) => step.proceso === 6);

  return (
    <div className="text-center">
      <div className="mt-28">
        <h1 className="text-2xl font-bold text-[#FF791B]">
          Process Registration
        </h1>
        <h1 className="text-4xl font-bold">
          Recording of product hours in the process
        </h1>
      </div>
      <div className="flex justify-evenly items-center gap-12 min-h-screen">
        <div className="flex justify-center gap-8 overflow-x-auto max-w-400">
          <div className="flex flex-col gap-4 w-125">
            <div className="p-4 bg-[#121214] rounded-2xl flex flex-col gap-16">
              <div className="flex justify-between">
                <div className="text-sm text-[#0068ED] bg-[#171E2D] rounded-2xl pr-2 pl-2 pt-1 pb-1 font-bold">
                  Process 1
                </div>

                <div className="text-sm flex justify-center items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0068ED]"></div>
                  <div className="text-[#778A96]">
                    {processOneData?.time_stamp.split(" ")[0]
                      ? "Registered"
                      : "Not Registered"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#171E2D] w-18 h-18 flex justify-center items-center">
                  <i className="bi bi-gear-wide-connected text-4xl text-[#0068ED]"></i>
                </div>
                <div className="font-bold text-xl ">Drill Entrance</div>
                <div className="flex justify-center items-center gap-2">
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-calendar-minus text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processOneData?.time_stamp.split(" ")[0]
                        ? processOneData.time_stamp.split(" ")[0]
                        : "--/--/----"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processOneData?.time_stamp.split(" ")[1]
                        ? processOneData.time_stamp.split(" ")[1]
                        : "--:--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#FF791B] font-bold">Drill Entrance. </span>
              <span className="text-[#778A96] whitespace-normal">
                Product register at the process 1 control point. <b>Date</b>:{" "}
                {processOneData?.time_stamp.split(" ")[0]
                  ? processOneData.time_stamp.split(" ")[0]
                  : "--/--/----"}
                , <b>Time</b>:{" "}
                {processOneData?.time_stamp.split(" ")[1]
                  ? processOneData.time_stamp.split(" ")[1]
                  : "--:--"}
                .
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-4 w-125">
            <div className="p-4 bg-[#121214] rounded-2xl flex flex-col gap-16">
              <div className="flex justify-between">
                <div className="text-sm text-[#13CB6C] bg-[#171E2D] rounded-2xl pr-2 pl-2 pt-1 pb-1 font-bold">
                  Process 2
                </div>
                <div className="text-sm flex justify-center items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#13CB6C]"></div>
                  <div className="text-[#778A96]">
                    {processTwoData?.time_stamp.split(" ")[0]
                      ? "Registered"
                      : "Not Registered"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#171E2D] w-18 h-18 flex justify-center items-center">
                  <i className="bi bi-box-arrow-right text-4xl text-[#13CB6C]"></i>
                </div>
                <div className="font-bold text-xl">Drill Exit</div>
                <div className="flex justify-center items-center gap-2">
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-calendar-minus text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processTwoData?.time_stamp.split(" ")[0]
                        ? processTwoData.time_stamp.split(" ")[0]
                        : "--/--/----"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processTwoData?.time_stamp.split(" ")[1]
                        ? processTwoData.time_stamp.split(" ")[1]
                        : "--:--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#FF791B] font-bold">Drill Exit. </span>
              <span className="text-[#778A96] whitespace-normal">
                Product register at the process 2 control point. <b>Date</b>:{" "}
                {processTwoData?.time_stamp.split(" ")[0]
                  ? processTwoData.time_stamp.split(" ")[0]
                  : "Not registered"}
                , <b>Time</b>:{" "}
                {processTwoData?.time_stamp.split(" ")[1]
                  ? processTwoData.time_stamp.split(" ")[1]
                  : "Not registered"}
                .
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-4 w-125">
            <div className="p-4 bg-[#121214] rounded-2xl flex flex-col gap-16">
              <div className="flex justify-between">
                <div className="text-sm text-[#FF6A32] bg-[#171E2D] rounded-2xl pr-2 pl-2 pt-1 pb-1 font-bold">
                  Process 3
                </div>
                <div className="text-sm flex justify-center items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF6A32]"></div>
                  <div className="text-[#778A96]">
                    {processThreeData?.time_stamp.split(" ")[0]
                      ? "Registered"
                      : "Not Registered"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#171E2D] w-18 h-18 flex justify-center items-center">
                  <i className="bi bi-paint-bucket text-4xl text-[#FF6A32]"></i>
                </div>
                <div className="font-bold text-xl">Paint Entrance</div>
                <div className="flex justify-center items-center gap-2">
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-calendar-minus text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processThreeData?.time_stamp.split(" ")[0]
                        ? processThreeData.time_stamp.split(" ")[0]
                        : "--/--/----"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processThreeData?.time_stamp.split(" ")[1]
                        ? processThreeData.time_stamp.split(" ")[1]
                        : "--:--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#FF791B] font-bold">Paint Entrance. </span>
              <span className="text-[#778A96] whitespace-normal">
                Product register at the process 3 control point. <b>Date</b>:{" "}
                {processThreeData?.time_stamp.split(" ")[0]
                  ? processThreeData.time_stamp.split(" ")[0]
                  : "Not registered"}
                , <b>Time</b>:{" "}
                {processThreeData?.time_stamp.split(" ")[1]
                  ? processThreeData.time_stamp.split(" ")[1]
                  : "Not registered"}
                .
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-4 w-125">
            <div className="p-4 bg-[#121214] rounded-2xl flex flex-col gap-16">
              <div className="flex justify-between">
                <div className="text-sm text-[#D70B60] bg-[#171E2D] rounded-2xl pr-2 pl-2 pt-1 pb-1 font-bold">
                  Process 4
                </div>
                <div className="text-sm flex justify-center items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#D70B60]"></div>
                  <div className="text-[#778A96]">
                    {processFourData?.time_stamp.split(" ")[0]
                      ? "Registered"
                      : "Not Registered"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#171E2D] w-18 h-18 flex justify-center items-center">
                  <i className="bi bi-droplet-half text-4xl text-[#D70B60]"></i>
                </div>
                <div className="font-bold text-xl">Paint Exit</div>
                <div className="flex justify-center items-center gap-2">
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-calendar-minus text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processFourData?.time_stamp.split(" ")[0]
                        ? processFourData.time_stamp.split(" ")[0]
                        : "--/--/----"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processFourData?.time_stamp.split(" ")[1]
                        ? processFourData.time_stamp.split(" ")[1]
                        : "--:--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#FF791B] font-bold">Paint Exit. </span>
              <span className="text-[#778A96] whitespace-normal">
                Product register at the process 4 control point. <b>Date</b>:{" "}
                {processFourData?.time_stamp.split(" ")[0]
                  ? processFourData.time_stamp.split(" ")[0]
                  : "Not registered"}
                , <b>Time</b>:{" "}
                {processFourData?.time_stamp.split(" ")[1]
                  ? processFourData.time_stamp.split(" ")[1]
                  : "Not registered"}
                .
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-4 w-125">
            <div className="p-4 bg-[#121214] rounded-2xl flex flex-col gap-16">
              <div className="flex justify-between">
                <div className="text-sm text-[#43A6FD] bg-[#171E2D] rounded-2xl pr-2 pl-2 pt-1 pb-1 font-bold">
                  Process 5
                </div>
                <div className="text-sm flex justify-center items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#43A6FD]"></div>
                  <div className="text-[#778A96]">
                    {processFiveData?.time_stamp.split(" ")[0]
                      ? "Registered"
                      : "Not Registered"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#171E2D] w-18 h-18 flex justify-center items-center">
                  <i className="bi bi-cpu text-4xl text-[#43A6FD]"></i>
                </div>
                <div className="font-bold text-xl">Assembly</div>
                <div className="flex justify-center items-center gap-2">
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-calendar-minus text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processFiveData?.time_stamp.split(" ")[0]
                        ? processFiveData.time_stamp.split(" ")[0]
                        : "--/--/----"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processFiveData?.time_stamp.split(" ")[1]
                        ? processFiveData.time_stamp.split(" ")[1]
                        : "--:--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#FF791B] font-bold">Assembly. </span>
              <span className="text-[#778A96] whitespace-normal">
                Product register at the process 5 control point. <b>Date</b>:{" "}
                {processFiveData?.time_stamp.split(" ")[0]
                  ? processFiveData.time_stamp.split(" ")[0]
                  : "Not registered"}
                , <b>Time</b>:{" "}
                {processFiveData?.time_stamp.split(" ")[1]
                  ? processFiveData.time_stamp.split(" ")[1]
                  : "Not registered"}
                .
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-4 w-125">
            <div className="p-4 bg-[#121214] rounded-2xl flex flex-col gap-16">
              <div className="flex justify-between">
                <div className="text-sm text-[#778A96] bg-[#171E2D] rounded-2xl pr-2 pl-2 pt-1 pb-1 font-bold">
                  Process 6
                </div>
                <div className="text-sm flex justify-center items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#778A96]"></div>
                  <div className="text-[#778A96]">
                    {processSixData?.time_stamp.split(" ")[0]
                      ? "Registered"
                      : "Not Registered"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#171E2D] w-18 h-18 flex justify-center items-center">
                  <i className="bi bi-box-seam text-4xl text-[#778A96]"></i>
                </div>
                <div className="font-bold text-xl">Shipping Tape</div>
                <div className="flex justify-center items-center gap-2">
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-calendar-minus text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processSixData?.time_stamp.split(" ")[0]
                        ? processSixData.time_stamp.split(" ")[0]
                        : "--/--/----"}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">
                      {processSixData?.time_stamp.split(" ")[1]
                        ? processSixData.time_stamp.split(" ")[1]
                        : "--:--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#FF791B] font-bold">Shipping Tape. </span>
              <span className="text-[#778A96] whitespace-normal">
                Product register at the process 6 control point. <b>Date</b>:{" "}
                {processSixData?.time_stamp.split(" ")[0]
                  ? processSixData.time_stamp.split(" ")[0]
                  : "Not registered"}
                , <b>Time</b>:{" "}
                {processSixData?.time_stamp.split(" ")[1]
                  ? processSixData.time_stamp.split(" ")[1]
                  : "Not registered"}
                .
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
