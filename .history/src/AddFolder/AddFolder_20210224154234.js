// import React from 'react';
// import '../sweepingstyles/form.css';
// import './addfolderform.css';
// import StoreContext from '../StoreContext';
// import ValidationError from '../AddNoteForm/ValidationError';
// import PropTypes from 'prop-types';
// import config from '../config';

// class AddFolder extends React.Component {
//     static contextType = ApiContext;

//     constructor(props) {
//         super(props);
//         this.state = {
//             folderName: '',
//             touched: false
//         }
//     }

//     static propTypes = {
//         history: PropTypes.object.isRequired
//     };

//     handleAddFolder = (e) => {
//         e.preventDefault();

//         let newFolder = JSON.stringify(this.state);

//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: newFolder
//         }

//         fetch(`${config.API_ENDPOINT}/folders`, options)
//             .then(resp => {
//                 if (!resp.ok) {
//                     throw new Error('Folder not added - please try again later.')
//                 } else return resp.json()
//             })
//             .then(respJson => {
//                 this.context.handleAddFolder(respJson);
//                 this.context.updateMessage('Folder added!');
//             })
//             .then(() => this.props.history.push('/'))
//             .catch(error => this.context.handleError(error.message));
//     }

//     updateFolderInput = (value) => {
//         this.setState({
//             folder_name: value,
//             touched: true
//         })
//     }

//     validateFolderName = () => {
//         let name = this.state.folderName.trim();
//         if (name.length === 0) {
//             return 'Please enter note name';
//         } else if (name.length < 3) {
//             return 'Name must be at least 3 characters long';
//         } else if (name.length > 15) {
//             return 'Please don\'t make the name so long...';
//         };
//     }

//     render() {
//         const { folder_name } = this.state;
//         const nameError = this.validateFolderName();

//         return (

//             <form className='folder-form'
//                 onSubmit={(e) => {
//                     this.handleAddFolder(e);
//                 }}>

//                 <fieldset>
//                     <legend>Folder Details</legend>
//                     <label htmlFor='new-folder'>Folder Name:</label>
//                     <input type='text' id='new-folder' placeholder='ie Indubitable' defaultValue={folder_name}
//                         onChange={(e) => this.updateFolderInput(e.target.value)} required />
//                     {this.state.touched && (
//                         <ValidationError message={nameError} />
//                     )}
//                     <button type='submit'
//                     disabled={this.validateFolderName()}>Submit</button>
//                 </fieldset>

//             </form>
//         )
//     }
// }

// export default AddFolderMain;

import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm.js'
import config from '../config.js'
import ApiContext from '../ApiContext.js'
import PropTypes from 'prop-types'


export default class AddFolder extends React.Component {
  static contextType = ApiContext;
  onSubmit = e => {
    e.preventDefault();
    const name = e.target.folderName.value;
    fetch(`${config.API_ENDPOINT}/folders`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({name}) }
    )
    .then(resp => resp.json())
    .then(folder => this.context.addFolder(folder))
    .then(() => this.props.history.push('/'))
    .catch(err => console.error(err))
  }
  render() {
    return (
      <NotefulForm onSubmit={this.onSubmit}>
        <label>
          <span>New Folder Name</span>
          <input name="folderName" pattern=".*\S+.*" required title="A folder name must not be blank." placeholder="Best Folder Ever" />
        </label>
        <input type="submit" value="Add Folder" />
      </NotefulForm>
    );
  }
}

AddFolder.propTypes = {
  history: PropTypes.object.isRequired
}

// import React, { Component } from 'react'
// import NotefulForm from '../NotefulForm/NotefulForm'
// import './AddFolder.css'

// export default class AddFolder extends Component {
//   render() {
//     return (
//       <section className='AddFolder'>
//         <h2>Create a folder</h2>
//         <NotefulForm>
//           <div className='field'>
//             <label htmlFor='folder-name-input'>
//               Name
//             </label>
//             <input type='text' id='folder-name-input' />
//           </div>
//           <div className='buttons'>
//             <button type='submit'>
//               Add folder
//             </button>
//           </div>
//         </NotefulForm>
//       </section>
//     )
//   }
// }