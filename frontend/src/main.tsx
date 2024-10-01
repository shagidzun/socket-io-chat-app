import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes/app.routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthContextProvider } from './context/AuthContext.tsx';
import { SocketContextProvider } from './context/SocketContext.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter(appRoutes);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<SocketContextProvider>
					<App>
						<RouterProvider router={router} />
					</App>
				</SocketContextProvider>
			</AuthContextProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>
);
