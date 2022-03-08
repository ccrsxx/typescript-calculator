import { useState } from 'react';
import { Display, Buttons, Footer } from './components';

const OPERATOR = ['+', '-', '/', '*'];

export default function App() {
  const [formula, setFormula] = useState('');
  const [current, setCurrent] = useState('0');
  const [prevInput, setPrevInput] = useState('');
  const [doneCalculating, setDoneCalculating] = useState(false);

  const handleClick = (input: string) => () => {
    if (doneCalculating) {
      setFormula(current);
      setDoneCalculating(false);
    }

    switch (input) {
      case 'AC':
        clearDisplay();
        break;
      case 'DEL':
        handleBackspace();
        break;
      case '+':
      case '-':
      case '/':
      case '*':
        handleOperator(input);
        break;
      case '=':
        calculate();
        break;
      default:
        handleNumber(input);
    }
  };

  const handleNumber = (number: string) => {
    // do nothing if there's already a decimal point in the current number and the user inputs a decimal point
    // this prevents multiple dots from being added

    if (current.includes('.') && number === '.') return;

    // remove everything except dot and numbers
    // this prevent operators from being added after selecting a operator
    if (/[^.-\d]/.test(current)) {
      setCurrent((prevCurrent) => prevCurrent.slice(1));
    }

    if (current === '0' && formula[1] !== '.') {
      setFormula((prevFormula) => prevFormula.slice(1));
      setPrevInput('');
    }

    setCurrent((prevCurrent) =>
      prevCurrent === '0' ? number : prevCurrent + number
    );

    setFormula((prevFormula) =>
      number !== '.' && prevInput === '0' && current === '0'
        ? prevFormula
        : prevFormula + number
    );

    setPrevInput(number);
  };

  const handleOperator = (operator: string) => {
    // this is a mess, i know!, but it works
    setFormula((prevFormula) =>
      prevFormula === '-' && operator !== '-' // remove minus operator if next is an operator
        ? ''
        : prevFormula // if there's at least one number in the formula
        ? [...prevFormula.slice(-2)].every(
            (operand) => OPERATOR.includes(operand) // if there are two operators in a row
          )
          ? operator === '-' // if the operator is a minus
            ? prevFormula
            : prevFormula.slice(0, -2) + operator
          : OPERATOR.includes(prevInput) // if the previous input is an operator
          ? operator === '-' // if there's not two minus signs in a row and operator is a minus
            ? prevInput === '-' // prevents two minus signs from being added
              ? prevFormula
              : prevFormula + operator
            : prevFormula.slice(0, -1) + operator
          : prevFormula + operator // if there's not minus in a row, normal case
        : !prevFormula && operator === '-' // allow minus before number here
        ? operator
        : prevFormula
    );
    setCurrent(operator);
    setPrevInput(operator);
  };

  const handleBackspace = () => {
    if (current) {
      setCurrent((prevCurrent) => prevCurrent.slice(0, -1));
      setFormula((prevFormula) => prevFormula.slice(0, -1));
    }
  };

  const calculate = () => {
    if (
      /\D$/.test(formula) ||
      !OPERATOR.some((operator) => formula.includes(operator))
    )
      return;

    if (formula) {
      const sanitizedFormula = formula.replace(/[^\d+-/*]/g, '');
      const result = parseFloat(eval(sanitizedFormula).toFixed(4)).toString();
      setCurrent(result);
      setFormula('');
      setDoneCalculating(true);
    }
  };

  const clearDisplay = () => {
    setFormula('');
    setCurrent('');
    setPrevInput('');
    setDoneCalculating(false);
  };

  // adds commas every 3 digits
  let [parsedFormula, parsedCurrent] = [formula, current].map((nums) =>
    nums.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  );

  // adds a zero after zero decimal points
  [parsedFormula, parsedCurrent] = [parsedFormula, parsedCurrent].map((nums) =>
    nums.replace(/^\.|([+-/*])\./g, '$10.')
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
          doneCalculating={doneCalculating}
        />
        <Buttons onClick={handleClick} />
      </main>
      <Footer />
    </div>
  );
}
