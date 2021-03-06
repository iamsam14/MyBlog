import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import { AppContext } from '../Context/AppContext';

const Articles = ({ history }) => {
 const [allPosts, setAllPosts] = useState(null);
 const { loading, setLoading } = useContext(AppContext);

 useEffect(() => {
  axios.get('/api/posts').then((res) => {
   setLoading(true);
   setAllPosts(res.data);
   setLoading(true);
  });
 }, [loading, setLoading]);

 return (
  <>
   <NavigationBar />
   <div style={{ marginTop: '2rem' }}>
    <button
     className="add-post button-style"
     onClick={() => history.push('/create')}
    >
     Create Recipe
    </button>
    <button
     className="view-button button-style"
     style={{ marginLeft: '35px' }}
     onClick={() => history.push('/search')}
    >
     Search Recipes
    </button>
    <div className="articles">
     {allPosts
      ? allPosts.map((post) => {
         return (
          <div key={post._id}>
           <a
            key={post.id + '1'}
            href={`/article/${post._id}`}
            style={{ color: '#74121D' }}
           >
            <h3 key={post.id + '2'}>{post.title}</h3>
           </a>
           <p key={post.id + '3'}>
            {post.article.length > 100
             ? post.article.substring(0, 100) + '...'
             : post.article}
           </p>
          </div>
         );
        })
      : ''}
    </div>
   </div>
  </>
 );
};

export default Articles;
