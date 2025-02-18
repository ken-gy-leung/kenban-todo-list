// get tasks array from local storage
export const getLocalTaskStorage = key => {
    const allLocalTasks = localStorage.getItem(key)
    return allLocalTasks ? JSON.parse(allLocalTasks) : []
}

// store tasks array as string in local storage
export const setLocalTaskStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

// return current date and time as a string in the format 'yyyy-mm-ddThh:mm'
export const getCurrentDateTime = () => {
    const now = new Date()
    // Adjust for timezone
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    // Extract yyyy-mm-ddThh:mm
    return now.toISOString().slice(0, 16)
}

// capitalize first letter of a word
export const capitalizeWord = word => word.charAt(0).toUpperCase() + word.slice(1)

// capitalize first letter of each word in a sentence
export const capitalizeSentence = sentence => sentence.replace(/\b\w/g, c => c.toUpperCase())

// convert unit to rem
export const pxToRem = px => {
    const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    return px / baseFontSize
}

// export { getCurrentDateTime, capitalizeWord, capitalizeSentence, pxToRem }