import { Button, DateField, Label, TimeField } from "@heroui/react";
import { Time, type DateValue } from "@internationalized/date";
import { useState } from "react";
import { fetchFestoonByHour } from "../services/TagsProService";
import { useQuery } from "@tanstack/react-query";
import type { TagsData } from "../schemas/tagsPro.schema";

type SearchFestoonPropos = {
  boxId: string;
  tagsProData: TagsData | null | undefined;
};

export default function SearchFestoon({ boxId }: SearchFestoonPropos) {
  const pressNumberCut = boxId?.charAt(0) || "-";
  const pressNumber =
    pressNumberCut === "1"
      ? "1"
      : pressNumberCut === "2"
        ? "2"
        : pressNumberCut === "3"
          ? "3"
          : "4";

  const [hourInput, setHourInput] = useState<Time | null>(null);
  const [dateInput, setDateInput] = useState<DateValue | null>(null);

  const [confirmedHour, setConfirmedHour] = useState<Time | null>(null);
  const [confirmedDate, setConfirmedDate] = useState<DateValue | null>(null);

  const { data } = useQuery({
    queryKey: ["tagsFestoonData", pressNumber, confirmedHour, confirmedDate],
    queryFn: () =>
      fetchFestoonByHour(
        Number(pressNumber),
        String(confirmedHour),
        String(confirmedDate),
      ),
    enabled:
      confirmedHour !== undefined &&
      confirmedHour !== null &&
      dateInput !== undefined &&
      dateInput !== null,
  });

  const searchFestoonData = () => {
    if (
      hourInput !== undefined &&
      hourInput !== null &&
      dateInput !== undefined &&
      dateInput !== null
    ) {
      setConfirmedHour(hourInput);
      setConfirmedDate(dateInput);
    }
  };

  console.log(data);

  return (
    <div className="flex flex-col w-[90%] h-full">
      <div className="bg-[#111111] p-4 rounded-xl w-full m-4 flex justify-center flex-col gap-6">
        <h1 className="text-3xl text-[#FF791B] font-bold text-center">
          Festoon searcher
        </h1>
        <p className="text-[#86868B]">
          We can not find information about that product, but you can search
          using a range hour
        </p>
        <div className="flex gap-6 items-center h-56">
          <div className="w-56 h-56">
            <div className="bg-[#000000] rounded-2xl p-6 flex flex-col justify-center items-center gap-4 w-full h-full">
              <div>
                <h2 className="text-[#86868B]">Press Select</h2>
              </div>
              <div>
                <h3 className={`text-[#D57F43] font-bold text-2xl`}>
                  {pressNumber}
                </h3>
              </div>
            </div>
          </div>
          <div className="w-56 h-56">
            <div className="bg-[#000000] rounded-2xl p-6 flex flex-col justify-center items-center gap-4 w-full h-full">
              <div>
                <h2 className="text-[#86868B]">Box Id</h2>
              </div>
              <div>
                <h3 className={`text-[#D57F43] font-bold text-2xl`}>{boxId}</h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start h-full">
            <DateField
              className="w-[256px]"
              name="date"
              value={dateInput}
              onChange={(value) => setDateInput(value)}
            >
              <Label>Date</Label>
              <DateField.Group>
                <DateField.Input>
                  {(segment) => <DateField.Segment segment={segment} />}
                </DateField.Input>
              </DateField.Group>
            </DateField>
            <TimeField
              className="w-[256px]"
              name="time"
              value={hourInput}
              onChange={(value) => setHourInput(value)}
            >
              <Label>Scanning Hour</Label>
              <TimeField.Group>
                <TimeField.Input>
                  {(segment) => <TimeField.Segment segment={segment} />}
                </TimeField.Input>
              </TimeField.Group>
            </TimeField>

            <Button className="w-full" onPress={searchFestoonData}>
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-[#111111] p-4 rounded-xl w-full m-4 flex justify-center flex-col gap-6">
        <h1 className="text-3xl text-[#FF791B] font-bold text-center">
          Result
        </h1>
        <p className="text-[#86868B]">
          In this section, appears the SMC used to make the product with the Box
          ID.
        </p>
        {data?.serie && data.supplierName ? (
          <div className="flex gap-6 items-center justify-center h-56">
            <div className="w-56 h-56">
              <div className="bg-[#000000] rounded-2xl p-6 flex flex-col justify-center items-center gap-4 w-full h-full">
                <div>
                  <h2 className="text-[#86868B]">Festoon SMC</h2>
                </div>
                <div>
                  <div
                    className="flex justify-center items-center flex-col gap-4
                  "
                  >
                    <i className="bi bi-upc-scan text-4xl text-center"></i>
                    <h3
                      className={`text-[#D57F43] font-bold text-2xl text-center`}
                    >
                      {data?.serie}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-56 h-56">
              <div className="bg-[#000000] rounded-2xl p-6 flex flex-col justify-center items-center gap-4 w-full h-full">
                <div>
                  <h2 className="text-[#86868B]">Festoon Supplier</h2>
                </div>
                <div>
                  <div>
                    <div
                      className="flex justify-center items-center flex-col gap-4
                  "
                    >
                      <i className="bi bi-box-seam text-4xl text-center"></i>
                      <h3
                        className={`text-[#D57F43] font-bold text-2xl text-center`}
                      >
                        {data?.supplierName}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
