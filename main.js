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
		div.className = (className || stanzaObj.class || '') + ' stanza-' + (idx + 1);
		container.appendChild(div);
	});
}

const displayLines = (container, className = '') => {
	styledPoem.lines.forEach((lineObj, idx) => {
		const div = document.createElement('p');
		div.textContent = lineObj.text;
		div.classList.add((className || lineObj.class));
    div.classList.add('line-' + (idx + 1));
    div.classList.add('stanza-' + lineObj.stanza);
		container.appendChild(div);
	});
}

function displayWords(container, className = '') {
  const p = document.createElement('p');
  p.className = 'words-text';
	styledPoem.words.forEach((wordObj, idx) => {
		const span = document.createElement('span');
		span.textContent = wordObj.text;
		span.className = (className || wordObj.class || '') + ' word-' + (idx + 1);
		p.appendChild(span);
	});
  container.appendChild(p);
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
			const div = document.createElement('p');
			div.textContent = lineObj.text;
			div.className = leftClass || lineObj.class || '';
			leftCol.appendChild(div);
		});
		const rightCol = document.createElement('div');
		rightCol.className = 'split-lines-right';
		split.right.forEach((lineObj, idx) => {
			const div = document.createElement('p');
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
			container.className = "";

      switch (rule) {
        case 'size':
          container.classList.add('size');
          container.classList.add('size-' + variation);
          if (variation === '01') {
            displayLines(container);
          } else if (variation === '02') {
            displayWords(container);
          } else if (variation === '03') {
            displayStanzas(container);
          } else if (variation === '04') {
            invertColors(container);
            displayLines(container);
          }
          break;
        case 'case':
          container.classList.add('case');
          container.classList.add('case-' + variation);
          if (variation === '01') {
            displayLines(container);
          } else if (variation === '02') {
            displayLines(container);
          } else if (variation === '03') {
            displaySplitLines(container, 0, 'case-03-left', 'case-03-right');
          } else if (variation === '04') {
            displayWords(container);
          }
          break;
        case 'weight':
          container.classList.add('weight');
          container.classList.add('weight-' + variation);
          if (variation === '01') {
            displayWords(container);
          } else if (variation === '02') {
            displaySplitLines(container, 0, 'weight-02-left', 'weight-02-right');
          } else if (variation === '03') {
            invertColors(container);
            displayStanzas(container);
          } else if (variation === '04') {
            displayLines(container);
          }
          break;
        case 'orientation':
          container.classList.add('orientation');
          container.classList.add('orientation-' + variation);
          if (variation === '01') {
            invertColors(container);
            displayLines(container);
          } else if (variation === '02') {
            displayStanzas(container);
          } else if (variation === '03') {
            invertColors(container);
            displaySplitLines(container, 'orientation-03-left', 'orientation-03-right');
          } else if (variation === '04') {
            displayLines(container);
          }
          break;
        case 'motion':
          container.classList.add('motion');
          container.classList.add('motion-' + variation);
          if (variation === '01') {
            displayStanzas(container);
          } else if (variation === '02') {
            displayStanzas(container);
          } else if (variation === '03') {
            displayStanzas(container);
          } else if (variation === '04') {
            displayStanzas(container);
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
	const container = document.getElementById('poem');
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
