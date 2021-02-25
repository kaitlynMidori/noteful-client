
import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageNav}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    }
    return (
      <BrowserRouter>
//         <div className="App">
//           <ApiContext.Provider value={contextValues}>

//             <Header >
//               <Route path='/' component={Header} />
//             </Header>

//             {loading}{error}{updateMessage}

//             <main className='group'>
//               <ErrorBoundary>
//                 <SideBar >
//                   <Route exact path='/' component={MainSideBar} />
//                   <Route path='/folder/:folderId' component={FolderSideBar} />
//                   <Route path='/note/:noteId' component={NoteSideBar} />
//                   <Route path='/AddNote' component={AddNoteSideBar} />
//                   <Route path='/AddFolder' component={AddFolderSideBar} />
//                 </SideBar>
//               </ErrorBoundary>

//               <ErrorBoundary>
//                 <Main >
//                   <Route exact path='/' component={MainMain} />
//                   <Route path='/folder/:folderId' component={FolderMain} />
//                   <Route path='/note/:noteId' component={NoteMain} />
//                   <Route path='/AddNote' component={AddNoteMain} />
//                   <Route path='/AddFolder' component={AddFolderMain} />
//                 </Main>
//               </ErrorBoundary>
//             </main>
//           </ApiContext.Provider>
//         </div>
//         <footer> 
//           <p>Noteful Client</p>
//         </footer>
//       </BrowserRouter>
      // <ApiContext.Provider value={value}>
      //   <div className='App'>
      //     <nav className='App__nav'>
      //       {this.renderNavRoutes()}
      //     </nav>
      //     <header className='App__header'>
      //       <h1>
      //         <Link to='/'>Noteful</Link>
      //         {' '}
      //         <FontAwesomeIcon icon='check-double' />
      //       </h1>
      //     </header>
      //     <main className='App__main'>
      //       {this.renderMainRoutes()}
      //     </main>
      //   </div>
      // </ApiContext.Provider>
    )
  }
}

export default App


// import { BrowserRouter, Route } from 'react-router-dom';
// import config from './config';
// import React from 'react';
// import './App.css';
// import Header from './ParentComponents/Header';
// import Main from './ParentComponents/Main';
// import SideBar from './ParentComponents/SideBar';
// import MainSideBar from './Main/MainSideBar';
// import FolderSideBar from './Folder/FolderSidebar';
// import NoteSideBar from './Note/NoteSidebar';
// import AddFolderSideBar from './AddFolderForm/AddFolderSideBar';
// import AddNoteSideBar from './AddNoteForm/AddNoteSideBar'
// import MainMain from './Main/MainMain';
// import FolderMain from './Folder/FolderMain';
// import NoteMain from './Note/NoteMain';
// import AddFolderMain from './AddFolderForm/AddFolderMain';
// import AddNoteMain from './AddNoteForm/AddNoteMain'
// import ClearMessage from './Elements/ClearMessageButton';
// import StoreContext from './StoreContext';
// import ErrorBoundary from './ErrorBoundary';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       notes: [],
//       folders: [],
//       loading: false,
//       error: null,
//       updateMessage: null
//     }
//   }

//   componentDidMount = () => {
//     this.setState({ loading: true })

//       Promise.all([
//         fetch(`${config.API_ENDPOINT}/notes`),
//         fetch(`${config.API_ENDPOINT}/folders`)
//       ])
//         .then(([notesRes, foldersRes]) => {
//           if (!notesRes.ok)
//             return notesRes.json().then(e => Promise.reject(e))
//           if (!foldersRes.ok)
//             return foldersRes.json().then(e => Promise.reject(e))
  
//           return Promise.all([
//             notesRes.json(),
//             foldersRes.json(),
//           ])
//         })
//         .then(([notes, folders]) => {
//           this.setState({ 
//             notes, folders, 
//             loading: false
//         })
//         })
//         .catch(error => {
//           this.setState({ 
//             error: error.message })
//         })
//     }

//   handleDelete = (id) => {
//     const toDelete = this.state.notes.find(note => {
//       return note.id === id
//     })
//     this.setState({
//       notes: this.state.notes.filter(notes =>
//         notes !== toDelete)
//     })
//   }

//   updateError = (message) => {
//     this.setState({
//       error: message
//     })
//   }

//   updateMessage = (message) => {
//     this.setState({
//       updateMessage: message
//     })
//   }

//   clearMessage = () => {
//     this.setState({
//       error: null,
//       updateMessage: null
//     })
//   }

//   handleAddNote = (note) => {
//     this.setState({
//       notes: [...this.state.notes, note]
//     })
//   }

//   handleAddFolder = (folder) => {
//     this.setState({
//       folders: [...this.state.folders, folder]
//     })
//   }

//   render() {

//     const contextValues = {
//       ...this.state,
//       handleDelete: this.handleDelete,
//       updateMessage: this.updateMessage,
//       handleError: this.updateError,
//       clearMessage: this.clearMessage,
//       handleAddFolder: this.handleAddFolder,
//       handleAddNote: this.handleAddNote
//     }

//     const loading = this.state.loading ?
//       <div className='banner'>Loading...</div>
//       : '';

//     const error = this.state.error ?
//       <div className='banner'>{this.state.error}<ClearMessage /></div>
//       : '';

//     const updateMessage = this.state.updateMessage ?
//       <div className='banner'>{this.state.updateMessage}<ClearMessage /></div>
//       : '';

//     return (
//       <BrowserRouter>
//         <div className="App">
//           <StoreContext.Provider value={contextValues}>

//             <Header >
//               <Route path='/' component={Header} />
//             </Header>

//             {loading}{error}{updateMessage}

//             <main className='group'>
//               <ErrorBoundary>
//                 <SideBar >
//                   <Route exact path='/' component={MainSideBar} />
//                   <Route path='/folder/:folderId' component={FolderSideBar} />
//                   <Route path='/note/:noteId' component={NoteSideBar} />
//                   <Route path='/AddNote' component={AddNoteSideBar} />
//                   <Route path='/AddFolder' component={AddFolderSideBar} />
//                 </SideBar>
//               </ErrorBoundary>

//               <ErrorBoundary>
//                 <Main >
//                   <Route exact path='/' component={MainMain} />
//                   <Route path='/folder/:folderId' component={FolderMain} />
//                   <Route path='/note/:noteId' component={NoteMain} />
//                   <Route path='/AddNote' component={AddNoteMain} />
//                   <Route path='/AddFolder' component={AddFolderMain} />
//                 </Main>
//               </ErrorBoundary>
//             </main>
//           </StoreContext.Provider>
//         </div>
//         <footer> 
//           <p>Noteful Client</p>
//         </footer>
//       </BrowserRouter>
//     );
//   }
// }

// export default App;
