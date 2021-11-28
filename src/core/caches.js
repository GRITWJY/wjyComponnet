const caches = new Proxy({}, {
  set(target, key, value) {
    target[key] = value
    localStorage[key] = JSON.stringify(value)
    return true
  }
})

for (const k of Object.keys(localStorage)) {
  const v = localStorage[k]
  if (v !== undefined && v !== 'undefined') {
    try {
      caches[k] = JSON.parse(v)
    } catch (e) {
      caches[k] = v
    }
  }
}

export default caches