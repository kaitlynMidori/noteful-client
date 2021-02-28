import React from "react";

import Context from "../ApiContext";
import config from "../config";

export default class NewNote extends React.Component {
  state = {
    title: "",
    content: "",
    folderId: this.context.folders[0].id,
  };

  static contextType = Context;
  // need to create error handling for functions
  newNote(e) {
    e.preventDefault();
    fetch(config.API_ENDPOINT + "/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        this.context.newNote(res);
        this.setState({ title: "", content: "", error: null });
      })
      .catch((err) => {
        this.setState({
          error: "Unable to create new note. Please try again later.",
        });
      });
  }

  folderOptions = () => {
    this.context.folders.map((folder, i) => {
      return (
        <option key={i} value={folder.id}>
          {folder.title}
        </option>
      );
    });
  };

  getFolderId = (e) => {
    this.setState({
      folderId: e.target.value,
    });
  };

  render() {
    const error = this.state.error ? (
      <div className="error">{this.state.error}</div>
    ) : (
      ""
    );
    return (
      <section id="AddNote" className="AddNote">
        <form
          onSubmit={(e) => {
            this.newNote(e);
            this.props.history.push(`/folders/${this.state.folderId}`);
          }}
        >
          <h2>Note title:</h2>
          {error}
          <input
            type="text"
            name="noteName"
            id="noteName"
            value={this.state.name}
            required
            onChange={(e) => this.setState({ title: e.target.value })}
          ></input>
          <h2>Note content:</h2>
          <input
            type="text"
            title="content"
            id="content"
            aria-label="Add note name"
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
          ></input>
          <select name="folderId" onChange={(e) => this.getFolderId(e)}>
            {this.context.folders.map((folder, i) => {
              return (
                <option key={i} value={folder.id}>
                  {folder.title}
                </option>
              );
            })}
          </select>
          <button>Add</button>
        </form>
      </section>
    );
  }
}