import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function AllCustomers() {
  const [subscriptionRequests, setSubscriptionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubscriptionRequests();
  }, []);

  const fetchSubscriptionRequests = async () => {
    try {
      const response = await api.get('/mess/subscriptions/owner');
      setSubscriptionRequests(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setError('Failed to load subscription requests');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (subscriptionId, newStatus) => {
    try {
      await api.patch(`/mess/subscriptions/${subscriptionId}`, {
        status: newStatus
      });
      // Refresh the subscription list
      fetchSubscriptionRequests();
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription status');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Subscription Requests</h2>
      <div className="grid gap-4">
        {subscriptionRequests.length === 0 ? (
          <p className="text-gray-500">No subscription requests found</p>
        ) : (
          subscriptionRequests.map((request) => (
            <div 
              key={request._id} 
              className="bg-white p-4 rounded-lg shadow border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    Student: {request.student.username}
                  </h3>
                  <p className="text-gray-600">
                    Request Date: {new Date(request.subscriptionDate).toLocaleDateString()}
                  </p>
                  <p className={`mt-2 ${
                    request.status === 'pending' ? 'text-yellow-600' :
                    request.status === 'accepted' ? 'text-green-600' :
                    'text-red-600'
                  }`}>
                    Status: {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </p>
                </div>
                {request.status === 'pending' && (
                  <div className="space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(request._id, 'accepted')}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(request._id, 'rejected')}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
