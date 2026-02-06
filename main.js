import { poem } from './poem.js';

const rules = [
	{ title: 'size', key: 'size' },
	{ title: 'case', key: 'case' },
	{ title: 'weight', key: 'weight' },
	{ title: 'orientation', key: 'orientation' },
	{ title: 'motion', key: 'motion' }
];
const variations = ['01', '02', '03', '04'];

let currentRule = rules[0].key;
let currentVariation = variations[0];


function createNavElems() {
	const nav = document.getElementById('nav-bar');
	if (!nav) return;
	nav.innerHTML = '';
	const ul = document.createElement('ul');
	rules.forEach(rule => {
		const li = document.createElement('li');
		li.className = 'rule-group';
		li.textContent = rule.title;
		const varUl = document.createElement('ul');
		varUl.className = 'variations';
		variations.forEach(variation => {
			const varLi = document.createElement('li');
			const btn = document.createElement('button');
			btn.textContent = variation;
			btn.setAttribute('data-rule', rule.key);
			btn.setAttribute('data-variation', variation);
			varLi.appendChild(btn);
			varUl.appendChild(varLi);
		});
		li.appendChild(varUl);
		ul.appendChild(li);
	});
	nav.appendChild(ul);
}

function renderPoem() {
	const container = document.getElementById('poem-container');
	if (container) {
		container.textContent = `${currentVariation} - ${poem.full}`;
	}
}


function setupNavBar() {
	createNavElems();
	const nav = document.getElementById('nav-bar');
	if (nav) {
		nav.addEventListener('click', (e) => {
			if (e.target.tagName === 'BUTTON') {
				currentRule = e.target.getAttribute('data-rule');
				currentVariation = e.target.getAttribute('data-variation');
				renderPoem();
			}
		});
	}
}

setupNavBar();
renderPoem();
