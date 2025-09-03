'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import { Calendar, MapPin, Plane, Users, Clock } from "lucide-react";
import axios from 'axios';
import { debounce } from 'lodash';
import { format } from "date-fns";
import FlightQuoteModal from "../ui/flight-quote-modal";
import { useTranslations } from "@/lib/useTranslations";

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
  fromValid?: boolean;
  toValid?: boolean;
  showFromNoResults?: boolean;
  showToNoResults?: boolean;
}

interface FlightBookingFormProps {
  className?: string;
}

export default function FlightBookingForm({ className = "" }: FlightBookingFormProps) {
  const { t } = useTranslations();
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip' | 'multiLeg'>('oneWay');
  const [takeoffLocation, setTakeoffLocation] = useState('');
  const [takeoffLocationId, setTakeoffLocationId] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [destinationLocationId, setDestinationLocationId] = useState('');
  const [takeoffSuggestions, setTakeoffSuggestions] = useState<Location[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Location[]>([]);
  const [recentLocations, setRecentLocations] = useState<Location[]>([]);
  const [takeoffDate, setTakeoffDate] = useState<Date | undefined>(undefined);
  const [takeoffTime, setTakeoffTime] = useState<string>('12:00');
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  
  // Debug state setters
  const setTakeoffDateWithLog = (date: Date | undefined) => {
    console.log('setTakeoffDate called with:', date);
    setTakeoffDate(date);
  };
  
  const setReturnDateWithLog = (date: Date | undefined) => {
    console.log('setReturnDate called with:', date);
    setReturnDate(date);
  };
  const [numberOfSeats, setNumberOfSeats] = useState('1');
  const [isLoadingTakeoffSuggestions, setIsLoadingTakeoffSuggestions] = useState(false);
  const [isLoadingDestinationSuggestions, setIsLoadingDestinationSuggestions] = useState(false);
  const [isTakeoffValid, setIsTakeoffValid] = useState(false);
  const [isDestinationValid, setIsDestinationValid] = useState(false);
  const [showTakeoffNoResults, setShowTakeoffNoResults] = useState(false);
  const [showDestinationNoResults, setShowDestinationNoResults] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    takeoffLocation: false,
    destinationLocation: false,
    takeoffDate: false,
    returnDate: false,
    takeoffTime: false
  });
  const [multiLegTrips, setMultiLegTrips] = useState<Trip[]>([
    { from: '', fromId: '', to: '', toId: '', date: undefined, fromSuggestions: [], toSuggestions: [], fromValid: false, toValid: false, showFromNoResults: false, showToNoResults: false }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const takeoffRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const takeoffDateRef = useRef<HTMLInputElement>(null);
  const returnDateRef = useRef<HTMLInputElement>(null);
  const multiLegDateRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('takeoffDate state changed to:', takeoffDate);
  }, [takeoffDate]);
  
  useEffect(() => {
    console.log('returnDate state changed to:', returnDate);
  }, [returnDate]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedLocations = localStorage.getItem('recentLocations');
    if (storedLocations) {
      setRecentLocations(JSON.parse(storedLocations));
    }

    // Load saved form data
    const savedTripType = localStorage.getItem('tripType');
    if (savedTripType) {
      setTripType(savedTripType as 'oneWay' | 'roundTrip' | 'multiLeg');
    }

    const savedTakeoffLocation = localStorage.getItem('fromLocation');
    const savedTakeoffLocationId = localStorage.getItem('fromLocationId');
    const savedDestinationLocation = localStorage.getItem('toLocation');
    const savedDestinationLocationId = localStorage.getItem('toLocationId');
    const savedPassengers = localStorage.getItem('passengers');
    const savedTakeoffTime = localStorage.getItem('takeoffTime');

    if (savedTakeoffLocation && savedTakeoffLocationId) {
      setTakeoffLocation(savedTakeoffLocation);
      setTakeoffLocationId(savedTakeoffLocationId);
      setIsTakeoffValid(true); // Mark as valid since it's from localStorage
    }
    if (savedDestinationLocation && savedDestinationLocationId) {
      setDestinationLocation(savedDestinationLocation);
      setDestinationLocationId(savedDestinationLocationId);
      setIsDestinationValid(true); // Mark as valid since it's from localStorage
    }
    if (savedPassengers) setNumberOfSeats(savedPassengers);
    if (savedTakeoffTime) setTakeoffTime(savedTakeoffTime);
    else setTakeoffTime('12:00'); // Set default time if none saved

    const handleClickOutside = (event: MouseEvent) => {
      if (takeoffRef.current && !takeoffRef.current.contains(event.target as Node)) {
        setTakeoffSuggestions([]);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setDestinationSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // API function to fetch location suggestions
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

  // Debounced suggestion fetching with loading states
  const debouncedFetchSuggestions = useCallback(
    debounce(async (input: string, setterFunction: React.Dispatch<React.SetStateAction<Location[]>>, loadingSetter: React.Dispatch<React.SetStateAction<boolean>>, noResultsSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
      loadingSetter(true);
      setShowTakeoffNoResults(false);
      setShowDestinationNoResults(false);
      
      const suggestions = await fetchSuggestions(input);
      const allSuggestions = [...suggestions, ...recentLocations];
      
      setterFunction(allSuggestions);
      loadingSetter(false);
      
      // Show no results if no suggestions found
      if (allSuggestions.length === 0 && input.length > 0) {
        noResultsSetter(true);
      } else {
        noResultsSetter(false);
      }
    }, 300),
    [recentLocations]
  );

  // Validate if input matches any suggestion
  const validateLocationInput = (input: string, suggestions: Location[]): boolean => {
    if (!input) return false;
    return suggestions.some(suggestion => 
      `${suggestion.name} (${suggestion.cityCode})` === input
    );
  };

  // Handle input changes for location fields
  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>, setterFunction: React.Dispatch<React.SetStateAction<string>>, suggestionSetter: React.Dispatch<React.SetStateAction<Location[]>>, loadingSetter: React.Dispatch<React.SetStateAction<boolean>>, validationSetter: React.Dispatch<React.SetStateAction<boolean>>, noResultsSetter: React.Dispatch<React.SetStateAction<boolean>>, fieldType: 'takeoff' | 'destination') => {
    const value = e.target.value;
    setterFunction(value);
    
    // Reset validation when user types
    validationSetter(false);
    
    // Clear validation errors
    setValidationErrors(prev => ({
      ...prev,
      [fieldType === 'takeoff' ? 'takeoffLocation' : 'destinationLocation']: false
    }));
    
    if (value.length > 0) {
      debouncedFetchSuggestions(value, suggestionSetter, loadingSetter, noResultsSetter);
    } else {
      suggestionSetter([]);
      loadingSetter(false);
      noResultsSetter(false);
      validationSetter(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: Location, inputSetter: React.Dispatch<React.SetStateAction<string>>, idSetter: React.Dispatch<React.SetStateAction<string>>, suggestionSetter: React.Dispatch<React.SetStateAction<Location[]>>, loadingSetter: React.Dispatch<React.SetStateAction<boolean>>, validationSetter: React.Dispatch<React.SetStateAction<boolean>>, noResultsSetter: React.Dispatch<React.SetStateAction<boolean>>, type: 'takeoff' | 'destination') => {
    const locationString = `${suggestion.name} (${suggestion.cityCode})`;
    inputSetter(locationString);
    idSetter(suggestion.id.toString());
    suggestionSetter([]);
    loadingSetter(false);
    validationSetter(true); // Mark as valid since it's a proper selection
    noResultsSetter(false);

    const updatedRecentLocations = [suggestion, ...recentLocations.filter(loc => loc.id !== suggestion.id)].slice(0, 5);
    setRecentLocations(updatedRecentLocations);
    localStorage.setItem('recentLocations', JSON.stringify(updatedRecentLocations));

    if (type === 'takeoff') {
      localStorage.setItem('fromLocation', locationString);
      localStorage.setItem('fromLocationId', suggestion.id.toString());
    } else {
      localStorage.setItem('toLocation', locationString);
      localStorage.setItem('toLocationId', suggestion.id.toString());
    }
  };

  // Multi-leg trip handlers
  const handleMultiLegInputChange = (index: number, field: 'from' | 'to', value: string) => {
    const updatedTrips = [...multiLegTrips];
    updatedTrips[index] = { 
      ...updatedTrips[index], 
      [field]: value,
      [`${field}Valid`]: false // Reset validation when user types
    };
    setMultiLegTrips(updatedTrips);
    
    if (value.length > 0) {
      // Use fetchSuggestions directly for multi-leg inputs
      fetchSuggestions(value).then((suggestions) => {
        const allSuggestions = [...suggestions, ...recentLocations];
        const updatedTripsWithSuggestions = [...multiLegTrips];
        updatedTripsWithSuggestions[index] = { 
          ...updatedTripsWithSuggestions[index], 
          [`${field}Suggestions`]: allSuggestions,
          [`show${field.charAt(0).toUpperCase() + field.slice(1)}NoResults`]: allSuggestions.length === 0
        };
        setMultiLegTrips(updatedTripsWithSuggestions);
      });
    } else {
      const updatedTripsCleared = [...multiLegTrips];
      updatedTripsCleared[index] = { 
        ...updatedTripsCleared[index], 
        [`${field}Suggestions`]: [],
        [`${field}Valid`]: false,
        [`show${field.charAt(0).toUpperCase() + field.slice(1)}NoResults`]: false
      };
      setMultiLegTrips(updatedTripsCleared);
    }
  };

  const handleMultiLegSuggestionSelect = (index: number, suggestion: Location, field: 'from' | 'to') => {
    const locationString = `${suggestion.name} (${suggestion.cityCode})`;
    const updatedTrips = [...multiLegTrips];
    updatedTrips[index] = { 
      ...updatedTrips[index], 
      [field]: locationString,
      [`${field}Id`]: suggestion.id.toString(),
      [`${field}Suggestions`]: [],
      [`${field}Valid`]: true, // Mark as valid since it's a proper selection
      [`show${field.charAt(0).toUpperCase() + field.slice(1)}NoResults`]: false
    };
    setMultiLegTrips(updatedTrips);
  };

  const addMultiLegTrip = () => {
    setMultiLegTrips([...multiLegTrips, { from: '', fromId: '', to: '', toId: '', date: undefined, fromSuggestions: [], toSuggestions: [], fromValid: false, toValid: false, showFromNoResults: false, showToNoResults: false }]);
  };

  const removeMultiLegTrip = (index: number) => {
    if (multiLegTrips.length > 1) {
      const updatedTrips = multiLegTrips.filter((_, i) => i !== index);
      setMultiLegTrips(updatedTrips);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: null, message: '' });
    }, 5000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset validation errors
    setValidationErrors({
      takeoffLocation: false,
      destinationLocation: false,
      takeoffDate: false,
      returnDate: false,
      takeoffTime: false
    });
    
    let hasErrors = false;
    const newValidationErrors = {
      takeoffLocation: false,
      destinationLocation: false,
      takeoffDate: false,
      returnDate: false,
      takeoffTime: false
    };
    
    // Validate required fields
    if (!isTakeoffValid || !takeoffLocation) {
      newValidationErrors.takeoffLocation = true;
      hasErrors = true;
    }
    
    if (!isDestinationValid || !destinationLocation) {
      newValidationErrors.destinationLocation = true;
      hasErrors = true;
    }
    
    if (!takeoffDate) {
      newValidationErrors.takeoffDate = true;
      hasErrors = true;
    }
    
    if (!takeoffTime) {
      newValidationErrors.takeoffTime = true;
      hasErrors = true;
    }
    
    if (tripType === 'roundTrip' && !returnDate) {
      newValidationErrors.returnDate = true;
      hasErrors = true;
    }
    
    if (tripType === 'multiLeg') {
      // Validate all multi-leg trips
      for (let i = 0; i < multiLegTrips.length; i++) {
        const trip = multiLegTrips[i];
        if (!trip.from || !trip.fromId || !trip.fromValid) {
          alert(t('flight.selectValidDeparture', { leg: i + 1 }));
          return;
        }
        if (!trip.to || !trip.toId || !trip.toValid) {
          alert(t('flight.selectValidArrival', { leg: i + 1 }));
          return;
        }
        if (!trip.date) {
          alert(t('flight.selectDate', { leg: i + 1 }));
          return;
        }
      }
    }
    
    // If there are validation errors, update state and return
    if (hasErrors) {
      setValidationErrors(newValidationErrors);
      return;
    }
    
    // Open modal to collect personal details
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (personalDetails: { fullName: string; email: string; phone: string }) => {
    setIsSubmitting(true);
    
    try {
      // Prepare flight data
      const flightData = {
        tripType,
        takeoffLocation,
        destinationLocation,
        takeoffDate: takeoffDate ? format(takeoffDate, 'yyyy-MM-dd') : '',
        takeoffTime,
        numberOfSeats,
        returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : '',
        multiLegTrips: tripType === 'multiLeg' ? multiLegTrips.map(trip => ({
          from: trip.from,
          to: trip.to,
          date: trip.date ? format(trip.date, 'yyyy-MM-dd') : ''
        })) : []
      };

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...personalDetails,
          request: `Flight booking request for ${tripType} trip`,
          recipients: ['joel@falconaero.org', 'boluaj16@gmail.com', 'sales@viva-jets.com', 'basil@falconaero.org'],
          flightData
        }),
      });

      if (response.ok) {
        showNotification('success', t('flight.thankYouMessage'));
        setIsModalOpen(false);
        
        // Reset form
        setTakeoffLocation('');
        setTakeoffLocationId('');
        setDestinationLocation('');
        setDestinationLocationId('');
        setTakeoffDate(undefined);
        setReturnDate(undefined);
        setNumberOfSeats('1');
        setTripType('oneWay');
        setMultiLegTrips([{ from: '', fromId: '', to: '', toId: '', date: undefined, fromSuggestions: [], toSuggestions: [], fromValid: false, toValid: false, showFromNoResults: false, showToNoResults: false }]);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting flight request:', error);
      showNotification('error', t('flight.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${className} mt-6`}>
      {/* Trip Type Selector - positioned on the right, connected to main form */}
      <div className="flex justify-center sm:justify-end mb-0 sm:mb-0">
        <div className="w-full sm:w-auto bg-black/60 sm:bg-black/40 backdrop-blur-md border border-white/20 border-b-0 rounded-t-xl p-2 sm:p-3 md:p-4">
          <div className="flex gap-1 sm:gap-3 justify-center sm:justify-start">
            <button
              type="button"
              onClick={() => setTripType('oneWay')}
              className={`px-2 sm:px-3 md:px-6 py-1.5 sm:py-2.5 rounded-full text-xs font-medium transition-all duration-200 ${
                tripType === 'oneWay'
                  ? 'bg-white/30 text-white backdrop-blur-sm shadow-sm'
                  : 'bg-transparent text-white border border-white/30 hover:border-white/50'
              }`}
            >
              <span className="hidden sm:inline">{t('flight.oneWay')}</span>
              <span className="sm:hidden">{t('flight.oneWay')}</span> ✈
            </button>
            <button
              type="button"
              onClick={() => setTripType('roundTrip')}
              className={`px-2 sm:px-3 md:px-6 py-1.5 sm:py-2.5 rounded-full text-xs font-medium transition-all duration-200 ${
                tripType === 'roundTrip'
                  ? 'bg-white/30 text-white backdrop-blur-sm shadow-sm'
                  : 'bg-transparent text-white border border-white/30 hover:border-white/50'
              }`}
            >
              <span className="hidden sm:inline">{t('flight.roundTrip')}</span>
              <span className="sm:hidden">{t('flight.roundTrip')}</span> ⇄
            </button>
            <button
              type="button"
              onClick={() => setTripType('multiLeg')}
              className={`px-2 sm:px-3 md:px-6 py-1.5 sm:py-2.5 rounded-full text-xs font-medium transition-all duration-200 ${
                tripType === 'multiLeg'
                  ? 'bg-white/30 text-white backdrop-blur-sm shadow-sm'
                  : 'bg-transparent text-white border border-white/30 hover:border-white/50'
              }`}
            >
              <span className="hidden sm:inline">{t('flight.multiLeg')}</span>
              <span className="sm:hidden">{t('flight.multiLeg')}</span> ✈
            </button>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form 
        onSubmit={handleSubmit}
        className="bg-black/70 sm:bg-black/40 backdrop-blur-md border border-white/20 rounded-b-xl sm:rounded-tl-xl p-3 sm:p-4 md:p-6"
      >

        {/* Main Form Row */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 items-end md:grid-cols-[2fr_2fr_1.2fr_1fr_1fr_1fr]">
          {/* Take off Location */}
          <div className="flex-1" ref={takeoffRef}>
            <label className="block text-white/60 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{t('flight.takeoffLocation')}</label>
            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
              </div>
              <input
                type="text"
                value={takeoffLocation}
                onChange={(e) => handleLocationInputChange(e, setTakeoffLocation, setTakeoffSuggestions, setIsLoadingTakeoffSuggestions, setIsTakeoffValid, setShowTakeoffNoResults, 'takeoff')}
                placeholder={t('flight.takeoffLocation')}
                className={`w-full h-11 sm:h-14 pl-10 sm:pl-12 pr-6 sm:pr-8 bg-transparent border rounded-lg text-white placeholder-white/60 focus:border-white/60 focus:outline-none transition-all duration-200 text-sm sm:text-base ${
                  validationErrors.takeoffLocation || (takeoffLocation && !isTakeoffValid) ? 'border-red-400' : 'border-white/30'
                }`}
              />
              {/* Suggestions dropdown positioned above the input */}
              {(takeoffSuggestions.length > 0 || isLoadingTakeoffSuggestions || showTakeoffNoResults) && (
                <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md bottom-full mb-1 max-h-48 sm:max-h-60 overflow-y-auto">
                  {isLoadingTakeoffSuggestions && (
                    <li className="px-3 sm:px-4 py-2 sm:py-3">
                      <div className="animate-pulse">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="h-2 w-2 sm:h-3 sm:w-3 bg-gray-300 rounded-full"></div>
                          <div className="h-3 sm:h-4 bg-gray-300 rounded w-24 sm:w-32"></div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 mt-1 sm:mt-2">
                          <div className="h-2 w-2 sm:h-3 sm:w-3 bg-gray-300 rounded-full"></div>
                          <div className="h-3 sm:h-4 bg-gray-300 rounded w-20 sm:w-28"></div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 mt-1 sm:mt-2">
                          <div className="h-2 w-2 sm:h-3 sm:w-3 bg-gray-300 rounded-full"></div>
                          <div className="h-3 sm:h-4 bg-gray-300 rounded w-28 sm:w-36"></div>
                        </div>
                      </div>
                    </li>
                  )}
                  {!isLoadingTakeoffSuggestions && showTakeoffNoResults && (
                    <li className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 text-center">
                      {t('flight.noResultsFound')}
                    </li>
                  )}
                  {!isLoadingTakeoffSuggestions && !showTakeoffNoResults && takeoffSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className="px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 text-gray-800 cursor-pointer"
                      onClick={() => handleSuggestionSelect(suggestion, setTakeoffLocation, setTakeoffLocationId, setTakeoffSuggestions, setIsLoadingTakeoffSuggestions, setIsTakeoffValid, setShowTakeoffNoResults, 'takeoff')}
                    >
                      {suggestion.name} ({suggestion.cityCode}) - {suggestion.countryIso2Code}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Destination Location */}
          <div className="flex-1" ref={destinationRef}>
            <label className="block text-white/60 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{t('flight.destinationLocation')}</label>
            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
              </div>
              <input
                type="text"
                value={destinationLocation}
                onChange={(e) => handleLocationInputChange(e, setDestinationLocation, setDestinationSuggestions, setIsLoadingDestinationSuggestions, setIsDestinationValid, setShowDestinationNoResults, 'destination')}
                placeholder={t('flight.destinationLocation')}
                className={`w-full h-11 sm:h-14 pl-10 sm:pl-12 pr-6 sm:pr-8 bg-transparent border rounded-lg text-white placeholder-white/60 focus:border-white/60 focus:outline-none transition-all duration-200 text-sm sm:text-base ${
                  validationErrors.destinationLocation || (destinationLocation && !isDestinationValid) ? 'border-red-400' : 'border-white/30'
                }`}
              />
              {/* Suggestions dropdown positioned above the input */}
              {(destinationSuggestions.length > 0 || isLoadingDestinationSuggestions || showDestinationNoResults) && (
                <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md bottom-full mb-1 max-h-48 sm:max-h-60 overflow-y-auto">
                  {isLoadingDestinationSuggestions && (
                    <li className="px-3 sm:px-4 py-2 sm:py-3">
                      <div className="animate-pulse">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="h-2 w-2 sm:h-3 sm:w-3 bg-gray-300 rounded-full"></div>
                          <div className="h-3 sm:h-4 bg-gray-300 rounded w-24 sm:w-32"></div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 mt-1 sm:mt-2">
                          <div className="h-2 w-2 sm:h-3 sm:w-3 bg-gray-300 rounded-full"></div>
                          <div className="h-3 sm:h-4 bg-gray-300 rounded w-20 sm:w-28"></div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 mt-1 sm:mt-2">
                          <div className="h-2 w-2 sm:h-3 sm:w-3 bg-gray-300 rounded-full"></div>
                          <div className="h-3 sm:h-4 bg-gray-300 rounded w-28 sm:w-36"></div>
                        </div>
                      </div>
                    </li>
                  )}
                  {!isLoadingDestinationSuggestions && showDestinationNoResults && (
                    <li className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 text-center">
                      {t('flight.noResultsFound')}
                    </li>
                  )}
                  {!isLoadingDestinationSuggestions && !showDestinationNoResults && destinationSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className="px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 text-gray-800 cursor-pointer"
                      onClick={() => handleSuggestionSelect(suggestion, setDestinationLocation, setDestinationLocationId, setDestinationSuggestions, setIsLoadingDestinationSuggestions, setIsDestinationValid, setShowDestinationNoResults, 'destination')}
                    >
                      {suggestion.name} ({suggestion.cityCode}) - {suggestion.countryIso2Code}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Take off Date */}
          <div className="flex-1">
            <label className="block text-white/60 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{t('flight.takeoffDate')}</label>
            <div className="relative">
              <input
                ref={takeoffDateRef}
                type="date"
                value={takeoffDate ? format(takeoffDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => {
                  console.log('Takeoff date input changed:', e.target.value);
                  // Clear validation error
                  setValidationErrors(prev => ({ ...prev, takeoffDate: false }));
                  
                  if (e.target.value) {
                    const date = new Date(e.target.value);
                    console.log('Setting takeoff date to:', date);
                    setTakeoffDateWithLog(date);
                  } else {
                    console.log('Clearing takeoff date');
                    setTakeoffDateWithLog(undefined);
                  }
                }}
                min={format(new Date(), 'yyyy-MM-dd')}
                className={`w-full h-11 sm:h-14 px-3 sm:px-4 bg-transparent border rounded-lg text-white placeholder-white/60 focus:border-white/60 focus:outline-none transition-all duration-200 cursor-pointer text-sm sm:text-base ${
                  validationErrors.takeoffDate ? 'border-red-400' : 'border-white/30'
                }`}
                placeholder="Take off Date"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          {/* Take off Time */}
          <div className="flex-1">
            <label className="block text-white/60 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{t('flight.takeoffTime')}</label>
            <div className="relative">
              <input
                type="time"
                value={takeoffTime}
                onChange={(e) => {
                  setTakeoffTime(e.target.value);
                  localStorage.setItem('takeoffTime', e.target.value);
                  // Clear validation error
                  setValidationErrors(prev => ({ ...prev, takeoffTime: false }));
                }}
                className={`w-full h-11 sm:h-14 px-3 sm:px-4 bg-transparent border rounded-lg focus:border-white/60 focus:outline-none transition-all duration-200 cursor-pointer text-white text-sm sm:text-base ${
                  validationErrors.takeoffTime ? 'border-red-400' : 'border-white/30'
                }`}
                style={{ colorScheme: 'dark' }}
              />

            </div>
          </div>

          {/* Number of Pax */}
          <div className="flex-1">
            <label className="block text-white/60 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{t('flight.numberOfSeats')}</label>
            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
              </div>
                             <select
                value={numberOfSeats}
                onChange={(e) => {
                  setNumberOfSeats(e.target.value);
                  localStorage.setItem('passengers', e.target.value);
                }}
                 className="w-full h-11 sm:h-14 pl-10 sm:pl-12 pr-6 sm:pr-8 bg-transparent border border-white/30 rounded-lg text-white placeholder-white/60 focus:border-white/60 focus:outline-none transition-all duration-200 appearance-none cursor-pointer text-sm sm:text-base"
               >
                <option value="1" className="bg-gray-800 text-white">{t('flight.oneSeat')}</option>
                <option value="2" className="bg-gray-800 text-white">{t('flight.twoSeats')}</option>
                <option value="3" className="bg-gray-800 text-white">{t('flight.threeSeats')}</option>
                <option value="4" className="bg-gray-800 text-white">{t('flight.fourSeats')}</option>
                <option value="5" className="bg-gray-800 text-white">{t('flight.fiveSeats')}</option>
                <option value="6" className="bg-gray-800 text-white">{t('flight.sixSeats')}</option>
                <option value="7" className="bg-gray-800 text-white">{t('flight.sevenSeats')}</option>
                <option value="8" className="bg-gray-800 text-white">{t('flight.eightSeats')}</option>
                <option value="9+" className="bg-gray-800 text-white">{t('flight.ninePlusSeats')}</option>
              </select>
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex-shrink-0">
            <label className="block text-white/60 text-xs sm:text-sm font-medium mb-1 sm:mb-2 opacity-0">{t('flight.action')}</label>
            <button
              type="submit"
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#4472FF] hover:bg-black text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-transparent whitespace-nowrap text-sm sm:text-base"
            >
              {t('flight.submit')}
            </button>
          </div>
        </div>

        {/* Return Date Row for Round Trip */}
        {tripType === 'roundTrip' && (
          <div className="grid grid-cols-1 gap-3 sm:gap-4 items-end md:grid-cols-[2fr_2fr_1.2fr_1fr_1fr_1fr] mt-3 sm:mt-4">
            <div></div> {/* Empty space for alignment */}
            <div></div> {/* Empty space for alignment */}
            <div className="flex-1">
              <label className="block text-white/60 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{t('flight.returnDate')}</label>
              <div className="relative">
                <input
                  ref={returnDateRef}
                  type="date"
                  value={returnDate ? format(returnDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => {
                    console.log('Return date input changed:', e.target.value);
                    // Clear validation error
                    setValidationErrors(prev => ({ ...prev, returnDate: false }));
                    
                    if (e.target.value) {
                      const date = new Date(e.target.value);
                      console.log('Setting return date to:', date);
                      setReturnDateWithLog(date);
                    } else {
                      console.log('Clearing return date');
                      setReturnDateWithLog(undefined);
                    }
                  }}
                  min={takeoffDate ? format(takeoffDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
                  className={`w-full h-11 sm:h-14 px-3 sm:px-4 bg-transparent border rounded-lg text-white placeholder-white/60 focus:border-white/60 focus:outline-none transition-all duration-200 cursor-pointer text-sm sm:text-base ${
                    validationErrors.returnDate ? 'border-red-400' : 'border-white/30'
                  }`}
                  placeholder="Return Date"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>
            <div></div> {/* Empty space for alignment */}
            <div></div> {/* Empty space for alignment */}
            <div></div> {/* Empty space for alignment */}
          </div>
        )}



        {/* Multi-leg Trips */}
        {tripType === 'multiLeg' && (
          <div className="mt-4 sm:mt-6 border-t border-white/20 pt-3 sm:pt-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-4">
              <h4 className="text-white font-medium text-base sm:text-lg">{t('flight.multiLegTrips')}</h4>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => removeMultiLegTrip(multiLegTrips.length - 1)} 
                  className="bg-white/20 hover:bg-white/30 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm transition-colors"
                  disabled={multiLegTrips.length <= 1}
                >
                  {t('flight.removeLeg')}
                </button>
                <button 
                  type="button"
                  onClick={addMultiLegTrip} 
                  className="bg-blue-700 hover:bg-blue-800 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm transition-colors"
                >
                  {t('flight.addLeg')}
                </button>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {multiLegTrips.map((trip, index) => (
                <div key={index} className="bg-black/40 sm:bg-black/30 border border-white/20 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-3">
                    <h5 className="text-white font-medium text-sm sm:text-base">{t('flight.leg')} {index + 1}</h5>
                    <span className="text-white/60 text-xs sm:text-sm">{trip.from && trip.to ? `${trip.from} → ${trip.to}` : t('flight.routeNotSet')}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-[1fr_1fr_120px]">
                                          {/* From input */}
                      <div className="relative">
                        <label className="block text-white/60 text-xs font-medium mb-1">{t('flight.from')}</label>
                        <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 z-10">
                          <Plane className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" />
                        </div>
                        <input 
                          type="text"
                          value={trip.from}
                          onChange={(e) => handleMultiLegInputChange(index, 'from', e.target.value)}
                          placeholder={t('flight.from')}
                          className={`w-full h-10 sm:h-12 pl-8 sm:pl-10 pr-3 sm:pr-4 bg-transparent border rounded-lg text-white placeholder-white/60 focus:border-white/60 focus:outline-none transition-all duration-200 text-xs sm:text-sm ${
                            trip.from && !trip.fromValid ? 'border-red-400' : 'border-white/30'
                          }`}
                        />
                                              {(trip.fromSuggestions && trip.fromSuggestions.length > 0 || trip.showFromNoResults) && (
                          <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md bottom-full mb-1 max-h-32 sm:max-h-40 overflow-y-auto">
                            {trip.showFromNoResults && (
                              <li className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs text-gray-600 text-center">
                                {t('flight.noResultsFound')}
                              </li>
                            )}
                            {!trip.showFromNoResults && trip.fromSuggestions && trip.fromSuggestions.map((suggestion) => (
                              <li
                                key={suggestion.id}
                                className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs hover:bg-gray-100 text-gray-800 cursor-pointer"
                                onClick={() => handleMultiLegSuggestionSelect(index, suggestion, 'from')}
                              >
                                {suggestion.name} ({suggestion.cityCode})
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                    
                    {/* To input */}
                    <div className="relative">
                      <label className="block text-white/60 text-xs font-medium mb-1">{t('flight.to')}</label>
                      <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 z-10">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" />
                      </div>
                      <input 
                        type="text"
                        value={trip.to}
                        onChange={(e) => handleMultiLegInputChange(index, 'to', e.target.value)}
                        placeholder={t('flight.to')}
                        className={`w-full h-10 sm:h-12 pl-8 sm:pl-10 pr-3 sm:pr-4 bg-transparent border rounded-lg text-white placeholder-white/60 focus:border-white/60 focus:outline-none transition-all duration-200 text-xs sm:text-sm ${
                          trip.to && !trip.toValid ? 'border-red-400' : 'border-white/30'
                        }`}
                      />
                      {(trip.toSuggestions && trip.toSuggestions.length > 0 || trip.showToNoResults) && (
                        <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md bottom-full mb-1 max-h-32 sm:max-h-40 overflow-y-auto">
                          {trip.showToNoResults && (
                            <li className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs text-gray-600 text-center">
                              {t('flight.noResultsFound')}
                            </li>
                          )}
                          {!trip.showToNoResults && trip.toSuggestions && trip.toSuggestions.map((suggestion) => (
                            <li
                              key={suggestion.id}
                              className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs hover:bg-gray-100 text-gray-800 cursor-pointer"
                              onClick={() => handleMultiLegSuggestionSelect(index, suggestion, 'to')}
                            >
                              {suggestion.name} ({suggestion.cityCode})
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    {/* Date input */}
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-1">{t('flight.date')}</label>
                      <div className="relative">
                        <input
                          ref={(el) => {
                            multiLegDateRefs.current[index] = el;
                          }}
                          type="date"
                          value={trip.date ? format(trip.date, 'yyyy-MM-dd') : ''}
                          onChange={(e) => {
                            console.log('Multi-leg date input changed:', e.target.value, 'for trip index:', index);
                            if (e.target.value) {
                              const date = new Date(e.target.value);
                              console.log('Setting multi-leg date to:', date, 'for trip index:', index);
                              const updatedTrips = [...multiLegTrips];
                              updatedTrips[index].date = date;
                              setMultiLegTrips(updatedTrips);
                            } else {
                              console.log('Clearing multi-leg date for trip index:', index);
                              const updatedTrips = [...multiLegTrips];
                              updatedTrips[index].date = undefined;
                              setMultiLegTrips(updatedTrips);
                            }
                          }}
                          min={format(new Date(), 'yyyy-MM-dd')}
                          className="w-full h-10 sm:h-12 px-2 sm:px-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-white/60 focus:border-white/60 focus:outline-none transition-all duration-200 text-xs sm:text-sm cursor-pointer"
                          placeholder="Date"
                          style={{ colorScheme: 'dark' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* Notification */}
      {notification.type && (
        <div className={`fixed top-4 right-2 sm:right-4 z-[9999] p-3 sm:p-4 rounded-lg shadow-lg max-w-xs sm:max-w-sm text-sm sm:text-base ${
          notification.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Flight Quote Modal */}
      {isModalOpen && (
        <FlightQuoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
} 