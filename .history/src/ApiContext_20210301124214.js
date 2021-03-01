import React from 'react'

export default React.createContext({
  notes: [],
  folder: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

