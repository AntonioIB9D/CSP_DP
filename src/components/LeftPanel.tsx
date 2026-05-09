export default function LeftPanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#FF791B]">Product</h1>
        <p className="text-[#D5D3D3]">
          This product contains all window cutouts{" "}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <img
          src="/Product Models/AK050.png"
          alt="MDN"
          width={700}
          height={700}
        />
      </div>
    </div>
  );
}
