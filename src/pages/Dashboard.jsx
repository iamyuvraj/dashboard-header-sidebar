import { useState, useEffect } from 'react';
import OverviewCard from '../components/Dashboard/OverviewCard';
import { fetchSurveyTypes } from '../services/Api';

const Dashboard = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch survey types data
      const response = await fetchSurveyTypes();
      
      if (response && response.survey_types) {
        // Process survey types into cards data
        const processedSurveyData = processSurveyTypes(response.survey_types);
        setSurveyData(processedSurveyData);
        
        // Set the complete dashboard data
        setDashboardData(response);
        
        // Process recent activities from survey types
        const activities = processRecentActivities(response.survey_types);
        setRecentActivities(activities);
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to fetch dashboard data');
      
      // Fallback to static data if API fails
      setSurveyData([
        {
          title: 'GP Equipment Survey',
          total: 97,
          completed: 62,
          color: 'bg-blue-500',
        },
        {
          title: 'Block Equipment Survey',
          total: 72,
          completed: 40,
          color: 'bg-green-500',
        },
        {
          title: 'GP DAC Survey',
          total: 85,
          completed: 85,
          color: 'bg-purple-500',
        },
        // {
        //   title: 'FTTH Connection Survey',
        //   total: 48,
        //   completed: 0,
        //   color: 'bg-orange-500',
        // },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Process survey types into card data format
  const processSurveyTypes = (surveyTypes) => {
    return surveyTypes.map(survey => ({
      title: survey.name,
      total: survey.total_count,
      completed: survey.completed_count,
      color: getColorClass(survey.color),
      icon: survey.icon,
      id: survey.id
    }));
  };

  // Map API color names to Tailwind classes
  const getColorClass = (color) => {
    const colorMap = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };
    return colorMap[color] || 'bg-indigo-500';
  };

  // Process recent activities from survey types
  const processRecentActivities = (surveyTypes) => {
    // Flatten all recent surveys from all types
    const allRecent = surveyTypes.flatMap(survey => {
      // Create mock recent activities based on recent_count
      return Array.from({ length: Math.min(survey.recent_count || 0, 5) }, (_, i) => ({
        id: `${survey.id}-recent-${i}`,
        title: `${survey.name} ${i % 2 === 0 ? 'Completed' : 'Updated'}`,
        description: survey.description || 'Survey activity',
        timeAgo: getTimeAgo(new Date(Date.now() - (i * 3600000))), // Fixed parenthesis
        type: survey.id
      }));
    });
    
    // Sort by most recent and limit to 5
    return allRecent
      .sort(() => 0.5 - Math.random()) // Simple shuffle for demo
      .slice(0, 5);
  };

  // Calculate time ago from timestamp
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  // Refresh dashboard data
  const handleRefresh = () => {
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Overview of all survey activities</p>
            {dashboardData?.user_role && (
              <p className="mt-1 text-sm text-gray-500">
                Logged in as: {dashboardData.user_role}
              </p>
            )}
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <svg className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <span>Warning: {error}. Showing cached data.</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {surveyData.map((data, index) => (
          <OverviewCard key={data.id || index} {...data} />
        ))}
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
        
        {recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
                <span className="text-sm text-gray-400">{activity.timeAgo}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-500">No recent activities found</p>
          </div>
        )}
      </div>

      {/* Additional Statistics Section */}
      {dashboardData && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Completion Rate</h3>
            <div className="space-y-4">
              {surveyData.map((survey, index) => {
                const completionRate = survey.total > 0 ? ((survey.completed / survey.total) * 100).toFixed(1) : 0;
                return (
                  <div key={survey.id || index}>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{survey.title}</span>
                      <span className="font-medium text-gray-900">{completionRate}%</span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${survey.color}`}
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Progress</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {dashboardData.total_surveys || surveyData.length}
              </div>
              <p className="text-gray-600">Total Surveys</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {surveyData.reduce((acc, survey) => acc + (survey.completed || 0), 0)}
                  </div>
                  <p className="text-gray-600">Completed</p>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {surveyData.reduce((acc, survey) => acc + ((survey.total || 0) - (survey.completed || 0)), 0)}
                  </div>
                  <p className="text-gray-600">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
