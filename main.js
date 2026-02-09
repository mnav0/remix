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

const displayStanzas = (container, instances = 1, className = '') => {
  styledPoem.stanzas.forEach((stanzaObj, idx) => {
    const stanzaWrapper = document.createElement('div');
    stanzaWrapper.className = 'stanza-wrapper';
    for (let i = 0; i < instances; i++) {
      const div = document.createElement('p');
      div.textContent = stanzaObj.text;
      if (stanzaObj.class) {
        div.classList.add(stanzaObj.class);
      }
      div.classList.add('stanza-' + (idx + 1));
      div.classList.add('instance-' + (i + 1));
      stanzaWrapper.appendChild(div);
      container.appendChild(stanzaWrapper);
    }
  });
}

function displayStanzaGroups(container) {
  // Group first two stanzas
  const group1 = document.createElement('div');
  group1.className = 'cloud-group';
  for (let i = 0; i < 2; i++) {
    const stanzaObj = styledPoem.stanzas[i];
    const div = document.createElement('p');
    div.textContent = stanzaObj.text;
    if (stanzaObj.class) {
      div.classList.add(stanzaObj.class);
    }
    div.classList.add('stanza-' + (i + 1));
    group1.appendChild(div);
  }
  container.appendChild(group1);

  // Group last two stanzas
  const group2 = document.createElement('div');
  group2.className = 'cloud-group';
  for (let i = 2; i < 4; i++) {
    const stanzaObj = styledPoem.stanzas[i];
    const div = document.createElement('p');
    div.textContent = stanzaObj.text;
    if (stanzaObj.class) {
      div.classList.add(stanzaObj.class);
    }
    div.classList.add('stanza-' + (i + 1));
    group2.appendChild(div);
  }
  container.appendChild(group2);
}

const displayLongStanzas = (container, className = '') => {
	styledPoem.longStanzas.forEach((stanzaObj, idx) => {
  const p = document.createElement('p');
  p.textContent = stanzaObj.text;
  if (stanzaObj.class) {
    p.classList.add(stanzaObj.class);
  }
  p.classList.add('stanza-' + (idx + 1));
  container.appendChild(p);
});
}

const displaySplitStanzas = (container, className = '') => {
	styledPoem.splitStanzas.forEach((stanzaList, idx) => {
      const stanzaWrapper = document.createElement('div');
      stanzaWrapper.className = 'stanza-wrapper stanza-wrapper-' + (idx + 1);
      stanzaList.forEach((stanzaObj, i) => {
        const div = document.createElement('p');
        div.textContent = stanzaObj.text;
        if (stanzaObj.class) {
          div.classList.add(stanzaObj.class);
        }
        div.classList.add('stanza-' + (idx + 1));
        div.classList.add('instance-' + (i + 1));
        stanzaWrapper.appendChild(div);
        container.appendChild(stanzaWrapper);
      });
	});
}

const displayLines = (container, drawBrs = false, className = '') => {
	styledPoem.lines.forEach((lineObj, idx) => {
    if (lineObj.class === 'br' && !drawBrs) {
      return;
    }
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

function displayLinesWithWordAccents(container) {
  styledPoem.linesWithWordAccents.forEach((lineObj, idx) => {
    const p = document.createElement('p');
    const words = lineObj.text.split(/(\s+)/); // preserve spaces
    words.forEach(word => {
      const accent = lineObj.accents.find(a => a.word === word.trim());
      if (accent) {
        const span = document.createElement('span');
        span.textContent = word.trim();
        span.className = accent.class;
        p.appendChild(span);
      } else {
        p.appendChild(document.createTextNode(word));
      }
    });
    p.classList.add('line-' + (idx + 1));
    container.appendChild(p);
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
            displayLongStanzas(container);
          } else if (variation === '02') {
            displayLines(container);
          } else if (variation === '03') {
            displayStanzas(container);
          } else if (variation === '04') {
            invertColors(container);
            displaySplitStanzas(container);
          }
          break;
        case 'case':
          container.classList.add('case');
          container.classList.add('case-' + variation);
          if (variation === '01') {
            displayLines(container, true);
          } else if (variation === '02') {
            displaySplitStanzas(container);
          } else if (variation === '03') {
            displaySplitLines(container, 0, 'case-03-left', 'case-03-right');
          } else if (variation === '04') {
            invertColors(container);
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
            displayStanzas(container, 2);
          }
          break;
        case 'orientation':
          container.classList.add('orientation');
          container.classList.add('orientation-' + variation);
          if (variation === '01') {
            invertColors(container);
            displayLines(container, true);
          } else if (variation === '02') {
            displayStanzas(container);
          } else if (variation === '03') {
            invertColors(container);
            displayLinesWithWordAccents(container);
          } else if (variation === '04') {
            displayLines(container);
          }
          break;
        case 'motion':
          container.classList.add('motion');
          container.classList.add('motion-' + variation);
          if (variation === '01') {
            displayStanzaGroups(container);
          } else if (variation === '02') {
            displayStanzas(container);
          } else if (variation === '03') {
            displayStanzas(container);
          } else if (variation === '04') {
            displayStanzaGroups(container);
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
