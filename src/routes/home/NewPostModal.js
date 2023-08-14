import { useState, useRef, useEffect } from 'react';

export default function NewPostModal({ handleClickOutside, addNewPost }) {

    const [isButtonActive, setIsButtonActive] = useState(false);

    function isValidPost(text) {
        function isAllSpaces(str) {
            for (let i = 0; i < str.length; i++) {
                if (str[i] !== " ") {
                    return false;
                }
            }
            return true;
        }
        if (text && text !== '' && !isAllSpaces(text)) {
            return true
        }
    }

    function newPostObject(text) {
        return text
    }

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <div id='new-post-modal' onClick={e => {
            if (e.target.id == 'new-post-modal') handleClickOutside();
        }}>
            <div id='new-post-modal-form'>
                <h5>Create Anonymous Post</h5>
                <textarea ref={inputRef} type='text' placeholder="What's on your mind?" onChange={(e) => {
                    if (isValidPost(e.target.value)) {
                        setIsButtonActive(true);
                    } else {
                        setIsButtonActive(false);
                    }
                }} onKeyDown={e => {
                    if (e.key === 'Enter') {
                        addNewPost(newPostObject(e.target.value));
                        handleClickOutside()
                    }
                }} />
                <button className={isButtonActive && 'button-active'} onClick={e => {
                    addNewPost(newPostObject(e.target.parentElement.querySelector('textarea').value));
                    handleClickOutside();
                }} disabled={!isButtonActive}>Post</button>
            </div>
        </div>
    )
}