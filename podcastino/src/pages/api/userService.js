// src/api/UserService.js

// ─────────────────────────────────────────────────────────────────────────────
// ─ Configuration ──────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

// Base for user-related endpoints:
const API_BASE_URL = "https://podcastino.darkube.app/api/user";

// Base for auth/token endpoints:
const AUTH_BASE_URL = "https://podcastino.darkube.app/api";

// ─────────────────────────────────────────────────────────────────────────────
// ─ Helpers: Get/Save Access & Refresh Tokens ──────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

const getStoredAccessToken = () => localStorage.getItem("accessToken");
const getStoredRefreshToken = () => localStorage.getItem("refreshToken");

const saveAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};
const saveRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
};

// Builds headers with the current access token (if present)
const getAuthHeader = () => {
  const token = getStoredAccessToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// ─ Token Refresh Logic ────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calls the backend’s token-refresh endpoint with the stored refresh token.
 * On success, updates localStorage with the new access (and possibly new refresh) tokens.
 * Throws if there’s no saved refresh token or if the refresh request fails.
 */
async function refreshToken() {
  const refresh = getStoredRefreshToken();
  if (!refresh) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${AUTH_BASE_URL}/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  // Expected shape: { access: "<new_jwt_access>", refresh: "<new_jwt_refresh?>" }
  const { access: newAccess, refresh: newRefresh } = data;

  saveAccessToken(newAccess);
  if (newRefresh) {
    saveRefreshToken(newRefresh);
  }
  return newAccess;
}

/**
 * A wrapper around fetch() that:
 * 1. Attaches the current access token as Authorization.
 * 2. If the backend responds with 401, calls refreshToken() once and retries.
 */
async function authFetch(input, init = {}) {
  // 1) Attach current access token
  const headers = {
    ...(init.headers || {}),
    ...getAuthHeader(),
  };

  let response = await fetch(input, { ...init, headers });

  // 2) If unauthorized (401), try to refresh once
  if (response.status === 401) {
    try {
      const newAccess = await refreshToken();
      const retryHeaders = {
        ...(init.headers || {}),
        Authorization: `Bearer ${newAccess}`,
      };
      response = await fetch(input, { ...init, headers: retryHeaders });
    } catch (err) {
      // If refresh fails, rethrow so caller can handle (e.g. force logout)
      throw err;
    }
  }

  return response;
}

// ─────────────────────────────────────────────────────────────────────────────
// ─ User-Related API Calls (All use authFetch) ─────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

// 1) User Profile
export const fetchUserProfile = async () => {
  const response = await authFetch(`${API_BASE_URL}/profile/`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  const data = await response.json();

  // Mock fallback data if backend fields are missing
  const mockData = {
    name: "alex johnson",
    email: "alex.johnson@example.com",
    bio: "Podcast creator and tech enthusiast",
    joinDate: "Joined March 2022",
    stats: {
      listened: 342,
      favorites: 28,
      playlists: 5,
      shows: 3,
    },
  };

  const mergedData = {
    name: data.username || mockData.name,
    email: data.email || mockData.email,
    bio: data.bio || mockData.bio,
    joinDate: data.joinDate || mockData.joinDate,
    stats: {
      listened: data.stats?.listened || mockData.stats.listened,
      favorites: data.stats?.favorites || mockData.stats.favorites,
      playlists: data.stats?.playlists || mockData.stats.playlists,
      shows: data.stats?.shows || mockData.stats.shows,
    },
  };
  return mergedData;
};

export const updateUserProfile = async (formData) => {
  const response = await authFetch(`${API_BASE_URL}/profile/`, {
    method: "PUT",
    // Do NOT set Content-Type here: the browser will add multipart/form-data with boundary.
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }
  return await response.json();
};

// 2) Favorites
export const fetchFavoritesList = async () => {
  const response = await authFetch(`${API_BASE_URL}/favorites/`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch favorites list");
  return await response.json();
};

export const addFavorite = async (episodeId) => {
  const response = await authFetch(`${API_BASE_URL}/favorites/`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ episode: episodeId }),
  });
  if (!response.ok) throw new Error("Failed to add favorite");
  return await response.json();
};

export const removeFavorite = async (favoritePk) => {
  const response = await authFetch(
    `${API_BASE_URL}/favorites/${favoritePk}/`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Failed to remove favorite");
  return true;
};

// 3) Playlists
export const fetchPlaylistsList = async () => {
  const response = await authFetch(`${API_BASE_URL}/playlists/`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch playlists list");
  return await response.json();
};

export const fetchPlaylistDetail = async (pk) => {
  const response = await authFetch(`${API_BASE_URL}/playlists/${pk}/`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch playlist detail");
  return await response.json();
};

export const createPlaylist = async (data) => {
  const response = await authFetch(`${API_BASE_URL}/playlists/`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create playlist");
  return await response.json();
};

export const updatePlaylist = async (pk, data) => {
  const response = await authFetch(`${API_BASE_URL}/playlists/${pk}/`, {
    method: "PUT",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update playlist");
  return await response.json();
};

export const deletePlaylist = async (pk) => {
  const response = await authFetch(`${API_BASE_URL}/playlists/${pk}/`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete playlist");
  return true;
};

// 4) Listening History
export const fetchHistory = async () => {
  const response = await authFetch(`${API_BASE_URL}/history/`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch listening history");
  return await response.json();
};

// 5) Subscriptions
export const fetchSubscriptionsList = async () => {
  const response = await authFetch(`${API_BASE_URL}/subscriptions/`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch subscriptions list");
  return await response.json();
};

export const addSubscription = async (podcastId) => {
  const response = await authFetch(`${API_BASE_URL}/subscriptions/`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ podcast: podcastId }),
  });
  if (!response.ok) throw new Error("Failed to add subscription");
  return await response.json();
};

export const removeSubscription = async (pk) => {
  const response = await authFetch(`${API_BASE_URL}/subscriptions/${pk}/`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to remove subscription");
  return true;
};

// 6) User’s Uploaded Episodes
export const fetchUserEpisodes = async () => {
  const response = await authFetch(`${API_BASE_URL}/user/episodes/`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch user episodes");
  return await response.json();
};

// 7) User’s Own Podcasts
export const fetchUserPodcasts = async () => {
  const response = await authFetch(`${API_BASE_URL}/user/podcasts/`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch user podcasts");
  return await response.json();
};

// 8) Sign Out
export const handleSignOut = async () => {
  const response = await authFetch(`${API_BASE_URL}/logout/`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Logout failed");
  return true;
};