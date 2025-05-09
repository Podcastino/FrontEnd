const API_BASE_URL = "https://podcastino.darkube.app/api/user";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  console.log(token)
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

// User Profile
export const fetchUserProfile = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/`, {
      method: "GET",
      headers: getAuthHeader(),
    });

    if (!response.ok) throw new Error("Failed to fetch user profile");
    const data = await response.json();

    // Mock data to fall back on if API data is missing
    const mockData = {
      name: 'alex johnson',
      email: 'alex.johnson@example.com',
      bio: 'Podcast creator and tech enthusiast',
      joinDate: 'Joined March 2022',
      stats: {
        listened: 342,
        favorites: 28,
        playlists: 5,
        shows: 3,
      },
    };

    // Merge the real data with mock data, using mock data if real data is missing
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
    console.log(data);
    console.log(mergedData);
    return mergedData;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};


// Favorites
export const fetchFavoritesList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites/`, {
      method: "GET",
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to fetch favorites list");
    return await response.json();
  } catch (error) {
    console.error("Error fetching favorites list:", error);
    throw error;
  }
};

export const fetchFavoritesDetail = async (pk) => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites/${pk}/`, {
      method: "GET",
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to fetch favorite detail");
    return await response.json();
  } catch (error) {
    console.error("Error fetching favorite detail:", error);
    throw error;
  }
};

// Playlists
export const fetchPlaylistsList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/playlists/`, {
      method: "GET",
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to fetch playlists list");
    return await response.json();
  } catch (error) {
    console.error("Error fetching playlists list:", error);
    throw error;
  }
};

export const fetchPlaylistsDetail = async (pk) => {
  try {
    const response = await fetch(`${API_BASE_URL}/playlists/${pk}/`, {
      method: "GET",
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to fetch playlist detail");
    return await response.json();
  } catch (error) {
    console.error("Error fetching playlist detail:", error);
    throw error;
  }
};

// History
export const fetchHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/history/`, {
      method: "GET",
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to fetch listening history");
    return await response.json();
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};

// Subscriptions
export const fetchSubscriptionsList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions/`, {
      method: "GET",
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to fetch subscriptions list");
    return await response.json();
  } catch (error) {
    console.error("Error fetching subscriptions list:", error);
    throw error;
  }
};

export const fetchSubscriptionsDetail = async (pk) => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions/${pk}/`, {
      method: "GET",
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to fetch subscription detail");
    return await response.json();
  } catch (error) {
    console.error("Error fetching subscription detail:", error);
    throw error;
  }
};

// Auth
export const handleSignOut = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout/`, {
      method: "POST",
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Logout failed");
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};