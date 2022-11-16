import React from 'react';

interface IInput {
  type: string;
  name: string;
  func: Function;
}

export default function Input(props: IInput) {
  return (
    <input
      type={ props.type }
      name={ props.name }
      onChange={ (e) => props.func(e) }
    />
  )
}