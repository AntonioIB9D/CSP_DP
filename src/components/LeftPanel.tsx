import type { TagsData } from "../schemas/tagsPro.schema";

type LeftPanelPros = {
  tagsProData: TagsData | null | undefined;
};

export default function LeftPanel({ tagsProData }: LeftPanelPros) {
  const firstBoxStep = tagsProData ? tagsProData[0] : null;

  const ak050 =
    firstBoxStep?.product[0] && firstBoxStep?.product[0].includes("AK050");
  const ak030 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK030");
  const ak010 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK010");
  const ak060 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK060");
  const ak040 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK040");
  const ak020 =
    firstBoxStep?.product[0] !== undefined &&
    firstBoxStep?.product[0].includes("AK020");

  // Option to product model
  const productModel =
    firstBoxStep?.parte === 10 || ak050
      ? "AK050"
      : firstBoxStep?.parte === 11 || ak030
        ? "AK030"
        : firstBoxStep?.parte === 12 || ak010
          ? "AK010"
          : firstBoxStep?.parte === 20 || ak060
            ? "AK060"
            : firstBoxStep?.parte === 21 || ak040
              ? "AK040"
              : firstBoxStep?.parte === 22 || ak020
                ? "AK020"
                : "Not assigned";

  return (
    <div className="flex flex-col gap-4">
      {productModel !== "Not assigned" && (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#FF791B]">Product</h1>
          <p className="text-[#D5D3D3]">
            {productModel === "AK010"
              ? "This product not contains window cutouts"
              : productModel === "AK020"
                ? "This product not contains window cutouts"
                : productModel === "AK030"
                  ? "This product contains 2 window cutouts"
                  : productModel === "AK040"
                    ? "This product contains 2 window cutouts"
                    : "This product contains all window cutouts (5)"}
          </p>
        </div>
      )}
      <div className="flex justify-center items-center">
        {productModel !== "Not assigned" && (
          <img
            src={`/Product Models/${productModel}.png`}
            alt="MDN"
            width={700}
            height={700}
          />
        )}
      </div>
    </div>
  );
}
