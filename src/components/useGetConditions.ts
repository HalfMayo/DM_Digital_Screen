import { useQuery } from "react-query";
import { getConditions } from "../services/apiRules";

export default function useGetConditions() {
  const { isLoading, data: conditions } = useQuery({
    queryKey: ["conditions"],
    queryFn: getConditions,
  });

  return { isLoading, conditions };
}
