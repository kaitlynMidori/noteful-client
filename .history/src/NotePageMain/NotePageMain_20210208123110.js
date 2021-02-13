import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'
import PropTypes from 'prop-types'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

NotePageMain.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

// NotePageMain.propTypes = {
//   tag: PropTypes.elementType.isRequired,
//   match: PropTypes.shape.isRequired,
//   params: PropTypes.shape.isRequired,
//   noteId: PropTypes.string.isRequired
// }

// import React from 'react'
// import Note from '../Note/Note'
// import './NotePageMain.css'

// export default function NotePageMain(props) {
//   return (
//     <section className='NotePageMain'>
//       <Note
//         id={props.note.id}
//         name={props.note.name}
//         modified={props.note.modified}
//       />
//       <div className='NotePageMain__content'>
//         {props.note.content.split(/\n \r|\n/).map((para, i) =>
//           <p key={i}>{para}</p>
//         )}
//       </div>
//     </section>
//   )
// }

// NotePageMain.defaultProps = {
//   note: {
//     content: '',
//   }
// }