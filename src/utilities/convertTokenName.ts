/**
 * Converts a token name to camcelCase
 * 
 * @param tokenName string
 * @return convertedTokenName string [camelCase starting with lowerCase letter]
 */
const convertTokenName = (tokenName: string): string => {
  let convertedTokenName = tokenName
  return slugify(convertedTokenName)
}

function slugify(text) {
  return text.toString()
    .replace(/(^\w|\s\w)/g, m => m.toLowerCase()) // first letter of every word to lowercase
    .replace(/\s+\/\s+/g, '/')      // Remove spaces around /
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[\+\&\.\:]/g, '_')    // Replace some characters with _
    .replace(/[^\w\/\_\-]+/g, '')   // Remove all non-word chars (but - and /)
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


export default convertTokenName
