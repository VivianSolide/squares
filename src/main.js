class App {
  constructor(window) {
    const { height, width } = window.screen;
    this.height = height;
    this.width = width;
    this.split = 4;
    this.clicked = 0;
    this.crazy = false;
    this.interval = null;
    this.goldenNumber = 2.5;
  }

  static position(axis) {
    if (axis === 'x') {
      return Math.random() > 0.5 ? 'left' : 'right';
    }
    return Math.random() > 0.5 ? 'top' : 'bottom';
  }

  static getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  clickSquare(e) {
    this.clicked += 1;
    const { id } = e.target;
    document.getElementById(id).outerHTML = '';
    this.createSquares(this.split);
  }

  createSquares(number) {
    for (let i = 0; i <= number; i += 1) {
      const randomSize = this.constructor.getRandomInt(this.height / this.goldenNumber);
      const randomX = this.constructor.getRandomInt(this.width / this.goldenNumber);
      const randomY = this.constructor.getRandomInt(this.height / this.goldenNumber);

      const isViewableHeight = this.height < (randomSize + randomY);
      const isViewableWidth = this.width < (randomSize + randomX);
      const isViewable = isViewableHeight || isViewableWidth;

      if (isViewable) {
        this.createSquares(number);
      } else {
        const square = document.createElement('div');
        square.id = `${this.clicked}-${i}`;
        document.getElementById('app').appendChild(square);
        square.className = 'square';
        square.style.background = this.constructor.getRandomColor();
        square.style.position = 'absolute';
        square.style.height = `${randomSize}px`;
        square.style.width = `${randomSize}px`;
        square.style[this.constructor.position('x')] = `${randomX}px`;
        square.style[this.constructor.position('y')] = `${randomY}px`;
        square.onclick = this.clickSquare.bind(this);
      }
    }
  }

  setCrazyMode() {
    this.crazy = !this.crazy;
    this.moveSquares();
  }

  moveSquares() {
    if (this.crazy) {
      const squares = document.getElementsByClassName('square');
      this.interval = setInterval(() => {
        for (let i = 0; i < squares.length; i += 1) {
          const square = squares[i];
          square.style[this.constructor.position('y')] = `${this.constructor.getRandomInt(this.width / this.goldenNumber)}px`;
          square.style[this.constructor.position('x')] = `${this.constructor.getRandomInt(this.width / this.goldenNumber)}px`;
        }
      }, 2000);
    } else {
      clearInterval(this.interval);
    }
  }

  init() {
    const app = document.createElement('div');
    app.id = 'app';
    app.className = 'container';
    document.body.appendChild(app);
    document.ondblclick = this.setCrazyMode.bind(this);
    this.createSquares(this.clicked);
  }
}

new App(window).init();
