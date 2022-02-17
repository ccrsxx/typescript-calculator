interface ButtonProps {
  onClick: (input: string) => void;
}

export function Buttons({ onClick }: ButtonProps) {
  return (
    <section className='button-container'>
      <button
        type='button'
        className='clear span-two'
        onClick={() => onClick('AC')}
      >
        AC
      </button>
      <button type='button' className='delete' onClick={() => onClick('DEL')}>
        DEL
      </button>
      <button type='button' className='operator' onClick={() => onClick('/')}>
        /
      </button>
      <button type='button' className='number' onClick={() => onClick('1')}>
        1
      </button>
      <button type='button' className='number' onClick={() => onClick('2')}>
        2
      </button>
      <button type='button' className='number' onClick={() => onClick('3')}>
        3
      </button>
      <button type='button' className='operator' onClick={() => onClick('*')}>
        *
      </button>
      <button type='button' className='number' onClick={() => onClick('4')}>
        4
      </button>
      <button type='button' className='number' onClick={() => onClick('5')}>
        5
      </button>
      <button type='button' className='number' onClick={() => onClick('6')}>
        6
      </button>
      <button type='button' className='operator' onClick={() => onClick('+')}>
        +
      </button>
      <button type='button' className='number' onClick={() => onClick('7')}>
        7
      </button>
      <button type='button' className='number' onClick={() => onClick('8')}>
        8
      </button>
      <button type='button' className='number' onClick={() => onClick('9')}>
        9
      </button>
      <button type='button' className='operator' onClick={() => onClick('-')}>
        -
      </button>
      <button type='button' className='number' onClick={() => onClick('.')}>
        .
      </button>
      <button type='button' className='number' onClick={() => onClick('0')}>
        0
      </button>
      <button
        type='button'
        className='equals span-two'
        onClick={() => onClick('=')}
      >
        =
      </button>
    </section>
  );
}
