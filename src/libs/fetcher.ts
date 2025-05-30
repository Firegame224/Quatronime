// Helper untuk fetching data jamak (array)
export async function fetcher({ port }: { port: string }) {
  const response = await fetch(port , {
    method: "GET",
  });
  const data = await response.json();
  return { data: data.data ?? [] ?? {}};
}

// Helper untuk fetching data tunggal (objek)
export async function fetchOne({port} : {port : string}) {
  const response = await fetch(port)
  const json = await response.json();
  const data = json.data
  return data
}