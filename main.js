import { poem, styledPoem } from './poem.js';

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
	titleLi.textContent = poem.title;
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
  activeNavButton();
}

const displayStanzas = (container, className = '') => {
	styledPoem.stanzas.forEach((stanzaObj, idx) => {
		const div = document.createElement('p');
		div.textContent = stanzaObj.text;
		div.className = className || stanzaObj.class || '';
		container.appendChild(div);
	});
}

const displayLines = (container, className = '') => {
	styledPoem.lines.forEach((lineObj, idx) => {
		const div = document.createElement('p');
		div.textContent = lineObj.text;
		div.className = className || lineObj.class || '';
		container.appendChild(div);
	});
}

function displayWords(container, className = '') {
	styledPoem.words.forEach((wordObj, idx) => {
		const span = document.createElement('span');
		span.textContent = wordObj.text;
		span.className = className || wordObj.class || '';
		container.appendChild(span);
		container.appendChild(document.createTextNode(' '));
	});
}

function displaySplitLines(container, leftClass = '', rightClass = '') {
	const wrapper = document.createElement('div');
	wrapper.className = 'split-lines-wrapper';
	const leftCol = document.createElement('div');
	leftCol.className = 'split-lines-left';
	styledPoem.splitLines.forEach(split => {
		if (!split) return;
		const wrapper = document.createElement('div');
		wrapper.className = 'split-lines-wrapper';
		const leftCol = document.createElement('div');
		leftCol.className = 'split-lines-left';
		split.left.forEach((lineObj, idx) => {
			const div = document.createElement('div');
			div.textContent = lineObj.text;
			div.className = leftClass || lineObj.class || '';
			leftCol.appendChild(div);
		});
		const rightCol = document.createElement('div');
		rightCol.className = 'split-lines-right';
		split.right.forEach((lineObj, idx) => {
			const div = document.createElement('div');
			div.textContent = lineObj.text;
			div.className = rightClass || lineObj.class || '';
			rightCol.appendChild(div);
		});
		wrapper.appendChild(leftCol);
		wrapper.appendChild(rightCol);
		container.appendChild(wrapper);
	});
}

const poemComponents = rules.map((rule, rIdx) =>
	variations.map((variation, vIdx) => {
		return function render(container) {
			container.innerHTML = "";
			container.classList.remove('inverted-colors');

      switch (rule) {
        case 'size':
          if (variation === '01') {
            displayLines(container, 'poem-line size-01');
          } else if (variation === '02') {
            displayWords(container, 'poem-word size-02');
          } else if (variation === '03') {
            displayStanzas(container, 'poem-stanza size-03');
          } else if (variation === '04') {
            invertColors(container);
            displayLines(container, 'poem-line size-04');
          }
          break;
        case 'case':
          if (variation === '01') {
            displayLines(container, 'poem-line case-01');
          } else if (variation === '02') {
            displayLines(container, 'poem-line case-02');
          } else if (variation === '03') {
            displaySplitLines(container, 0, 'poem-line case-03-left', 'poem-line case-03-right');
          } else if (variation === '04') {
            displayWords(container, 'poem-word case-04');
          }
          break;
        case 'weight':
          if (variation === '01') {
            displayWords(container, 'poem-word weight-01');
          } else if (variation === '02') {
            displaySplitLines(container, 0, 'poem-line weight-02-left', 'poem-line weight-02-right');
          } else if (variation === '03') {
            invertColors(container);
            displayStanzas(container, 'poem-stanza weight-03');
          } else if (variation === '04') {
            displayLines(container, 'poem-line weight-04');
          }
          break;
        case 'orientation':
          if (variation === '01') {
            invertColors(container);
            displayLines(container, 'poem-line orientation-01');
          } else if (variation === '02') {
            displayStanzas(container, 'poem-stanza orientation-02');
          } else if (variation === '03') {
            invertColors(container);
            displaySplitLines(container, 'poem-stanza orientation-03');
          } else if (variation === '04') {
            displayLines(container, 'poem-line orientation-04');
          }
          break;
        case 'motion':
          if (variation === '01') {
            displayStanzas(container, 'poem-stanza motion-01');
          } else if (variation === '02') {
            displayStanzas(container, 'poem-stanza motion-02');
          } else if (variation === '03') {
            displayStanzas(container, 'poem-stanza motion-03');
          } else if (variation === '04') {
            displayStanzas(container, 'poem-stanza motion-04');
          }
          break;
        default:
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

function activeNavButton() {
  const nav = document.getElementById('nav-bar');
  const buttons = nav.querySelectorAll('button');
  // add active only to the button that matches the current rule and variation
  buttons.forEach(btn => {
    const btnRuleIndex = parseInt(btn.getAttribute('data-rule-index'), 10);
    const btnVariation = parseInt(btn.getAttribute('data-variation'), 10);
    if (btnRuleIndex === currentRuleIndex && btnVariation === currentVariation) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function setupNavBar() {
  createNavElems();
  const nav = document.getElementById('nav-bar');
  if (nav) {
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        currentRuleIndex = parseInt(e.target.getAttribute('data-rule-index'), 10);
        currentVariation = parseInt(e.target.getAttribute('data-variation'), 10);
        activeNavButton();
        renderPoem();
      }
    });
  }
}

setupNavBar();
renderPoem();
