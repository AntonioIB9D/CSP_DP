import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import type { TagsData } from "../schemas/tagsPro.schema";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportPDF from "./ReportPDF";

type SearchBox = {
  boxId: string;
};

type searchBoxProps = {
  onSearch: (boxId: string) => void;
  tagsProData: TagsData | null | undefined;
};

export default function SearchBox({ onSearch, tagsProData }: searchBoxProps) {
  const { register, handleSubmit } = useForm<SearchBox>();

  const firstBoxStep = tagsProData ? tagsProData[0] : null;

  const onSubmit = (data: SearchBox) => {
    onSearch(data.boxId);
  };

  return (
    <div className="bg-[#141414] opacity-95 rounded-3xl pr-4 pl-4 pt-2 pb-2 flex flex-row justify-between items-center w-1/2 border-2 border-[#282828]">
      <div className="flex items-center w-full gap-1">
        <i className="bi bi-qr-code-scan text-[#3A404A]"></i>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full"
        >
          <div>
            <input
              id="boxId"
              className="w-full h-8 p-4 border border-[#141414] bg-[#141414] text-white focus:outline-none focus:border-[#141414] focus:ring-1 focus:ring-[#141414]"
              type="text"
              placeholder="4235185"
              {...register("boxId", {
                required: "Campo obligatorio",
                maxLength: 7,
                pattern: {
                  value: /^[0-9]{7}$/,
                  message: "Debe contener exactamente 7 dígitos",
                },
              })}
              onInput={(e) => {
                // elimina cualquier caracter no numérico y corta a 7 dígitos
                (e.target as HTMLInputElement).value = (
                  e.target as HTMLInputElement
                ).value
                  .replace(/\D/g, "")
                  .slice(0, 7);
              }}
            />
          </div>
          <div className="w-full flex justify-end gap-2">
            <Button
              className="h-8 flex justify-center items-center"
              type="submit"
            >
              Search <i className="bi bi-search"></i>
            </Button>
            <Button
              className="h-8 flex justify-center items-center"
              variant="danger-soft"
              isDisabled={
                tagsProData &&
                tagsProData?.length > 0 &&
                firstBoxStep?.proceso === 1
                  ? false
                  : true
              }
            >
              <PDFDownloadLink
                document={<ReportPDF data={tagsProData} />}
                fileName={`Report - ${firstBoxStep?.boxId}`}
              >
                <p>
                  Report <i className="bi bi-download"></i>
                </p>
              </PDFDownloadLink>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
