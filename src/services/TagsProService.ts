import axiosInstance from "../lib/axios";
import { FestoonData, TagsResponseSchema } from "../schemas/tagsPro.schema";

export const fetchTagsProData = async (boxId: number) => {
  try {
    const { data } = await axiosInstance.get(`/tags-prod/${boxId}`);
    const result = TagsResponseSchema.safeParse(data);

    if (!result.success) {
      console.warn("Fallo en la validación");
      console.log(result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFestoonByHour = async (
  pressNumber: number,
  confirmedHour: string,
  confirmedDate: string,
) => {
  try {
    const { data } = await axiosInstance.get(
      `/tags-prod/festoon/${pressNumber}/${confirmedHour}/${confirmedDate}`,
    );
    const result = FestoonData.safeParse(data);

    if (!result.success) {
      console.warn("Fallo en la validación");
      console.log(result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
};
