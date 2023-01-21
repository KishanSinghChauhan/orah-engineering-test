import React, { FC, InputHTMLAttributes } from "react"
import styled from "styled-components"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ ...rest }) => {
  return <S.Input {...rest} />
}

const S = {
  Input: styled.input`
    border: 2px solid #fff;
    color: #fff;
    background: transparent;
    outline: none;
    height: 24px;
    border-radius: 4px;
    padding: 0 8px;

    &::placeholder {
      color: #fff;
      font-size: 12px;
    }
  `,
}

export default Input
