import { useState, useRef } from "react";
import {
  RiCloseLine, RiImageAddLine, RiEmotionLine, RiMapPinLine,
  RiHashtag, RiSendPlaneFill, RiGlobalLine,
} from "react-icons/ri";
import { useApp } from "../../context/AppContext";
import Avatar from "../ui/Avatar";

const feelings = ["😊 Happy", "😢 Sad", "😍 Loved", "🎉 Celebrating", "🚀 Excited", "😤 Frustrated", "🤔 Curious", "💪 Motivated"];

export default function CreatePost() {
  const { user, addPost, setCreatePostOpen } = useApp();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [showFeelings, setShowFeelings] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!content.trim() && !imagePreview) return;
    setLoading(true);
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        user,
        content: content.trim(),
        image: imagePreview,
        likes: 0,
        likedBy: [],
        comments: [],
        shares: 0,
        saves: 0,
        time: "Just now",
        liked: false,
        saved: false,
        feeling: selectedFeeling,
        tags: [],
      };
      addPost(newPost);
      setLoading(false);
      setCreatePostOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center fade-in px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setCreatePostOpen(false)}
      />
      <div className="relative bg-[#0f0f26] border border-[#1e1e48] rounded-3xl w-full max-w-lg shadow-2xl slide-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e48]">
          <h2 className="text-white font-semibold text-base">Create Post</h2>
          <button
            onClick={() => setCreatePostOpen(false)}
            className="w-8 h-8 rounded-full bg-[#1a1a40] flex items-center justify-center text-[#8888bb] hover:text-white hover:bg-[#252550] transition-all cursor-pointer"
          >
            <RiCloseLine className="text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex gap-3 mb-4">
            <Avatar src={user.avatar} name={user.name} size="md" online />
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-white text-sm font-semibold">{user.name}</p>
                {user.verified && <span className="text-violet-400 text-xs">✓</span>}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="flex items-center gap-1 text-[11px] bg-[#1a1a40] border border-[#252550] text-[#8888bb] px-2 py-0.5 rounded-full cursor-pointer hover:border-violet-600/40 transition-all">
                  <RiGlobalLine className="text-xs" /> Public
                </span>
                {selectedFeeling && (
                  <span className="text-[11px] bg-violet-600/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-600/30">
                    {selectedFeeling}
                  </span>
                )}
              </div>
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
            rows={4}
            className="w-full bg-transparent text-[#eeeeff] text-base placeholder-[#5a5880] resize-none outline-none leading-relaxed"
            autoFocus
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative mt-3 rounded-2xl overflow-hidden border border-[#1e1e48]">
              <img src={imagePreview} alt="Preview" className="w-full max-h-60 object-cover" />
              <button
                onClick={() => { setImage(null); setImagePreview(null); }}
                className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 cursor-pointer transition-all"
              >
                <RiCloseLine />
              </button>
            </div>
          )}

          {/* Feelings picker */}
          {showFeelings && (
            <div className="mt-3 p-3 bg-[#1a1a40] rounded-2xl border border-[#252550]">
              <p className="text-xs text-[#8888bb] mb-2 font-medium">How are you feeling?</p>
              <div className="grid grid-cols-2 gap-1.5">
                {feelings.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setSelectedFeeling(f); setShowFeelings(false); }}
                    className={`text-xs px-3 py-2 rounded-xl text-left transition-all cursor-pointer
                      ${selectedFeeling === f
                        ? "bg-violet-600/20 text-violet-300 border border-violet-600/40"
                        : "text-[#8888bb] hover:bg-[#252550] hover:text-white"
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 pb-5">
          <div className="flex items-center gap-2 p-3 bg-[#1a1a40] rounded-2xl border border-[#1e1e48] mb-4">
            <span className="text-xs text-[#8888bb] font-medium flex-1">Add to your post:</span>
            <input type="file" ref={fileRef} accept="image/*" onChange={handleImageChange} className="hidden" />
            <button
              onClick={() => fileRef.current.click()}
              className="p-2 rounded-xl text-emerald-400 hover:bg-emerald-400/10 transition-all cursor-pointer"
              title="Add photo"
            >
              <RiImageAddLine className="text-lg" />
            </button>
            <button
              onClick={() => setShowFeelings(!showFeelings)}
              className="p-2 rounded-xl text-yellow-400 hover:bg-yellow-400/10 transition-all cursor-pointer"
              title="Feeling"
            >
              <RiEmotionLine className="text-lg" />
            </button>
            <button className="p-2 rounded-xl text-red-400 hover:bg-red-400/10 transition-all cursor-pointer" title="Location">
              <RiMapPinLine className="text-lg" />
            </button>
            <button className="p-2 rounded-xl text-blue-400 hover:bg-blue-400/10 transition-all cursor-pointer" title="Tag">
              <RiHashtag className="text-lg" />
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={(!content.trim() && !imagePreview) || loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-2xl transition-all cursor-pointer shadow-lg shadow-violet-900/30"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <RiSendPlaneFill className="text-lg" />
            )}
            {loading ? "Sharing..." : "Share Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
