import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiHeart3Line,
  RiHeart3Fill,
  RiChat1Line,
  RiShareLine,
  RiBookmarkLine,
  RiBookmarkFill,
  RiMoreLine,
  RiSendPlaneLine,
  RiEmojiStickerLine,
} from 'react-icons/ri';
import { useApp } from '../../context/AppContext';
import Avatar from '../ui/Avatar';

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const { toggleLike, toggleSave, addComment } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likeAnim, setLikeAnim] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const commentRef = useRef();

  const handleLike = () => {
    toggleLike(post.id);
    if (!post.liked) {
      setLikeAnim(true);
      setTimeout(() => setLikeAnim(false), 350);
    }
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText.trim());
    setCommentText('');
  };

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Double tap to like
  const handleDoubleClick = () => {
    if (!post.liked) handleLike();
  };

  return (
    <article className="bg-[#0e0e1c] border border-[#21213d] rounded-2xl overflow-hidden post-card card-glow mb-3">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <button
          onClick={() => navigate(`/profile/${post.user.username}`)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <Avatar
            src={post.user.avatar}
            name={post.user.name}
            size="md"
            online={post.user.online}
          />
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                {post.user.name}
              </span>
              {post.user.verified && (
                <span className="text-[10px] text-violet-400">✓</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#4a4a75]">
              <span>@{post.user.username}</span>
              <span>·</span>
              <span>{post.time}</span>
            </div>
          </div>
        </button>

        {/* More menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg text-[#4a4a75] hover:text-[#7c7caa] hover:bg-[#17172e] transition-all cursor-pointer"
          >
            <RiMoreLine className="text-lg" />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-8 bg-[#131328] border border-[#21213d] rounded-xl shadow-xl w-40 z-20 overflow-hidden fade-in"
              onMouseLeave={() => setMenuOpen(false)}
            >
              {['Save', 'Hide', 'Not interested', 'Report'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer
                    ${
                      opt === 'Report'
                        ? 'text-red-400 hover:bg-red-900/20'
                        : 'text-[#7c7caa] hover:text-white hover:bg-[#1c1c35]'
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="px-4 mb-2 flex flex-wrap gap-1.5">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] text-violet-400/80 hover:text-violet-300 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="px-4 mb-3">
        <p className="text-sm text-[#d0d0e8] leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>

      {/* Image */}
      {post.image && (
        <div
          className="mx-4 mb-3 rounded-xl overflow-hidden cursor-pointer border border-[#21213d]"
          onDoubleClick={handleDoubleClick}
        >
          <img
            src={post.image}
            alt=""
            className="w-full max-h-[420px] object-cover hover:brightness-95 transition-all"
            loading="lazy"
          />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 pb-2 flex items-center justify-between text-xs text-[#4a4a75]">
        <div className="flex items-center gap-1.5">
          {post.liked && <RiHeart3Fill className="text-red-400 text-sm" />}
          <span>
            {post.likes} {post.likes === 1 ? 'like' : 'likes'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowComments(!showComments)}
            className="hover:text-[#7c7caa] transition-colors cursor-pointer"
          >
            {post.comments.length}{' '}
            {post.comments.length === 1 ? 'comment' : 'comments'}
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-[#17172e]" />

      {/* Actions */}
      <div className="px-3 py-1.5 flex items-center gap-1">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm transition-all cursor-pointer
            ${
              post.liked
                ? 'text-red-400 hover:bg-red-400/8'
                : 'text-[#7c7caa] hover:text-white hover:bg-[#17172e]'
            }`}
        >
          {post.liked ? (
            <RiHeart3Fill
              className={`text-lg ${likeAnim ? 'like-beat' : ''}`}
            />
          ) : (
            <RiHeart3Line className="text-lg" />
          )}
          <span className="hidden sm:block text-xs font-medium">Like</span>
        </button>

        <button
          onClick={() => {
            setShowComments(!showComments);
            setTimeout(() => commentRef.current?.focus(), 100);
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-[#7c7caa] hover:text-white hover:bg-[#17172e] transition-all cursor-pointer"
        >
          <RiChat1Line className="text-lg" />
          <span className="hidden sm:block text-xs font-medium">Comment</span>
        </button>

        <button
          onClick={handleShare}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm transition-all cursor-pointer
            ${
              copied
                ? 'text-emerald-400'
                : 'text-[#7c7caa] hover:text-white hover:bg-[#17172e]'
            }`}
        >
          <RiShareLine className="text-lg" />
          <span className="hidden sm:block text-xs font-medium">
            {copied ? 'Copied' : 'Share'}
          </span>
        </button>

        <button
          onClick={() => toggleSave(post.id)}
          className={`p-2 rounded-xl text-sm transition-all cursor-pointer
            ${
              post.saved
                ? 'text-violet-400'
                : 'text-[#7c7caa] hover:text-white hover:bg-[#17172e]'
            }`}
        >
          {post.saved ? (
            <RiBookmarkFill className="text-lg" />
          ) : (
            <RiBookmarkLine className="text-lg" />
          )}
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="px-4 pb-4 pt-1 border-t border-[#17172e]">
          {post.comments.length > 0 && (
            <div className="flex flex-col gap-2.5 mb-3 mt-2">
              {post.comments.map(c => (
                <div key={c.id} className="flex gap-2.5 slide-up">
                  <Avatar src={c.user.avatar} name={c.user.name} size="xs" />
                  <div className="flex-1 bg-[#13132a] rounded-xl rounded-tl-sm px-3 py-2 border border-[#1e1e38]">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-white">
                        {c.user.name}
                      </span>
                      <span className="text-[10px] text-[#4a4a75]">
                        {c.time}
                      </span>
                    </div>
                    <p className="text-xs text-[#c0c0dd] leading-relaxed">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add comment */}
          <div className="flex gap-2 items-center mt-2">
            <div className="relative flex-1">
              <input
                ref={commentRef}
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleComment()}
                placeholder="write a comment..."
                className="w-full bg-[#17172e] border border-[#21213d] focus:border-violet-600/40 text-[#e8e8f5] text-xs placeholder-[#4a4a75] rounded-xl pl-3.5 pr-9 py-2.5 outline-none transition-all"
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4a4a75] hover:text-yellow-400 cursor-pointer transition-colors">
                <RiEmojiStickerLine className="text-base" />
              </button>
            </div>
            <button
              onClick={handleComment}
              disabled={!commentText.trim()}
              className="p-2.5 bg-violet-700 hover:bg-violet-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-white transition-all cursor-pointer"
            >
              <RiSendPlaneLine className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
