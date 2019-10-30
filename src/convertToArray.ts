export const convertToArray = (vals: object) => {
  return Array.isArray(vals) ? vals : [vals]
}