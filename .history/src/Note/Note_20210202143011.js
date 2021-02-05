// import React from 'react'
// import { Link } from 'react-router-dom'
// import { format } from 'date-fns'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import ApiContext from '../ApiContext'
// import config from '../config'
// import './Note.css'
// import PropTypes from 'prop-types'

// export default class Note extends React.Component {
//   static defaultProps ={
//     onDeleteNote: () => {},
//   }

//   static propTypes = {
//     name: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     modified: PropTypes.string.isRequired,
//     onDeleteNote: PropTypes.func.isRequired
//   }

//   static contextType = ApiContext;

//   handleClickDelete = e => {
//     e.preventDefault()
//     const noteId = this.props.id

//     fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
//       method: 'DELETE',
//       headers: {
//         'content-type': 'application/json'
//       },
//     })
//       .then(res => {
//         if (!res.ok)
//           return res.json().then(e => Promise.reject(e))
//         return res.json()
//       })
//       .then(() => {
//         this.context.deleteNote(noteId)
//         // allow parent to perform extra behaviour
//         this.props.onDeleteNote(noteId)
//       })
//       .catch(error => {
//         console.error({ error })
//       })
//   }

//   render() {
//     const { name, id, modified } = this.props
//     return (
//       <div className='Note'>
//         <h2 className='Note__title'>
//           <Link to={`/note/${id}`}>
//             {name}
//           </Link>
//         </h2>
//         <button
//           className='Note__delete'
//           type='button'
//           onClick={this.handleClickDelete}
//         >
//           <FontAwesomeIcon icon='trash-alt' />
//           {' '}
//           remove
//         </button>
//         <div className='Note__dates'>
//           <div className='Note__dates-modified'>
//             Modified
//             {' '}
//             <span className='Date'>
//               {format(Date.parse(modified), 'dd MMM yyyy')}
//               {/* {format(modified, 'dd MMM yyyy')} */}
//             </span>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()

    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${config.API_KEY}`
    },
    })
      .then(res => {
        if (!res.ok) {
            return res.then(e => Promise.reject(e))  
        }
        return res;
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {new Date(Date.parse(modified)).toString()}
            </span>
          </div>
        </div>
      </div>
    )
  }
}