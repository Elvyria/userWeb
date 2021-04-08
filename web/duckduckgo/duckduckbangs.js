// ==UserScript==
// @name        DuckDuckGo Bangs
// @match       https://duckduckgo.com/*
// @grant       none
// @version     1.0
// @author      Elvyria
// @run-at      document-idle
// ==/UserScript==

if (window.top != window.self)
	return

const search_form = document.getElementById("search_form")
const input = document.getElementById("search_form_input")
const duckbar = document.getElementById("duckbar_static")

{
	const sep = document.createElement("span")
	sep.id = "duckbar_dynamic_sep"
	sep.className = "zcm__sep--h sep--before"

	const gBang = createLink("!g", () => {
		if (DDG.duckbar.activeTabId === "images") {
			bang_action("!gi")
			return
		}
		bang_action("!g")
	})

	duckbar.insertBefore(sep, duckbar.firstChild)
	duckbar.insertBefore(gBang, duckbar.firstChild)
}

function createLink(text, action) {
	const li = document.createElement("li")
	const a = document.createElement("a")

	li.className = "zcm__item"
	a.className = "zcm__link  js-zci-link"
	a.innerText = text
	a.onclick = () => {
		document.getElementsByClassName("is-active zcm__link")[0].classList.remove("is-active")
		a.className += " is-active"
		action()
	}
	a.href = "#"

	li.appendChild(a)
	return li
}

function bang_action(bang) {
	search(bang + " " + input.value)
}

function search(query) {
	input.value = query
	search_form.submit()
}
