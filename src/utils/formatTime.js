/**
 * Converts 24-hour time string ("HH:mm") to 12-hour format with Arabic periods ("hh:mm ص/م")
 * @param {string} time24
 * @returns {string}
 */
export const formatTime12 = (time24) => {
  if (!time24) return "";

  // Clean the input (some APIs might return "HH:mm (Timezone)")
  const cleanTime = time24.split(" ")[0];
  const [hours, minutes] = cleanTime.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes)) return time24;

  const period = hours >= 12 ? "م" : "ص";
  const hours12 = hours % 12 || 12;

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
};
