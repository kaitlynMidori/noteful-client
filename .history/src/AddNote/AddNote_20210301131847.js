import React, { Component } from 'react';
import './AddNote.css';
import PropType from 'prop-types';
import ValidationError from '../validationError/ValidationError';
export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.folder = React.createRef();
    this.folderId = this.state = {
      name: {
        value: '',
        start: false
      },
      modified: new Date(),
      folderId: {
        value: '',
        click: false
      },
      content: ''
    };
  }
  componentDidMount() {
    const { folderId } = this.props.history.location.state;
    this.setState({
      folderId: {
        value: folderId,
        start: false
      }
    });
  }
  updateName = (name) => {
    this.setState({
      name: {
        value: name,
        start: true
      }
    });
  };
  updateFolder = (e) => {
    const folderId = e.target.value;
    this.setState((prevState) => {
      return {
        folderId: {
          ...prevState.folderId,
          value: folderId
        }
      };
    });
  };
  folderClick = () => {
    this.setState((prevState) => {
      return {
        folderId: {
          ...prevState.folderId,
          click: true
        }
      };
    });
  };
  updateContent = (e) => {
    const content = e.target.value;
    this.setState({
      content
    });
  };
  validateName = () => {
    const name = this.state.name;
    if (name.start) {
      if (name.value.trim().length < 2) {
        return 'The name should have at  2 least characters';
      }
    }
    return false;
  };
  validateFolder = () => {
    const folderId = this.state.folderId;
    if (folderId.click) {
      if (folderId.value.length < 1) {
        return 'You should select a folder';
      }
    }
    return false;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const URL = 'http://localhost:9090/notes/';
    const note = {
      name: this.state.name.value,
      modified: this.state.modified,
      folderId: this.state.folderId.value,
      content: this.state.content
    };
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then((res) => {
        if (!res.ok) {
          res.json();
          Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.props.fetchNotes(this.props.history.push('/'));
      })
      .catch((error) => console.log(error.message));
  };

  render() {
    const options = this.props.folders.map((folder) => {
      return (
        <option key={folder.id} value={folder.id}>
          {folder.name}
        </option>
      );
    });
    return (
      <form className='registration' onSubmit={(e) => this.handleSubmit(e)}>
        <h2>New Note</h2>
        <div className='form-group'>
          <div>
            <label htmlFor='name'>Name </label>
            <input
              type='text'
              className='registration__control'
              name='name'
              id='name'
              onChange={(e) => {
                this.updateName(e.target.value);
              }}
              required
            />
            <ValidationError message={this.validateName()} />
          </div>
          <div>
            <label htmlFor='folder'>Folder </label>
            <select
              name='folder'
              id='folder'
              value={this.state.folderId.value}
              onFocus={this.folderClick}
              onChange={(e) => {
                this.updateFolder(e);
              }}
            >
              <option value=''>Select folder</option>
              {options}
            </select>
            <ValidationError message={this.validateFolder()} />
          </div>
          <div className='content'>
            <label htmlFor='content'>Content </label>
            <textarea
              name='content'
              id='content'
              cols='30'
              rows='10'
              onChange={(e) => {
                this.updateContent(e);
              }}
            ></textarea>
          </div>
        </div>
        <button
          type='submit'
          className='registration__button'
          disabled={
            this.validateName() ||
            this.validateFolder() ||
            (!this.state.folderId.click && this.state.folderId.value === '')
          }
        >
          Save
        </button>
      </form>
    );
  }
}
AddNote.defaultProps = {
  folders: []
};

AddNote.protoType = {
  folders: PropType.array.isRequired
};