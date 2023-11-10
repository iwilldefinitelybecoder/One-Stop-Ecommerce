export function binaryToDataURL(binaryData) {
  const blob = new Blob([binaryData]);
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}