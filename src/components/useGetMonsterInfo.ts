import { useQuery } from "react-query";
import { getMonsterInfo } from "../services/apiMonstersName";
import { useFighters } from "../contexts/FightersContext";

export default function useGetMonsterInfo(name: string) {
  const { isOpen } = useFighters();
  const { isLoading, data: monster } = useQuery({
    queryKey: ["monsters", isOpen],
    queryFn: () => getMonsterInfo({ name }),
  });

  return { isLoading, monster };
}
