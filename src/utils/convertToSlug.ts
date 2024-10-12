function convertToSlug(productName) {
  return productName
    .toLowerCase() // Convert all characters to lowercase
    .replace(/[^a-z0-9\s]/g, "") // Remove any special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim(); // Remove leading and trailing spaces
}

export default convertToSlug;
