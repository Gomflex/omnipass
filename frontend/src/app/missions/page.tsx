'use client';

import { useState, useRef } from 'react';
import { mockMissions } from '@/lib/mockData';
import { useTranslation } from '@/hooks/useTranslation';

// Extended mission type with photo upload fields
type MissionStatus = 'active' | 'completed' | 'pending_review' | 'approved' | 'rejected';

interface MissionPhoto {
  url: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  uploadedAt: string;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  type: string;
  progress: number;
  maxProgress: number;
  status: MissionStatus;
  expires_at: string;
  photo?: MissionPhoto;
  reviewStatus?: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export default function MissionsPage() {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState('all');
  const [missions, setMissions] = useState<Mission[]>(mockMissions as Mission[]);
  const [uploadingMissionId, setUploadingMissionId] = useState<string | null>(null);
  const [viewPhotoMissionId, setViewPhotoMissionId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const MISSION_TYPES = [
    { value: 'all', label: t.missions.allMissions },
    { value: 'daily', label: t.missions.daily },
    { value: 'weekly', label: t.missions.weekly },
    { value: 'special', label: t.missions.special },
  ];

  const filteredMissions = missions.filter((mission) => {
    return selectedType === 'all' || mission.type === selectedType;
  });

  const getProgressPercentage = (mission: typeof missions[0]) => {
    return Math.round((mission.progress / mission.maxProgress) * 100);
  };

  const handlePhotoUpload = async (missionId: string, file: File) => {
    setUploadingMissionId(missionId);

    try {
      // Get geolocation
      const location = await new Promise<{ latitude: number; longitude: number } | undefined>(
        (resolve) => {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              },
              () => resolve(undefined)
            );
          } else {
            resolve(undefined);
          }
        }
      );

      // Create object URL for preview (in production, upload to server)
      const photoUrl = URL.createObjectURL(file);

      // Update mission with photo
      setMissions(missions.map(mission => {
        if (mission.id === missionId) {
          return {
            ...mission,
            photo: {
              url: photoUrl,
              location,
              uploadedAt: new Date().toISOString(),
            },
            reviewStatus: 'pending' as const,
            status: 'pending_review' as MissionStatus,
          };
        }
        return mission;
      }));

      // Simulate upload success
      setTimeout(() => {
        setUploadingMissionId(null);
      }, 500);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadingMissionId(null);
      alert(t.missions.uploadFailed);
    }
  };

  const handleFileSelect = (missionId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        handlePhotoUpload(missionId, file);
      } else {
        alert(t.missions.photoRequired);
      }
    }
  };

  const handleReupload = (missionId: string) => {
    // Clear existing photo and allow reupload
    setMissions(missions.map(mission => {
      if (mission.id === missionId) {
        return {
          ...mission,
          photo: undefined,
          reviewStatus: undefined,
          status: 'active' as MissionStatus,
        };
      }
      return mission;
    }));
    // Trigger file input
    fileInputRefs.current[missionId]?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight mb-1">
            {t.missions.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.missions.subtitle}</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">{t.missions.activeMissions}</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">{missions.filter(m => m.status === 'active').length}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">{t.missions.completedToday}</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">0</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">{t.missions.pointsAvailable}</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  {missions.reduce((sum, m) => sum + m.points, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-xs font-medium text-gray-900 dark:text-white mb-2">
            {t.missions.missionType}
          </label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full md:w-64 px-3 py-2 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white text-sm text-gray-900 dark:text-white"
          >
            {MISSION_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Missions List */}
        <div className="space-y-3">
          {filteredMissions.map((mission) => {
            const progressPercentage = getProgressPercentage(mission);
            const isCompleted = mission.status === 'completed' || mission.progress >= mission.maxProgress;

            return (
              <div
                key={mission.id}
                className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 ${isCompleted ? 'opacity-60' : 'hover:border-gray-400 dark:hover:border-gray-600'} transition-colors`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Mission Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">{mission.title}</h3>
                      {isCompleted && (
                        <span className="bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400 text-xs font-medium px-2 py-1">
                          {t.missions.completed}
                        </span>
                      )}
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 text-xs font-medium px-2 py-1 capitalize">
                        {mission.type}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 leading-relaxed">{mission.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>{t.missions.progress}</span>
                        <span className="font-medium">{mission.progress}/{mission.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 h-2">
                        <div
                          className={`h-2 transition-all ${
                            isCompleted ? 'bg-success-600 dark:bg-success-400' : 'bg-gray-900 dark:bg-gray-50'
                          }`}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Expiry Date */}
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t.missions.expires}: {new Date(mission.expires_at).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Points and Action */}
                  <div className="flex flex-col items-center lg:items-end gap-3 lg:min-w-[200px]">
                    <div className="border border-gray-200 dark:border-gray-800 px-4 py-3 text-center">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{t.missions.reward}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-gray-50">{mission.points}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{t.missions.points}</p>
                    </div>

                    {/* Photo Upload Section */}
                    {!mission.photo && mission.status === 'active' && (
                      <div className="w-full">
                        <input
                          ref={(el) => { fileInputRefs.current[mission.id] = el; }}
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={(e) => handleFileSelect(mission.id, e)}
                          className="hidden"
                          id={`file-${mission.id}`}
                        />
                        <label
                          htmlFor={`file-${mission.id}`}
                          className="bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-xs w-full lg:w-auto cursor-pointer flex items-center justify-center gap-2"
                        >
                          {uploadingMissionId === mission.id ? (
                            <>
                              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              {t.missions.uploading}
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {t.missions.uploadPhoto}
                            </>
                          )}
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-center">
                          {t.missions.uploadPhotoDesc}
                        </p>
                      </div>
                    )}

                    {/* Photo Uploaded - Pending Review */}
                    {mission.photo && mission.reviewStatus === 'pending' && (
                      <div className="w-full space-y-2">
                        <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-2xl p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-warning-600 dark:text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs font-medium text-warning-700 dark:text-warning-400">
                              {t.missions.pendingReview}
                            </span>
                          </div>
                          <p className="text-xs text-warning-600 dark:text-warning-400">
                            {t.missions.reviewNote}
                          </p>
                          {mission.photo.location && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                              {t.missions.location}: {mission.photo.location.latitude.toFixed(4)}, {mission.photo.location.longitude.toFixed(4)}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {t.missions.uploadedAt}: {new Date(mission.photo.uploadedAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => setViewPhotoMissionId(viewPhotoMissionId === mission.id ? null : mission.id)}
                          className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-xs"
                        >
                          {viewPhotoMissionId === mission.id ? '−' : '+'} {t.missions.viewPhoto}
                        </button>
                      </div>
                    )}

                    {/* Photo Approved */}
                    {mission.reviewStatus === 'approved' && (
                      <div className="w-full">
                        <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-2xl p-3">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-success-600 dark:text-success-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-bold text-success-700 dark:text-success-400">
                              {t.missions.approved}
                            </span>
                          </div>
                          <p className="text-xs text-success-600 dark:text-success-400 mt-1">
                            {t.missions.completedExclamation}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Photo Rejected */}
                    {mission.reviewStatus === 'rejected' && (
                      <div className="w-full space-y-2">
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-2xl p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-xs font-medium text-red-700 dark:text-red-400">
                              {t.missions.rejected}
                            </span>
                          </div>
                          {mission.rejectionReason && (
                            <p className="text-xs text-red-600 dark:text-red-400">
                              {t.missions.rejectionReason}: {mission.rejectionReason}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleReupload(mission.id)}
                          className="w-full bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-xs"
                        >
                          {t.missions.reupload}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Photo Preview (expandable) */}
                {mission.photo && viewPhotoMissionId === mission.id && (
                  <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <img
                      src={mission.photo.url}
                      alt={mission.title}
                      className="w-full max-w-md mx-auto rounded-xl shadow-lg"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredMissions.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <h3 className="mt-3 text-xs font-medium text-gray-900 dark:text-white">{t.missions.noMissionsFound}</h3>
            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{t.missions.tryDifferentType}</p>
          </div>
        )}
      </div>
    </div>
  );
}
