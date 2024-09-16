export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const truncateString = (inputString: string, maxLength: number) => {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.substring(0, maxLength) + '...';
  }
};

export interface Prescription {
  startDate: string; // Format: 'YYYY-MM-DD'
  frequency: number; // The number of days between doses
  durationInDays: number; // Total duration of the prescription in days
  prescriptionDosageTimings: string[]; // Times at which medication should be taken, e.g., ['09:00', '18:00']
}

export const dosageCodeToSchedule = (
  dosage: string,
  defaultTimes: string[] = ['9:00', '14:00', '18:00', '22:00'],
): string[] => {
  const scheduleParts = dosage.split('-');
  const output: string[] = [];

  scheduleParts.forEach((part, index) => {
    if (part === '1') {
      output.push(defaultTimes[index]);
    }
  });

  return output;
};

export function getTodayMedicationTimings(prescription: Prescription): string[] | null {
  const today = new Date();
  const startDate = new Date(prescription.startDate);

  // Calculate the difference in days
  const differenceInTime = today.getTime() - startDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  // Check if the prescription is still active and today is a day for medication
  if (
    differenceInDays <= prescription.durationInDays &&
    differenceInDays % prescription.frequency === 0
  ) {
    return prescription.prescriptionDosageTimings;
  }

  return null; // No medication today or prescription period has ended
}

export const formatDosageText = (text: string): string => {
  const formatted = text
    .replace(/[^0-9]/g, '') // Remove non-numeric characters
    .split('') // Split into individual characters
    .join('-'); // Join with dashes
  return formatted;
};
