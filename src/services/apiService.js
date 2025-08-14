// src/services/apiService.js - 
class ApiService {
  constructor() {
    this.baseURL = 'https://bharatnet.usof.gov.in/samridh/api' || '/api/dashboard';
    this.token = localStorage.getItem('authToken');
  }

  setAuthToken(token) {
    
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      console.log("toekn",this.token);
      defaultHeaders['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          this.setAuthToken(null);
          window.location.href = '/login';
          return;
        }
        
        const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Survey Types
  async getSurveyTypes() {
    return this.request('/survey-types/');
  }

  // Location Hierarchy
  async getLocationHierarchy() {
    return this.request('/locations/');
  }

  // Surveys
  async getSurveys(params = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    return this.request(`/surveys/${queryString ? `?${queryString}` : ''}`);
  }

  // Statistics
  async getStatistics(surveyType = null) {
    const params = surveyType ? `?type=${surveyType}` : '';
    return this.request(`/statistics/${params}`);
  }

  // Export
  async exportSurveys(params = {}) {
    return this.request('/export/', {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }

  // Survey Details (if implementing individual survey view)
  async getSurveyDetails(surveyType, surveyId) {
    return this.request(`/surveys/${surveyType}/${surveyId}/`);
  }

  // User Profile (if needed)
  async getUserProfile() {
    return this.request('/user/profile/');
  }
}

export default new ApiService();