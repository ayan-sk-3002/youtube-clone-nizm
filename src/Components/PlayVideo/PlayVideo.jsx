import React, { useEffect, useState } from 'react';
import '../PlayVideo/PlayVideo.css';
import video1 from '../../Components/assets/video.mp4';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import share from '../assets/share.png';
import save from '../assets/save.png';
import jack from '../assets/jack.png';
import user from '../assets/user_profile.jpg';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = ({  }) => {
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentsData, setCommentsData] = useState([]);

    const {videoId} = useParams();

    const fetchVideoData = async () => {
        const video_data_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
        try {
            const response = await fetch(video_data_url);
            const data = await response.json();
            setApiData(data.items[0]);
        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    const fetchOtherData = async () => {
        if (!apiData) return;

        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        const comments_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}`;

        try {
            const [channelResponse, commentsResponse] = await Promise.all([
                fetch(channelData_url),
                fetch(comments_url)
            ]);

            const channelData = await channelResponse.json();
            const commentsData = await commentsResponse.json();

            setChannelData(channelData.items[0]);
            setCommentsData(commentsData.items);
        } catch (error) {
            console.error('Error fetching other data:', error);
        }
    };

    useEffect(() => {
        fetchOtherData();
    }, [apiData, videoId]);

    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen 
                title="YouTube Video Player"
            ></iframe>
            <h3>{apiData ? apiData.snippet.title : "title"}</h3>
            <div className="play-video-info">
                <p>{apiData ? value_converter(apiData.statistics.viewCount) : 0} &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "2 days ago"}</p>
                <div>
                    <span><img src={like} alt="Like" />{apiData ? value_converter(apiData.statistics.likeCount) : 0}</span>
                    <span><img src={dislike} alt="Dislike" /></span>
                    <span><img src={share} alt="Share" />Share</span>
                    <span><img src={save} alt="Save" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : jack} alt="Channel Thumbnail" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : "Channel Title"}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-des">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : ""}</p>
               
                <hr />
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : "0"} Comments</h4>
                {commentsData.map((e, i) => (
                    <div key={i} className="comment">
                        <img src={e.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User Profile" />
                        <div>
                            <h3>{e.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(e.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                            <p>{e.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <img src={like} alt="Like" />
                                <span>{value_converter(e.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="Dislike" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayVideo;
