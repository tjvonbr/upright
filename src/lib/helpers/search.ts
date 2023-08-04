export function searchFilter(items: any[], query: string) {
  if (!query) {
    return items;
  }

  return items.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase())
  );
}
