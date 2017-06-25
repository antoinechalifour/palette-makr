import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  width: 100%;
  transition: transform .2s ease-in;
  transform: translateY(${({ translated }) => translated ? '100%' : '0'});
  bottom: 0;

`

const Bar = styled.div`
  max-width: ${({ theme }) => theme.dimens.maxWidth};
  box-shadow: 0 1px 3px rgba(0, 0 , 0, .13);
  border-radius: 4px;
  margin: auto;
  color: #fff;
  padding: 16px;

  background: ${({ type }) => {
    switch (type) {
      default:
        return 'rgba(0, 0, 0, .9)'
    }
  }};
`

const SnackBar = ({ type = 'info', message, show }) => {
  return (
    <Container type={type} translated={!show}>
      <Bar>
        {message}
      </Bar>
    </Container>
  )
}

export default SnackBar
