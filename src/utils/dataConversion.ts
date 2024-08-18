export const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
}

export const formatTimestamp = (timestamp: number): string => {
    // Create a Date object from the Unix timestamp (multiply by 1000 to convert seconds to milliseconds)
    const date = new Date(timestamp * 1000);

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    // Extract time components
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM or PM
    const amPm = hours >= 12 ? 'pm' : 'am';

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12; // Adjust for midnight (0 hours is 12am)

    // Format time string
    const timeString = `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}${amPm}`;

    // Format date string
    return `${day}-${month}-${year} ${timeString}`;
};
