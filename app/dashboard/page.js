"use client";
import React from "react";
import { useEffect, useState } from "react";
import supabase from "@/app/supabase/supabaseClient";
import Link from "next/link";

export default function Dashboard() {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
          throw userError;
        }
        setCurrentUser(user);

        const { data: smoothieData, error: smoothieError } = await supabase
          .from("smoothies")
          .select()
          .order(orderBy, { ascending: false });

        if (smoothieError) {
          throw smoothieError;
        }

        const userSmoothies = smoothieData.filter(
          (item) => item.user_id === user?.id
        );

        setSmoothies(userSmoothies || []);
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setFetchError("Could not fetch smoothies data");
        setSmoothies(null);
      }
    };

    fetchData();
  }, [orderBy]);

  return (
    <div className="dashboard">
      <div className="profile">
        <p className="profile-heading">Profile</p>
        <div className="profile-details">
          <div className="profile-picture">
            <img
              src={currentUser?.user_metadata.avatar_url}
              alt=""
              className="rounded-[50%]"
            />
          </div>
          <div className="profile-info">
            <p>Name: {currentUser?.user_metadata.name}</p>
            <p>User Id: {currentUser?.email}</p>
          </div>
        </div>
      </div>
      <hr className="separator" />
      <div className="smoothies">
        <div className="order-controls">
          <label htmlFor="order-select " className="self-center">
            Order By:
          </label>
          <select
            id="order-select"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="created_at">Time Created</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
          </select>
        </div>
        {fetchError && <p>{fetchError}</p>}
        {smoothies && (
          <div className="smoothie-list">
            {smoothies.map((item) => (
              <div key={item.id} className="smoothie-item">
                <h2>{item.title}</h2>
                <div className="smoothie-details">
                  <h3 className="ingredient">
                    <span className="text-[#6d15df]">Ingredients: </span>
                    {item.ingredient}
                  </h3>
                  <h3>
                    <span className="text-[#6d15df]">Method: </span>
                    {item.method}
                  </h3>
                </div>
                <div className="rating">{item.rating}</div>
                {item.user_id === currentUser?.id && (
                  <div className="button-group">
                    <Link href={`/update/${item.id}`}>
                      <button className="update-button bg-[#6d15df]">
                        Update
                      </button>
                    </Link>
                    <button className="delete-button bg-red-800">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        .profile {
          width: 100%;
        }
        .profile-heading {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .profile-details {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .profile-picture img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .profile-info p {
          margin: 0;
        }
        .separator {
          width: 100%;
          border: 1px solid #ccc;
          margin: 20px 0;
        }
        .smoothies {
          width: 60%;
        }
        .order-controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .order-controls label {
          font-weight: bold;
        }
        #order-select {
          background-color: #373d7d;
          padding: 8px;
          border-radius: 5px;
          cursor: pointer;
        }
        .smoothie-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .smoothie-item {
          background-color: #102632;
          color: #ffebf2;
          padding: 10px;
          border-radius: 10px;
          position: relative;
        }
        .smoothie-item h2 {
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 10px;
        }
        .smoothie-details p {
          margin: 0;
        }
        .rating {
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: #6d15df;
          border-radius: 6px;
          padding: 10px;
          color: white;
          width: 30px;
        }
        .button-group {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }
        .update-button,
        .delete-button {
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }
        @media screen and (max-width: 768px) {
          .profile-details {
            flex-direction: column;
            align-items: flex-start;
          }
          .profile-info p {
            margin-top: 5px;
          }
        }
      `}</style>
    </div>
  );
}
