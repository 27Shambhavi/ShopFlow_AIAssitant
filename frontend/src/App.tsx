import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { OrderProvider } from './context/OrderContext';
import { RootLayout } from './layouts/RootLayout';
import { AppLayout } from './layouts/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { AssistantPage } from './pages/AssistantPage';
import { ProductDiscoveryPage } from './pages/ProductDiscoveryPage';
import { OrdersDashboardPage } from './pages/OrdersDashboardPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { SupportCenterPage } from './pages/SupportCenterPage';
import { ReturnsPage } from './pages/ReturnsPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <OrderProvider>
          <BrowserRouter>
            <Routes>
              {/* Full-screen Assistant Workspace */}
              <Route element={<AppLayout />}>
                <Route path="/app" element={<AssistantPage />} />
              </Route>

              {/* Standard Platform Pages */}
              <Route element={<RootLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/products" element={<ProductDiscoveryPage />} />
                <Route path="/orders" element={<OrdersDashboardPage />} />
                <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
                <Route path="/track" element={<TrackOrderPage />} />
                <Route path="/support" element={<SupportCenterPage />} />
                <Route path="/returns" element={<ReturnsPage />} />
                {/* Fallback to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </OrderProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
