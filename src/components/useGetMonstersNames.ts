import { useQuery } from "react-query";
import { getMonstersNames } from "../services/apiMonstersName";
import { useFighters } from "../contexts/FightersContext";

export default function useGetMonstersNames() {
  const { inputValue } = useFighters();
  const filter = inputValue ? { field: "name", value: inputValue } : null;

  const { isLoading, data: monstersNames } = useQuery({
    queryKey: ["monsters", filter],
    queryFn: () => getMonstersNames({ filter }),
  });
  return { isLoading, monstersNames };
}
