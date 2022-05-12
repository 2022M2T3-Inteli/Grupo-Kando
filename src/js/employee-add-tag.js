var tagList = document.body.querySelector('#employee-tag-list')
var tagName

function newTagName() {
  tagList.innerHTML +=
    '<div id="new-tag-name"><input type="text" name="new-tag-name" id="new-tag-name" onchange="changeInputTagValue(this.value)"><button type="button" onclick="addTagElement()">ok</button></div>'
}
function changeInputTagValue(value) {
  tagName = value
}

function addTagElement() {
  document.getElementById('new-tag-name').remove()
  tagList.innerHTML += `<div id="${tagName}">${tagName}</div><button type="button" onclick="removeTagElement()">x</button>`
}

function removeTagElement() {
  document.querySelector('#tagName').remove()
}
