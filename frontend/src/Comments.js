import React from 'react'
import Comment from './Comment'
import { useEffect, useState } from 'react'
const Comments = ({videoId, comments, setComments}) => {

  const [comment, setComment] = useState('');

  useEffect(() => {
    const getComments = async () => {
      try {
        let response = await fetch(`/api/comments/${videoId}`);
        if(!response.ok) {
          throw new Error('Something went wrong');
        } else {
          response = await response.json();
          setComments(response.comments);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getComments();
  }, [videoId]);

  const handleComment = async (e) => {
    //need to check if comment is non-empty
    //if it is empty, return
    //otherwise create a new comment using fetch api

    if(comment.length === 0) {
      return;
    }

    try {
      let response = await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: comment, video: videoId})
        }
      );
      setComment('');

      if(!response.ok) {
        throw new Error('Something went wrong');
      }

      response = await response.json();

      if(comments) 
        setComments([...comments, response.comment]);
      else
      setComments([response.comment]);
      
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section className='Comments'>
      <h1>Comments</h1>

      <div className='comment-input-area'>
      <textarea className='comment-input' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      <button className='comment-btn' onClick={handleComment}>Reply</button>
      </div>

      {comments.length ? comments.map((comment) => <Comment 
        key={comment._id}
        username={comment.createdBy.username}
        pfp={comment.createdBy.pfp}
        content={comment.content}
      />) : <h4 style={{textAlign:'center'}}>No comments yet</h4>
      }
      

    </section>
  )
}

export default Comments