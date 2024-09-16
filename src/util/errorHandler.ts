type ErrorContext = {
  contextInfo?: string;
};

export class CustomError extends Error {
  constructor(message: string, public context?: ErrorContext) {
    super(message);
    this.name = 'CustomError';
  }
}

export const handleError = (error: CustomError): void => {
  console.log(`Error: ${error.message}`);
  if (error.context?.contextInfo) {
    console.log(`Context: ${error.context.contextInfo}`);
  }
};
