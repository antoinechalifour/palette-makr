import React, { Component } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import Theme from './Theme'
import Header from './Header'
import DropZone from './DropZone'
import Palette from './Palette'

const Container = styled.div`
  max-width: ${({ theme }) => theme.dimens.maxWidth};
  margin: auto;
`

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      palettes: []
    }

    this.handleFiles = this.handleFiles.bind(this)
  }

  handleFiles (files) {
    this.setState({
      palettes: [
        ...files.map(file => ({
          id: uuid(),
          file
        })),
        ...this.state.palettes
      ]
    })
  }

  render () {
    return (
      <Theme>
        <div>
          <Header />

          <DropZone onFiles={this.handleFiles} />

          <Container>
            {this.state.palettes.map((x, index) => (
              <Palette
                {...x}
                key={x.id}
              />
            ))}
          </Container>
        </div>
      </Theme>
    )
  }
}

export default App
