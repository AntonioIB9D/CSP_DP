import type { TagsData } from "../schemas/tagsPro.schema";

type ProcessRegisterPros = {
  tagsProData: TagsData | null | undefined;
};

export default function ProcessRegister({ tagsProData }: ProcessRegisterPros) {
  const firstBoxStep = tagsProData ? tagsProData : null;

  const processOneData = firstBoxStep?.map((step) => step.proceso === 1);

  console.log("processOneData: ", processOneData);

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
                  <div className="text-[#778A96]">Registered</div>
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
                    <p className="text-[#778A96]">16/5/2026</p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">08:15 A.M.</p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#D5D3D3] font-bold">Drill Entrance. </span>
              <span className="text-[#778A96] whitespace-normal">
                Registro del producto en el punto de control del proceso 1.
                Fecha: 16 May 2026, Hora: 08:15 AM.
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
                  <div className="text-[#778A96]">Registered</div>
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
                    <p className="text-[#778A96]">16/5/2026</p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">08:15 A.M.</p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#D5D3D3] font-bold">Drill Exit. </span>
              <span className="text-[#778A96] whitespace-normal">
                Registro del producto en el punto de control del proceso 2.
                Fecha: 16 May 2026, Hora: 08:25 AM.
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
                  <div className="text-[#778A96]">Registered</div>
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
                    <p className="text-[#778A96]">16/5/2026</p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">08:15 A.M.</p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#D5D3D3] font-bold">Paint Entrance. </span>
              <span className="text-[#778A96] whitespace-normal">
                Registro del producto en el punto de control del proceso 3.
                Fecha: 16 May 2026, Hora: 08:30 AM.
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
                  <div className="text-[#778A96]">Registered</div>
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
                    <p className="text-[#778A96]">16/5/2026</p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">08:15 A.M.</p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#D5D3D3] font-bold">Paint Exit. </span>
              <span className="text-[#778A96] whitespace-normal">
                Registro del producto en el punto de control del proceso 4.
                Fecha: 16 May 2026, Hora: 10:20 AM.
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
                  <div className="text-[#778A96]">Registered</div>
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
                    <p className="text-[#778A96]">16/5/2026</p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">08:15 A.M.</p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#D5D3D3] font-bold">Assembly. </span>
              <span className="text-[#778A96] whitespace-normal">
                Registro del producto en el punto de control del proceso 5.
                Fecha: 16 May 2026, Hora: 10:40 AM.
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
                  <div className="text-[#778A96]">Registered</div>
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
                    <p className="text-[#778A96]">16/5/2026</p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <i className="bi bi-clock text-[#3A404A]"></i>
                    <p className="text-[#778A96]">08:15 A.M.</p>
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span className="text-[#D5D3D3] font-bold">Shipping Tape. </span>
              <span className="text-[#778A96] whitespace-normal">
                Registro del producto en el punto de control del proceso 6.
                Fecha: 16 May 2026, Hora: 10:35 AM.
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
