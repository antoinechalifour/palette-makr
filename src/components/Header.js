import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  padding: 32px 16px;
  background: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h1`
  text-align: center;
  position: relative;
  font-size: 64px;
  text-transform: uppercase;
  color: #fff;
  font-family: ${({ theme }) => theme.font.secondary}
`

const Header = () => (
  <Container>
    <Title>
      <span>Palette Makr</span>
    </Title>
  </Container>
)

export default Header
