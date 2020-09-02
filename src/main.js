const state = {
  start: 1,
  divideBy: 4,
  clicked: 1,
  height: window.screen.height,
  width: window.screen.width,
};

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createSquares(number) {
  for (let i = 0; i < number; i++) {
    const square = document.createElement('div');
    square.id = `${state.clicked}-${i}`;
    document.getElementById('app').appendChild(square);
    square.style.background = getRandomColor();
    square.style.border = '1px solid black';
    square.style.position = 'absolute';
    square.style.height = `${getRandomInt(state.height / (number * state.clicked))}px`;
    square.style.width = `${getRandomInt(state.width / (number * state.clicked))}px`;
    square.style.left = `${getRandomInt(state.width)}px`;
    square.style.top = `${getRandomInt(state.height)}px`;
    square.onclick = clickSquare;
  }
}

function clickSquare(e) {
  state.clicked += 1;
  const { id } = e.target;
  document.getElementById(id).outerHTML = '';
  createSquares(state.divideBy);
}

createSquares(state.start);
