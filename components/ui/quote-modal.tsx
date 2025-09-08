"use client";

import React, { useState, useEffect } from 'react';
import { X, Plane, MapPin, Calendar, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { createPortal } from 'react-dom';
import { useTranslations } from "@/lib/useTranslations";
import axios from 'axios';
import { trackLinkedInConversion } from '@/lib/analytics';

interface Location {
  id: number;
  name: string;
  countryIso2Code: string;
  cityCode: string;
}

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  
  // Flight booking fields
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip' | 'multiLeg'>('oneWay');
  const [takeoffLocation, setTakeoffLocation] = useState('');
  const [takeoffLocationId, setTakeoffLocationId] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [destinationLocationId, setDestinationLocationId] = useState('');
  const [takeoffDate, setTakeoffDate] = useState<Date | undefined>(undefined);
  const [takeoffTime, setTakeoffTime] = useState<string>('12:00');
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [numberOfSeats, setNumberOfSeats] = useState('1');
  
  // Location suggestions
  const [takeoffSuggestions, setTakeoffSuggestions] = useState<Location[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Location[]>([]);
  const [recentLocations, setRecentLocations] = useState<Location[]>([]);
  const [isLoadingTakeoffSuggestions, setIsLoadingTakeoffSuggestions] = useState(false);
  const [isLoadingDestinationSuggestions, setIsLoadingDestinationSuggestions] = useState(false);
  const [isTakeoffValid, setIsTakeoffValid] = useState(false);
  const [isDestinationValid, setIsDestinationValid] = useState(false);
  const [showTakeoffNoResults, setShowTakeoffNoResults] = useState(false);
  const [showDestinationNoResults, setShowDestinationNoResults] = useState(false);
  
  // Multi-leg trips
  const [multiLegTrips, setMultiLegTrips] = useState([
    { from: '', fromId: '', to: '', toId: '', date: undefined as Date | undefined, fromSuggestions: [] as Location[], toSuggestions: [] as Location[], fromValid: false, toValid: false, showFromNoResults: false, showToNoResults: false }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Load recent locations on mount
  useEffect(() => {
    setMounted(true);
    const storedLocations = localStorage.getItem('recentLocations');
    if (storedLocations) {
      setRecentLocations(JSON.parse(storedLocations));
    }
  }, []);

  // Body overflow control
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  // Handle location input changes
  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>, setterFunction: React.Dispatch<React.SetStateAction<string>>, suggestionSetter: React.Dispatch<React.SetStateAction<Location[]>>, loadingSetter: React.Dispatch<React.SetStateAction<boolean>>, validationSetter: React.Dispatch<React.SetStateAction<boolean>>, noResultsSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    const value = e.target.value;
    setterFunction(value);
    
    // Reset validation when user types
    validationSetter(false);
    
    if (value.length > 0) {
      loadingSetter(true);
      noResultsSetter(false);
      
      fetchSuggestions(value).then((suggestions) => {
        const allSuggestions = [...suggestions, ...recentLocations];
        suggestionSetter(allSuggestions);
        loadingSetter(false);
        
        // Show no results if no suggestions found
        if (allSuggestions.length === 0) {
          noResultsSetter(true);
        } else {
          noResultsSetter(false);
        }
      });
    } else {
      suggestionSetter([]);
      loadingSetter(false);
      noResultsSetter(false);
      validationSetter(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: Location, inputSetter: React.Dispatch<React.SetStateAction<string>>, idSetter: React.Dispatch<React.SetStateAction<string>>, suggestionSetter: React.Dispatch<React.SetStateAction<Location[]>>, loadingSetter: React.Dispatch<React.SetStateAction<boolean>>, validationSetter: React.Dispatch<React.SetStateAction<boolean>>, noResultsSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          ...formData,
          recipients: ['joel@falconaero.org', 'sales@viva-jets.com' ],
          flightData
        }),
      });

      if (response.ok) {
        trackLinkedInConversion(23415961);
        showNotification('success', "Thank you! We'll get back to you with a personalized quote soon.");
        setFormData({ fullName: '', email: '', phone: '' });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
      showNotification('error', 'There was a problem sending your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[9998] transition-opacity"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative mx-2">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 special-header">Get Your Flight Quote</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Notification */}
          {notification.type && (
            <div className={`mx-6 mt-4 p-4 rounded-lg ${
              notification.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {notification.message}
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-6">
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Share your flight details and contact information for a personalized quote.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trip Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type *</label>
                <div className="relative">
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value as 'oneWay' | 'roundTrip' | 'multiLeg')}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none text-sm"
                  >
                    <option value="oneWay">One Way ✈</option>
                    <option value="roundTrip">Round Trip ⇄</option>
                    <option value="multiLeg">Multi Leg ✈</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Flight Details */}
              {tripType !== 'multiLeg' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Take off Location */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Take off Location *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                        <Plane className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={takeoffLocation}
                        onChange={(e) => handleLocationInputChange(e, setTakeoffLocation, setTakeoffSuggestions, setIsLoadingTakeoffSuggestions, setIsTakeoffValid, setShowTakeoffNoResults)}
                        placeholder="Take off Location"
                        required
                        className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
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
                              No results found
                            </li>
                          )}
                          {!isLoadingTakeoffSuggestions && !showTakeoffNoResults && takeoffSuggestions.map((suggestion) => (
                            <li
                              key={suggestion.id}
                              className="px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 text-gray-800 cursor-pointer"
                              onClick={() => handleSuggestionSelect(suggestion, setTakeoffLocation, setTakeoffLocationId, setTakeoffSuggestions, setIsLoadingTakeoffSuggestions, setIsTakeoffValid, setShowTakeoffNoResults)}
                            >
                              {suggestion.name} ({suggestion.cityCode}) - {suggestion.countryIso2Code}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Destination Location */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination Location *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                        <MapPin className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={destinationLocation}
                        onChange={(e) => handleLocationInputChange(e, setDestinationLocation, setDestinationSuggestions, setIsLoadingDestinationSuggestions, setIsDestinationValid, setShowDestinationNoResults)}
                        placeholder="Destination Location"
                        required
                        className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
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
                              No results found
                            </li>
                          )}
                          {!isLoadingDestinationSuggestions && !showDestinationNoResults && destinationSuggestions.map((suggestion) => (
                            <li
                              key={suggestion.id}
                              className="px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 text-gray-800 cursor-pointer"
                              onClick={() => handleSuggestionSelect(suggestion, setDestinationLocation, setDestinationLocationId, setDestinationSuggestions, setIsLoadingDestinationSuggestions, setIsDestinationValid, setShowDestinationNoResults)}
                            >
                              {suggestion.name} ({suggestion.cityCode}) - {suggestion.countryIso2Code}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Take off Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Take off Date *
                    </label>
                    <input
                      type="date"
                      value={takeoffDate ? format(takeoffDate, 'yyyy-MM-dd') : ''}
                      onChange={(e) => setTakeoffDate(e.target.value ? new Date(e.target.value) : undefined)}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                    />
                  </div>

                  {/* Take off Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Take off Time *
                    </label>
                    <input
                      type="time"
                      value={takeoffTime}
                      onChange={(e) => setTakeoffTime(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                    />
                  </div>

                  {/* Return Date for Round Trip */}
                  {tripType === 'roundTrip' && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Return Date *
                      </label>
                      <input
                        type="date"
                        value={returnDate ? format(returnDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => setReturnDate(e.target.value ? new Date(e.target.value) : undefined)}
                        min={takeoffDate ? format(takeoffDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      />
                    </div>
                  )}

                  {/* Number of Pax */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Pax *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                      <select
                        value={numberOfSeats}
                        onChange={(e) => setNumberOfSeats(e.target.value)}
                        required
                        className="w-full pl-10 pr-8 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none text-sm"
                      >
                        <option value="1">1 Passenger</option>
                        <option value="2">2 Passengers</option>
                        <option value="3">3 Passengers</option>
                        <option value="4">4 Passengers</option>
                        <option value="5">5 Passengers</option>
                        <option value="6">6 Passengers</option>
                        <option value="7">7 Passengers</option>
                        <option value="8">8 Passengers</option>
                        <option value="9+">9+ Passengers</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Multi-leg Trips */}
              {tripType === 'multiLeg' && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                    <h4 className="text-lg font-medium text-gray-900">Multi-Leg Trips</h4>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button 
                        type="button"
                        onClick={() => removeMultiLegTrip(multiLegTrips.length - 1)} 
                        className="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
                        disabled={multiLegTrips.length <= 1}
                      >
                        Remove Leg
                      </button>
                      <button 
                        type="button"
                        onClick={addMultiLegTrip} 
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                      >
                        Add Leg
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {multiLegTrips.map((trip, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-gray-900 font-medium">Leg {index + 1}</h5>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {/* From input */}
                          <div className="relative">
                            <label className="block text-xs font-medium text-gray-700 mb-1">From *</label>
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                              <Plane className="w-4 h-4 text-gray-400" />
                            </div>
                            <input 
                              type="text"
                              value={trip.from}
                              onChange={(e) => handleMultiLegInputChange(index, 'from', e.target.value)}
                              placeholder="From"
                              required
                              className="w-full h-10 pl-10 pr-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                            />
                            {(trip.fromSuggestions && trip.fromSuggestions.length > 0 || trip.showFromNoResults) && (
                              <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md bottom-full mb-1 max-h-32 sm:max-h-40 overflow-y-auto">
                                {trip.showFromNoResults && (
                                  <li className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs text-gray-600 text-center">
                                    No results found
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
                            <label className="block text-xs font-medium text-gray-700 mb-1">To *</label>
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                              <MapPin className="w-4 h-4 text-gray-400" />
                            </div>
                            <input 
                              type="text"
                              value={trip.to}
                              onChange={(e) => handleMultiLegInputChange(index, 'to', e.target.value)}
                              placeholder="To"
                              required
                              className="w-full h-10 pl-10 pr-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                            />
                            {(trip.toSuggestions && trip.toSuggestions.length > 0 || trip.showToNoResults) && (
                              <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md bottom-full mb-1 max-h-32 sm:max-h-40 overflow-y-auto">
                                {trip.showToNoResults && (
                                  <li className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs text-gray-600 text-center">
                                    No results found
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
                            <label className="block text-xs font-medium text-gray-700 mb-1">Date *</label>
                            <input
                              type="date"
                              value={trip.date ? format(trip.date, 'yyyy-MM-dd') : ''}
                              onChange={(e) => {
                                if (e.target.value) {
                                  const date = new Date(e.target.value);
                                  const updatedTrips = [...multiLegTrips];
                                  updatedTrips[index].date = date;
                                  setMultiLegTrips(updatedTrips);
                                } else {
                                  const updatedTrips = [...multiLegTrips];
                                  updatedTrips[index].date = undefined;
                                  setMultiLegTrips(updatedTrips);
                                }
                              }}
                              min={format(new Date(), 'yyyy-MM-dd')}
                              required
                              className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  placeholder="Enter your email address"
                />
              </div>

                  <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
                </div>
              </div>



              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4472FF] text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Flight Quote Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  // Render modal at document body level using portal
  return createPortal(modalContent, document.body);
};

export default QuoteModal;