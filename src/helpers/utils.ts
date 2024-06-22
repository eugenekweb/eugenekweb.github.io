export function getCurrentDate(): string {
  const today = new Date();

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const day = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  return `${day.toString().padStart(2, "0")} ${month} ${year}`;
}

export function toCamelCase(propertyName: string): string {
  return propertyName.replace(/-([a-z])/g, function (word, firstLetter) {
    return firstLetter.toUpperCase();
  });
}

export function rgb(rgba: string): string {
  return rgba.replace(/,\s*\d+(\.\d+)?\)/, ")");
}
