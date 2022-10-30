export const upperCaseFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const upperCaseFirstSentence = (sentence: string, separator?: string, includeSeparator?: boolean) => {
    return sentence.split(separator ?? " ").map((word) => {
        return upperCaseFirstLetter(word);
    }).join(includeSeparator === true ? separator : " ");
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