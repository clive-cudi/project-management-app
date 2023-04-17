export const upperCaseFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const upperCaseFirstSentence = (sentence: string, separator?: string, includeSeparator?: boolean) => {
    return sentence.split(separator ?? " ").map((word) => {
        return upperCaseFirstLetter(word);
    }).join(includeSeparator === true ? separator : " ");
}

export const myCos = () => {
	return null;
}

export const getCountDownReturnValues = (countDown: number) => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds}
}

// helper function to get an element's exact position
function getPosition(el: HTMLElement | null) {
    var xPosition = 0;
    var yPosition = 0;
   
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
        var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
   
        xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
        yPosition += (el.offsetTop - yScrollPos + el.clientTop);
      } else {
        xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
      }
   
    //   el = el.offsetParent;
    }
    return {
      x: xPosition,
      y: yPosition
    };
  }

export function removeAtIndex<T>(array: T[], index: number) {
    return array.filter((_, i) => i !== index);
}

export { CMPNT_REF_REGEX, EMAIL_REGEX } from "./regex";

export function getUniqueListBy<T, K extends keyof T>(arr: T[], key: K): T[] {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}
