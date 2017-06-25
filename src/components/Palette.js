import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import getPixels from 'get-pixels'
import LoadingIcon from 'react-icons/lib/md/refresh'
// eslint-disable-next-line import/no-webpack-loader-syntax
import PaletteWorker from 'worker-loader!../webWorker'
import rgbToHex from '../util/rgbToHex'

const Container = styled.div`
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .13);
  border-radius: 4px;
  margin: 16px 0;
  overflow: hidden;
`

const Cover = styled.div`
  height: 250px;
  background-size: cover;
  background-position: center;
`

const Title = styled.h2`
  text-transform: uppercase;
  padding: 16px;
  font-size: 32px;
  font-family: ${({ theme }) => theme.font.secondary};
`

const Colors = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Color = styled.div`
  padding: 32px;
  min-width: 50%;
  text-align: center;
  font-family: monospace;
  box-sizing: border-box;
  color: #fff;
  text-shadow: 0 0 3px #313131;

  @media (min-width: 800px) {
    min-width: 25%;
  }
`

const Placeholder = styled.p`
  flex: 1;
  margin: 0;
  padding: 16px;
  padding-top: 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight}
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Icon = styled(LoadingIcon)`
  display: inline-block;
  margin: auto;
  font-size: 32px;
  animation: ${rotate} 1s linear infinite;
`

class Palette extends Component {
  constructor (props) {
    super(props)

    this.state = {
      colors: []
    }

    // To avoid freezing the UI when the image
    // is processing, the palette extraction
    // is done in a WebWorker.
    this.worker = new PaletteWorker()
    this.worker.onmessage = this.onColors.bind(this)
  }

  componentDidMount () {
    getPixels(this.props.file.preview, (err, pixels) => {
      this.worker.postMessage({ pixels })
    })
  }

  componentWillUnmount () {
    this.worker.terminate()
  }

  onColors (e) {
    this.setState(e.data)
  }

  render () {
    return (
      <Container>
        <Cover
          style={{
            backgroundImage: `url(${this.props.file.preview})`
          }}
         />

        <Title>Palette</Title>
        <Colors>
          {this.state.colors.length ? (
            this.state.colors.map(({ r, g, b }, index) => {
              const rgb = `rgb(${r}, ${g}, ${b})`
              return (
                <Color
                  key={`${index}-${rgb}`}
                  style={{ background: rgb }}
                >
                  #{rgbToHex({ r, g, b })}
                </Color>
              )
            })
          ) : (
            <Placeholder>
              <Icon />
              <div>Generating the palette. Time may vary depending on the image size.</div>
            </Placeholder>
          )}
        </Colors>
      </Container>
    )
  }
}

export default Palette
