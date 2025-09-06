"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ListAircraftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListAircraftModal: React.FC<ListAircraftModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    aircraftDetails: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    setMounted(true);
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
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipients: ['joel@falconaero.org', 'sales@viva-jets.com' ],
          subject: 'Aircraft Listing Request',
          request: `Aircraft Listing Request from ${formData.fullName}

Contact Information:
- Email: ${formData.email}
- Phone: ${formData.phone}

Aircraft Details:
${formData.aircraftDetails}`
        }),
      });

      if (response.ok) {
        showNotification('success', "Thank you! We'll contact you soon to discuss listing your aircraft.");
        setFormData({ fullName: '', email: '', phone: '', aircraftDetails: '' });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting aircraft listing request:', error);
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
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative mx-2">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 special-header">List Your Aircraft</h2>
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
              Share your aircraft details and contact information. Our team will reach out to discuss the listing process and showcase your aircraft to qualified buyers worldwide.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
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

              {/* Aircraft Details */}
              <div>
                <label htmlFor="aircraftDetails" className="block text-sm font-medium text-gray-700 mb-2">
                  Aircraft Details *
                </label>
                <textarea
                  id="aircraftDetails"
                  name="aircraftDetails"
                  value={formData.aircraftDetails}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm resize-none"
                  placeholder="Please provide details about your aircraft including:
• Aircraft model and year
• Total flight hours
• Maintenance status
• Interior/exterior condition
• Any special features or modifications
• Reason for selling
• Asking price (if known)"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4472FF] text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Aircraft Listing Request'}
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

export default ListAircraftModal;
