import { useState } from 'react';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';
import { stories } from '../../data/mockData';
import Avatar from '../ui/Avatar';
import { useApp } from '../../context/AppContext';

export default function Stories() {
  const { user } = useApp();
  const [viewStory, setViewStory] = useState(null);
  const [seenStories, setSeenStories] = useState(new Set());

  const handleView = story => {
    if (!story.isOwn) {
      setViewStory(story);
      setSeenStories(prev => new Set([...prev, story.id]));
    }
  };

  return (
    <>
      <div className="bg-[#0f0f26] border border-[#1e1e48] rounded-2xl p-4 mb-4">
        <div
          className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {stories.map(story => {
            const isSeen = seenStories.has(story.id) || story.seen;
            return (
              <button
                key={story.id}
                onClick={() => handleView(story)}
                className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
              >
                <div className="relative">
                  {story.isOwn ? (
                    <div className="w-16 h-16 rounded-2xl overflow-hidden relative">
                      <img
                        src={story.image}
                        alt="Add story"
                        className="w-full h-full object-cover brightness-50"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                          <RiAddLine className="text-white text-sm" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`p-0.5 rounded-2xl ${isSeen ? 'story-ring-seen' : 'story-ring'}`}
                    >
                      <div className="w-14 h-14 rounded-[14px] overflow-hidden">
                        <img
                          src={story.image}
                          alt={story.user.name}
                          className={`w-full h-full object-cover transition-all duration-200 group-hover:scale-105 ${isSeen ? 'brightness-60' : 'brightness-90'}`}
                        />
                      </div>
                    </div>
                  )}
                  {!story.isOwn && (
                    <div className="absolute -bottom-1 -right-1">
                      <Avatar
                        src={story.user.avatar}
                        name={story.user.name}
                        size="xs"
                      />
                    </div>
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium truncate max-w-[70px] text-center ${isSeen ? 'text-[#5a5880]' : 'text-[#eeeeff]'}`}
                >
                  {story.isOwn ? 'Add Story' : story.user.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {viewStory && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center fade-in"
          onClick={() => setViewStory(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div
            className="relative w-80 h-[560px] rounded-3xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={viewStory.image}
              alt="Story"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
            {/* Progress bar */}
            <div className="absolute top-3 left-3 right-3 h-0.5 bg-white/20 rounded-full">
              <div className="h-full bg-white rounded-full w-1/3 animate-pulse" />
            </div>
            {/* User info */}
            <div className="absolute top-6 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar
                  src={viewStory.user.avatar}
                  name={viewStory.user.name}
                  size="sm"
                />
                <div>
                  <p className="text-white text-sm font-semibold">
                    {viewStory.user.name}
                  </p>
                  <p className="text-white/60 text-xs">3h ago</p>
                </div>
              </div>
              <button
                onClick={() => setViewStory(null)}
                className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/50 transition-all"
              >
                <RiCloseLine className="text-white text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
