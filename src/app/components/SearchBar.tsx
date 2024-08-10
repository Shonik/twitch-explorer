"use client";

import { useState } from 'react';
import { useCombobox } from 'downshift';

const CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
const BEARER_TOKEN = process.env.NEXT_PUBLIC_TWITCH_BEARER_TOKEN;

const SearchBar = ({ onSearch }: { onSearch: (channel: string) => void }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<{ name: string; isLive: boolean, profile_image_url: string }[]>([]);

  const fetchSuggestions = async (value: string) => {
    const response = await fetch(
      `https://api.twitch.tv/helix/search/channels?query=${value}&live_only=true`,
      {
        headers: {
          'Client-ID': CLIENT_ID,
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    const channels = data.data.map((channel: any) => ({
      name: channel.display_name,
      isLive: channel.is_live,
      profile_image_url: channel.thumbnail_url,
    }));

    return channels;
  };

  const handleInputChange = async (value: string) => {
    setInputValue(value);

    if (value.length > 0) {
      const fetchedSuggestions = await fetchSuggestions(value);
      setSuggestions(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: suggestions.map(suggestion => suggestion.name),
    inputValue,
    onInputValueChange: ({ inputValue }) => {
      handleInputChange(inputValue || '');
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSearch(selectedItem);
      }
    },
  });

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center bg-gray-800 p-2 rounded-md shadow-md">
        <input
          {...getInputProps({ placeholder: 'Rechercher' })}
          className="flex-1 p-2 bg-gray-900 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={() => onSearch(inputValue)}
          className="ml-2 p-2 bg-gray-900 text-white rounded-full hover:bg-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.384 4.383a1 1 0 01-1.415 1.415l-4.383-4.384zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <ul
        {...getMenuProps()}
        className="absolute z-10 mt-2 w-full bg-gray-900 text-white rounded-md shadow-lg max-h-60 overflow-y-auto"
      >
        {isOpen &&
          suggestions.map((item, index) => (
            <li
              key={`${item.name}${index}`}
              {...getItemProps({ item: item.name, index })}
              className={`p-2 cursor-pointer flex justify-between items-center ${
                highlightedIndex === index ? 'bg-gray-700' : 'bg-gray-900'
              }`}
            >
              <div className="flex items-center">
                <img src={item.profile_image_url} alt={`${item.name}'s profile`} className="w-8 h-8 rounded-full mr-2" />
                <span>{item.name}</span>
              </div>
              {item.isLive && (
                <span className="ml-2 bg-red-600 text-white text-xs rounded-md px-2 py-1">
                  LIVE
                </span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchBar;
