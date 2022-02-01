import { Component } from 'react';
import { Display, Buttons } from './components';

interface AppStates {
  formula: [] | string[];
  current: string;
}

class App extends Component<{}, AppStates> {
  operator: string[] = ['+', '-', '*', '/'];

  constructor(props: {}) {
    super(props);
    this.state = {
      formula: [],
      current: '0'
    };
    this.handleNumber = this.handleNumber.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(input: string) {
    if (this.state.formula.length === 0 && this.state.current !== '0') {
      // this.setState({
      //   formula: [this.state.current]
      // });
      this.clearDisplay();
    }

    switch (input) {
      case 'AC':
        this.clearDisplay();
        break;
      case '←':
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
    if (this.state.current.slice(-1) === '.' && number === '.') return;

    if (/[^\.\d]/.test(this.state.current)) {
      console.log('test');
      this.setState((state) => ({
        current: state.current.slice(1),
        formula: state.formula.slice(1)
      }));
    }

    this.setState((state) => ({
      current:
        // state.current.length === 1 && input === '.'
        state.current === '0' ? number : state.current + number,
      formula: state.formula ? [...state.formula, number] : ['pussy']
    }));
  }

  handleOperator(operator: string) {
    this.setState((state) => ({
      formula:
        this.operator.includes(state.formula!.slice(-1)[0]) &&
        this.operator.includes(operator)
          ? state.formula
          : state.formula
          ? [...state.formula, operator]
          : [operator],
      current: operator
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

    if (
      /\D$/.test(formula!) ||
      !this.operator.some((operator) => formula.includes(operator))
    )
      return;

    if (formula) {
      const sanitizedFormula = formula.replace(/[^\d+-/\*]/g, '');
      const result = eval(sanitizedFormula).toString();
      this.setState({
        current: result,
        formula: []
      });
    }
  }

  clearDisplay() {
    this.setState({
      formula: [],
      current: '0'
    });
  }

  render() {
    let [parsedFormula, parsedCurrent] = [
      this.state.formula.join(''),
      this.state.current
    ].map((nums) => nums.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','));

    parsedFormula = parsedFormula.replace(/([+\-\/*])/g, ' $1 ');
    parsedFormula = parsedFormula.replace(/^\./, '0.');

    return (
      <div className='App'>
        <div className='calculator-container'>
          <Display
            formula={parsedFormula ? parsedFormula : null}
            current={parsedCurrent}
          />
          <Buttons onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default App;
