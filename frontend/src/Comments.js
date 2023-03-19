import React from 'react'
import Comment from './Comment'
import { useEffect } from 'react'
const Comments = ({videoId, comments, setComments}) => {

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

  return (
    <section className='Comments'>
      <h1>Comments</h1>

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