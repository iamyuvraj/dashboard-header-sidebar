import { useState, createContext, useContext } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

// Create a context for sidebar state management
const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Function to handle sidebar collapse toggle
  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Calculate the left padding based on sidebar state
  const getContentPadding = () => {
    if (sidebarCollapsed) {
      return 'lg:pl-20'; // Width for collapsed sidebar (80px = 20 * 0.25rem)
    }
    return 'lg:pl-72'; // Width for expanded sidebar (288px = 72 * 0.25rem)
  };

  const sidebarContextValue = {
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebarCollapse
  };

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      <div className="min-h-screen bg-gray-50">
        <Sidebar 
          open={sidebarOpen} 
          setOpen={setSidebarOpen}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          toggleCollapse={toggleSidebarCollapse}
        />
        
        <div className={`transition-all duration-300 ${getContentPadding()}`}>
          <Header 
            setSidebarOpen={setSidebarOpen}
            sidebarCollapsed={sidebarCollapsed}
          />
          
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="transition-all duration-300">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Layout;
