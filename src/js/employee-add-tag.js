var tagList = document.body.querySelector('.employee-tag-list')
var tagName

function newTagName() {
  tagList.innerHTML +=
    '<div id="new-tag-name"><input type="text" name="new-tag-name" id="new-tag-name" class="tag" onchange="changeInputTagValue(this.value)"><button type="button" class="tag-button" onclick="addTagElement()">ok</button></div>'
}
function changeInputTagValue(value) {
  tagName = value
}

function addTagElement() {
  document.getElementById('new-tag-name').remove()
  tagList.innerHTML += `<div id="${tagName}" class="tag">${tagName}</div><button type="button" class="tag-button" name="${tagName}" onclick="removeTagElement(this)">x</button>`
}

function removeTagElement(el) {
  document.getElementById(el.name).remove()
el.remove()
}
