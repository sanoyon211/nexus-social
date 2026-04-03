import { RiBookmarkFill, RiGridLine, RiListCheck } from "react-icons/ri";
import { useApp } from "../context/AppContext";
import PostCard from "../components/feed/PostCard";

export default function Saved() {
  const { posts } = useApp();
  const savedPosts = posts.filter((p) => p.saved);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Saved Posts</h1>
          <p className="text-sm text-[#8888bb]">
            {savedPosts.length} saved {savedPosts.length === 1 ? "post" : "posts"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-[#1a1a40] text-violet-400 border border-violet-600/30 cursor-pointer">
            <RiGridLine className="text-lg" />
          </button>
          <button className="p-2 rounded-xl text-[#8888bb] hover:text-white hover:bg-[#1a1a40] border border-[#1e1e48] transition-all cursor-pointer">
            <RiListCheck className="text-lg" />
          </button>
        </div>
      </div>

      {savedPosts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-[#1a1a40] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-[#252550]">
            <RiBookmarkFill className="text-4xl text-[#2a2a50]" />
          </div>
          <p className="text-white font-semibold text-base mb-2">No saved posts yet</p>
          <p className="text-sm text-[#5a5880] max-w-xs mx-auto">
            Tap the bookmark icon on any post to save it here for later
          </p>
        </div>
      ) : (
        savedPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
