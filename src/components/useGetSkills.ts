import { useQuery } from "@tanstack/react-query";
import { getSkills } from "../services/apiRules";

export default function useGetSkills() {
  const { isLoading, data: skills } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  return { isLoading, skills };
}
