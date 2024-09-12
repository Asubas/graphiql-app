import { js as jsBeautify } from 'js-beautify';

const jsonOptions = {
  indent_size: 4,
  indent_with_tabs: false,
  space_in_empty_paren: true,
  preserve_newlines: true,
  max_preserve_newlines: 2,
};

export const formatJson = (input: string): string | null => {
  try {
    const json = JSON.parse(input);
    return jsBeautify(JSON.stringify(json), jsonOptions);
  } catch (e) {
    return null;
  }
};

export const isValidJson = (input: string): boolean => {
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
};
