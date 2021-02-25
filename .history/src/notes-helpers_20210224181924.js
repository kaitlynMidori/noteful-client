import React from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../StoreContext';
import PropTypes from 'prop-types';
import DeleteNote from '../Elements/DeleteNoteButton';

class NoteSideBar extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired
    };

    render() {
        return (
            <StoreContext.Consumer>
                {({ folders, notes }) => {

                    const note = notes.find(note => {
                        return this.props.match.params.noteId
                            === note.note_name
                    }) || { content: '', name: 'Name Unknown' }

                    const folder = folders.find(folder => {
                        return folder.id === note.folderId
                    }) || { name: 'Folder Name Unknown' }

                    return (
                        <>
                            <ul>
                                <Link to='/'>
                                    <li
                                        key='goBack'>GO BACK</li>
                                </Link>
                            </ul>
                            <DeleteNote
                            noteMain='note-main'
                                id={note.id} />
                            <h2>{folder.folder_name}</h2>
                        </>
                    )
                }}
            </StoreContext.Consumer>
        )
    }
}

export default NoteSideBar;

// export const findFolder = (folders=[], folderId) =>
//   folders.find(folder => folder.id === folderId)

// export const findNote = (notes=[], noteId) =>
//   notes.find(note => note.id === noteId)

// export const getNotesForFolder = (notes=[], folderId) => (
//   (!folderId)
//     ? notes
//     : notes.filter(note => note.folderId === folderId)
// )

// export const countNotesForFolder = (notes=[], folderId) =>
//   notes.filter(note => note.folderId === folderId).length