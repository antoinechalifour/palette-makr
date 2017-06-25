export const rgbToHsl = rgb => {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const range = max - min

  const lightness = (max + min) / 2
  let hue = 0
  let saturation = 0

  if (range !== 0) {
    if (lightness < 0.5) {
      saturation = range / (max + min)
    } else {
      saturation = range / (2 - max - min)

      const delR = (((max - r) / 6) + (range / 2)) / range
      const delG = (((max - g) / 6) + (range / 2)) / range
      const delB = (((max - b) / 6) + (range / 2)) / range

      if (r === max) {
        hue = delB - delG
      } else if (g === max) {
        hue = (1 / 3) + delR - delB
      } else if (b === max) {
        hue = (2 / 3) + delG - delR
      }

      hue = hue < 0 ? hue + 1 : hue
      hue = hue > 1 ? hue - 1 : hue
    }
  }

  return { h: hue, s: saturation, l: lightness }
}

export const complementaryColor = ({ h, s, l }) => {
  let h2 = h + 0.5

  h2 = h2 > 1 ? h2 - 1 : h2

  return { h: h2, s, l }
}

export const hslToRgb = (v1, v2, vh) => {
  vh = vh < 0 ? vh + 1 : vh

  vh = vh > 1 ? vh - 1 : vh

  if ((6 * vh) < 1) {
    return (v1 + (v2 - v1) * 6 * vh)
  }

  if ((2 * vh) < 1) {
    return v2
  }

  if ((3 * vh) < 2) {
    return (v1 + (v2 - v1) * ((2 / 3 - vh) * 6))
  }

  return v1
}

export default function (rgb) {
  const { h, s, l } = rgbToHsl(rgb)
  const { h: h2 } = complementaryColor({ h, s, l })

  if (s === 0) {
    return {
      r: l * 255,
      g: l * 255,
      b: l * 255
    }
  } else {
    const v2 = l < 0.5
      ? l * (1 + s)
      : (l + s) - (s * l)
    const v1 = 2 * l - v2

    return {
      r: 255 * hslToRgb(v1, v2, h2 + (1 / 3)),
      g: 255 * hslToRgb(v1, v2, h2),
      b: 255 * hslToRgb(v1, v2, h2 - (1 / 3))
    }
  }
}
