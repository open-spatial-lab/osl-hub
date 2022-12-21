export const deepIn = (obj: any, path: string) => {
    const toCheck = path.split('.');
    
    const checkStatements = toCheck.map((key, i) => {
        if (i === 0) {
            return key in obj;
        }
        let tempObj = obj;
        for (let j = 0; j < i; j++) {
            tempObj = tempObj[toCheck[j]];
        }
        return key in tempObj;
    })
    return checkStatements.reduce((acc, curr) => acc && curr, true);
}