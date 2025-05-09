export async function fetcher({ port }: { port: string }) {
  const response = await fetch(port , {
    method: "GET",
    next: { revalidate: 0 },
  });
  const data = await response.json();
  return { data: data.data ?? [] };
}
