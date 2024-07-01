import React, { createContext, useContext, useState } from 'react';

type DataContext = {
	data: Data;
	setData: React.Dispatch<React.SetStateAction<Data>>;
};

type Data = {
	quizzes: {
		title: string;
		icon: string;
		questions: { question: string; options: string[]; answer: string }[];
	}[];
};

type DataContextProviderProps = {
	children: React.ReactNode;
};

const DataContext = createContext<DataContext | null>(null);

const initialState = {
	quizzes: [
		{
			title: '',
			icon: '',
			questions: [{ question: '', options: [''], answer: '' }]
		}
	]
};

export default function DataContextProvider({
	children
}: DataContextProviderProps) {
	const [data, setData] = useState<Data>(initialState);

	return (
		<DataContext.Provider value={{ data, setData }}>
			{children}
		</DataContext.Provider>
	);
}

export function useDataContext() {
	const context = useContext(DataContext);

	if (!context) {
		throw new Error('useDataContext should be used in DataContextProvider');
	}

	return context;
}
