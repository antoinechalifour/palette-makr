import React, { Component } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import Theme from './Theme'
import Header from './Header'
import DropZone from './DropZone'
import Palette from './Palette'
import SnackBar from './SnackBar'

const Container = styled.div`
  max-width: ${({ theme }) => theme.dimens.maxWidth};
  margin: auto;
`

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      palettes: [],
      snackbar: { show: false }
    }

    this.handleFiles = this.handleFiles.bind(this)
  }

  componentDidMount () {
    this.props.emitter.addListener('sw:install', () => {
      this.setState({
        snackbar: {
          type: 'info',
          message: 'Palette Makr is now usable offline.',
          show: true
        }
      })

      setTimeout(() => {
        this.setState({
          snackbar: { show: false }
        })
      }, 5000)
    })
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

          <SnackBar {...this.state.snackbar} />
        </div>
      </Theme>
    )
  }
}

export default App
