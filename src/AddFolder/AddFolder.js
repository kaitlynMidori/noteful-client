import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm.js';
import config from '../config.js';
import ApiContext from '../ApiContext.js';

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