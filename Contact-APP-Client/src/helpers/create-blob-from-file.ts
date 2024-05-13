// Function to convert a File object to base64 string
export const convertBase64 = async (file?: File): Promise<string | ArrayBuffer | null> => {
  if (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader(); // Creating a new FileReader object

      // Reading the content of the file as a data URL
      fileReader.readAsDataURL(file);

      // Event handler for when the reading operation is successfully completed
      fileReader.onload = () => {
        resolve(fileReader.result); // Resolving the promise with the result (base64 string)
      };

      // Event handler for when an error occurs during the reading operation
      fileReader.onerror = (error) => {
        reject(error); // Rejecting the promise with the error
      };
    });
  } else {
    return null; // Returning null if no file is provided
  }
};
