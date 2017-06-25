import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    text: '#131516',
    textLight: '#8c979a',
    primary: '#F48FB1'
  },
  font: {
    size: '18px',
    primary: '\'Slabo 27px\', serif',
    secondary: 'Poiret One, cursive'
  },
  dimens: {
    maxWidth: '800px'
  }
}

const Container = styled.div`
  font-family: Helvetica, Arial, sans-serif;
  background: #f7f7f9;
  font-size: ${({ theme }) => theme.font.size};
  line-height: 1.7;
  font-family: ${({ theme }) => theme.font.primary};
`

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Container>
      {children}
    </Container>
  </ThemeProvider>
)

export default Theme
