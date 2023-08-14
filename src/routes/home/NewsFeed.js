import { useState, useEffect } from 'react';
import axios from 'axios';

import Post from './Post';
import NewPostModal from './NewPostModal';

export default function NewsFeed({ serverURL = { serverURL } }) {

    // const [state.posts, setPosts] = useState([]);
    // const [isPostModalVisible, setIsPostModalVisible] = useState(false);
    // const [isNFLoading, setIsNFLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);
    const [isPostLoading, setIsPostLoading] = useState(false);

    const [state, setState] = useState({
        posts: [],
        isPostModalVisible: false,
        isNFLoading: true
    });

    async function updatePosts() {
        try {
            const response = await axios.get(serverURL + '/posts');
            setState({ ...state, posts: response.data, isNFLoading: false });
        } catch (err) {
            console.log(err);
            setState({ ...state, isNFLoading: true });
        }
    }

    useEffect(() => {
        updatePosts()   // render posts on load
    }, [])

    function handleClickOutside() {
        setState({ ...state, isPostModalVisible: false });
    }


    async function addNewPost(post_text) {

        const newPost = {
            name: 'Anonymous',
            post: post_text,
            likes: 0,
            comments: [],
            upload_date: new Date()
        }

        setIsPostLoading(true);

        try {
            await axios.post(serverURL + '/add_post', newPost)
                .then(async res => await updatePosts())
                .then(res => setIsPostLoading(false));
        } catch (err) {
            setIsPostLoading(false);
            console.log(err);
            return err;
        }

    }


    async function handleDeletePost(_id) {
        console.log(String(_id));
        await axios.delete(serverURL + '/delete_post/' + _id)
            .then(response => {
                console.log(response.data); // Data deleted successfully
            })
            .catch(error => {
                console.error(error); // Handle error
            });

        updatePosts();
    }

    return (
        <div id='NewsFeed'>
            <div id='new-post-input' >
                <input type='text' placeholder="What's on your mind?" onClick={() => setState({ ...state, isPostModalVisible: true })} disabled={state.isPostModalVisible} />
                <div id='new-post-loading'>{isPostLoading && <h5>Posting...</h5>}</div>
            </div>
            <div id='posts-container'>
                {
                    state.isNFLoading ? <h1 id='nf-loading-text'>Loading Feed...</h1> : (state.posts && state.posts.length > 0 && isOnline) ? (
                        state.posts.map(post => {
                            return <Post
                                uploadDate={post.upload_date}
                                _id={post._id}
                                name={post.name}
                                post={post.post}
                                comments={post.comments}
                                likes={post.likes}
                                handleDeletePost={handleDeletePost}
                            />
                        })
                    )
                        : (isOnline) ? <h2 id='newsfeed-no-post'>No Posts on this Feed</h2>
                            : <h2 id='newsfeed-no-post'>Check your Internet Connection</h2>
                }

            </div>
            {
                !state.isNFLoading && <p id='newsfeed-end-text' >End of your News Feed</p>
            }

            {
                state.isPostModalVisible && <NewPostModal
                    handleClickOutside={handleClickOutside}
                    addNewPost={addNewPost}
                />
            }

        </div>
    )
}