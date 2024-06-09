import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Feed/Feed.css'
import t11 from '../assets/thumbnail1.png'
import t12 from '../assets/thumbnail2.png'
import t13 from '../assets/thumbnail3.png'
import t14 from '../assets/thumbnail4.png'
import t15 from '../assets/thumbnail5.png'
import t16 from '../assets/thumbnail6.png'
import t17 from '../assets/thumbnail7.png'
import t18 from '../assets/thumbnail8.png'
import { title_length, value_converter } from '../../data'
import moment from 'moment'
import Moment from 'react-moment'
const Feed = ({category}) => {
    const [data,setData] = useState([]);
  const fetchData = async ()=>{
    const video_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=AIzaSyARf20cEArfdpgHwY2p20zGIZ1tfSIA1xI`;
 
    await fetch(video_url).then(response=>response.json()).then(data=>setData(data.items));
  }
  useEffect(()=>{
    fetchData();
  },[category])
    return (
    <div className='feed'>
        {data.map((item,index)=>{
            return (   <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="card" key={index}>
            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
            <h2>{title_length(item.snippet.title)}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
          </Link>)
        })}
   
       
    </div>
  )
}

export default Feed