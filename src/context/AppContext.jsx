import { createContext, useContext, useState, useCallback } from 'react';
import {
  currentUser,
  posts as initialPosts,
  notifications as initialNotifications,
} from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user] = useState(currentUser);
  const [posts, setPosts] = useState(initialPosts);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const toggleLike = useCallback(postId => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );
  }, []);

  const toggleSave = useCallback(postId => {
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, saved: !p.saved } : p)),
    );
  }, []);

  const addComment = useCallback((postId, text) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: Date.now(),
                  user: currentUser,
                  text,
                  time: 'Just now',
                  likes: 0,
                },
              ],
            }
          : p,
      ),
    );
  }, []);

  const addPost = useCallback(newPost => {
    setPosts(prev => [newPost, ...prev]);
  }, []);

  const markNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        posts,
        notifications,
        unreadNotifications,
        searchQuery,
        createPostOpen,
        setSearchQuery,
        setCreatePostOpen,
        toggleLike,
        toggleSave,
        addComment,
        addPost,
        markNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
