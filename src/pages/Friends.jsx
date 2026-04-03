import { useState } from 'react';
import {
  RiUserAddLine,
  RiUserFollowLine,
  RiUserLine,
  RiSearchLine,
  RiCloseLine,
  RiCheckLine,
} from 'react-icons/ri';
import { users } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Avatar from '../components/ui/Avatar';

export default function Friends() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('suggestions');
  const [followState, setFollowState] = useState({});
  const [search, setSearch] = useState('');

  const requests = users.filter(u => u.hasSentRequest);
  const suggestions = users.filter(u => !u.hasSentRequest);
  const following = users.filter(u => u.isFollowing);

  const filtered = list =>
    search
      ? list.filter(
          u =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.username.toLowerCase().includes(search.toLowerCase()),
        )
      : list;

  const handleFollow = id => {
    setFollowState(prev => ({
      ...prev,
      [id]: prev[id] === 'following' ? null : 'following',
    }));
  };

  const handleAccept = id => {
    setFollowState(prev => ({ ...prev, [id]: 'accepted' }));
  };

  const tabs = [
    {
      id: 'suggestions',
      label: 'Suggestions',
      icon: RiUserAddLine,
      count: suggestions.length,
    },
    {
      id: 'requests',
      label: 'Requests',
      icon: RiUserFollowLine,
      count: requests.length,
    },
    {
      id: 'following',
      label: 'Following',
      icon: RiUserLine,
      count: following.length,
    },
  ];

  const displayList =
    tab === 'suggestions'
      ? filtered(suggestions)
      : tab === 'requests'
        ? filtered(requests)
        : filtered(following);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Friends</h1>
        <p className="text-sm text-[#8888bb]">
          Manage your connections and discover new people
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5880]" />
        <input
          type="text"
          placeholder="Search people..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#0f0f26] border border-[#1e1e48] focus:border-violet-600/50 text-[#eeeeff] placeholder-[#5a5880] text-sm rounded-2xl pl-10 pr-4 py-3 outline-none transition-all"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer
                ${
                  tab === t.id
                    ? 'bg-violet-600/20 text-violet-300 border border-violet-600/30'
                    : 'text-[#8888bb] hover:text-white hover:bg-[#1a1a40] border border-[#1e1e48]'
                }`}
            >
              <Icon className="text-base" />
              {t.label}
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${tab === t.id ? 'bg-violet-600 text-white' : 'bg-[#1a1a40] text-[#8888bb]'}`}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Friend Request Banner */}
      {tab === 'requests' && requests.length > 0 && (
        <div className="bg-violet-600/10 border border-violet-600/25 rounded-2xl p-4 mb-5">
          <p className="text-sm text-violet-300 font-medium">
            🔔 You have {requests.length} pending friend request
            {requests.length > 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Users Grid */}
      {displayList.length === 0 ? (
        <div className="text-center py-16 text-[#5a5880]">
          <RiUserLine className="text-4xl mx-auto mb-3 text-[#2a2a50]" />
          <p className="text-sm font-medium">No {tab} found</p>
          {search && (
            <p className="text-xs mt-1">Try a different search term</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayList.map(u => {
            const state = followState[u.id];
            return (
              <div
                key={u.id}
                className="bg-[#0f0f26] border border-[#1e1e48] hover:border-violet-600/25 rounded-2xl overflow-hidden transition-all group"
              >
                {/* Cover */}
                <div className="h-20 relative">
                  <img
                    src={u.coverPhoto}
                    alt="cover"
                    className="w-full h-full object-cover brightness-60 group-hover:brightness-70 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f0f26]/80" />
                </div>

                <div className="px-4 pb-4">
                  <div className="-mt-8 mb-3">
                    <button onClick={() => navigate(`/profile/${u.username}`)}>
                      <Avatar
                        src={u.avatar}
                        name={u.name}
                        size="lg"
                        online={u.online}
                      />
                    </button>
                  </div>

                  <button
                    onClick={() => navigate(`/profile/${u.username}`)}
                    className="text-left w-full"
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 className="text-sm font-semibold text-white hover:text-violet-300 transition-colors">
                        {u.name}
                      </h3>
                      {u.verified && (
                        <span className="text-violet-400 text-xs">✓</span>
                      )}
                    </div>
                    <p className="text-xs text-[#5a5880] mb-1">@{u.username}</p>
                  </button>

                  <p className="text-xs text-[#8888bb] mb-2 line-clamp-2">
                    {u.bio}
                  </p>

                  {u.mutual > 0 && (
                    <p className="text-[11px] text-[#5a5880] mb-3">
                      <span className="text-violet-400">{u.mutual}</span> mutual
                      friends
                    </p>
                  )}

                  {tab === 'requests' ? (
                    <div className="flex gap-2">
                      {state === 'accepted' ? (
                        <div className="flex-1 flex items-center justify-center gap-1 text-emerald-400 text-xs font-medium py-2 rounded-xl bg-emerald-400/10 border border-emerald-400/25">
                          <RiCheckLine /> Friends now
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAccept(u.id)}
                            className="flex-1 text-xs font-semibold py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-all cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              setFollowState(p => ({
                                ...p,
                                [u.id]: 'declined',
                              }))
                            }
                            className="flex-1 text-xs font-semibold py-2 rounded-xl bg-[#1a1a40] text-[#8888bb] hover:text-white border border-[#252550] hover:border-red-500/30 transition-all cursor-pointer"
                          >
                            Decline
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleFollow(u.id)}
                      className={`w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl transition-all cursor-pointer
                        ${
                          state === 'following' || u.isFollowing
                            ? 'bg-[#1a1a40] text-[#8888bb] border border-[#252550] hover:border-red-500/30 hover:text-red-400'
                            : 'bg-violet-600/20 text-violet-400 hover:bg-violet-600/30 border border-violet-600/30'
                        }`}
                    >
                      {state === 'following' || (u.isFollowing && !state) ? (
                        <>
                          <RiCheckLine /> Following
                        </>
                      ) : (
                        <>
                          <RiUserAddLine /> Follow
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
