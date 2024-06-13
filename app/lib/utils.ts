import { Revenue } from './definitions';

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'INR',
  });
};

export const formatTimeStampDate = (timestampObject: {
  seconds: number;
  nanoseconds: number;
}) => {
  // Extract seconds and nanoseconds
  const { seconds, nanoseconds } = timestampObject;

  // Calculate milliseconds (considering potential edge cases)
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000); // More accurate calculation

  // Create a Date object from milliseconds
  const dateObject = new Date(milliseconds);
  if (isNaN(dateObject.getTime())) {
    throw new Error(
      'Invalid timestamp provided. Resulting date is outside valid range.',
    );
  }

  // Format the date and time using toLocaleString (customizable)
  const formattedDateTime = dateObject.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return formattedDateTime;
};

export const formatTimeStampTillDate = (timestampObject: {
  seconds: number;
  nanoseconds: number;
}) => {
  // Extract seconds and nanoseconds
  const { seconds, nanoseconds } = timestampObject;

  // Calculate milliseconds (considering potential edge cases)
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000); // More accurate calculation

  // Create a Date object from milliseconds
  const dateObject = new Date(milliseconds);
  if (isNaN(dateObject.getTime())) {
    throw new Error(
      'Invalid timestamp provided. Resulting date is outside valid range.',
    );
  }

  // Format the date and time using toLocaleString (customizable)
  const formattedDateTime = dateObject.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formattedDateTime;
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

function convertToUrlFormat(text) {
  // 1. Convert to lowercase
  const lowercaseText = text.toLowerCase();

  // 2. Trim leading and trailing whitespace
  const trimmedText = lowercaseText.trim();

  // 3. Replace middle spaces with hyphens using regular expression
  const regex = /\s+/g; // Match one or more whitespace characters
  const urlFormattedText = trimmedText.replace(regex, '-');

  return urlFormattedText;
}
