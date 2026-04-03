import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiHashtag,
  RiUserAddLine,
  RiCheckLine,
  RiFireLine,
} from 'react-icons/ri';
import Avatar from '../ui/Avatar';
import { suggestedUsers, trendingTopics } from '../../data/mockData';

export default function RightPanel() {
  const navigate = useNavigate();
  const [following, setFollowing] = useState({});

  return (
    <aside className="flex flex-col gap-5 py-5 px-3">
      {/* Trending */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <RiFireLine className="text-orange-400 text-base" />
          <h3 className="text-xs font-semibold text-[#7c7caa] uppercase tracking-wider">
            Trending
          </h3>
        </div>
        <div className="flex flex-col gap-0.5">
          {trendingTopics.map((topic, i) => (
            <button
              key={topic.id}
              onClick={() => navigate('/explore')}
              className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-[#13132a] transition-all cursor-pointer group w-full text-left"
            >
              <span className="text-xs text-[#4a4a75] w-4 text-right flex-shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <RiHashtag className="text-violet-500 text-xs flex-shrink-0" />
                  <span className="text-sm font-medium text-[#c8c8e8] group-hover:text-white transition-colors truncate">
                    {topic.tag}
                  </span>
                  {topic.hot && (
                    <span className="text-[9px] text-orange-400 font-bold flex-shrink-0">
                      🔥
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#4a4a75] ml-3">{topic.posts}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#17172e]" />

      {/* Suggested */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-semibold text-[#7c7caa] uppercase tracking-wider">
            People to follow
          </h3>
          <button
            onClick={() => navigate('/friends')}
            className="text-[11px] text-violet-400 hover:text-violet-300 cursor-pointer transition-colors"
          >
            see all
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {suggestedUsers.map(u => (
            <div
              key={u.id}
              className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-[#13132a] transition-all group"
            >
              <button
                onClick={() => navigate(`/profile/${u.username}`)}
                className="flex-shrink-0 cursor-pointer"
              >
                <Avatar
                  src={u.avatar}
                  name={u.name}
                  size="sm"
                  online={u.online}
                />
              </button>
              <div
                className="flex-1 min-w-0"
                onClick={() => navigate(`/profile/${u.username}`)}
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  <p className="text-xs font-semibold text-[#c8c8e8] group-hover:text-white transition-colors truncate">
                    {u.name}
                  </p>
                </div>
                <p className="text-[11px] text-[#4a4a75] truncate">
                  {u.mutual > 0 ? `${u.mutual} mutual` : `@${u.username}`}
                </p>
              </div>
              <button
                onClick={() => setFollowing(p => ({ ...p, [u.id]: !p[u.id] }))}
                className={`flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer
                  ${
                    following[u.id]
                      ? 'bg-[#17172e] text-[#7c7caa] border border-[#21213d]'
                      : 'bg-violet-700/20 text-violet-400 hover:bg-violet-700/30 border border-violet-700/30'
                  }`}
              >
                {following[u.id] ? (
                  <>
                    <RiCheckLine /> Following
                  </>
                ) : (
                  <>
                    <RiUserAddLine /> Follow
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-1 mt-auto">
        <p className="text-[10px] text-[#4a4a75] leading-relaxed">
          © 2025 Nexus ·{' '}
          <span className="hover:text-violet-400 cursor-pointer">Privacy</span>{' '}
          · <span className="hover:text-violet-400 cursor-pointer">Terms</span>
        </p>
      </div>
    </aside>
  );
}
