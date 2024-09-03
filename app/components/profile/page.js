"use client";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import supabase from "@/app/supabase/supabaseClient"; // Adjust the import path as needed

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const newsession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    newsession();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user data.");
      } else {
        setUser(user);
        setEmail(user.email || "");
        setPhoneNumber(user.user_metadata?.phone || "");
        setProfilePhoto(
          user.user_metadata?.profile_photo || "/default-profile.png"
        );
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleProfilePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("profiles")
        .upload(`public/${file.name}`, file);
      if (error) {
        console.error("Error uploading file:", error);
        setError("Failed to upload profile photo.");
      } else {
        const { publicURL, error: urlError } = supabase.storage
          .from("profiles")
          .getPublicUrl(`public/${file.name}`);
        if (urlError) {
          console.error("Error getting file URL:", urlError);
          setError("Failed to get profile photo URL.");
        } else {
          await supabase
            .from("profiles")
            .update({ profile_photo: publicURL })
            .match({ id: supabase.auth.user().id });
          setProfilePhoto(publicURL);
        }
      }
      setLoading(false);
    }
  };

  const handlePhoneNumberUpdate = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ phone_number: phoneNumber })
      .match({ id: supabase.auth.user().id });
    if (error) {
      console.error("Error updating phone number:", error);
      setError("Failed to update phone number.");
    } else {
      alert("Phone number updated successfully!");
    }
    setLoading(false);
  };

  const handleEmailUpdate = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      console.error("Error updating email:", error);
      setError("Failed to update email.");
    } else {
      alert("Email updated successfully!");
    }
    setLoading(false);
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
      console.error("Error resetting password:", error);
      setError("Failed to send password reset email.");
    } else {
      alert("Password reset email sent!");
    }
    setLoading(false);
  };

  const handlePasswordUpdate = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password.");
    } else {
      alert("Password updated successfully!");
    }
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="m-2">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Profile Photo
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex items-center">
                <img
                  src={
                    currentUser?.user_metadata.avatar_url ||
                    "/resources/juice1.jpg"
                  }
                  alt="Profile Photo"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <input
                  type="file"
                  onChange={handleProfilePhotoChange}
                  disabled={loading}
                  className="ml-4"
                />
              </div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.user_metadata?.full_name || "N/A"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.email || "N/A"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.user_metadata?.phone || "N/A"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Joined Date
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.created_at || "N/A"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.user_metadata?.bio || "N/A"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Attachments
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        resume_{user?.id}.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      {/* Update Section */}
      <div className="mt-6 border-t border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900">Update Profile</h4>
        <div className="px-4 py-6">
          <div className="mb-4">
            <h5 className="text-base font-semibold leading-6 text-gray-900">
              Update Profile Photo
            </h5>
            <input
              type="file"
              onChange={handleProfilePhotoChange}
              disabled={loading}
              className="mt-2"
            />
          </div>
          <div className="mb-4">
            <h5 className="text-base font-semibold leading-6 text-gray-900 ">
              Update Phone Number
            </h5>
            <TextField
              label="Phone Number"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={loading}
              className="mt-2"
            />
            <Button
              onClick={handlePhoneNumberUpdate}
              variant="contained"
              color="primary"
              className="mt-2"
              disabled={loading}
            >
              Update Phone Number
            </Button>
          </div>
          <div className="mb-4">
            <h5 className="text-base font-semibold leading-6 text-gray-900">
              Update Email Address
            </h5>
            <TextField
              label="New Email Address"
              fullWidth
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={loading}
              className="mt-2"
            />
            <Button
              onClick={handleEmailUpdate}
              variant="contained"
              color="primary"
              className="mt-2"
              disabled={loading}
            >
              Update Email Address
            </Button>
          </div>
          <div className="mb-4">
            <h5 className="text-base font-semibold leading-6 text-gray-900">
              Change Password
            </h5>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={loading}
              className="mt-2"
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              className="mt-2"
            />
            <Button
              onClick={handlePasswordUpdate}
              variant="contained"
              color="primary"
              className="mt-2"
              disabled={loading}
            >
              Update Password
            </Button>
            <Button
              onClick={handlePasswordReset}
              variant="outlined"
              color="secondary"
              className="mt-2 ml-2"
              disabled={loading}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
