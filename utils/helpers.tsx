export function dataURLtoFile(dataUrl: string, filename: string) {
  let arr = dataUrl.split(','),
    //@ts-ignore
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function stringToDate(
  _date: string,
  _format: string,
  _delimiter: string,
) {
  var formatLowerCase = _format.toLowerCase();
  var formatItems = formatLowerCase.split(_delimiter);
  var dateItems = _date.split(_delimiter);
  var monthIndex = formatItems.indexOf('mm');
  var dayIndex = formatItems.indexOf('dd');
  var yearIndex = formatItems.indexOf('yyyy');
  var month = parseInt(dateItems[monthIndex]);
  month -= 1;
  var formatedDate = new Date(
    parseInt(dateItems[yearIndex]),
    month,
    parseInt(dateItems[dayIndex]),
  );
  return formatedDate;
}

export function handleErrors(fetchResponseError: string, status: number) {
  throw new Error(status + ' ' + fetchResponseError);
}

export async function filter<T>(
  arr: T[],
  callback: (item: T) => Promise<string | boolean | undefined>,
) {
  const fail = Symbol();
  return (
    await Promise.all(
      arr.map(async (item) => ((await callback(item)) ? item : fail)),
    )
  ).filter((i) => i !== fail);
}
