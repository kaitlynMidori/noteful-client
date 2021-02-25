
import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types'
import './ErrorBoundary'

class AddNote extends React.Component {
  static contextType = ApiContext;

  constructor(props) {
      super(props);
      this.state = {
          content: '',
          folder_id: 0,
          name: '',
          modified: '',
          touched: false
      }
  }

  static propTypes = {
      history: PropTypes.object.isRequired
  };

  handleStateFields = (key, value) => {
      let modified = new Date().toISOString();

      if (key === 'name') {
          this.setState({
              touched: true
          })
      }

      this.setState({
          [key]: value,
          modified
      })
  }

  handleAddNote = (e) => {
      e.preventDefault();
      const { touched, ...rest } = this.state
      let newNote = JSON.stringify(rest);

      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: newNote
      }

      fetch(`${config.API_ENDPOINT}/notes`, options)
          .then(resp => {
              if (!resp) {
                  throw new Error('Note was not added - please try again later.')
              } else return resp.json()
          })
          .then(respJson => {
              console.log(respJson)
              this.context.handleAddNote(respJson);
              this.context.updateMessage('Note added!');
          })
          .then(() => this.props.history.push('/'))
          .catch(error => this.context.handleError(error.message));
  }

  validateNoteName = () => {
      let name = this.state.note_name.trim();
      if (name.length === 0) {
          return 'Please enter note name';
      } else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
      } else if (name.length > 15) {
          return 'Please don\'t make the name so long...';
      };
  }


  render() {
      const nameError = this.validateNoteName();

      return (

          <form className='note-form'
              onSubmit={(e) => {
                  this.handleAddNote(e);
              }}>

              <fieldset>

                  <legend>Note Details</legend>

                  <label htmlFor='new-folder'>Note Name:</label>
                  <input type='text' id='new-folder'
                      onChange={(e) => {
                          this.handleStateFields('note_name', e.target.value);
                      }} placeholder='Bunnies' required />
                  {this.state.touched && (
                      <ErrorBoundary message={nameError} />
                  )}

                  <label htmlFor='note-desc'>Note Description:</label>
                  <textarea
                      onChange={(e) =>
                          this.handleStateFields('content', e.target.value)}
                      placeholder='This is maybe the best note ever, honestly...'>
                  </textarea>

                  <button type='submit'
                      disabled={this.validateNoteName()}>Submit</button>
              </fieldset>
          </form>
      )
  }
}

export default AddNote;

// import React from 'react';
// import NotefulForm from '../NotefulForm/NotefulForm'
// import ApiContext from '../ApiContext'
// import config from '../config'
// import PropTypes from 'prop-types'


// export default class AddNote extends React.Component {

//   static contextType = ApiContext;

//   onSubmit = e => {
//     e.preventDefault();
//     const {noteTitle, noteContent, folderSelect} = e.target;
//     const note = {
//       name: noteTitle.value,
//       content: noteContent.value,
//       folderId: folderSelect.value,
//       modified: new Date()
//     }

//     fetch(`${config.API_ENDPOINT}/notes`,
//       { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(note) }
//     )
//     .then(resp => {
//       if(!resp.ok)
//         return resp.json().then(e => Promise.reject(e))  
//       return resp.json()
//     })
//     .then(newNote => {
//       this.context.addNote(newNote)
//       this.props.history.push(`/note/${newNote.id}`)
//     })
//     .catch(err => {
//       console.error(err)
//     })
//   }

//   render() {
//     const { folders } = this.context
//     return(
//       <NotefulForm onSubmit={this.onSubmit}>
//         <label>
//           <span>Title</span>
//           <input name="noteTitle" pattern=".*\S+.*" required title="A note title must not be blank." placeholder="Awesome Note 1" />
//         </label>
//         <label>
//           <span>Content</span>
//           <textarea name="noteContent" required title="A note must not be blank." placeholder="Don't forget to buy milk" />
//         </label>
//         <label>
//           <span>Folder</span>
//           <select name="folderSelect">
//             {folders.map(folder => <option value={folder.id}>{folder.name}</option>)}
//           </select>
//         </label>
//         <input type="submit" value="Add Note" />
//       </NotefulForm>
//     )
//   }
// }

// AddNote.propTypes = {
//   history: PropTypes.string.isRequired
// }











// import React, { Component } from 'react'
// import NotefulForm from '../NotefulForm/NotefulForm'
// import './AddNote.css'

// export default class AddNote extends Component {
//   static defaultProps = {
//     folders: [],
//   }
//   render() {
//     const { folders } = this.props
//     return (
//       <section className='AddNote'>
//         <h2>Create a note</h2>
//         <NotefulForm>
//           <div className='field'>
//             <label htmlFor='note-name-input'>
//               Name
//             </label>
//             <input type='text' id='note-name-input' />
//           </div>
//           <div className='field'>
//             <label htmlFor='note-content-input'>
//               Content
//             </label>
//             <textarea id='note-content-input' />
//           </div>
//           <div className='field'>
//             <label htmlFor='note-folder-select'>
//               Folder
//             </label>
//             <select id='note-folder-select'>
//               <option value={null}>...</option>
//               {folders.map(folder =>
//                 <option key={folder.id} value={folder.id}>
//                   {folder.name}
//                 </option>
//               )}
//             </select>
//           </div>
//           <div className='buttons'>
//             <button type='submit'>
//               Add note
//             </button>
//           </div>
//         </NotefulForm>
//       </section>
//     )
//   }
// }