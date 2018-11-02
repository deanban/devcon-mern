const capitalizeEachLetter = str => {
  return str
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
};

module.exports = capitalizeEachLetter;
