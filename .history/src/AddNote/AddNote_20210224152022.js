import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types'


export default class AddNote extends React.Component {

  static contextType = ApiContext;

  onSubmit = e => {
    e.preventDefault();
    const {noteTitle, noteContent, folderSelect} = e.target;
    const note = {
      name: noteTitle.value,
      content: noteContent.value,
      folderId: folderSelect.value,
      modified: new Date()
    }

    fetch(`${config.API_ENDPOINT}/notes`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(note) }
    )
    .then(resp => {
      if(!resp.ok)
        return resp.json().then(e => Promise.reject(e))  
      return resp.json()
    })
    .then(newNote => {
      this.context.addNote(newNote)
      this.props.history.push(`/note/${newNote.id}`)
    })
    .catch(err => {
      console.error(err)
    })
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
                    <ValidationError message={nameError} />
                )}

                <label htmlFor='note-folder'>Folder:</label>
                <SelectFolder handleChange={this.handleStateFields}
                />

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

AddNote.propTypes = {
  history: PropTypes.string.isRequired
}

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