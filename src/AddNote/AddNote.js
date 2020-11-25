import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'


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
    const { folders } = this.context
    return(
      <NotefulForm onSubmit={this.onSubmit}>
        <label>
          <span>Title</span>
          <input name="noteTitle" pattern=".*\S+.*" required title="A note title must not be blank." placeholder="Awesome Note 1" />
        </label>
        <label>
          <span>Content</span>
          <textarea name="noteContent" required title="A note must not be blank." placeholder="Don't forget to buy milk" />
        </label>
        <label>
          <span>Folder</span>
          <select name="folderSelect">
            {folders.map(folder => <option value={folder.id}>{folder.name}</option>)}
          </select>
        </label>
        <input type="submit" value="Add Note" />
      </NotefulForm>
    )
  }
}