// return current date and time as a string in the format 'yyyy-mm-ddThh:mm'
const getCurrentDateTime = () => {
    const now = new Date()
    // Adjust for timezone
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    // Extract yyyy-mm-ddThh:mm
    return now.toISOString().slice(0, 16)
}

// capitalize first letter of a word
const capitalizeWord = word => word.charAt(0).toUpperCase() + word.slice(1)

// capitalize first letter of each word in a sentence
const capitalizeSentence = sentence => sentence.replace(/\b\w/g, c => c.toUpperCase())

// convert unit to rem
const pxToRem = px => {
    const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    return px / baseFontSize
}

export { getCurrentDateTime, capitalizeWord, capitalizeSentence, pxToRem }