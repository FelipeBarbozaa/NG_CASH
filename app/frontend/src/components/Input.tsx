import React from 'react';
import { IInput } from '../types/input';

export default function Input(props: IInput) {
  return (
    <input
      placeholder={props.name}
      type={ props.type }
      name={ props.name }
      onChange={ (e) => props.func(e) }
      className={ props.className }
    />
  )
}