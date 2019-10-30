export function cloneDeep<T>(aObject: T): T {
  if (!aObject) {
    return aObject;
  }

  let v;
  let bObject: any = Array.isArray(aObject) ? [] : {};
  for (const k in aObject) {
    v = aObject[k];
    bObject[k] = typeof v === "object" ? cloneDeep(v) : v;
  }

  return bObject;
}
