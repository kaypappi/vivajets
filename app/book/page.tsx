'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import { debounce } from 'lodash'
import { useRouter } from 'next/navigation'
import { Calendar, MapPin, Plane, Users, Search, Filter, Clock, CheckCircle, ArrowLeft } from "lucide-react";
// import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, parse } from "date-fns"
import Header from '@/components/layouts/header'

interface Location {
  id: number;
  name: string;
  countryIso2Code: string;
  cityCode: string;
}

interface Trip {
  from: string;
  fromId: string;
  to: string;
  toId: string;
  date: Date | undefined;
  fromSuggestions: Location[];
  toSuggestions: Location[];
}

function BookPage() {


  const [isMuted, setIsMuted] = useState(true);
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  
  const router = useRouter();
  const [tripType, setTripType] = useState<string>('One Way')
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)
  
  // Debug state setter for return date
  const setReturnDateWithLog = (date: Date | undefined) => {
    console.log('setReturnDate called with:', date);
    setReturnDate(date);
  };
  const [multiLegTrips, setMultiLegTrips] = useState<Trip[]>([
    { from: '', fromId: '', to: '', toId: '', date: undefined, fromSuggestions: [], toSuggestions: [] }
  ]);
  const [fromLocation, setFromLocation] = useState<string>('')
  const [fromLocationId, setFromLocationId] = useState<string>('')
  const [toLocation, setToLocation] = useState<string>('')
  const [toLocationId, setToLocationId] = useState<string>('')
  const [travelDate, setTravelDate] = useState<Date | undefined>(undefined)
  const [takeoffTime, setTakeoffTime] = useState<string>('')
  
  // Debug state setter for travel date
  const setTravelDateWithLog = (date: Date | undefined) => {
    console.log('setTravelDate called with:', date);
    setTravelDate(date);
  };
  const [passengers, setPassengers] = useState<string>('')
  const [selectedJets, setSelectedJets] = useState<number[]>([])
  const [jetCategories, setJetCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [availableJets, setAvailableJets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState<Location[]>([])
  const [toSuggestions, setToSuggestions] = useState<Location[]>([])
  const [isFromValid, setIsFromValid] = useState(false);
  const [isToValid, setIsToValid] = useState(false);
  const [showFromNoResults, setShowFromNoResults] = useState(false);
  const [showToNoResults, setShowToNoResults] = useState(false);
  
  // Refs for date inputs
  const travelDateRef = useRef<HTMLInputElement>(null);
  const multiLegDateRefs = useRef<(HTMLInputElement | null)[]>([]);
 


  // Debug effects to monitor state changes
  useEffect(() => {
    console.log('travelDate state changed to:', travelDate);
  }, [travelDate]);
  
  useEffect(() => {
    console.log('returnDate state changed to:', returnDate);
  }, [returnDate]);

  useEffect(() => {
    

    // Load data from localStorage
    const savedTripType = localStorage.getItem('tripType');
    const savedFromLocation = localStorage.getItem('fromLocation');
    const savedFromLocationId = localStorage.getItem('fromLocationId');
    const savedToLocation = localStorage.getItem('toLocation');
    const savedToLocationId = localStorage.getItem('toLocationId');
    const savedTravelDate = localStorage.getItem('travelDate');
    const savedTakeoffTime = localStorage.getItem('takeoffTime');
    const savedPassengers = localStorage.getItem('passengers');
    const savedReturnDate = localStorage.getItem('returnDate');
    const savedMultiLegTrips = localStorage.getItem('multiLegTrips');

    if (savedTripType) {
      setTripType(savedTripType);
    } else {
      setTripType('One Way');
    }
    if (savedFromLocation && savedFromLocationId) {
      setFromLocation(savedFromLocation);
      setFromLocationId(savedFromLocationId);
      setIsFromValid(true); // Mark as valid since it's from localStorage
    }
    if (savedToLocation && savedToLocationId) {
      setToLocation(savedToLocation);
      setToLocationId(savedToLocationId);
      setIsToValid(true); // Mark as valid since it's from localStorage
    }
    if (savedPassengers) setPassengers(savedPassengers);
    if (savedTakeoffTime) setTakeoffTime(savedTakeoffTime);
    
    if (savedTravelDate) {
      setTravelDate(parse(savedTravelDate, 'yyyy-MM-dd', new Date()));
    }
    
    if (savedReturnDate) {
      setReturnDate(parse(savedReturnDate, 'yyyy-MM-dd', new Date()));
    }
    
    if (savedMultiLegTrips) {
      setMultiLegTrips(JSON.parse(savedMultiLegTrips));
    }
  }, [])

  useEffect(() => {
    if (fromLocationId && toLocationId && passengers) {
      fetchJetCategories();
    }
  }, [fromLocationId, toLocationId, passengers]);
  
  const fetchJetCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://chaterxe-staging.azurewebsites.net/api/Book/getjetcategoriesbydistance?takeOffAirportId=${fromLocationId}&destinationAirportId=${toLocationId}&noOfPassanger=${passengers}`);
      if (response.data.code === 200) {
        setJetCategories(response.data.data.jetCategories);
      } else {
        setJetCategories([]);
      }
    } catch (error) {
      console.error('Error fetching jet categories:', error);
      setJetCategories([]);
    }
    setLoading(false);
  };

  const handleTripTypeChange = (type: string) => {
    setTripType(type)
    localStorage.setItem('tripType', type)
    if (type === 'Multi-Leg' && multiLegTrips.length === 1) {
      setMultiLegTrips([...multiLegTrips, { from: '', fromId: '', to: '', toId: '', date: undefined, fromSuggestions: [], toSuggestions: [] }])
    }
  }

  const addMultiLegTrip = () => {
    setMultiLegTrips([...multiLegTrips, { from: '', fromId: '', to: '', toId: '', date: undefined, fromSuggestions: [], toSuggestions: [] }])
  }

  const removeMultiLegTrip = (index: number) => {
    const updatedTrips = multiLegTrips.filter((_, i) => i !== index)
    setMultiLegTrips(updatedTrips)
  }

  const updateMultiLegTrip = (index: number, field: string, value: any) => {
    const updatedTrips = [...multiLegTrips];
    updatedTrips[index] = { ...updatedTrips[index], [field]: value };
    setMultiLegTrips(updatedTrips);
  }

  const handleDateChange = (date: Date | undefined) => {
    console.log('handleDateChange called with:', date);
    setTravelDateWithLog(date)
    if (date) {
      console.log('Saving travel date to localStorage:', format(date, 'yyyy-MM-dd'));
      localStorage.setItem('travelDate', format(date, 'yyyy-MM-dd'))
    } else {
      console.log('Removing travel date from localStorage');
      localStorage.removeItem('travelDate')
    }
  }

  const handleJetSelection = (category: any) => {
    setSelectedCategory(category.id);
    if (selectedJets.includes(category.id)) {
      setSelectedJets(selectedJets.filter(id => id !== category.id));
    } else {
      setSelectedJets([...selectedJets, category.id]);
    }
  };

  const handleShowAllJets = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://chaterxe-staging.azurewebsites.net/api/book/getjetbycategories', {
        takeOffAirportId: fromLocationId,
        destinationAirportId: toLocationId,
        noOfPassanger: passengers,
        selectedJetCategoriesId: jetCategories.map(cat => cat.id)
      });
      if (response.data.code === 200) {
        setAvailableJets(response.data.data.jetTypes);
      } else {
        setAvailableJets([]);
      }
    } catch (error) {
      console.error('Error fetching available jets:', error);
      setAvailableJets([]);
    }
    setLoading(false);
  };

  const handleShowCategoryJets = async () => {
    if (!selectedCategory) return;
    setLoading(true);
    try {
      const response = await axios.post('https://chaterxe-staging.azurewebsites.net/api/book/getjetbycategories', {
        takeOffAirportId: fromLocationId,
        destinationAirportId: toLocationId,
        noOfPassanger: passengers,
        selectedJetCategoriesId: [selectedCategory]
      });
      if (response.data.code === 200) {
        setAvailableJets(response.data.data.jetTypes);
      } else {
        setAvailableJets([]);
      }
    } catch (error) {
      console.error('Error fetching category jets:', error);
      setAvailableJets([]);
    }
    setLoading(false);
  };

  const handleShowAvailableFlights = async () => {
    setLoading(true);
    try {
      const selectedCategoryIds = selectedJets.filter(id => typeof id === 'number');
      const response = await axios.post('https://chaterxe-staging.azurewebsites.net/api/book/getjetbycategories', {
        takeOffAirportId: fromLocationId,
        destinationAirportId: toLocationId,
        noOfPassanger: passengers,
        selectedJetCategoriesId: selectedCategoryIds.length > 0 ? selectedCategoryIds : jetCategories.map(cat => cat.id),
        tripType: tripType,
        travelDate: travelDate ? format(travelDate, 'yyyy-MM-dd') : null,
        multiLegTrips: tripType === 'Multi-Leg' ? multiLegTrips : null,
      });

      if (response.data.code === 200) {
        setAvailableJets(response.data.data.jetTypes);
      } else {
        setAvailableJets([]);
      }
    } catch (error) {
      console.error('Error fetching available jets:', error);
      setAvailableJets([]);
    }
    setLoading(false);
  };

  function removeTrailingSemicolon(url: string) {
    if (url && url.endsWith(';')) {
      return url.slice(0, -1);
    }
    return url;
  }

  const fetchSuggestions = async (query: string) => {
    if (query.length < 1) return [];
    
    try {
      const response = await axios.get(`https://chaterxe-staging.azurewebsites.net/api/Book/searchlocation?query=${query}`);
      if (response.data.code === 200) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(async (input: string, setterFunction: React.Dispatch<React.SetStateAction<Location[]>>) => {
      const suggestions = await fetchSuggestions(input);
      setterFunction(suggestions);
    }, 300),
    []
  );

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setterFunction: React.Dispatch<React.SetStateAction<string>>, suggestionSetter: React.Dispatch<React.SetStateAction<Location[]>>, validationSetter: React.Dispatch<React.SetStateAction<boolean>>, noResultsSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
        const value = e.target.value;
        setterFunction(value);
        
        // Reset validation when user types
        validationSetter(false);
        
        if (value.length > 0) {
            fetchSuggestions(value).then((suggestions) => {
                suggestionSetter(suggestions);
                if (suggestions.length === 0) {
                    noResultsSetter(true);
                } else {
                    noResultsSetter(false);
                }
            });
        } else {
            suggestionSetter([]);
            noResultsSetter(false);
            validationSetter(false);
        }
    };

  const handleSuggestionSelect = (suggestion: Location, inputSetter: React.Dispatch<React.SetStateAction<string>>, idSetter: React.Dispatch<React.SetStateAction<string>>, suggestionSetter: React.Dispatch<React.SetStateAction<Location[]>>, validationSetter: React.Dispatch<React.SetStateAction<boolean>>, noResultsSetter: React.Dispatch<React.SetStateAction<boolean>>, type: 'from' | 'to') => {
    const locationString = `${suggestion.name} (${suggestion.cityCode})`;
    inputSetter(locationString);
    idSetter(suggestion.id.toString());
    suggestionSetter([]);
    validationSetter(true); // Mark as valid since it's a proper selection
    noResultsSetter(false);

    if (type === 'from') {
      localStorage.setItem('fromLocation', locationString);
      localStorage.setItem('fromLocationId', suggestion.id.toString());
    } else {
      localStorage.setItem('toLocation', locationString);
      localStorage.setItem('toLocationId', suggestion.id.toString());
    }
  };

  const tripTypeIcons: any = {
    'One Way': '✈',
    'Round Trip': '⇄',
    'Multi-Leg': '✈'
  }

  const handleJetClick = (jet: any) => {
    const queryParams = new URLSearchParams();
    
    // Add basic flight information
    queryParams.append('from', fromLocation);
    queryParams.append('to', toLocation);
    queryParams.append('tripType', tripType);
    queryParams.append('date', travelDate ? format(travelDate, 'yyyy-MM-dd') : '');
    queryParams.append('time', takeoffTime);
    queryParams.append('passengers', passengers);
    
    // Add selected jet categories
    selectedJets.forEach(categoryId => queryParams.append('category', categoryId.toString()));
    
    // Add multi-leg trip information if applicable
    if (tripType === 'Multi-Leg') {
      multiLegTrips.forEach((trip, index) => {
        queryParams.append(`from${index + 1}`, trip.from);
        queryParams.append(`to${index + 1}`, trip.to);
        queryParams.append(`date${index + 1}`, trip.date ? format(trip.date, 'yyyy-MM-dd') : '');
      });
    }
    
    // Add selected jet information
    queryParams.append('jetId', jet.id);
    queryParams.append('jetName', jet.name);
    
    // Construct the URL
    const url = `https://clientstaging.charterxe.com/book?${queryParams.toString()}`;
    
    // Open the URL in a new tab
    window.open(url, '_blank');
  };

  return (
    <div className='min-h-screen bg-gray-50 pt-16 md:pt-24 pb-16'>
      <Header 
        isMuted={isMuted} 
        toggleMute={toggleMute} 
        showMuteButton={false}
        variant="dark"
      />
      {/* Header Section */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-12'>
        <div className="flex items-center justify-between mb-3 md:mb-2">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm md:text-base transition-colors"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span>Back</span>
          </button>
          {/* Optionally, you can add a placeholder for alignment */}
          <div />
        </div>
        {/* <div className='text-center'>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl special-header font-bold leading-tight mb-3 md:mb-4">
            Book Your Flight
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Find and book the perfect private jet for your journey. Choose from our premium fleet of aircraft.
          </p>
        </div> */}
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8'>
        {/* Left Side - Form */}
        <div className='w-full lg:w-3/5'>
          <div className='bg-white rounded-lg border border-gray-200 -sm p-4 sm:p-6'>
            {/* Trip Type Selector */}
            <div className='flex flex-wrap gap-2 sm:gap-3 mb-4 md:mb-6'>
              {['One Way', 'Round Trip', 'Multi-Leg'].map((type) => (
                <button 
                  key={type}
                  onClick={() => handleTripTypeChange(type)}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all min-w-0 ${
                    tripType === type ? 'bg-gray-900 text-white -md' : 'text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  <span>{tripTypeIcons[type]}</span>
                  <span className="truncate">{type}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 mb-3 md:mb-4">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              <h2 className='text-lg sm:text-xl md:text-2xl special-header font-bold text-gray-800'>FLIGHT INFORMATION</h2>
            </div>
            
            {/* Flight Information Form */}
            <div className='space-y-3 sm:space-y-4 border border-gray-200 p-3 sm:p-4 rounded-lg bg-gray-50/30'>
              {/* From Location */}
              <div className='relative'>
                <div className='flex items-center bg-white rounded-lg p-3 sm:p-4 border border-gray-200 -sm hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all'>
                  <Plane className='text-gray-400 mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
                  <input 
                    value={fromLocation}
                    onChange={(e) => handleInputChange(e, setFromLocation, setFromSuggestions, setIsFromValid, setShowFromNoResults)}
                    className={`w-full bg-transparent outline-none text-gray-700 text-sm sm:text-base placeholder-gray-400 ${
                      fromLocation && !isFromValid ? 'text-red-600' : ''
                    }`}
                    placeholder='Departure Location'
                  />
                </div>
                {(fromSuggestions.length > 0 || showFromNoResults) && (
                  <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto -lg">
                    {showFromNoResults && (
                      <li className="px-3 sm:px-4 py-3 text-gray-600 text-center text-sm">
                        No results found. Please try a different search term.
                      </li>
                    )}
                    {!showFromNoResults && fromSuggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="px-3 sm:px-4 py-3 hover:bg-gray-100 active:bg-gray-200 cursor-pointer text-gray-700 text-sm border-b border-gray-100 last:border-b-0 transition-colors"
                        onClick={() => handleSuggestionSelect(suggestion, setFromLocation, setFromLocationId, setFromSuggestions, setIsFromValid, setShowFromNoResults, 'from')}
                      >
                        <div className="font-medium">{suggestion.name} ({suggestion.cityCode})</div>
                        <div className="text-xs text-gray-500 mt-0.5">{suggestion.countryIso2Code}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* To Location */}
              <div className='relative'>
                <div className='flex items-center bg-white rounded-lg p-3 sm:p-4 border border-gray-200 -sm hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all'>
                  <MapPin className='text-gray-400 mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
                  <input 
                    value={toLocation}
                    onChange={(e) => handleInputChange(e, setToLocation, setToSuggestions, setIsToValid, setShowToNoResults)}
                    className={`w-full bg-transparent outline-none text-gray-700 text-sm sm:text-base placeholder-gray-400 ${
                      toLocation && !isToValid ? 'text-red-600' : ''
                    }`}
                    placeholder='Destination Location'
                  />
                </div>
                {(toSuggestions.length > 0 || showToNoResults) && (
                  <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto -lg">
                    {showToNoResults && (
                      <li className="px-3 sm:px-4 py-3 text-gray-600 text-center text-sm">
                        No results found. Please try a different search term.
                      </li>
                    )}
                    {!showToNoResults && toSuggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="px-3 sm:px-4 py-3 hover:bg-gray-100 active:bg-gray-200 cursor-pointer text-gray-700 text-sm border-b border-gray-100 last:border-b-0 transition-colors"
                        onClick={() => handleSuggestionSelect(suggestion, setToLocation, setToLocationId, setToSuggestions, setIsToValid, setShowToNoResults, 'to')}
                      >
                        <div className="font-medium">{suggestion.name} ({suggestion.cityCode})</div>
                        <div className="text-xs text-gray-500 mt-0.5">{suggestion.countryIso2Code}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Multi-leg Trips */}
              {tripType === 'Multi-Leg' && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-700">Multi-Leg Trips ({multiLegTrips.length})</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => removeMultiLegTrip(multiLegTrips.length - 1)} 
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={multiLegTrips.length <= 1}
                      >
                        Remove Leg
                      </button>
                      <button 
                        onClick={addMultiLegTrip} 
                        className="bg-gray-900 hover:bg-black text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                      >
                        Add Leg
                      </button>
                    </div>
                  </div>
                  {multiLegTrips.map((trip, index) => (
                    <div key={index} className="mb-4 p-3 sm:p-4 border border-gray-200 rounded-lg bg-white -sm">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-700">Leg {index + 1}</h4>
                        {trip.from && trip.to && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {trip.from.split(' (')[0]} → {trip.to.split(' (')[0]}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {/* From input */}
                        <div className='relative'>
                          <div className='flex items-center bg-white rounded-lg p-3 border'>
                            <Plane className='text-gray-400 mr-3 w-4 h-4' />
                            <input 
                              value={trip.from}
                              onChange={(e) => {
                                updateMultiLegTrip(index, 'from', e.target.value);
                                if (e.target.value.length >= 1) {
                                  fetchSuggestions(e.target.value).then((suggestions) => {
                                    const updatedTrips = [...multiLegTrips];
                                    updatedTrips[index] = { ...updatedTrips[index], fromSuggestions: suggestions };
                                    setMultiLegTrips(updatedTrips);
                                  });
                                }
                              }}
                              className='w-full bg-transparent outline-none text-gray-700 text-sm'
                              placeholder='From'
                            />
                          </div>
                          {trip.fromSuggestions && trip.fromSuggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto ">
                              {trip.fromSuggestions.map((suggestion) => (
                                <li
                                  key={suggestion.id}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                                  onClick={() => {
                                    updateMultiLegTrip(index, 'from', `${suggestion.name} (${suggestion.cityCode})`);
                                    updateMultiLegTrip(index, 'fromId', suggestion.id.toString());
                                    updateMultiLegTrip(index, 'fromSuggestions', []);
                                  }}
                                >
                                  {suggestion.name} ({suggestion.cityCode}) - {suggestion.countryIso2Code}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {/* To input */}
                        <div className='relative'>
                          <div className='flex items-center bg-white rounded-lg p-3 border'>
                            <MapPin className='text-gray-400 mr-3 w-4 h-4' />
                            <input 
                              value={trip.to}
                              onChange={(e) => {
                                updateMultiLegTrip(index, 'to', e.target.value);
                                if (e.target.value.length >= 1) {
                                  fetchSuggestions(e.target.value).then((suggestions) => {
                                    const updatedTrips = [...multiLegTrips];
                                    updatedTrips[index] = { ...updatedTrips[index], toSuggestions: suggestions };
                                    setMultiLegTrips(updatedTrips);
                                  });
                                }
                              }}
                              className='w-full bg-transparent outline-none text-gray-700 text-sm'
                              placeholder='To'
                            />
                          </div>
                          {trip.toSuggestions && trip.toSuggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto ">
                              {trip.toSuggestions.map((suggestion) => (
                                <li
                                  key={suggestion.id}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                                  onClick={() => {
                                    updateMultiLegTrip(index, 'to', `${suggestion.name} (${suggestion.cityCode})`);
                                    updateMultiLegTrip(index, 'toId', suggestion.id.toString());
                                    updateMultiLegTrip(index, 'toSuggestions', []);
                                  }}
                                >
                                  {suggestion.name} ({suggestion.cityCode}) - {suggestion.countryIso2Code}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                                                  {/* Date input */}
                          <div className='flex items-center bg-white rounded-lg p-3 border relative'>
                            <input
                              ref={(el) => {
                                multiLegDateRefs.current[index] = el;
                              }}
                              type="date"
                              value={trip.date ? format(trip.date, 'yyyy-MM-dd') : ''}
                              onChange={(e) => {
                                console.log('Book page multi-leg date input changed:', e.target.value, 'for trip index:', index);
                                if (e.target.value) {
                                  const date = new Date(e.target.value);
                                  console.log('Setting book page multi-leg date to:', date, 'for trip index:', index);
                                  updateMultiLegTrip(index, 'date', date);
                                } else {
                                  console.log('Clearing book page multi-leg date for trip index:', index);
                                  updateMultiLegTrip(index, 'date', undefined);
                                }
                              }}
                              min={format(new Date(), 'yyyy-MM-dd')}
                              className="w-full flex items-center text-left text-sm text-gray-700 bg-transparent border-none outline-none cursor-pointer"
                              placeholder="Pick a date"
                            />
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Date, Time and Passengers */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4'>
                <div className='flex items-center bg-white rounded-lg p-3 sm:p-4 border border-gray-200 -sm hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all relative'>
                  <input
                    ref={travelDateRef}
                    type="date"
                    value={travelDate ? format(travelDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => {
                      console.log('Book page travel date input changed:', e.target.value);
                      if (e.target.value) {
                        const date = new Date(e.target.value);
                        console.log('Setting book page travel date to:', date);
                        handleDateChange(date);
                      } else {
                        console.log('Clearing book page travel date');
                        handleDateChange(undefined);
                      }
                    }}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full flex items-center text-left text-gray-700 text-sm sm:text-base bg-transparent border-none outline-none cursor-pointer"
                    placeholder="Travel Date"
                  />
                </div>
                <div className='flex items-center bg-white rounded-lg p-3 sm:p-4 border border-gray-200 -sm hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all relative'>
                  <input
                    type="time"
                    value={takeoffTime}
                    onChange={(e) => {
                      setTakeoffTime(e.target.value);
                      localStorage.setItem('takeoffTime', e.target.value);
                    }}
                    className={`w-full bg-transparent outline-none text-sm sm:text-base cursor-pointer ${
                      takeoffTime ? 'text-gray-700' : 'text-transparent'
                    }`}
                  />
                  {!takeoffTime && (
                    <div className="absolute inset-0 flex items-center px-3 sm:px-4 pointer-events-none">
                      <span className="text-gray-400 text-sm sm:text-base">Take-off Time</span>
                    </div>
                  )}
                </div>
                <div className='flex items-center bg-white rounded-lg p-3 sm:p-4 border border-gray-200 -sm hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all'>
                  <Users className='text-gray-400 mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
                  <input 
                    type='number'
                    value={passengers}
                    onChange={(e) => {
                      setPassengers(e.target.value);
                      localStorage.setItem('passengers', e.target.value);
                    }}
                    className='w-full bg-transparent outline-none text-gray-700 text-sm sm:text-base placeholder-gray-400'
                    placeholder='Number of Pax'
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Jet Categories */}
            <div className="flex items-center gap-2 sm:gap-3 mt-4 md:mt-6 mb-3 md:mb-4">
              <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              <h3 className='text-lg sm:text-xl md:text-2xl special-header font-bold text-gray-800'>JET CATEGORIES</h3>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50/30">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg p-3 sm:p-4">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jetCategories.length > 0 ? (
              <>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50/30'>
                  {jetCategories.map((category) => (
                    <button 
                      key={category.id} 
                      onClick={() => handleJetSelection(category)}
                      className={`p-3 sm:p-4 text-left rounded-lg text-sm transition-all border-2 ${
                        selectedJets.includes(category.id) 
                          ? 'bg-gray-900 text-white border-gray-900 -md' 
                          : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className='font-semibold text-sm sm:text-base'>{category.name}</div>
                      <div className='text-xs mt-1.5 opacity-80'>
                        {category.availableJets} jet{category.availableJets !== 1 ? 's' : ''} available
                      </div>
                    </button>
                  ))}
                </div>
                <div className='mt-4 md:mt-6 flex flex-col sm:flex-row gap-3'>
                  <button 
                    className='w-full sm:w-auto bg-gray-900 text-white py-3 px-6 rounded-full font-semibold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base'
                    onClick={handleShowAllJets}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Show All Available Jets'}
                  </button>
                  {selectedJets.length > 0 && (
                    <button 
                      className='w-full sm:w-auto bg-gray-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base'
                      onClick={handleShowCategoryJets}
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : `Show Selected (${selectedJets.length})`}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-6 md:py-8 text-gray-600 border border-gray-200 rounded-lg bg-gray-50/30">
                <Filter className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm sm:text-base font-medium mb-1">
                  {fromLocationId && toLocationId && passengers ? 
                    'No jet categories available' :
                    'Complete flight details to see categories'
                  }
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {fromLocationId && toLocationId && passengers ? 
                    'Try adjusting your route or passenger count.' :
                    'Fill in departure, destination, and passenger count above.'
                  }
                </p>
              </div>
            )}

            <button 
              className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-full mt-4 md:mt-6 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base -lg hover:-xl transform hover:scale-[1.02] active:scale-[0.98]'
              onClick={handleShowAvailableFlights}
              disabled={loading || !fromLocationId || !toLocationId || !passengers}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>SHOW AVAILABLE FLIGHTS</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Right Side - Available Jets */}
        <div className='w-full lg:w-2/5'>
          <div className='bg-white rounded-lg border border-gray-200 -sm p-4 sm:p-6'>
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              <h3 className='text-lg sm:text-xl md:text-2xl special-header font-bold text-gray-800'>Available Jets</h3>
            </div>
            {loading && availableJets.length === 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-200 h-40 sm:h-48 w-full"></div>
                    <div className="p-3 sm:p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="h-3 sm:h-4 bg-gray-300 rounded w-16"></div>
                        <div className="h-3 sm:h-4 bg-gray-300 rounded w-12"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 sm:h-5 bg-gray-300 rounded w-28 sm:w-32"></div>
                        <div className="h-4 sm:h-5 bg-gray-300 rounded w-16 sm:w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : availableJets.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {availableJets.map((jet) => (
                  <div 
                    key={jet.id} 
                    className='bg-gray-50 border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-gray-400 hover:-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]' 
                    onClick={() => handleJetClick(jet)}
                  >
                    <div className='relative'>
                      <img 
                        src={removeTrailingSemicolon(jet.imageUrls)} 
                        alt={jet.name} 
                        className="w-full h-40 sm:h-48 object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/images/plane.svg';
                        }}
                      />
                      <div className='absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-md -sm'>
                        SUBJECT TO AVAILABILITY
                      </div>
                      <div className='absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md'>
                        Click to Book
                      </div>
                    </div>
                    <div className='p-3 sm:p-4'>
                      <div className='flex justify-between items-center mb-2'>
                        <span className='text-xs font-semibold text-white bg-gray-900 rounded-md px-2 py-1'>
                          {jet.category}
                        </span>
                        <span className='text-xs sm:text-sm font-semibold text-gray-700 bg-gray-200 px-2 py-1 rounded-md'>
                          {jet.seats} Seat{jet.seats !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h4 className='text-base sm:text-lg lg:text-xl font-semibold text-gray-800 truncate pr-2'>{jet.name}</h4>
                        <div className='text-right'>
                          <span className='text-lg sm:text-xl font-bold text-green-600'>${jet.estimateFare}</span>
                          <div className='text-xs text-gray-500'>Estimated</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-600 border border-gray-200 rounded-lg bg-gray-50/30">
                <div className="flex items-center justify-center mb-4">
                  <Plane className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mr-2" />
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" />
                </div>
                <p className="font-medium text-sm sm:text-base mb-1">No available jets yet</p>
                <p className="text-xs sm:text-sm text-gray-500 px-4">
                  Complete the form and search to see available aircraft options.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookPage