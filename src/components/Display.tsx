interface DisplayProps {
  formula: null | string;
  current: string;
  doneCalculating: boolean;
}

export const Display = (props: DisplayProps) => (
  <section className='display-container'>
    <div className='formula'>{props.formula}</div>
    <div
      id='display'
      className={`current ${props.doneCalculating ? 'bounce' : ''}`}
      style={props.doneCalculating ? { color: 'lightgreen' } : {}}
    >
      {props.current}
    </div>
  </section>
);
