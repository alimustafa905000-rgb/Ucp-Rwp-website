import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { campusService } from "../services";

export default function CampusInfo() {
  const [data, setData] = useState(null);

  // Load data from service and ensure all required sections exist
  useEffect(() => {
    const serviceData = campusService.get();
    const fullData = {
      ...serviceData,
      hero: serviceData.hero || { title: "", description: "", academicYear: "", badgeText: "" },
      stats: serviceData.stats || [],
      admissionPolicy: serviceData.admissionPolicy || {
        minEligibility: "",
        bscsCriteria: "",
        otherCriteria: "",
        registrationPolicy: "",
        timeLimit: "",
        attendancePolicy: "",
      },
      degreePrograms: serviceData.degreePrograms || [],
      scholarships: serviceData.scholarships || [],
      features: serviceData.features || [],
      clubs: serviceData.clubs || [],
      campusDetails: {
        name: serviceData.campusDetails?.name || "",
        address: serviceData.campusDetails?.address || "",
        phone: serviceData.campusDetails?.phone || "",
        email: serviceData.campusDetails?.email || "",
        mapEmbedUrl: serviceData.campusDetails?.mapEmbedUrl || "",
      },
      departments: serviceData.departments || [],
      feeStructures: serviceData.feeStructures || [],
    };
    setData(fullData);
  }, []);

  if (!data) return <div>Loading...</div>;

  const input = "w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700";
  const save = () => {
    campusService.update(data);
    toast.success("All changes saved successfully");
  };

  // -------------------- Helper functions for arrays --------------------
  const addItem = (arrayKey, defaultItem) => {
    setData((s) => ({
      ...s,
      [arrayKey]: [...(s[arrayKey] || []), defaultItem],
    }));
  };

  const removeItem = (arrayKey, index) => {
    setData((s) => ({
      ...s,
      [arrayKey]: s[arrayKey].filter((_, i) => i !== index),
    }));
  };

  const updateItem = (arrayKey, index, field, value) => {
    setData((s) => {
      const next = [...s[arrayKey]];
      next[index] = { ...next[index], [field]: value };
      return { ...s, [arrayKey]: next };
    });
  };

  // For nested campusDetails
  const updateCampusDetail = (field, value) => {
    setData((s) => ({
      ...s,
      campusDetails: { ...s.campusDetails, [field]: value },
    }));
  };

  // For hero
  const updateHero = (field, value) => {
    setData((s) => ({
      ...s,
      hero: { ...s.hero, [field]: value },
    }));
  };

  // For admissionPolicy
  const updatePolicy = (field, value) => {
    setData((s) => ({
      ...s,
      admissionPolicy: { ...s.admissionPolicy, [field]: value },
    }));
  };

  // -------------------- Render sections --------------------
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage all campus data including programs, fees, scholarships, and more.
        </p>
      </div>

      {/* ========== 1. Dashboard Overview ========== */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Dashboard Overview</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-2xl font-bold">{data.degreePrograms.length}</p>
            <p className="text-sm text-slate-500">Total Programs</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-2xl font-bold">{data.clubs.length}</p>
            <p className="text-sm text-slate-500">Clubs & Societies</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-2xl font-bold">1</p>
            <p className="text-sm text-slate-500">Campuses</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-2xl font-bold">{data.scholarships.length}</p>
            <p className="text-sm text-slate-500">Scholarships</p>
          </div>
        </div>
        {data.stats.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2">
                  <i className={`fas ${stat.icon || "fa-circle"}`} />
                  <span className="text-2xl font-bold">{stat.count}</span>
                </div>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========== 2. Hero Section ========== */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Hero Section</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              className={input}
              placeholder="Hero Title"
              value={data.hero.title}
              onChange={(e) => updateHero("title", e.target.value)}
            />
            <input
              className={input}
              placeholder="Hero Description"
              value={data.hero.description}
              onChange={(e) => updateHero("description", e.target.value)}
            />
            <input
              className={input}
              placeholder="Academic Year (e.g., 2026)"
              value={data.hero.academicYear}
              onChange={(e) => updateHero("academicYear", e.target.value)}
            />
            <input
              className={input}
              placeholder="Badge Text"
              value={data.hero.badgeText}
              onChange={(e) => updateHero("badgeText", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ========== 3. Statistics Management ========== */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Statistics</h2>
          <button
            onClick={() => addItem("stats", { icon: "fa-graduation-cap", count: 0, label: "" })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
          >
            + Add Statistic
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {data.stats.map((stat, idx) => (
            <div key={idx} className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
              <input
                className={input}
                placeholder="Icon class (e.g., fa-graduation-cap)"
                value={stat.icon}
                onChange={(e) => updateItem("stats", idx, "icon", e.target.value)}
              />
              <input
                className={input}
                type="number"
                placeholder="Count"
                value={stat.count}
                onChange={(e) => updateItem("stats", idx, "count", Number(e.target.value))}
              />
              <input
                className={input}
                placeholder="Label"
                value={stat.label}
                onChange={(e) => updateItem("stats", idx, "label", e.target.value)}
              />
              <button
                onClick={() => removeItem("stats", idx)}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 4. Admission Policy ========== */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Admission Policy</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              className={input}
              placeholder="Minimum Eligibility"
              value={data.admissionPolicy.minEligibility}
              onChange={(e) => updatePolicy("minEligibility", e.target.value)}
            />
            <input
              className={input}
              placeholder="BSCS Criteria"
              value={data.admissionPolicy.bscsCriteria}
              onChange={(e) => updatePolicy("bscsCriteria", e.target.value)}
            />
            <input
              className={input}
              placeholder="Other Programs Criteria"
              value={data.admissionPolicy.otherCriteria}
              onChange={(e) => updatePolicy("otherCriteria", e.target.value)}
            />
            <input
              className={input}
              placeholder="Registration Policy"
              value={data.admissionPolicy.registrationPolicy}
              onChange={(e) => updatePolicy("registrationPolicy", e.target.value)}
            />
            <input
              className={input}
              placeholder="Time Limit"
              value={data.admissionPolicy.timeLimit}
              onChange={(e) => updatePolicy("timeLimit", e.target.value)}
            />
            <input
              className={input}
              placeholder="Attendance Policy"
              value={data.admissionPolicy.attendancePolicy}
              onChange={(e) => updatePolicy("attendancePolicy", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ========== 5. Degree Programs ========== */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Degree Programs</h2>
          <button
            onClick={() => addItem("degreePrograms", { name: "", type: "BS", duration: "" })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
          >
            + Add Program
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {data.degreePrograms.map((prog, idx) => (
            <div key={idx} className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
              <input
                className={input}
                placeholder="Program Name"
                value={prog.name}
                onChange={(e) => updateItem("degreePrograms", idx, "name", e.target.value)}
              />
              <select
                className={input}
                value={prog.type}
                onChange={(e) => updateItem("degreePrograms", idx, "type", e.target.value)}
              >
                <option value="BS">BS</option>
                <option value="ADP">ADP</option>
                <option value="Post-ADP">Post-ADP</option>
              </select>
              <input
                className={input}
                placeholder="Duration (e.g., 4 Years)"
                value={prog.duration}
                onChange={(e) => updateItem("degreePrograms", idx, "duration", e.target.value)}
              />
              <button
                onClick={() => removeItem("degreePrograms", idx)}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 6. Fee Structure ========== */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Fee Structure</h2>
          <button
            onClick={() =>
              addItem("feeStructures", {
                programName: "",
                programType: "BS",
                creditHours: 0,
                regFee: 0,
                admFee: 0,
                perCreditFee: 0,
                totalFee: 0,
                yearlyAvg: 0,
              })
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
          >
            + Add Fee
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {data.feeStructures.map((fee, idx) => (
            <div key={idx} className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-3">
              <input
                className={input}
                placeholder="Program Name"
                value={fee.programName}
                onChange={(e) => updateItem("feeStructures", idx, "programName", e.target.value)}
              />
              <select
                className={input}
                value={fee.programType}
                onChange={(e) => updateItem("feeStructures", idx, "programType", e.target.value)}
              >
                <option value="BS">BS</option>
                <option value="ADP">ADP</option>
                <option value="Post-ADP">Post-ADP</option>
              </select>
              <input
                className={input}
                type="number"
                placeholder="Credit Hours"
                value={fee.creditHours}
                onChange={(e) => updateItem("feeStructures", idx, "creditHours", Number(e.target.value))}
              />
              <input
                className={input}
                type="number"
                placeholder="Registration Fee"
                value={fee.regFee}
                onChange={(e) => updateItem("feeStructures", idx, "regFee", Number(e.target.value))}
              />
              <input
                className={input}
                type="number"
                placeholder="Admission Fee"
                value={fee.admFee}
                onChange={(e) => updateItem("feeStructures", idx, "admFee", Number(e.target.value))}
              />
              <input
                className={input}
                type="number"
                placeholder="Per Credit Hour Fee"
                value={fee.perCreditFee}
                onChange={(e) => updateItem("feeStructures", idx, "perCreditFee", Number(e.target.value))}
              />
              <input
                className={input}
                type="number"
                placeholder="Total Fee"
                value={fee.totalFee}
                onChange={(e) => updateItem("feeStructures", idx, "totalFee", Number(e.target.value))}
              />
              <input
                className={input}
                type="number"
                placeholder="Yearly Average"
                value={fee.yearlyAvg}
                onChange={(e) => updateItem("feeStructures", idx, "yearlyAvg", Number(e.target.value))}
              />
              <button
                onClick={() => removeItem("feeStructures", idx)}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 7. Scholarships ========== */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Scholarships</h2>
          <button
            onClick={() => addItem("scholarships", { title: "", type: "", eligibility: "", percentage: "" })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
          >
            + Add Scholarship
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {data.scholarships.map((sch, idx) => (
            <div key={idx} className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
              <input
                className={input}
                placeholder="Title"
                value={sch.title}
                onChange={(e) => updateItem("scholarships", idx, "title", e.target.value)}
              />
              <input
                className={input}
                placeholder="Type (e.g., Merit)"
                value={sch.type}
                onChange={(e) => updateItem("scholarships", idx, "type", e.target.value)}
              />
              <input
                className={input}
                placeholder="Eligibility (e.g., 75% marks)"
                value={sch.eligibility}
                onChange={(e) => updateItem("scholarships", idx, "eligibility", e.target.value)}
              />
              <input
                className={input}
                placeholder="Discount Percentage (e.g., 50%)"
                value={sch.percentage}
                onChange={(e) => updateItem("scholarships", idx, "percentage", e.target.value)}
              />
              <button
                onClick={() => removeItem("scholarships", idx)}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 8. Features ========== */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Features</h2>
          <button
            onClick={() => addItem("features", { text: "" })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
          >
            + Add Feature
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {data.features.map((feat, idx) => (
            <div key={idx} className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
              <input
                className={input}
                placeholder="Feature text"
                value={feat.text}
                onChange={(e) => updateItem("features", idx, "text", e.target.value)}
              />
              <button
                onClick={() => removeItem("features", idx)}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 9. Clubs & Societies ========== */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Clubs & Societies</h2>
          <button
            onClick={() => addItem("clubs", { name: "", icon: "", image: "", description: "" })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
          >
            + Add Club
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {data.clubs.map((club, idx) => (
            <div key={idx} className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
              <input
                className={input}
                placeholder="Club Name"
                value={club.name}
                onChange={(e) => updateItem("clubs", idx, "name", e.target.value)}
              />
              <input
                className={input}
                placeholder="Icon (e.g., fa-gamepad)"
                value={club.icon}
                onChange={(e) => updateItem("clubs", idx, "icon", e.target.value)}
              />
              <input
                className={input}
                placeholder="Image URL (optional)"
                value={club.image || ""}
                onChange={(e) => updateItem("clubs", idx, "image", e.target.value)}
              />
              <input
                className={input}
                placeholder="Description"
                value={club.description}
                onChange={(e) => updateItem("clubs", idx, "description", e.target.value)}
              />
              <button
                onClick={() => removeItem("clubs", idx)}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 10. Campus Management ========== */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Campus Management</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              className={input}
              placeholder="Campus Name"
              value={data.campusDetails.name}
              onChange={(e) => updateCampusDetail("name", e.target.value)}
            />
            <input
              className={input}
              placeholder="Address"
              value={data.campusDetails.address}
              onChange={(e) => updateCampusDetail("address", e.target.value)}
            />
            <input
              className={input}
              placeholder="Phone"
              value={data.campusDetails.phone}
              onChange={(e) => updateCampusDetail("phone", e.target.value)}
            />
            <input
              className={input}
              placeholder="Email"
              value={data.campusDetails.email}
              onChange={(e) => updateCampusDetail("email", e.target.value)}
            />
            <input
              className={input}
              placeholder="Google Maps Embed URL"
              value={data.campusDetails.mapEmbedUrl}
              onChange={(e) => updateCampusDetail("mapEmbedUrl", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={save}
          className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}