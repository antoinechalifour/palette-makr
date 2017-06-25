export default function rgbToHex ({ r, g, b }) {
  return ((b | g << 8 | r << 16) | 1 << 24).toString(16).slice(1)
}
