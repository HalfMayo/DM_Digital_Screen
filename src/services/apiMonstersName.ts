import supabase from "./supabase";

export async function getMonstersNames({
  filter,
}: {
  filter: { field: string; value: string | undefined } | null;
}) {
  let query = supabase.from("monsters").select("*");

  if (filter && filter.value)
    query = query.ilike(filter.field, `%${filter.value.toLowerCase()}%`);

  const { data, error } = await query;

  if (error) {
    throw new Error("Monsters could not be fetched");
  }

  return data;
}

export async function getMonsterInfo({ name }: { name: string }) {
  let query = supabase.from("monsters").select("*").eq("name", name).single();

  const { data, error } = await query;

  if (error) {
    throw new Error("Monster infos could not be fetched");
  }

  return data;
}
