import { Component } from 'react';
import { Display, Buttons, Footer } from './components';

interface AppStates {
  formula: string;
  current: string;
  prevInput: string;
  doneCalculating: boolean;
}

class App extends Component<{}, AppStates> {
  operator: string[] = ['+', '-', '/', '*'];

  constructor(props: {}) {
    super(props);
    this.state = {
      formula: '',
      current: '0',
      prevInput: '',
      doneCalculating: false
    };
    this.handleNumber = this.handleNumber.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(input: string) {
    if (this.state.doneCalculating)
      this.setState((state) => ({
        formula: state.current,
        doneCalculating: false
      }));

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
    if (/[^.-\d]/.test(this.state.current)) {
      this.setState((state) => ({
        current: state.current.slice(1)
      }));
    }

    // limit zero to one times before decimal point
    // this prevent zero from being added onto the first of formula
    if (
      this.state.formula.startsWith('0') &&
      this.state.formula.charAt(1) !== '.'
    ) {
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
          : state.formula + number,
      prevInput: number
    }));
  }

  handleOperator(operator: string) {
    this.setState((state) => ({
      formula:
        state.formula === '-' && operator !== '-' // remove minus operator if next is an operator
          ? ''
          : state.formula // if there's at least one number in the formula
          ? [...state.formula.slice(-2)].every(
              (operand) => this.operator.includes(operand) // if there are two operators in a row
            )
            ? operator === '-' // if the operator is a minus
              ? state.formula
              : state.formula.slice(0, -2) + operator
            : this.operator.includes(state.prevInput) // if the previous input is an operator
            ? operator === '-' // if there's not two minus signs in a row and operator is a minus
              ? state.prevInput === '-' // prevents two minus signs from being added
                ? state.formula
                : state.formula + operator
              : state.prevInput === '-' // replace operator if there's already an operator
              ? state.formula.slice(0, -2) + operator
              : state.formula.slice(0, -1) + operator
            : state.formula + operator // if there's not minus in a row, normal case
          : !state.formula && operator === '-' // allow minus before number here
          ? operator
          : state.formula, // first time operator is pressed
      current: operator,
      prevInput: operator
    }));
  }

  handleBackspace() {
    if (this.state.current)
      this.setState((state) => ({
        current: state.current.slice(0, -1),
        formula: state.formula.slice(0, -1)
      }));
  }

  calculate() {
    // do nothing if the formula ends with an operator, or if there is no operator
    if (
      /\D$/.test(this.state.formula) ||
      !this.operator.some((operator) => this.state.formula.includes(operator))
    )
      return;

    if (this.state.formula) {
      const sanitizedFormula = this.state.formula.replace(/[^\d+-/*]/g, '');
      const result = parseFloat(eval(sanitizedFormula).toFixed(4)).toString();
      this.setState({
        current: result,
        formula: '',
        doneCalculating: true
      });
    }
  }

  clearDisplay() {
    this.setState({
      formula: '',
      current: '0',
      prevInput: '',
      doneCalculating: false
    });
  }

  render() {
    // adds commas every 3 digits
    let [parsedFormula, parsedCurrent] = [
      this.state.formula,
      this.state.current
    ].map((nums) => nums.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','));

    // adds a zero after zero decimal points
    [parsedFormula, parsedCurrent] = [parsedFormula, parsedCurrent].map(
      (nums) => nums.replace(/^\.|([+-/*])\./g, '$10.')
    );

    // adds a space between each operator in the formula
    parsedFormula = parsedFormula.replace(/([+\-/*])/g, ' $1 ');

    // remove a space between a minus and a number in the formula
    parsedFormula = parsedFormula.replace(/^\s-\s(\d+)/, '-$1');
    parsedFormula = parsedFormula.replace(/([+-/*])\s{2}-\s(\d+)/g, '$1 -$2');

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
