"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseClientDb } from "@/lib/firebase/client";
import { getSession } from "@/lib/session";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerToast: (msg: string) => void;
}

export function ProfileModal({ isOpen, onClose, triggerToast }: ProfileModalProps) {
  // Read initial states from localStorage if available, or fall back to defaults
  const [designation, setDesignation] = useState("Director of Global Strategy");
  const [location, setLocation] = useState("Tower C, 14th Floor, Bangalore HQ");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [status, setStatus] = useState("Active Now");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync / load profile details from Firebase (with LocalStorage fallback)
  useEffect(() => {
    if (!isOpen) return;

    const loadProfile = async () => {
      setIsLoading(true);
      
      // Get current logged in user ID or default to priya_kapoor
      const session = getSession();
      const userId = session?.userId || "priya_kapoor";

      try {
        // 1. Try fetching from Firestore if database is initialized
        if (firebaseClientDb) {
          const docRef = doc(firebaseClientDb, "profiles", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setDesignation(data.designation || "Director of Global Strategy");
            setLocation(data.location || "Tower C, 14th Floor, Bangalore HQ");
            setPhone(data.phone || "+91 98765 43210");
            setStatus(data.status || "Active Now");
            
            // Sync to local storage
            localStorage.setItem("profile_designation", data.designation || "Director of Global Strategy");
            localStorage.setItem("profile_location", data.location || "Tower C, 14th Floor, Bangalore HQ");
            localStorage.setItem("profile_phone", data.phone || "+91 98765 43210");
            localStorage.setItem("profile_status", data.status || "Active Now");
            
            // Dispatch sync event
            window.dispatchEvent(new Event("profileUpdate"));
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Firestore profile fetch failed, using localStorage fallback:", err);
      }

      // 2. Fallback to LocalStorage if Firestore fails or is empty
      if (typeof window !== "undefined") {
        const localDesig = localStorage.getItem("profile_designation") || "Director of Global Strategy";
        const localLoc = localStorage.getItem("profile_location") || "Tower C, 14th Floor, Bangalore HQ";
        const localPhone = localStorage.getItem("profile_phone") || "+91 98765 43210";
        const localStatus = localStorage.getItem("profile_status") || "Active Now";

        setDesignation(localDesig);
        setLocation(localLoc);
        setPhone(localPhone);
        setStatus(localStatus);
      }
      setIsLoading(false);
    };

    loadProfile();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsLoading(true);
    const session = getSession();
    const userId = session?.userId || "priya_kapoor";

    // 1. Update localStorage instantly for immediate local page reactivity
    localStorage.setItem("profile_designation", designation);
    localStorage.setItem("profile_location", location);
    localStorage.setItem("profile_phone", phone);
    localStorage.setItem("profile_status", status);
    
    // Dispatch a custom event to sync sidebar details across pages instantly
    window.dispatchEvent(new Event("profileUpdate"));

    // 2. Persist to Firebase Firestore
    try {
      if (firebaseClientDb) {
        const docRef = doc(firebaseClientDb, "profiles", userId);
        await setDoc(docRef, {
          designation,
          location,
          phone,
          status,
          updatedAt: new Date().toISOString()
        });
      }
      triggerToast("Profile saved to Firebase successfully!");
    } catch (err) {
      console.error("Failed to save profile to Firestore:", err);
      triggerToast("Profile saved locally! (Firebase sync pending)");
    }

    setIsEditing(false);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Decorative Colorful Banner */}
        <div className="h-28 bg-gradient-to-r from-primary to-primary-container relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] font-bold">close</span>
          </button>
        </div>

        {/* Headshot Avatar (Overlapping the banner) */}
        <div className="px-6 relative -mt-12 flex justify-between items-end">
          <div className="relative">
            <img
              alt="Priya Kapoor"
              className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-white"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYaox2CuBlqADFRSL5nHKJaqHuhzMRUp_3Aja4QuTZxlWpeKd0JWFWUlI3sscptfMcKZpZlaTPUgBQBziVpAlKy_s5cnh2jzGSp9L-xnWYvVW02JgfC1c_VBAwazkASoNhv8XATF7RnHfq43oD8LwpCQ2Dcp_CU50rCeXSOFVqjjoC0gKyyiCI415NwVLlgnPaNoHwjDAT-L34y6DGeOLrJksXzH0fF_dHblz4_ex-D5Q-uVQamGmI038QyJxMNxS_4JJSmS-N8NY"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
          </div>
          
          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            disabled={isLoading}
            className="flex items-center gap-2 border border-outline-variant bg-surface hover:bg-surface-container-high text-primary font-bold font-label-md text-label-md px-4 py-2 rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isEditing ? "save" : "edit"}
            </span>
            <span>
              {isLoading ? "Syncing..." : isEditing ? "Save & Sync" : "Edit Details"}
            </span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Header Identity */}
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-extrabold flex items-center gap-2">
              Priya Kapoor
              {isLoading && (
                <span className="inline-block w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
              )}
            </h3>
            {isEditing ? (
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="mt-1 w-full bg-slate-50 border border-outline-variant rounded-md px-3 py-1 text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-semibold"
                placeholder="Enter designation"
              />
            ) : (
              <p className="font-body-md text-body-md text-secondary font-semibold">
                {designation}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="bg-primary/10 text-primary font-bold font-label-sm text-label-sm px-2.5 py-0.5 rounded-full">
                Global Strategy Dept
              </span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold font-label-sm text-label-sm px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {status}
              </span>
            </div>
          </div>

          <hr className="border-outline-variant" />

          {/* Fields */}
          <div className="space-y-4">
            <h4 className="font-title-sm text-title-sm text-on-surface font-extrabold uppercase tracking-wider text-xs">
              Corporate Registry
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-secondary font-semibold text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">domain</span> Department
                </span>
                <p className="font-body-sm text-body-sm text-on-surface font-bold">
                  Corporate Strategy
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-secondary font-semibold text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">groups</span> Reports Managed
                </span>
                <p className="font-body-sm text-body-sm text-on-surface font-bold">
                  8 Direct Reportees
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-secondary font-semibold text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">supervisor_account</span> Supervisor
                </span>
                <p className="font-body-sm text-body-sm text-on-surface font-bold">
                  Aditya Sen (VP Strategy)
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-secondary font-semibold text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">alternate_email</span> Work Email
                </span>
                <p className="font-body-sm text-body-sm text-on-surface font-bold truncate">
                  priya.kapoor@align.com
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="space-y-1">
                <span className="text-secondary font-semibold text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">pin_drop</span> Office Location
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-outline-variant rounded-md px-3 py-1.5 text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Enter office location"
                  />
                ) : (
                  <p className="font-body-sm text-body-sm text-on-surface font-bold">
                    {location}
                  </p>
                )}
              </div>

              <div className="space-y-1 mt-2">
                <span className="text-secondary font-semibold text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">call</span> Secure Contact
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-outline-variant rounded-md px-3 py-1.5 text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="font-body-sm text-body-sm text-on-surface font-bold">
                    {phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-outline-variant flex justify-end gap-3">
          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              disabled={isLoading}
              className="px-4 py-2 text-secondary font-semibold font-label-md text-label-md hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            onClick={isEditing ? handleSave : onClose}
            disabled={isLoading}
            className="px-5 py-2.5 bg-primary text-white font-extrabold font-label-md text-label-md rounded-lg hover:bg-primary-container transition-all shadow-sm disabled:opacity-50"
          >
            {isEditing ? "Save & Sync" : "Done"}
          </button>
        </div>

      </div>
    </div>
  );
}
