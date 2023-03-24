import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = []

class Comments extends Component {
  state = {
    commentList: initialCommentsList,
    name: '',
    comment: '',
    count: 0,
  }

  onSubmitComment = event => {
    event.preventDefault()

    const {name, comment, commentList} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      count: commentList.length + 1,
      name: '',
      comment: '',
    }))
  }

  onNameInput = event => {
    this.setState({name: event.target.value})
  }

  onCommentInput = event => {
    this.setState({comment: event.target.value})
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(each => {
        if (id === each.id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  deleteComment = id => {
    const {commentList} = this.state
    const deletedCommentList = commentList.filter(each => id !== each.id)
    this.setState(prevState => ({
      count: prevState.count - 1,
      commentList: deletedCommentList,
    }))
  }

  render() {
    const {count, name, comment, commentList} = this.state

    return (
      <div>
        <div className="comments-app-container">
          <div>
            <h1>Comments</h1>
            <p>Say Something</p>
            <form className="form-container" onSubmit={this.onSubmitComment}>
              <input
                className="name-input"
                value={name}
                placeholder="Your Name"
                onChange={this.onNameInput}
              />
              <textarea
                className="comment-input"
                value={comment}
                placeholder="Your Comment"
                onChange={this.onCommentInput}
              />
              <button className="button" type="submit">
                Add Comment
              </button>
            </form>
          </div>

          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <div className="comment-header">
          <p className="count"> {count} </p>
          <p>Comments</p>
        </div>
        <div>
          <ul>
            {commentList.map(each => (
              <CommentItem
                commentDetails={each}
                key={each.id}
                toggleIsLiked={this.toggleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
