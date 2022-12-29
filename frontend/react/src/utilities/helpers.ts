const trimText = (value: string) : string => {
  return value
    .replace(/^\s+/, '')
    .replace(/\s+$/, '')
    .replace(/\s{2,}/g, ' '); 
}
export {
  trimText
}