import { wordList } from "./wordlist.js";

export function wordwheel(letters) {
  if (!validate(letters)) return false;
  const letterArray = buildArray(letters);
  let matches = [];
  wordList.forEach((word) => {
    letterArray.forEach((exp) => {
      const re = new RegExp(exp, "g");
      if (re.test(word)) {
        matches.push(word);
      }
    });
  });
  return matches.length === 0 ? false : matches;
}

export function validate(letters) {
  const re = /^(?=[A-z?]{8}$)[A-z]*\?[A-z]*$/;
  return re.test(letters);
}

export function buildArray(letters) {
  let charString = letters.toLowerCase().replace("?", ".");
  let letterArray = [charString];
  for (let i = 1; i < 8; i++) {
    charString = charString.slice(i, 8) + charString.slice(0, i);
    letterArray.push(charString);
    letterArray.push(
      charString
        .split("")
        .reverse()
        .join("")
    );
  }
  return letterArray;
}
