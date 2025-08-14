import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '../../utils/constants';
import logo from '../../assets/logo.png';
import { 
  ChevronLeftIcon, 
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const Sidebar = ({ open, setOpen, collapsed, setCollapsed, toggleCollapse }) => {
  const location = useLocation();

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 px-6 pb-4 shadow-2xl">
      {/* Logo Section */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-indigo-700/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative mt-10">
            <img 
              src={logo} 
              alt="SMS Logo" 
              className="h-15 w-15 rounded-xl bg-white/10 p-1 shadow-lg ring-2 ring-white/20 backdrop-blur-sm"
            />
            <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-400 shadow-sm animate-pulse"></div>
          </div>
          {(!collapsed || isMobile) && (
            <div className="transition-all duration-300">
              <h2 className="text-white text-xl font-bold tracking-wide">Samriddh</h2>
              <p className="text-indigo-200 text-xs -mt-1">Gram Survey Management</p>
            </div>
          )}
        </div>
        
        {/* Collapse button - only for desktop */}
        {!isMobile && (
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg text-indigo-200 hover:text-white hover:bg-indigo-700/50 transition-all duration-200 group"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeftIcon 
              className={`h-5 w-5 transition-transform duration-300 ${
                collapsed ? 'rotate-180' : ''
              }`} 
            />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-2">
          <li>
            <ul role="list" className="space-y-2">
              {MENU_ITEMS.map((item, index) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.name} className="relative">
                    <Link
                      to={item.path}
                      className={`group relative flex items-center gap-x-3 rounded-xl p-3 text-sm leading-6 font-medium transition-all duration-200 transform hover:scale-[1.02] ${
                        isActive
                          ? 'bg-white/15 text-white shadow-lg ring-2 ring-white/20 backdrop-blur-sm'
                          : 'text-indigo-200 hover:text-white hover:bg-white/10 hover:shadow-md'
                      }`}
                      onClick={() => setOpen(false)}
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full shadow-glow"></div>
                      )}
                      
                      {/* Icon container */}
                      <div className={`relative flex-shrink-0 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-indigo-300 group-hover:text-white'
                      }`}>
                        <svg 
                          className="h-6 w-6 transition-all duration-200" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth="1.5" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        
                        {/* Notification badge example */}
                        {item.name === 'Dashboard' && (
                          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-400 shadow-sm animate-pulse"></div>
                        )}
                      </div>

                      {/* Menu text */}
                      {(!collapsed || isMobile) && (
                        <span className="flex-1 transition-all duration-300">
                          {item.name}
                        </span>
                      )}
                      
                      {/* Hover effect */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 opacity-0 group-hover:opacity-10 transition-opacity duration-200`}></div>
                    </Link>
                    
                    {/* Tooltip for collapsed state */}
                    {collapsed && !isMobile && (
                      <div className="group-hover:block hidden absolute left-16 top-0 z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl border border-gray-700 whitespace-nowrap">
                        {item.name}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45 border-l border-b border-gray-700"></div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>

        {/* Footer section */}
        <div className="mt-auto pt-6 border-t border-indigo-700/50">
          {(!collapsed || isMobile) && (
            <div className="text-center">
              <p className="text-indigo-300 text-xs">
                © 2025 Samriddh Gram Survey Management System by Bharatnet, DoT
              </p>
              {/* <div className="flex justify-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-indigo-200 text-xs">Online</span>
              </div> */}
            </div>
          )}
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-sm flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button 
                      type="button" 
                      className="group -m-2.5 p-2.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200" 
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-200" />
                    </button>
                  </div>
                </Transition.Child>
                <SidebarContent isMobile={true} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ${
        collapsed ? 'lg:w-20' : 'lg:w-72'
      }`}>
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
