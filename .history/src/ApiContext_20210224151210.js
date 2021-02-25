import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

// import React from 'react';

// const StoreContext = React.createContext({
//   handleDelete: () => {},
//   updateMessage: () => {},
//   clearMessage: () => {},
//   updateError: () => {},
//   handleAddFolder: () => {},
//   handleNoteFolder: () => {},
//   "folders": [],
//   "notes": []
// })

// export default StoreContext;