import React from "react";
import { ProfileSkeleton } from "../common/Skeleton";
import "../common/Skeleton.css";

/**
 * Profile Page Skeleton
 * Shows skeleton for user profile page
 */
const ProfilePageSkeleton = () => {
  return (
    <div className="profile-page-skeleton-container">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="skeleton skeleton-pulse mb-6" style={{ width: "150px", height: "32px" }} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center mb-6">
                <div className="skeleton skeleton-pulse mb-3" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                <div className="skeleton skeleton-pulse mb-2" style={{ width: "120px", height: "20px" }} />
                <div className="skeleton skeleton-pulse" style={{ width: "150px", height: "16px" }} />
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="skeleton skeleton-pulse" style={{ width: "100%", height: "40px", borderRadius: "8px" }} />
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <ProfileSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;
