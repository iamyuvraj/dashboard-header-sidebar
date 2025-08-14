import { useState, useMemo } from 'react';
import { 
  CalendarIcon, 
  MapPinIcon, 
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  ChartBarIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const BlockSurvey = () => {
  // Sample data structure (removed households)
  const [surveys, setSurveys] = useState([
    {
      id: 1,
      state: 'West Bengal',
      district: 'North 24 Parganas',
      blockName: 'Sadar Block',
      lgdCode: 'WB0101001',
      totalSurveysCompleted: 25,
      ongoingSurveys: 3,
      surveyor: 'John Doe',
      lastSurveyDate: '2024-01-15',
      latitude: 22.7179,
      longitude: 88.4217
    },
    {
      id: 2,
      state: 'West Bengal',
      district: 'South 24 Parganas',
      blockName: 'North Block',
      lgdCode: 'WB0102002',
      totalSurveysCompleted: 18,
      ongoingSurveys: 2,
      surveyor: 'Jane Smith',
      lastSurveyDate: '2024-01-14',
      latitude: 22.3569,
      longitude: 88.4337
    },
    {
      id: 3,
      state: 'West Bengal',
      district: 'Hooghly',
      blockName: 'South Block',
      lgdCode: 'WB0103003',
      totalSurveysCompleted: 32,
      ongoingSurveys: 0,
      surveyor: 'Mike Johnson',
      lastSurveyDate: '2024-01-13',
      latitude: 22.8716,
      longitude: 88.1629
    },
    {
      id: 4,
      state: 'West Bengal',
      district: 'Nadia',
      blockName: 'East Block',
      lgdCode: 'WB0104004',
      totalSurveysCompleted: 14,
      ongoingSurveys: 4,
      surveyor: 'Sarah Wilson',
      lastSurveyDate: '2024-01-12',
      latitude: 22.9751,
      longitude: 88.4345
    },
    {
      id: 5,
      state: 'West Bengal',
      district: 'Murshidabad',
      blockName: 'Central Block',
      lgdCode: 'WB0105005',
      totalSurveysCompleted: 21,
      ongoingSurveys: 1,
      surveyor: 'Rajesh Kumar',
      lastSurveyDate: '2024-01-11',
      latitude: 24.1752,
      longitude: 88.2762
    },
    {
      id: 6,
      state: 'West Bengal',
      district: 'Birbhum',
      blockName: 'West Block',
      lgdCode: 'WB0106006',
      totalSurveysCompleted: 27,
      ongoingSurveys: 2,
      surveyor: 'Priya Sharma',
      lastSurveyDate: '2024-01-10',
      latitude: 23.8403,
      longitude: 87.6186
    },
    {
      id: 7,
      state: 'West Bengal',
      district: 'Bankura',
      blockName: 'Northeast Block',
      lgdCode: 'WB0107007',
      totalSurveysCompleted: 19,
      ongoingSurveys: 3,
      surveyor: 'Amit Roy',
      lastSurveyDate: '2024-01-09',
      latitude: 23.2324,
      longitude: 87.0636
    },
    {
      id: 8,
      state: 'West Bengal',
      district: 'Purulia',
      blockName: 'Southwest Block',
      lgdCode: 'WB0108008',
      totalSurveysCompleted: 16,
      ongoingSurveys: 1,
      surveyor: 'Sunita Das',
      lastSurveyDate: '2024-01-08',
      latitude: 23.3322,
      longitude: 86.3617
    },
    {
      id: 9,
      state: 'West Bengal',
      district: 'Malda',
      blockName: 'Northern Block',
      lgdCode: 'WB0109009',
      totalSurveysCompleted: 22,
      ongoingSurveys: 2,
      surveyor: 'Ravi Singh',
      lastSurveyDate: '2024-01-07',
      latitude: 25.0100,
      longitude: 88.1450
    },
    {
      id: 10,
      state: 'West Bengal',
      district: 'Darjeeling',
      blockName: 'Mountain Block',
      lgdCode: 'WB0110010',
      totalSurveysCompleted: 13,
      ongoingSurveys: 4,
      surveyor: 'Maya Gupta',
      lastSurveyDate: '2024-01-06',
      latitude: 27.0410,
      longitude: 88.2663
    },
    {
      id: 11,
      state: 'West Bengal',
      district: 'Jalpaiguri',
      blockName: 'Forest Block',
      lgdCode: 'WB0111011',
      totalSurveysCompleted: 28,
      ongoingSurveys: 1,
      surveyor: 'Deepak Sharma',
      lastSurveyDate: '2024-01-05',
      latitude: 26.5463,
      longitude: 88.7191
    },
    {
      id: 12,
      state: 'West Bengal',
      district: 'Cooch Behar',
      blockName: 'Border Block',
      lgdCode: 'WB0112012',
      totalSurveysCompleted: 24,
      ongoingSurveys: 2,
      surveyor: 'Anita Pal',
      lastSurveyDate: '2024-01-04',
      latitude: 26.3248,
      longitude: 89.4420
    }
  ]);

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filters, setFilters] = useState({
    searchTerm: '',
    state: '',
    district: '',
    surveyor: '',
    dateRange: {
      start: '',
      end: ''
    }
  });
  const [showFilters, setShowFilters] = useState(false);

  // Calculate overall statistics
  const overallStats = useMemo(() => {
    return {
      totalBlocks: surveys.length,
      totalSurveysCompleted: surveys.reduce((sum, survey) => sum + survey.totalSurveysCompleted, 0),
      totalOngoingSurveys: surveys.reduce((sum, survey) => sum + survey.ongoingSurveys, 0)
    };
  }, [surveys]);

  // Filter data based on filters
  const filteredSurveys = useMemo(() => {
    return surveys.filter(survey => {
      const matchesSearch = survey.blockName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           survey.lgdCode.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           survey.surveyor.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesState = !filters.state || survey.state === filters.state;
      const matchesDistrict = !filters.district || survey.district === filters.district;
      const matchesSurveyor = !filters.surveyor || survey.surveyor === filters.surveyor;
      
      let matchesDateRange = true;
      if (filters.dateRange.start && filters.dateRange.end) {
        const surveyDate = new Date(survey.lastSurveyDate);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        matchesDateRange = surveyDate >= startDate && surveyDate <= endDate;
      }

      return matchesSearch && matchesState && matchesDistrict && matchesSurveyor && matchesDateRange;
    });
  }, [surveys, filters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return filters.searchTerm !== '' || 
           filters.state !== '' || 
           filters.district !== '' || 
           filters.surveyor !== '' ||
           (filters.dateRange.start !== '' && filters.dateRange.end !== '');
  }, [filters]);

  // Generate active filter messages
  const getActiveFilterMessages = () => {
    const messages = [];
    
    if (filters.searchTerm) {
      messages.push(`Search: "${filters.searchTerm}"`);
    }
    if (filters.state) {
      messages.push(`State: ${filters.state}`);
    }
    if (filters.district) {
      messages.push(`District: ${filters.district}`);
    }
    if (filters.surveyor) {
      messages.push(`Surveyor: ${filters.surveyor}`);
    }
    if (filters.dateRange.start && filters.dateRange.end) {
      messages.push(`Date Range: ${new Date(filters.dateRange.start).toLocaleDateString()} - ${new Date(filters.dateRange.end).toLocaleDateString()}`);
    }
    
    return messages;
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSurveys = filteredSurveys.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters]);

  const getUniqueValues = (key) => {
    return [...new Set(surveys.map(survey => survey[key]))];
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDateRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      state: '',
      district: '',
      surveyor: '',
      dateRange: {
        start: '',
        end: ''
      }
    });
  };

  const removeFilter = (filterType, subType = null) => {
    if (subType === 'start' || subType === 'end') {
      handleDateRangeChange(subType, '');
    } else if (filterType === 'dateRange') {
      setFilters(prev => ({
        ...prev,
        dateRange: { start: '', end: '' }
      }));
    } else {
      handleFilterChange(filterType, '');
    }
  };

  const exportToExcel = () => {
    // Excel export functionality would be implemented here
    console.log('Exporting to Excel...', filteredSurveys);
    alert('Excel export functionality would be implemented here');
  };

  const viewDetailReport = (survey) => {
    // Navigation to detailed report page
    console.log('Viewing detail report for:', survey.blockName);
    alert(`Detailed report for ${survey.blockName} would open in a new page`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const GridCard = ({ survey }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{survey.blockName}</h3>
          <p className="text-sm text-gray-500">LGD: {survey.lgdCode}</p>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>{survey.state}, {survey.district}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="font-bold text-xl text-blue-800">{survey.totalSurveysCompleted}</div>
              <div className="text-blue-600 text-xs">Completed Surveys</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="font-bold text-xl text-orange-800">{survey.ongoingSurveys}</div>
              <div className="text-orange-600 text-xs">Ongoing Surveys</div>
            </div>
          </div>
        </div>

        <div className="border-t pt-3 mb-4">
          <div className="text-xs text-gray-500 mb-1">Last Survey</div>
          <div className="text-sm text-gray-700">
            <div>By: {survey.surveyor}</div>
            <div>On: {new Date(survey.lastSurveyDate).toLocaleDateString()}</div>
          </div>
        </div>

        <button
          onClick={() => viewDetailReport(survey)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
        >
          <EyeIcon className="h-4 w-4 mr-2" />
          View Detail Report
        </button>
      </div>
    </div>
  );

  const PaginationControls = () => {
    const getVisiblePages = () => {
      const visiblePages = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 5; i++) {
            visiblePages.push(i);
          }
        } else if (currentPage >= totalPages - 2) {
          for (let i = totalPages - 4; i <= totalPages; i++) {
            visiblePages.push(i);
          }
        } else {
          for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            visiblePages.push(i);
          }
        }
      }
      
      return visiblePages;
    };

    return (
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-xl">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ml-3 ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
        
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, filteredSurveys.length)}</span> of{' '}
              <span className="font-medium">{filteredSurveys.length}</span> results
            </p>
            
            <div className="flex items-center space-x-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
                Per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    page === currentPage
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Block Survey Management</h1>
          <p className="text-lg text-gray-600">Comprehensive block-level demographic survey tracking and management system</p>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Total Blocks</h3>
                <p className="text-3xl font-bold">{overallStats.totalBlocks}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <MapPinIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Total Completed</h3>
                <p className="text-3xl font-bold">{overallStats.totalSurveysCompleted}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <ChartBarIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Total Ongoing</h3>
                <p className="text-3xl font-bold">{overallStats.totalOngoingSurveys}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <CalendarIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Active Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {getActiveFilterMessages().map((message, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      {message}
                      <button
                        onClick={() => {
                          if (message.startsWith('Search:')) removeFilter('searchTerm');
                          else if (message.startsWith('State:')) removeFilter('state');
                          else if (message.startsWith('District:')) removeFilter('district');
                          else if (message.startsWith('Surveyor:')) removeFilter('surveyor');
                          else if (message.startsWith('Date Range:')) removeFilter('dateRange');
                        }}
                        className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  Showing {filteredSurveys.length} of {surveys.length} Blocks based on applied filters
                </p>
              </div>
              <button
                onClick={clearFilters}
                className="ml-4 px-3 py-1 text-sm text-blue-700 hover:text-blue-900 border border-blue-300 rounded-md hover:bg-blue-100 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search block name, LGD code, or surveyor..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>

            {/* View Toggle and Export */}
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ViewColumnsIcon className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={exportToExcel}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                Export Excel
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <select
                  value={filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All States</option>
                  {getUniqueValues('state').map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>

                <select
                  value={filters.district}
                  onChange={(e) => handleFilterChange('district', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Districts</option>
                  {getUniqueValues('district').map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>

                <select
                  value={filters.surveyor}
                  onChange={(e) => handleFilterChange('surveyor', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Surveyors</option>
                  {getUniqueValues('surveyor').map(surveyor => (
                    <option key={surveyor} value={surveyor}>{surveyor}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleDateRangeChange('start', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleDateRangeChange('end', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredSurveys.length}</span> of <span className="font-semibold text-gray-900">{surveys.length}</span> Blocks
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {viewMode === 'grid' ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedSurveys.map((survey) => (
                  <GridCard key={survey.id} survey={survey} />
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Block Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Survey Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Survey
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedSurveys.map((survey) => (
                    <tr key={survey.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{survey.blockName}</div>
                          <div className="text-sm text-gray-500">LGD: {survey.lgdCode}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{survey.state}</div>
                        <div className="text-sm text-gray-500">{survey.district}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{survey.totalSurveysCompleted}</div>
                            <div className="text-xs text-gray-500">Completed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-600">{survey.ongoingSurveys}</div>
                            <div className="text-xs text-gray-500">Ongoing</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{survey.surveyor}</div>
                        <div className="text-sm text-gray-500">{new Date(survey.lastSurveyDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => viewDetailReport(survey)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && <PaginationControls />}
        </div>

        {/* Empty State */}
        {filteredSurveys.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No block surveys found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockSurvey;
