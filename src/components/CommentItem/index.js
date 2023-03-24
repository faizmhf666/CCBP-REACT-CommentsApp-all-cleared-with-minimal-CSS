import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLiked, deleteComment} = props
  const {name, comment, isLiked, initialClassName, date, id} = commentDetails

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const head = name.slice(0, 1)

  const dateString = formatDistanceToNow(new Date(date))

  const onClickIcon = () => {
    toggleIsLiked(id)
  }

  const onDelete = () => {
    deleteComment(id)
  }

  return (
    <li className="list-container">
      <div className="comment-section-top">
        <div className={initialClassName}>
          <h1 className="initial">{head}</h1>
        </div>
        <p className="userName">{name}</p>
        <p className="time">{dateString}</p>
      </div>
      <div className="comment-section-bottom">
        <p>{comment}</p>
        <div className="btn-container">
          <button type="button" onClick={onClickIcon} className="btn">
            <img src={likeImgUrl} className="favorite-icon" alt="like" />
          </button>
          <button
            type="button"
            data-testId="delete"
            onClick={onDelete}
            className="btn"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
