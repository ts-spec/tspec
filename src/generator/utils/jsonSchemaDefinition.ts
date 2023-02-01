import { DefinitionOrBoolean } from "typescript-json-schema";

export const isDefinitionBoolean = (defOrBool: DefinitionOrBoolean): defOrBool is boolean => {
  if (defOrBool === true || defOrBool === false) {
    return true;
  }
  return false;
};
