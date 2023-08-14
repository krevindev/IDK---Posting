import { useState, useRef } from 'react';
import moment from 'moment';

/** Post Component */
export default function Post({ addedClass, uploadDate, _id, name, post, comments, likes, handleDeletePost }) {

    //const [state.commentsState, setstate.commentsState] = useState(comments);
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);

    const [state, setState] = useState({
        isCommentVisible: false,
        commentsState: comments,
        isOptionsVisible: false
    })

    // handles the visibility of comments section
    function commentClicked() {
        if (state.isCommentVisible) {
            setState({ ...state, isCommentVisible: false })
        } else {
            setState({ ...state, isCommentVisible: true })
        }
    }

    // handles the sending of comment
    function handleSendComment(text) {
        function isAllSpaces(str) {
            for (let i = 0; i < str.length; i++) {
                if (str[i] !== " ") {
                    return false;
                }
            }
            return true;
        }
        if (text && text !== '' && !isAllSpaces(text)) {
            setState({ ...state, commentsState: [...state.commentsState, text] })
        }
    }

    // handles the keypresses in inputs
    const handleKeyPress = (event) => {

        if (event.key === 'Enter') {
            // Enter key was pressed
            handleSendComment(event.target.value)
            event.target.value = ''
            // Perform your desired action here
        }
    };


    const optionRef = useRef(null);
    const postRef = useRef(null);

    // function isValidText(text) {
    //     function isAllSpaces(str) {
    //         for (let i = 0; i < str.length; i++) {
    //             if (str[i] !== " ") {
    //                 return false;
    //             }
    //         }
    //         return true;
    //     }
    //     if (text && text !== '' && !isAllSpaces(text)) {
    //         return true
    //     }
    // }

    return (
        <div className={addedClass + ' post'} ref={postRef}>
            <div className='post-name'>
                <div className='post-author-container'>
                    <h5>{name}</h5>
                    <p>{moment(uploadDate).fromNow()}</p>
                </div>
                <div className='post-options-btn' onClick={() => {
                    if (isOptionsVisible) {
                        setIsOptionsVisible(false);
                    } else {
                        setIsOptionsVisible(true)
                    }
                }}>
                    ...
                </div>
                {
                    isOptionsVisible &&
                    (<div ref={optionRef} className='post-options'>
                        <div className='post-option' onClick={e => {
                            postRef.current.classList.add('deleting-post')
                            handleDeletePost(_id)
                        }}>Delete</div>
                        <div className='post-option'>Turn on notifications for this post</div>
                    </div>)
                }
            </div>
            <h6 className='post-post'>
                <span>{post}</span>
            </h6>
            <div className='post-data-info'>
                <div className='post-data-likes'>
                    <h5>{likes} Likes</h5>
                </div>
                <div className='post-data-comments-share'>
                    <h5>
                        {state.commentsState.length}
                        {(state.commentsState.length > 1) ? ' Comments' : ' Comment'}
                    </h5>
                </div>
            </div>
            <div className='post-buttons'>
                <button>Like</button>
                <button onClick={commentClicked}>Comment</button>
                <button>Share</button>
            </div>

            {
                state.isCommentVisible && (
                    <div>
                        <div className='post-comments-container'>
                            {
                                (state.commentsState.length > 0) && (
                                    state.commentsState.map(comment => {
                                        return (
                                            <div className='user-comment-container'>
                                                <div className='commenter-profile'></div>
                                                <div className='user-comment-content'>
                                                    <h3>Anonymous</h3>
                                                    <h5>{comment}</h5>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            }
                        </div>

                        <div className='post-comment-input' onKeyDown={handleKeyPress}>
                            <div className='post-comment-input-profile' />
                            <input type="text" placeholder='Write a comment...'></input>


                            <button onClick={e => {
                                handleSendComment(e.target.parentElement.querySelector('input').value)
                                e.target.parentElement.querySelector('input').value = ''
                            }}>
                                Send
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}