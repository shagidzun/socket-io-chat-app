import './App.css';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

function App({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen items-center justify-center p-4">
			{children}
			<Toaster />
		</div>
	);
}

export default App;
