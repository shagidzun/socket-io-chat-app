import './App.css';
import { ReactNode } from 'react';

function App({ children }: { children: ReactNode }) {
	return <div className="flex h-screen items-center justify-center p-4">{children}</div>;
}

export default App;
