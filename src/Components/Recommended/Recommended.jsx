import React, { useEffect, useState } from 'react';
import '../Recommended/Recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
        try {
            const response = await fetch(relatedVideo_url);
            const data = await response.json();
            setApiData(data.items);
        } catch (error) {
            console.error('Error fetching related videos:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    return (
        <div className='recommended'>
            {apiData.map((item, index) => (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`}>
                <div key={index} className="side-video-list">
                    <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_converter(item.statistics.viewCount)} views</p>
                    </div>
                </div></Link>
            ))}
        </div>
    );
};

export default Recommended;
