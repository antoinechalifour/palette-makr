import medianCut from './util/medianCut'

self.onmessage = function onmessage (e) {
  const colors = medianCut(e.data.pixels)

  self.postMessage({ colors })
}

export default onmessage
