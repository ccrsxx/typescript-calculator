interface DisplayProps {
  formula: null | string;
  current: string;
}

export const Display = (props: DisplayProps) => (
  <div className='display-container'>
    <div className='formula'>{props.formula}</div>
    <div id='display' className='current'>
      {props.current}
    </div>
  </div>
);
