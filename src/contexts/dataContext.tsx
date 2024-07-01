import React, { createContext, useState } from 'react';

type DataContext = {
	data: Data;
	setData: React.Dispatch<React.SetStateAction<Data>>;
};

type Data = {
	icon: 'string';
	questions: [];
	title: 'string';
};

type DataContextProviderProps = {
	children: React.ReactNode;
};

const DataContext = createContext<DataContext | null>(null);

export default function DataContextProvider({
	children
}: DataContextProviderProps) {
	const [data, setData] = useState<Data>();

	return (
		<DataContext.Provider value={{ data, setData }}>
			{children}
		</DataContext.Provider>
	);
}
