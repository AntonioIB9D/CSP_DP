import type { TagsData } from "../schemas/tagsPro.schema";

type LeftPanelPros = {
  tagsProData: TagsData | null | undefined;
};

export default function LeftPanel({ tagsProData }: LeftPanelPros) {
  const firstBoxStep = tagsProData ? tagsProData[0] : null;

  // Option to product model
  const productModel =
    firstBoxStep?.parte === 10
      ? "AK050"
      : firstBoxStep?.parte === 11
        ? "AK030"
        : firstBoxStep?.parte === 12
          ? "AK010"
          : firstBoxStep?.parte === 20
            ? "AK060"
            : firstBoxStep?.parte === 21
              ? "AK040"
              : "AK020";

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
          src={`/Product Models/${productModel}.png`}
          alt="MDN"
          width={700}
          height={700}
        />
      </div>
    </div>
  );
}
