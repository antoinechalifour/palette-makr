import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import UploadIcon from 'react-icons/lib/md/file-upload'

const dropAnimation = keyframes`
  from {
    transform: translateY(0)
  }

  50% {
    transform: translateY(-2px)
  }

  to {
    transform: translateY(0)
  }
`

const Container = styled.div`
  text-align: center;
  position: relative;
  color: ${({ theme }) => theme.colors.textLight};

  svg {
    font-size: 48px;
  }
`

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 50%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.primary}
`

const Card = styled.div`
  position: relative;
  margin: auto;
  box-sizing: border-box;
  padding: 32px 16px;
  max-width: ${({ theme }) => theme.dimens.maxWidth};
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .24);
  border-radius: 4px;
`

const DraggedContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};

  svg {
    animation: ${dropAnimation} 1.2s ease-in-out infinite;
  }
`

const HintText = styled.p`
  margin: 0;
`

const getDataTransferFiles = e => {
  const dt = e.dataTransfer
  const files = []

  if (dt.items) {
    for (let i = 0; i < dt.items.length; i += 1) {
      if (dt.items[i].kind === 'file') {
        files.push(dt.items[i].getAsFile())
      }
    }
  } else {
    files.push(...dt.files)
  }

  return files
}

class DropZone extends Component {
  constructor (props) {
    super(props)

    this.state = {
      draggedOver: false
    }

    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
  }

  handleDragOver (e) {
    e.preventDefault()
    e.stopPropagation()
    if (!this.state.draggedOver) {
      this.setState({ draggedOver: true })
    }
  }

  handleDragLeave () {
    if (this.state.draggedOver) {
      this.setState({ draggedOver: false })
    }
  }

  handleDrop (e) {
    const dataFiles = getDataTransferFiles(e)
    e.preventDefault()
    e.stopPropagation()

    const files = dataFiles.map(x => {
      x.preview = window.URL.createObjectURL(x)
      return x
    })

    this.props.onFiles(files)
  }

  render () {
    const Wrapper = this.state.draggedOver ? DraggedContainer : 'div'

    return (
      <Container>
        <Background />
        {React.createElement(Wrapper, null,
          <Card
            onDragOver={this.handleDragOver}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDrop}
          >
            <UploadIcon />
            <HintText>Drop an image here to generate a palette</HintText>
          </Card>
        )}
      </Container>
    )
  }
}

export default DropZone
