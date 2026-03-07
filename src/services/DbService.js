const DB = {
  set(key, value) {
    try {
      const data = JSON.stringify(value)
      localStorage.setItem(key, data)
      return true
    } catch (error) {
      console.error("Error guardando en localStorage:", error)
      return false
    }
  },

  get(key) {
    try {
      const data = localStorage.getItem(key)
      if (data === null) return null
      return JSON.parse(data)
    } catch (error) {
      console.error("Error leyendo localStorage:", error)
      return null
    }
  },

  update(key, newValue) {
    if (!localStorage.getItem(key)) {
      console.warn("La clave no existe:", key)
      return false
    }

    return this.set(key, newValue)
  },

  delete(key) {
    localStorage.removeItem(key)
  },

  clear() {
    localStorage.clear()
  }
}

export default DB;