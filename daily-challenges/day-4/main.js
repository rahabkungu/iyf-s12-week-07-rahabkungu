//Refactor challenge

//Before (messy spaghetti code)
// function d(x) {
//   let b = localStorage.getItem(x);
//     return JSON.parse(b);
// }

//after(refactored clean code)

/**
 * safely retrieves and parse JSON data from localStorage.
 * @param {string} key - The localStorage key to query.
 * @return {Object|Array|null} Parsed data or null if an error occurs.
 */
export function getLocalStorageData(key) {
    try {
        const serializedData = localStorage.getItem(key);
 
        if (!serializedData) return null;

        return JSON.parse(serializedData);
    } catch (error) {
        console.error(`Failed to parse localStorage key "${key}:`, error);
        return null; //Graceful fallback instead of crashing execution

    }
}