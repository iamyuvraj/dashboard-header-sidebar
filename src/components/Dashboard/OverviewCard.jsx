const OverviewCard = ({ title, total, completed, color }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`h-8 w-8 ${color} rounded-md flex items-center justify-center`}>
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {completed}/{total}
                </div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {percentage}%
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <span className="font-medium text-gray-500">Progress:</span>
          <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${color}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
