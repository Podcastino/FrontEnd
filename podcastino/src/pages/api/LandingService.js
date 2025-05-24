// LandingService.js
// Service functions to interact with Podcastino API

const BASE_URL = 'https://podcastino.darkube.app/api';

/**
 * Fetch all podcasts
 * @returns {Promise<Array>} list of podcast objects
 */
export async function fetchPodcasts() {
  try {
    const response = await fetch(`${BASE_URL}/podcasts/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching podcasts: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Fetch episodes for a specific podcast
 * @param {number|string} podcastId - ID of the podcast
 * @returns {Promise<Array>} list of episode objects
 */
export async function fetchPodcastEpisodes(podcastId) {
  try {
    const response = await fetch(`${BASE_URL}/podcasts/episodes/${podcastId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching episodes for podcast ${podcastId}: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Default export of service functions
 */
const LandingService = {
  fetchPodcasts,
  fetchPodcastEpisodes,
};

export default LandingService;