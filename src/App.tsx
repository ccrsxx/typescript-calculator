import { Component } from 'react';
import { Display, Buttons, Footer } from './components';

interface AppStates {
  formula: [] | string[];
  current: string;
  prevInput: string;
  doneCalculating: boolean;
}

class App extends Component<{}, AppStates> {
  operator: string[] = ['+', '-', '/', '*'];

  constructor(props: {}) {
    super(props);
    this.state = {
      formula: [],
      current: '0',
      prevInput: '',
      doneCalculating: false
    };
    this.handleNumber = this.handleNumber.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(input: string) {
    // clear the display after done calculating and inputting something
    if (this.state.doneCalculating) this.clearDisplay();

    switch (input) {
      case 'AC':
        this.clearDisplay();
        break;
      case 'DEL':
        this.handleBackspace();
        break;
      case '+':
      case '-':
      case '/':
      case '*':
        this.handleOperator(input);
        break;
      case '=':
        this.calculate();
        break;
      default:
        this.handleNumber(input);
    }
  }

  handleNumber(number: string) {
    // do nothing if there's already a decimal point in the current number and the user inputs a decimal point
    // this prevents multiple dots from being added
    if (this.state.current.includes('.') && number === '.') return;

    // remove everything except dot and numbers
    // this prevent operators from being added after selecting a operator
    if (/[^.\d]/.test(this.state.current)) {
      this.setState((state) => ({
        current: state.current.slice(1)
      }));
    }

    const formula = this.state.formula.join('');

    // limit zero to one times before decimal point
    // this prevent zero from being added onto the first of formula
    if (formula.startsWith('0') && formula.charAt(1) !== '.') {
      this.setState((state) => ({
        formula: state.formula.slice(1),
        prevInput: ''
      }));
    }

    this.setState((state) => ({
      current: state.current === '0' ? number : state.current + number,
      formula:
        number !== '.' && state.prevInput === '0' && state.current === '0'
          ? state.formula
          : [...state.formula, number],
      prevInput: number
    }));
  }

  handleOperator(operator: string) {
    this.setState((state) => ({
      formula:
        state.formula.length !== 0 && this.operator.includes(state.prevInput) // formula is not empty
          ? [...state.formula.slice(0, -1), operator] // and the previous input was an operator
          : state.formula.length !== 0 // formula is not empty after first input
          ? [...state.formula, operator]
          : state.formula, // when first input happens
      current: operator,
      prevInput: operator
    }));
  }

  handleBackspace() {
    this.state.current &&
      this.setState((state) => ({
        current: state.current.slice(0, -1),
        formula: state.formula.slice(0, -1)
      }));
  }

  calculate() {
    const formula = this.state.formula.join('');

    // do nothing if the formula ends with an operator, or if there is no operator
    if (
      /\D$/.test(formula) ||
      !this.operator.some((operator) => formula.includes(operator))
    )
      return;

    if (formula) {
      const sanitizedFormula = formula.replace(/[^\d+-/*]/g, '');
      const result = parseFloat(eval(sanitizedFormula).toFixed(4)).toString();
      this.setState({
        current: result,
        formula: [],
        doneCalculating: true
      });
    }
  }

  clearDisplay() {
    this.setState({
      formula: [],
      current: '0',
      prevInput: '',
      doneCalculating: false
    });
  }

  render() {
    // adds commas every 3 digits
    let [parsedFormula, parsedCurrent] = [
      this.state.formula.join(''),
      this.state.current
    ].map((nums) => nums.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','));

    // adds a zero after zero decimal points
    [parsedFormula, parsedCurrent] = [parsedFormula, parsedCurrent].map(
      (nums) => nums.replace(/^\.|([+-/*])\./g, '$10.')
    );

    // adds a space between each operator in the formula
    parsedFormula = parsedFormula.replace(/([+\-/*])/g, ' $1 ');

    return (
      <div className='App'>
        <main className='calculator-container'>
          <Display
            formula={parsedFormula}
            current={parsedCurrent}
            doneCalculating={this.state.doneCalculating}
          />
          <Buttons onClick={this.handleClick} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
