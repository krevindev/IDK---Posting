import { useState, useEffect, useRef } from 'react';
import '../route_styles/HomePage.css';

import NewsFeed from './NewsFeed';

// const serverURL = 'http://localhost:3001'
const serverURL = 'https://idk-server-git-main-batchy-bot.vercel.app'

export default function HomePage() {
    return (
        <div id="HomePage" className='route-page'>
            <NewsFeed serverURL={serverURL} />
        </div>
    )
}
