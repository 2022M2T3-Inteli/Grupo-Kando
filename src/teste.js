var arr = ['bob', 'o', 'bobo']

const index = arr.indexOf('bob')
if (index>-1) {
    arr.splice(index, 1)
}

console.log(index)
console.log(arr)
