const findInOArrayAndUpdate = (arr: Array<any>, search: object, newValue: object)=>{
    arr.forEach((el, i)=>{
        if(Object.keys(el).includes(Object.keys(search)[0])){
            if(el[Object.keys(search)[0]] !== Object.values(search)[0]) return
            Object.keys(newValue).forEach((key, keyIndex)=>{
                arr[i][key] = Object.values(newValue)[keyIndex]
            })
        }
    })
    return arr
}
export {findInOArrayAndUpdate}