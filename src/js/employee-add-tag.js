var tagList = document.body.querySelector('.employee-tag-list')
var tagName

// função que faz a caixa de input da tag aparecer, se o usuário clicar no "+"
function newTagName() {
  tagList.innerHTML +=
    '<div id="new-tag-name"><input type="text" name="new-tag-name" id="new-tag-name" class="tag" onchange="changeInputTagValue(this.value)"><button type="button" class="tag-button" onclick="addTagElement()">ok</button></div>'
}

// função que coleta o texto inserido na caixa de input da tag
function changeInputTagValue(value) {
  tagName = value
}

// função que remove a caixa de input da tag e adiciona ela a página do funcionário, quando o usuário clicar em "ok"
function addTagElement() {
  document.getElementById('new-tag-name').remove()
  tagList.innerHTML += `<div id="${tagName}" class="tag">${tagName}</div><button type="button" class="tag-button" name="${tagName}" onclick="removeTagElement(this)">x</button>`
}

// função que remove a tag, caso o usuário clique no "x"
function removeTagElement(el) {
  document.getElementById(el.name).remove()
  el.remove()
}
