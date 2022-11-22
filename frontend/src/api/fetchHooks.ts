import useSWR from "swr";
import { SERVER_BASE } from "../constants";

export const useReagents = () => {
  const { data, error, mutate } = useSWR(SERVER_BASE + "reagent/all");

  return { data: data, error: error, mutate: mutate };
};

export const useDevices = () => {
  const { data, error, mutate } = useSWR(SERVER_BASE + "device/all");

  return { data: data, error: error, mutate: mutate };
};

export const useReagentsFromMethod = (methodId: number) => {
  const { data, error, mutate } = useSWR(
    SERVER_BASE + `method/${methodId}/reagents`
  );

  return { data: data, error: error, mutate: mutate };
};
