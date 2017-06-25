// ------------------------------------------------------ //
// Most of this file is shamelessly copied from
// the Media-Sample-PWA Chrome repository:
// https://github.com/GoogleChrome/sample-media-pwa
// ------------------------------------------------------ //

export const pixelsToRgb = pixels => {
  const [width, height] = pixels.shape
  const values = []

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4

      values.push({
        r: pixels.data[i],
        g: pixels.data[i + 1],
        b: pixels.data[i + 2]
      })
    }
  }

  return values
}

export const findBestChannel = rgb => {
  let rMin = Number.POSITIVE_INFINITY
  let rMax = Number.NEGATIVE_INFINITY

  let gMin = Number.POSITIVE_INFINITY
  let gMax = Number.NEGATIVE_INFINITY

  let bMin = Number.POSITIVE_INFINITY
  let bMax = Number.NEGATIVE_INFINITY

  rgb.forEach(pixel => {
    rMin = Math.min(rMin, pixel.r)
    rMax = Math.max(rMax, pixel.r)

    gMin = Math.min(gMin, pixel.g)
    gMax = Math.max(gMax, pixel.g)

    bMin = Math.min(bMin, pixel.b)
    bMax = Math.max(bMax, pixel.b)
  })

  const rRange = rMax - rMax
  const gRange = gMax - gMin
  const bRange = bMax - bMin

  const bestChannel = Math.max(rRange, gRange, bRange)
  const rangeToChannel = {
    [rRange]: 'r',
    [gRange]: 'g',
    [bRange]: 'b'
  }

  return rangeToChannel[bestChannel]
}

export const quantize = (rgb, depth = 0, maxDepth = 4) => {
  if (depth === maxDepth) {
    const color = rgb.reduce((sum, color) => {
      sum.r += color.r
      sum.g += color.g
      sum.b += color.b

      return sum
    }, { r: 0, g: 0, b: 0 })

    color.r = Math.round(color.r / rgb.length)
    color.g = Math.round(color.g / rgb.length)
    color.b = Math.round(color.b / rgb.length)

    return [color]
  }

  const bestChannel = findBestChannel(rgb)

  rgb.sort((c1, c2) => c1[bestChannel] - c2[bestChannel])

  const mid = rgb.length / 2

  return [
    ...quantize(rgb.slice(0, mid), depth + 1, maxDepth),
    ...quantize(rgb.slice(mid + 1), depth + 1, maxDepth)
  ]
}

export const orderByLuminance = rgb => {
  const luminance = pixel => (
    0.2126 * pixel.r +
    0.7152 * pixel.g +
    0.0722 * pixel.b
  )

  return rgb.sort((c1, c2) => luminance(c1) - luminance(c2))
}

export const getMostVariantColor = rgb => {
  let index = 0
  let max = Number.NEGATIVE_INFINITY
  rgb
    .map(v => Math.max(v.r, v.g, v.b) - Math.min(v.r, v.g, v.b))
    .forEach((v, i) => {
      if (v > max) {
        index = i
        max = v
      }
    })

  return rgb[index]
}

const medianCut = pixels => {
  const rgb = pixelsToRgb(pixels)
  return orderByLuminance(quantize(rgb, 0, 3))
}

export default medianCut
