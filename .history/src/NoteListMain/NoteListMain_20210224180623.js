import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'
import PropTypes from 'prop-types'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { match } = this.props;
    const { folder_id } = match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folder_id)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}

NoteListMain.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      folder_id: PropTypes.string.isRequired
    })
  })
}

// NoteListMain.propTypes = {
//   match: PropTypes.shape.isRequired,
//   params: PropTypes.shape.isRequired,
//   folderId: PropTypes.string.isRequired
// }

// import React from 'react'
// import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Note from '../Note/Note'
// import CircleButton from '../CircleButton/CircleButton'
// import './NoteListMain.css'
// // import PropTypes from 'prop-types'

// export default function NoteListMain(props) {
//   return (
//     <section className='NoteListMain'>
//       <ul>
//         {props.notes.map(note =>
//           <li key={note.id}>
//             <Note
//               id={note.id}
//               name={note.name}
//               modified={note.modified}
//             />
//           </li>
//         )}
//       </ul>
//       <div className='NoteListMain__button-container'>
//         <CircleButton
//           tag={Link}
//           to='/add-note'
//           type='button'
//           className='NoteListMain__add-note-button'
//         >
//           <FontAwesomeIcon icon='plus' />
//           <br />
//           Note
//         </CircleButton>
//       </div>
//     </section>
//   )
// }

// NoteListMain.defaultProps = {
//   notes: [],
// }


