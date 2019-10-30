export const removeKeys = (obj: object, removeKeysArray: string[]) => {
  const clonedObject: any = { ...obj };
  for (const key of removeKeysArray) {
    delete clonedObject[key];
  }
  return clonedObject;
};