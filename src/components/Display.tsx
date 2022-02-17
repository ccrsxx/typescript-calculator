interface DisplayProps {
  formula: null | string;
  current: string;
  doneCalculating: boolean;
}

export function Display({ formula, current, doneCalculating }: DisplayProps) {
  return (
    <section className='display-container'>
      <div className='formula'>{formula}</div>
      <div
        className={`current ${doneCalculating ? 'bounce' : ''}`}
        style={doneCalculating ? { color: 'lightgreen' } : {}}
      >
        {current}
      </div>
    </section>
  );
}
