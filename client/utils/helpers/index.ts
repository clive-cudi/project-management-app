export const upperCaseFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const upperCaseFirstSentence = (sentence: string, separator?: string, includeSeparator?: boolean) => {
    return sentence.split(separator ?? " ").map((word) => {
        return upperCaseFirstLetter(word);
    }).join(includeSeparator === true ? separator : " ");
}