export function formatDate(date: Date) {
  const dataObject = new Date(date);
  const year = dataObject.getFullYear();
  const month = ('0' + (1 + dataObject.getMonth())).slice(-2);
  const day = ('0' + dataObject.getDate()).slice(-2);

  return [year, month, day].join('-');
}