// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SINGLE_PROFILE_URL } from '../../constants/apiUrl';

function Profile(name) {
  const [profile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        console.log("Token used in fetchProfile:", token);
        const response = await axios.get(SINGLE_PROFILE_URL(name), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching user profile data:", error);
        throw new Error(`Failed to fetch user profile data: ${error}`);
      }
    };
    fetchProfile();
  }, [name]);

  return (
    <div className="container mt-5">
      <h1>Welcome, {profile.name}</h1>
      <img src={profile.avatar} alt={`${profile.name}'s avatar`} className="img-thumbnail" />
      <img src={profile.banner} alt={`${profile.name}'s banner`} className="img-fluid" /> 
          <p>Posts: {profile._count.posts}</p>
          <p>Followers: {profile._count.followers}</p>
          <p>Following: {profile._count.following}</p>
    </div>
  );
}

export default Profile;
