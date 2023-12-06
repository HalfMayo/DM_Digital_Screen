import supabase from "./supabase";

export async function getConditions() {
  const { data, error } = await supabase.from("conditions").select("*");

  if (error) {
    throw new Error("Conditions could not be fetched");
  }

  return data;
}

export async function getSkills() {
  const { data, error } = await supabase.from("skills").select("*");

  if (error) {
    throw new Error("Skills could not be fetched");
  }

  return data;
}
