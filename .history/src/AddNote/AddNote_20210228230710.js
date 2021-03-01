import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from '../ValidationError/ValidationError';
import PropTypes from 'prop-types';
import './AddNote.css'

export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false,
      },
      content: {
        value: '',
        touched: false,
      },
      folderId: {
        value: '',
        touched: false,
      }
    }
  }

  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

    updateName(name) {
    this.setState({name: {value: name, touched: true}});
    }
    
    updateContent(content) {
    this.setState({content: {value: content, touched: true}});
    }
    
    updateFolderSelect(folderId) {
    this.setState({folderId: {value: folderId, touched: true}});
    }  

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } 
      }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return 'Content is required';
        } else if (content.length < 6) {
            return 'You need to add more content';
        } 
    }

    validateFolderSelect() {
        const folderId = this.state.folderId.value.trim();
        if (folderId.length === 0 || folderId === '...') {
            return 'You need to select a folder';
          } 
      }

  render() {
    const { folders=[] } = this.context
    const nameError = this.validateName();
    const contentError = this.validateContent();
    const folderError = this.validateFolderSelect();
    return (

            <section className='AddNote'>
                <h2>Create a note</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                <div className='field'>
                    <label htmlFor='note-name-input'>
                    Name
                    </label>
                    <input type='text' id='note-name-input' name='note-name' onChange={e => this.updateName(e.target.value)}/>
                    {this.state.name.touched && (
                    <ValidationError message={nameError}/>
                    )}
                </div>
                <div className='field'>
                    <label htmlFor='note-content-input'>
                    Content
                    </label>
                    <textarea id='note-content-input' name='note-content' onChange={e => this.updateContent(e.target.value)}/>
                    {this.state.content.touched && (
                    <ValidationError message={contentError}/>
                    )}
                </div>
                <div className='field'>
                    <label htmlFor='note-folder-select'>
                    Folder
                    </label>
                    <select id='note-folder-select' name='note-folder-id' onChange={e => this.updateFolderSelect(e.target.value)}>
                    <option value={null}>...</option>
                    {folders.map(folder =>
                        <option key={folder.id} value={folder.id}>
                        {folder.name}
                        </option>
                    )}
                    </select>
                    {this.state.folderId.touched && (
                    <ValidationError message={folderError}/>
                    )}
                </div>
                <div className='buttons'>
                    <button type='submit'
                    disabled={
                        this.validateName() ||
                        this.validateContent() ||
                        this.validateFolderSelect()
                    }>
                    Add note
                    </button>
                </div>
                </NotefulForm>
            </section>
    )
  }
}

AddNote.propTypes = {
  history: PropTypes.object.isRequired
};