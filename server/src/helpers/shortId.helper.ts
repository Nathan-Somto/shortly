// 
const NUMBERS ='0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' as const;
const LOWERCASE = UPPERCASE.toLowerCase() as Lowercase<typeof UPPERCASE>;
/**
 * @description generates a unique id of length 5 using  numbers, uppercase and lowercase letters
 * @returns 
 */
export function shortId() {
    // pick 5 random numbers
    const randomNumbers = Array(5).fill(null).map(_ => NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
    //console.log("random numbers:", randomNumbers)
    // pick 5 random uppercase letters
    const uppercaseLetters = Array(5).fill(null).map(_ => UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)])
    //console.log("uppercase letters:", uppercaseLetters)
    // pick 5 random lowercase letters
    const lowercaseLetters = Array(5).fill(null).map(_ => LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)])
    //console.log("lowercaseLetters", lowercaseLetters)
    let shortId = ''
    // pick a number from 0-2 and 0-4  5 times
    for(let i = 0; i< 5; i++){
        const randomPick = Math.floor(Math.random() * 3) as 0 | 1 | 2;
        const randomIndex = Math.floor(Math.random() * 5);
        switch(randomPick){
            case 0:
                shortId += randomNumbers[randomIndex];
                break;
            case 1:
                shortId += uppercaseLetters[randomIndex];
                break;
            case 2:
                shortId += lowercaseLetters[randomIndex];
        }
    }
    return shortId;
}
//console.log("A short Id: ",shortId())