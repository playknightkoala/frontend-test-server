exports.isEmpty = (data) => {
  return (
    typeof data !== "number" &&
    typeof data !== "boolean" &&
    (!data || data === "undefined" || Object.keys(data).length === 0)
  );
};
