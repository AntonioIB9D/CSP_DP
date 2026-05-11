export default function DefectsReport() {
  return (
    <div className="text-center">
      <div className="mt-16">
        <h1 className="text-2xl font-bold text-[#FF791B]">Defects Report</h1>
        <h1 className="text-4xl font-bold">Product Defects at your disposal</h1>
      </div>
      <div className="flex justify-evenly items-center gap-4 -mt-24">
        <div className="flex flex-col justify-evenly min-h-screen">
          <div className="flex flex-col gap-4 w-44 ml-12">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Defect
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">Fractura</p>
          </div>
          <div className="flex flex-col gap-4 w-44 mr-16">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Zone
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">M1</p>
          </div>
          <div className="flex flex-col gap-4 w-44 ml-12">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Process
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">INSP. PINTURA</p>
          </div>
        </div>
        <div>
          <img
            src="/Product Models/LD AKA060 SB.png"
            alt="Box sample"
            width={900}
            height={900}
          />
        </div>
        <div className="flex flex-col justify-evenly min-h-screen">
          <div className="flex flex-col gap-4 w-44 mr-12">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Reworker
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">12345</p>
          </div>
          <div className="flex flex-col gap-4 w-44 ml-16">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Quality Inspector
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">16518</p>
          </div>
          <div className="flex flex-col gap-4 w-44 mr-12">
            <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
              Status
            </p>
            <p className="text-2xl text-[#D57F43] font-bold">Sin liberar</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center -mt-40">
        <div className="flex flex-col gap-4 w-56">
          <p className="text-left border-b border-[#3A404A] text-[#86868B] text-sm font-bold pb-2">
            Rework Start Time
          </p>
          <p className="text-2xl text-[#D57F43] font-bold">
            15/03/2023 14:30 hrs
          </p>
        </div>
      </div>
    </div>
  );
}
