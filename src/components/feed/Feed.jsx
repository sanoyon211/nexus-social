import { useApp } from '../../context/AppContext';
import PostCard from './PostCard';
import Stories from '../stories/Stories';
import Avatar from '../ui/Avatar';
import { RiImageAddLine, RiEmotionLine, RiMapPinLine } from 'react-icons/ri';
import { useState } from 'react';

const TABS = ['For you', 'Following', 'Recent'];

export default function Feed() {
  const { posts, user, setCreatePostOpen } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-xl mx-auto px-3 py-4">
      {/* Stories */}
      <Stories />

      {/* Create post bar */}
      <div
        className="bg-[#0e0e1c] border border-[#21213d] rounded-2xl p-3.5 mb-4 cursor-pointer hover:border-[#2a2a4a] transition-all"
        onClick={() => setCreatePostOpen(true)}
      >
        <div className="flex items-center gap-3 mb-3">
          <Avatar src={user.avatar} name={user.name} size="sm" online />
          <div className="flex-1 bg-[#17172e] border border-[#21213d] hover:border-[#2a2a4a] rounded-xl px-3.5 py-2.5 transition-all">
            <p className="text-sm text-[#4a4a75]">what's on your mind?</p>
          </div>
        </div>
        <div className="flex items-center gap-1 pt-2.5 border-t border-[#17172e]">
          <button
            onClick={e => {
              e.stopPropagation();
              setCreatePostOpen(true);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs text-emerald-400/80 hover:text-emerald-400 hover:bg-emerald-400/8 transition-all cursor-pointer"
          >
            <RiImageAddLine className="text-sm" /> Photo
          </button>
          <div className="w-px h-3.5 bg-[#21213d]" />
          <button
            onClick={e => {
              e.stopPropagation();
              setCreatePostOpen(true);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-400/8 transition-all cursor-pointer"
          >
            <RiEmotionLine className="text-sm" /> Feeling
          </button>
          <div className="w-px h-3.5 bg-[#21213d]" />
          <button
            onClick={e => {
              e.stopPropagation();
              setCreatePostOpen(true);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs text-red-400/80 hover:text-red-400 hover:bg-red-400/8 transition-all cursor-pointer"
          >
            <RiMapPinLine className="text-sm" /> Location
          </button>
        </div>
      </div>

      {/* Feed tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-[#17172e] pb-0">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 text-sm font-medium transition-all cursor-pointer relative
              ${
                activeTab === i
                  ? 'text-white'
                  : 'text-[#4a4a75] hover:text-[#7c7caa]'
              }`}
          >
            {tab}
            {activeTab === i && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
