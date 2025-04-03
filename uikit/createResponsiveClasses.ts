import { ResponsiveValue } from "./types";

const createResponsiveClasses = (propName: string, values: ResponsiveValue<unknown>): string[] => {
  if (!values) {
    throw new Error(`No value provided for ${propName}`);
  }

  if (typeof values === 'number' || typeof values === 'string') {
    return [`${propName}-${values}`];
  }

  return Object
    .entries(values)
    .map(([breakpoint, value]) => `${propName}-${breakpoint}-${value}`)
}

export default createResponsiveClasses;