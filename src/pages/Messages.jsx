import { useState, useRef, useEffect } from "react";
import {
  RiSearchLine, RiSendPlaneFill, RiImageAddLine, RiEmojiStickerLine,
  RiMoreLine, RiPhoneLine, RiVideoLine, RiArrowLeftLine, RiCheckDoubleLine,
} from "react-icons/ri";
import { messages as msgList } from "../data/mockData";
import { useApp } from "../context/AppContext";
import Avatar from "../components/ui/Avatar";

const mockConvo = [
  { id: 1, from: "other", text: "Hey! Did you see my new design post? 👀", time: "10:42 AM" },
  { id: 2, from: "me", text: "Yes! It looks absolutely incredible 🔥 The color palette is on point", time: "10:44 AM" },
  { id: 3, from: "other", text: "Thanks! Been working on it for weeks. Want to collaborate on something?", time: "10:45 AM" },
  { id: 4, from: "me", text: "Would love that! What are you thinking?", time: "10:46 AM" },
  { id: 5, from: "other", text: "Maybe a full design system? I handle the visuals, you handle the code?", time: "10:47 AM" },
  { id: 6, from: "me", text: "That sounds perfect! Let's set up a call this week 📞", time: "10:48 AM" },
];

export default function Messages() {
  const { user } = useApp();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [convo, setConvo] = useState(mockConvo);
  const messagesEndRef = useRef(null);

  const filtered = msgList.filter((m) =>
    m.user.name.toLowerCase().includes(search.toLowerCase())
  );

  const send = () => {
    if (!inputText.trim()) return;
    setConvo((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: "me",
        text: inputText.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInputText("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convo, selected]);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Conversation List */}
      <div className={`${selected ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 border-r border-[#1e1e48] flex-shrink-0`}>
        <div className="p-4 border-b border-[#1e1e48]">
          <h2 className="text-lg font-bold text-white mb-3">Messages</h2>
          <div className="relative">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5880] text-sm" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1a1a40] border border-[#252550] focus:border-violet-600/50 text-[#eeeeff] placeholder-[#5a5880] text-sm rounded-xl pl-9 pr-4 py-2 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {filtered.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelected(msg)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all cursor-pointer text-left border-b border-[#0f0f26]
                ${selected?.id === msg.id ? "bg-violet-600/10 border-r-2 border-r-violet-500" : "hover:bg-[#0f0f26]"}`}
            >
              <div className="flex-shrink-0">
                <Avatar src={msg.user.avatar} name={msg.user.name} size="md" online={msg.online} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-sm font-semibold truncate ${selected?.id === msg.id ? "text-violet-300" : "text-white"}`}>
                    {msg.user.name}
                  </span>
                  <span className="text-[11px] text-[#5a5880] flex-shrink-0 ml-2">{msg.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  {msg.unread === 0 && (
                    <RiCheckDoubleLine className="text-[11px] text-violet-400 flex-shrink-0" />
                  )}
                  <p className={`text-xs truncate flex-1 ${msg.unread > 0 ? "text-white font-medium" : "text-[#5a5880]"}`}>
                    {msg.lastMessage}
                  </p>
                  {msg.unread > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ml-1">
                      {msg.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selected ? (
        <div className="flex-1 flex flex-col min-w-0 bg-[#080818]">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e48] bg-[#0a0a1e]">
            <button
              onClick={() => setSelected(null)}
              className="md:hidden p-1.5 rounded-lg text-[#8888bb] hover:text-white hover:bg-[#1a1a40] transition-all cursor-pointer"
            >
              <RiArrowLeftLine className="text-lg" />
            </button>
            <Avatar src={selected.user.avatar} name={selected.user.name} size="md" online={selected.online} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{selected.user.name}</p>
              <p className={`text-xs ${selected.online ? "text-emerald-400" : "text-[#5a5880]"}`}>
                {selected.online ? "● Active now" : "Last seen recently"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-xl text-[#8888bb] hover:text-violet-400 hover:bg-[#1a1a40] transition-all cursor-pointer">
                <RiPhoneLine className="text-lg" />
              </button>
              <button className="p-2 rounded-xl text-[#8888bb] hover:text-violet-400 hover:bg-[#1a1a40] transition-all cursor-pointer">
                <RiVideoLine className="text-lg" />
              </button>
              <button className="p-2 rounded-xl text-[#8888bb] hover:text-white hover:bg-[#1a1a40] transition-all cursor-pointer">
                <RiMoreLine className="text-lg" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            <div className="text-center py-4">
              <Avatar src={selected.user.avatar} name={selected.user.name} size="xl" className="mx-auto mb-3" />
              <p className="text-white font-semibold text-base">{selected.user.name}</p>
              <p className="text-xs text-[#5a5880] mt-1">You're connected on Nexus</p>
            </div>

            {convo.map((msg) => {
              const isMe = msg.from === "me";
              return (
                <div key={msg.id} className={`flex gap-2 slide-up ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                  {!isMe && (
                    <div className="flex-shrink-0">
                      <Avatar src={selected.user.avatar} name={selected.user.name} size="xs" />
                    </div>
                  )}
                  <div className={`max-w-xs lg:max-w-md ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                        ${isMe
                          ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-tr-sm"
                          : "bg-[#1a1a40] text-[#eeeeff] rounded-tl-sm border border-[#252550]"
                        }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-[#5a5880] px-1">{msg.time}</span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#1e1e48] bg-[#0a0a1e]">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl text-emerald-400 hover:bg-emerald-400/10 transition-all cursor-pointer flex-shrink-0">
                <RiImageAddLine className="text-lg" />
              </button>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder={`Message ${selected.user.name.split(" ")[0]}...`}
                  className="w-full bg-[#1a1a40] border border-[#252550] focus:border-violet-600/50 text-[#eeeeff] placeholder-[#5a5880] text-sm rounded-2xl pl-4 pr-10 py-3 outline-none transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a5880] hover:text-yellow-400 cursor-pointer transition-colors">
                  <RiEmojiStickerLine className="text-lg" />
                </button>
              </div>
              <button
                onClick={send}
                disabled={!inputText.trim()}
                className="p-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl text-white transition-all cursor-pointer flex-shrink-0 shadow-lg shadow-violet-900/30"
              >
                <RiSendPlaneFill className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center flex-col gap-4 text-center px-8">
          <div className="w-20 h-20 bg-[#1a1a40] rounded-3xl flex items-center justify-center border border-[#252550]">
            <RiSearchLine className="text-4xl text-[#5a5880]" />
          </div>
          <div>
            <p className="text-white font-semibold text-base mb-1">Your Messages</p>
            <p className="text-sm text-[#5a5880] max-w-xs">Select a conversation to start chatting or search for someone new</p>
          </div>
        </div>
      )}
    </div>
  );
}
