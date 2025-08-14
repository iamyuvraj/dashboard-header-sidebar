import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSidebar } from './Layout'; // Import the sidebar context
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
  ClockIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Header = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { sidebarCollapsed } = useSidebar(); // Use sidebar context
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Mobile menu button and Title */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:hidden transition-all duration-200"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Title - adjusts based on sidebar state */}
            <div className="flex items-center">
              <h1 className={`font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 ${
                sidebarCollapsed ? 'text-2xl' : 'text-xl sm:text-2xl'
              }`}>
                {sidebarCollapsed ? 'Samrridh Gram Survey Management System' : 'Samrridh Gram Survey Management System'}
              </h1>
            </div>
          </div>

          {/* Center Section - Date and Time */}
          <div className={`hidden md:flex items-center gap-6 px-6 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 transition-all duration-300 ${
            sidebarCollapsed ? 'scale-105' : 'scale-100'
          }`}>
            <div className="flex items-center gap-2 text-gray-700">
              <CalendarDaysIcon className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-medium">
                {formatDate(currentTime)}
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-700">
              <ClockIcon className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-mono font-semibold">
                {formatTime(currentTime)}
              </span>
            </div>
          </div>

          {/* Right Section - Search, Notifications, and User menu */}
          <div className="flex items-center gap-3">
            {/* Search - adjusts width based on sidebar state */}
            {/* <div className="hidden sm:block">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Quick search..."
                  className={`rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 ${
                    sidebarCollapsed ? 'w-72' : 'w-64'
                  }`}
                />
              </div>
            </div> */}

            {/* Notifications */}
            <button className="relative rounded-lg p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-400 ring-2 ring-white animate-pulse"></span>
            </button>

            {/* User menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200">
                <div className="flex items-center gap-3">
                  {/* User Avatar */}
                  <div className="relative">
                    {user?.avatar ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-300"
                        src={user.avatar}
                        alt={user?.name}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center ring-2 ring-gray-300">
                        <UserIcon className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></div>
                  </div>

                  {/* User info */}
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getGreeting()}
                    </p>
                  </div>

                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </div>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5 focus:outline-none border border-gray-200">
                  {/* User info in dropdown */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Signed in as</p>
                    <p className="text-sm font-semibold text-indigo-600">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                  </div>

                  {/* Date and Time (mobile only) */}
                  <div className="block md:hidden px-4 py-3 border-b border-gray-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span className="text-xs">{formatDate(currentTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <ClockIcon className="h-4 w-4" />
                        <span className="text-xs font-mono">{formatTime(currentTime)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#profile"
                          className={`${
                            active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                          } flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200`}
                        >
                          <UserCircleIcon className="h-4 w-4" />
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#settings"
                          className={`${
                            active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                          } flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200`}
                        >
                          <Cog6ToothIcon className="h-4 w-4" />
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`${
                            active ? 'bg-red-50 text-red-700' : 'text-red-600'
                          } flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors duration-200`}
                        >
                          <ArrowRightOnRectangleIcon className="h-4 w-4" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
