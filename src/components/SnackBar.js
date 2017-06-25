import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${({ theme }) => theme.dimens.maxWidth};
  color: #fff;
  padding: 16px;

  background: ${({ type }) => {
    switch (type) {
      default:
        return 'rgba(0, 0, 0, .9)'
    }
  }};

  transform: translateY(${({ translated }) => translated ? '100%' : '0'});
  transition: transform .2s ease-in;
`

const SnackBar = ({ type = 'info', message, show }) => {
  return (
    <Container type={type} translated={!show}>
      {message}
    </Container>
  )
}

export default SnackBar
