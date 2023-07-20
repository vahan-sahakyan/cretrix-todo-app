export function getCurrentDateFormatted(): string {
  return new Date(Date.now()).toLocaleDateString("en-CA").replace(/\//g, "-");
}
