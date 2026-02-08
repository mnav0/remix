import { poem } from './poem.js';

const rules = ['size', 'case', 'weight', 'orientation', 'motion'];
const variations = ['01', '02', '03', '04'];

let currentRuleIndex = 0;
let currentVariation = 0;

function invertColors(container) {
	container.classList.add('inverted-colors');
}

function createNavElems() {
	const nav = document.getElementById('nav-bar');
	const ul = document.createElement('ul');
  const titleLi = document.createElement('li');
  titleLi.className = 'poem-title';
  titleLi.textContent = '"Student of Clouds" by Billy Collins';
  ul.appendChild(titleLi);

	rules.forEach((rule, rIdx) => {
		const li = document.createElement('li');
		li.className = 'rule-group';
		li.textContent = rule;
		const varUl = document.createElement('ul');
		varUl.className = 'variations';
		variations.forEach((variation, vIdx) => {
			const varLi = document.createElement('li');
			const btn = document.createElement('button');
			btn.textContent = variation;
			btn.setAttribute('data-rule-index', rIdx);
			btn.setAttribute('data-variation', vIdx);
			varLi.appendChild(btn);
			varUl.appendChild(varLi);
		});
		li.appendChild(varUl);
		ul.appendChild(li);
	});
	nav.appendChild(ul);
}


function displayStanzas(container, stanzaClass = '', stanzaTransform = s => s) {
	poem.stanzas.forEach((stanza, idx) => {
		const div = document.createElement('p');
		div.textContent = stanzaTransform(stanza, idx);
		if (stanzaClass) div.className = stanzaClass;
		container.appendChild(div);
	});
}

function displayLines(container, lineClass = '', lineTransform = l => l) {
	poem.lines.forEach((line, idx) => {
		const div = document.createElement('p');
		div.textContent = lineTransform(line, idx);
		if (lineClass) div.className = lineClass;
		container.appendChild(div);
	});
}

const poemComponents = rules.map((rule, rIdx) =>
	variations.map((variation, vIdx) => {
		return function render(container) {
			container.innerHTML = "";
			container.classList.remove('inverted-colors');

			if (rule === "size" && variation === "01") {
				displayLines(container, "poem-line size-01");
			} else if (rule === "case" && variation === "02") {
				displayStanzas(container, "poem-stanza case-02", s => s.toUpperCase());
			} else if (rule === "weight" && variation === "03") {
				invertColors(container);
				displayLines(container, "poem-line weight-03");
			} else {
				const div = document.createElement("div");
				div.textContent = poem.full;
				div.className = "poem-full";
				container.appendChild(div);
			}
		};
	})
);

function renderPoem() {
	const container = document.getElementById('poem-container');
	if (container) {
		poemComponents[currentRuleIndex][currentVariation](container);
	}
}


function setupNavBar() {
	createNavElems();
	const nav = document.getElementById('nav-bar');
	if (nav) {
		nav.addEventListener('click', (e) => {
			if (e.target.tagName === 'BUTTON') {
				currentRuleIndex = parseInt(e.target.getAttribute('data-rule-index'), 10);
				currentVariation = e.target.getAttribute('data-variation');
				renderPoem();
			}
		});
	}
}

setupNavBar();
renderPoem();
