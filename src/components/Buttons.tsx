interface ButtonProps {
  onClick: (input: string) => void;
}

export const Buttons = (props: ButtonProps) => (
  <div className='button-container'>
    <button
      id='clear'
      className='clear span-two'
      onClick={() => props.onClick('AC')}
    >
      AC
    </button>
    <button id='delete' className='delete' onClick={() => props.onClick('DEL')}>
      DEL
    </button>
    <button id='divide' className='operator' onClick={() => props.onClick('/')}>
      /
    </button>
    <button id='one' className='number' onClick={() => props.onClick('1')}>
      1
    </button>
    <button id='two' className='number' onClick={() => props.onClick('2')}>
      2
    </button>
    <button id='three' className='number' onClick={() => props.onClick('3')}>
      3
    </button>
    <button
      id='multiply'
      className='operator'
      onClick={() => props.onClick('*')}
    >
      *
    </button>
    <button id='four' className='number' onClick={() => props.onClick('4')}>
      4
    </button>
    <button id='five' className='number' onClick={() => props.onClick('5')}>
      5
    </button>
    <button id='six' className='number' onClick={() => props.onClick('6')}>
      6
    </button>
    <button id='add' className='operator' onClick={() => props.onClick('+')}>
      +
    </button>
    <button id='seven' className='number' onClick={() => props.onClick('7')}>
      7
    </button>
    <button id='eight' className='number' onClick={() => props.onClick('8')}>
      8
    </button>
    <button id='nine' className='number' onClick={() => props.onClick('9')}>
      9
    </button>
    <button
      id='substract'
      className='operator'
      onClick={() => props.onClick('-')}
    >
      -
    </button>
    <button id='decimal' className='number' onClick={() => props.onClick('.')}>
      .
    </button>
    <button id='zero' className='number' onClick={() => props.onClick('0')}>
      0
    </button>
    <button
      id='equal'
      className='equal span-two'
      onClick={() => props.onClick('=')}
    >
      =
    </button>
  </div>
);
