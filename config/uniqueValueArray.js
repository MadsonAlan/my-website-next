
export default function uniqueValueArray(originalArray){
    let filtering = []
    originalArray.map((projeto) => {
        filtering.push(projeto.language)
    })
    const filteredArray = [...new Set(filtering.sort())]
    return filteredArray
}