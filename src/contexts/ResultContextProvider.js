import React, {createContext, useContext, useState} from "react";

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({children}) => {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	// videos search images
	const getResults = async (type) => {
		setIsLoading(true);
		// al 2 lea parametru {method, headers}
		const response = await fetch(`${baseUrl}${type}`, {
			method: "GET",
			headers: {
				"x-user-agent": "desktop",
				"x-proxy-location": "EU",
				"x-rapidapi-host": "google-search3.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_API_KEY,
			}
		});

		const data = await response.json();

		if (type.includes('/news')){
			// console.log(news);
			// return data.entries;
			setResults(data.entries);
		} else if (type.includes('/images')){
			// return data.image_results;
			setResults(data.image_results);
		} else {
			// return data.results;
			setResults(data.results);
		}

		// setResults(data);
		setIsLoading(false);
	};

	return <ResultContext.Provider value={{getResults, results, searchTerm, setSearchTerm, isLoading}}>
		{children}
	</ResultContext.Provider>;
};
export const useResultContext = () => useContext(ResultContext);
