import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_SEARCH_URL = process.env.YOUTUBE_SEARCH_URL;
const YOUTUBE_VIDEO_DETAILS_URL = process.env.YOUTUBE_VIDEO_DETAILS_URL;

const TIKTOK_API_HOST:string = process.env.TIKTOK_API_HOST;
const TIKTOK_API_KEY:string = process.env.TIKTOK_API_KEY;
const TIKTOK_SEARCH_URL:string = process.env.TIKTOK_SEARCH_URL;

interface Video {
    id: string;
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnail: string;
    views: number;
    likes?: number;
    comments?: number;
    link: string;
}

// **Search YouTube Function**
const searchYouTube = async (query: string): Promise<Video[]> => {
    try {
        const searchResponse = await axios.get(YOUTUBE_SEARCH_URL, {
            params: {
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: 10,
                key: YOUTUBE_API_KEY
            }
        });
        const videoIds = searchResponse.data.items.map(item => item.id.videoId);
        console.log('videoIds', videoIds)
        if (!videoIds.length) {
            console.log('No videos found.');
            return [];
        }

        const detailsResponse = await axios.get(YOUTUBE_VIDEO_DETAILS_URL, {
            params: {
                part: 'snippet,statistics',
                id: videoIds.join(','),
                key: YOUTUBE_API_KEY
            }
        });
        console.log('detailsResponse', detailsResponse)

        const videos: Video[] = detailsResponse.data.items.map((video: any) => ({
            id: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            channelTitle: video.snippet.channelTitle,
            publishedAt: video.snippet.publishedAt,
            thumbnail: video.snippet.thumbnails.high.url,
            views: parseInt(video.statistics.viewCount || '0'),
            likes: video.statistics.likeCount ? parseInt(video.statistics.likeCount) : undefined,
            comments: video.statistics.commentCount ? parseInt(video.statistics.commentCount) : undefined,
            link: `https://www.youtube.com/watch?v=${video.id}`
        }));

        return videos.sort((a, b) => b.views - a.views);

    } catch (error: any) {
        console.error('Error fetching YouTube data:', error.response?.data || error.message);
        return [];
    }
};

// **Search TikTok Function**
const searchTikTok = async (query: string): Promise<Video[]> => {
    try {
        const response = await axios.get(TIKTOK_SEARCH_URL, {
            params: {
                keyword: query,
                cursor: 0,
                search_id: 0
            },
            headers: {
                'x-rapidapi-host': TIKTOK_API_HOST,
                'x-rapidapi-key': TIKTOK_API_KEY
            }
        });

        const items = response.data.item_list || [];

        if (!items.length) {
            console.log('No TikTok videos found.');
            return [];
        }

        const videos: Video[] = items.map((item: any) => ({
            id: item.id,
            title: item.desc || 'No title',
            description: item.desc || '',
            channelTitle: item.author?.nickname || 'Unknown',
            publishedAt: new Date(item.createTime * 1000).toISOString(),
            thumbnail: item.video?.cover || '',
            views: item.stats?.playCount || 0,
            likes: item.stats?.diggCount || 0,
            comments: item.stats?.commentCount || 0,
            link: `https://www.tiktok.com/@${item.author?.uniqueId}/video/${item.id}`
        }));

        return videos.sort((a, b) => b.views - a.views);

    } catch (error: any) {
        console.error('Error fetching TikTok data:', error.response?.data || error.message);
        return [];
    }
};

// **Example Usage**
export { searchYouTube, searchTikTok };
