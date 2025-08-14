// Api.js
import axios from 'axios';

const API_BASE_URL = 'https://bharatnet.usof.gov.in/samridh/api';

/**
 * Fetches survey types data from the API
 * @returns {Promise<Object>} Response data containing survey types and metadata
 * @throws {Error} If the API request fails
 */
export const fetchSurveyTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/survey-types/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data && response.data.success) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch survey types: Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching survey types:', error);
    throw error;
  }
};

/**
 * Returns mock data for development/testing purposes
 * @returns {Object} Mock survey types data
 */
export const getMockSurveyTypes = () => {
  return {
    survey_types: [
      {
        id: "gp_equipment",
        name: "GP Equipment Survey",
        description: "Gram Panchayat equipment and infrastructure assessment",
        icon: "Building",
        color: "blue",
        fields: [
          "basic_info",
          "equipment",
          "power_supply",
          "premise_facilities",
          "connectivity"
        ],
        total_count: 97,
        completed_count: 62,
        pending_count: 35,
        recent_count: 55
      },
      // ... other survey types from your response
    ],
    total_surveys: 373,
    user_role: "Demo User",
    user_permissions: {
      can_view_all: true,
      can_export: true,
      accessible_states: 36,
      accessible_blocks: 7206,
      accessible_gps: 268502
    }
  };
};

// You can add more API functions here as needed