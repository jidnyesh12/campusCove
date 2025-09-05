import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaRupeeSign, FaUtensils, FaLeaf, FaDrumstickBite, FaClock, FaSpinner } from 'react-icons/fa';
import MessDetail from './MessDetail';
import { fetchMessServices, subscribeToMess, getStudentSubscriptions } from '../../utils/api';

export default function MessServices() {
  const [messServices, setMessServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMess, setSelectedMess] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [subscribingId, setSubscribingId] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [messData, subscriptionsData] = await Promise.all([
          fetchMessServices(),
          getStudentSubscriptions()
        ]);
        
        setMessServices(messData);
        
        // Create a map of mess ID to subscription status
        const statusMap = {};
        subscriptionsData.forEach(sub => {
          statusMap[sub.mess] = sub.status;
        });
        setSubscriptionStatus(statusMap);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load mess services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to get meal type icon
  const getMealTypeIcon = (mealType) => {
    switch(mealType) {
      case 'veg':
        return <FaLeaf className="text-green-500 mr-1" title="Vegetarian" />;
      case 'nonVeg':
        return <FaDrumstickBite className="text-red-500 mr-1" title="Non-Vegetarian" />;
      case 'both':
        return (
          <>
            <FaLeaf className="text-green-500 mr-1" title="Vegetarian" />
            <FaDrumstickBite className="text-red-500 mr-1" title="Non-Vegetarian" />
          </>
        );
      default:
        return null;
    }
  };

  // Handle opening the detail modal
  const handleViewDetails = (mess) => {
    setSelectedMess(mess);
    setShowDetailModal(true);
  };

  // Handle closing the detail modal
  const handleCloseDetail = () => {
    setShowDetailModal(false);
  };

  const handleSubscribe = async (messId) => {
    try {
      setSubscribingId(messId);
      await subscribeToMess(messId);
      alert('Subscription request sent successfully!');
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to send subscription request. Please try again.');
    } finally {
      setSubscribingId(null);
    }
  };

  // Update getSubscriptionContent to receive mess parameter
  const getSubscriptionContent = (mess, messId) => {
    const status = subscriptionStatus[messId];
    
    if (subscribingId === messId) {
      return (
        <>
          <FaSpinner className="animate-spin mr-2" />
          Sending...
        </>
      );
    }

    switch(status) {
      case 'accepted':
        return (
          <div className="flex flex-col gap-2 w-full">
            <span className="text-green-600 font-medium">
              Subscribed!
            </span>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                alert('Payment functionality coming soon!');
              }}
            >
              Pay Now (₹{mess.monthlyPrice})
            </button>
          </div>
        );
      case 'rejected':
        return (
          <span className="text-red-600 font-medium">
            Denied!
          </span>
        );
      case 'pending':
        return (
          <span className="text-yellow-600 font-medium">
            Pending
          </span>
        );
      default:
        return mess.availability ? 'Subscribe' : 'Not Available';
    }
  };

  const getSubscriptionButton = (mess) => {
    const status = subscriptionStatus[mess._id];
    const isSubscribed = status === 'accepted';
    const isPending = status === 'pending';
    const isDenied = status === 'rejected';

    return (
      <div className={`flex flex-col ${isSubscribed ? 'w-full' : ''}`}>
        <button 
          className={`px-3 py-1 rounded flex items-center justify-center ${
            isSubscribed 
              ? 'bg-green-100 text-green-600 cursor-default w-full' 
              : isPending
                ? 'bg-yellow-100 text-yellow-600 cursor-default'
                : isDenied
                  ? 'bg-red-100 text-red-600 cursor-default'
                  : mess.availability
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
          disabled={!mess.availability || isSubscribed || isPending || isDenied || subscribingId === mess._id}
          onClick={() => handleSubscribe(mess._id)}
        >
          {getSubscriptionContent(mess, mess._id)}
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-green-600 text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
    
      {messServices.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded">
          No mess services available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messServices.map((mess) => (
            <div key={mess._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="relative h-48 bg-gray-200">
                {mess.images && mess.images.length > 0 ? (
                  <img 
                    src={mess.images[0].url} 
                    alt={mess.messName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
                    <FaUtensils className="text-5xl" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded flex items-center">
                  {getMealTypeIcon(mess.messType)}
                  <span className="ml-1">{mess.messType === 'nonVeg' ? 'Non-Veg' : mess.messType}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{mess.messName}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FaMapMarkerAlt className="mr-1 text-green-500" />
                  <span>{mess.address || 'Location not specified'}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {mess.description || 'No description available'}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-green-600 font-semibold">
                    <FaRupeeSign className="mr-1" />
                    <span>{mess.monthlyPrice}</span>
                    <span className="text-gray-500 font-normal text-xs ml-1">/month</span>
                  </div>
                  {mess.openingHours && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="mr-1" />
                      <span>{mess.openingHours}</span>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Services</h4>
                  <div className="flex flex-wrap gap-1 text-xs">
                    {mess.weeklyMenu && mess.weeklyMenu.monday && mess.weeklyMenu.monday.breakfast && (
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded">Breakfast</span>
                    )}
                    {mess.weeklyMenu && mess.weeklyMenu.monday && mess.weeklyMenu.monday.lunch && (
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded">Lunch</span>
                    )}
                    {mess.weeklyMenu && mess.weeklyMenu.monday && mess.weeklyMenu.monday.dinner && (
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded">Dinner</span>
                    )}
                    {mess.weeklyMenu && mess.weeklyMenu.monday && mess.weeklyMenu.monday.snacks && (
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded">Snacks</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button 
                    className="bg-white text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-50"
                    onClick={() => handleViewDetails(mess)}
                  >
                    View Details
                  </button>
                  {getSubscriptionButton(mess)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Detail Modal */}
      {showDetailModal && selectedMess && (
        <MessDetail 
          mess={selectedMess} 
          onClose={handleCloseDetail} 
        />
      )}
    </div>
  );
}
