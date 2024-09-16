"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { StarIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SERVER_URL } from '@/utils/config';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  locality: string;
  country: string;
}

interface RestaurantData {
  restaurant_id: number;
  name: string;
  cuisines: string;
  featuredImage: string;
  thumbImage: string;
  ratingText: string;
  ratingColor: string;
  aggregateRating: number;
  votes: number;
  averageCostForTwo: number;
  hasTableBooking: boolean;
  hasOnlineDelivery: boolean;
  isDeliveringNow: boolean;
  location: Location;
}

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (id) {

      fetchRestaurantData(id);
    } else {
      setError(true);
    }
  }, [id]);

  const fetchRestaurantData = async (restaurantId: string[] | string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_URL}/api/v1/restaurant`, {
        params: { id: restaurantId },
      });
      setRestaurant(response.data.Restaurant);
    } catch (err) {
      console.error('Error fetching restaurant data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-red-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Failed to load restaurant data.</div>;
  }

  if (!restaurant) {
    return <div className="text-center py-10">No restaurant data available.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar isScrolled/>
      <div className="relative bg-black text-white rounded-lg overflow-hidden mb-8">
        <img
          src={restaurant.featuredImage || 'https://picsum.photos/200/300'}
          alt={restaurant.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <h1 className="text-4xl font-extrabold text-white shadow-lg">{restaurant.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="md:w-1/2 mb-8 md:mb-0 bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Details</h2>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">Cuisines</h3>
                <p className="text-lg text-gray-600">{restaurant.cuisines}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">Rating</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-6 h-6 ${i < Math.round(restaurant.aggregateRating) ? 'text-red-600' : 'text-gray-400'}`}
                      fill={i < Math.round(restaurant.aggregateRating) ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="ml-3 text-lg text-gray-600">
                    {restaurant.aggregateRating.toFixed(1)} ({restaurant.votes} votes)
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">Cost for Two</h3>
                <p className="text-lg text-gray-600">${restaurant.averageCostForTwo}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">Location</h3>
                <p className="text-lg text-gray-600">
                  {restaurant.location.address}, {restaurant.location.city}, {restaurant.location.country}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">Features</h3>
                <ul className="list-disc ml-5 text-lg text-gray-600">
                  <li>Table Booking: {restaurant.hasTableBooking ? "Available" : "Not Available"}</li>
                  <li>Online Delivery: {restaurant.hasOnlineDelivery ? "Available" : "Not Available"}</li>
                  <li>Currently Delivering: {restaurant.isDeliveringNow ? "Yes" : "No"}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Location</h2>
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
              <iframe
                className="w-full h-72 rounded-lg"
                src={`https://maps.google.com/maps?q=${restaurant.location.latitude},${restaurant.location.longitude}&z=15&output=embed`}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-600 text-white text-center py-4">
        <button className="px-6 py-3 font-bold text-lg bg-red-600 hover:bg-red-700 rounded-lg">
          Order Now
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantDetailPage;
