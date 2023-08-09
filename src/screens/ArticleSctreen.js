import React, { useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import moment from 'moment';
import { Context } from '../app/context/context';

function ArticleSctreen() {
  let { id } = useParams();
  const navigate = useNavigate();

  const { filteredNews } = useContext(Context);


  const article = filteredNews.filter(i => i.publishedAt === id);

  const formattedDate = moment().from(article.publishedAt);

  return (
    <div>

      {/* Article  Navigation */}

      <div className="flex justify-between border border-gray-500">

        <button 
          className='
            flex justify-center items-center
            w-20 h-10 bg-gray-400 rounded m-3'
          onClick={() => navigate(-1)}
            >
          Back
        </button>

        <Link
         to={`/`}
         className='
          flex justify-center items-center
          p-2 h-10 bg-gray-400 rounded m-3'
        >
          Home
          <img className="w-10 m-2 bg-gray-400 rounded p-1" alt="article" src="../images/logo1.png" />
        </Link>

      </div>

      {/* Article page */}

      {article && (
        <div className="flex flex-col justify-center items-center p-5">
          <p className='text-xl font-bold p-3'>{article[0].title}</p>
          <img className='p-4' src={article[0].urlToImage} alt='article ' />
          <p className='text-l text-white p-3'>{article[0].content}</p>
          <p className='text-l text-white p-3'>{article[0].description}</p>
          <a className='text-l text-blue-400 p-3' href={article[0].url}>Source name: {article[0].source.name}</a>
          <p className='text-l text-white p-3'>Published: {formattedDate} ago</p>
        </div>
      )}

    </div>
  )
}

export default ArticleSctreen
