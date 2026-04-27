import { useState } from "react";
import "./BMISection.scss";

// ─── Constants ────────────────────────────────────────────────
const ACTIVITY_FACTORS = [
  { label: "Sedentary (little or no exercise)", value: 1.2 },
  { label: "Lightly active (1–3 days/week)", value: 1.375 },
  { label: "Moderately active (3–5 days/week)", value: 1.55 },
  { label: "Very active (6–7 days/week)", value: 1.725 },
  { label: "Super active (physical job or 2x training)", value: 1.9 },
];

const BMI_RANGES = [
  { range: "Below 18.5",    status: "Underweight", color: "#60a5fa" },
  { range: "18.5 – 24.9",  status: "Healthy",     color: "#4ade80" },
  { range: "25.0 – 29.9",  status: "Overweight",  color: "#facc15" },
  { range: "30.0 and above", status: "Obese",      color: "#f87171" },
];

// ─── Helpers ──────────────────────────────────────────────────
const getBMIStatus = (bmi) => {
  if (bmi < 18.5) return BMI_RANGES[0];
  if (bmi < 25)   return BMI_RANGES[1];
  if (bmi < 30)   return BMI_RANGES[2];
  return BMI_RANGES[3];
};

// ─── Component ────────────────────────────────────────────────
export default function BMISection() {
  const [height, setHeight]         = useState("");
  const [weight, setWeight]         = useState("");
  const [age, setAge]               = useState("");
  const [gender, setGender]         = useState("");
  const [activity, setActivity]     = useState("");
  const [result, setResult]         = useState(null);
  const [genderOpen, setGenderOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);

  const calculate = () => {
    const h   = parseFloat(height);
    const w   = parseFloat(weight);
    const a   = parseFloat(age);
    const act = parseFloat(activity);

    if (!h || !w || !a || !gender || !act) return;

    const bmi = w / (h / 100) ** 2;
    const bmr =
      gender === "Male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * act;

    setResult({
      bmi:  bmi.toFixed(1),
      bmr:  Math.round(bmr),
      tdee: Math.round(tdee),
    });
  };

  const status = result ? getBMIStatus(parseFloat(result.bmi)) : null;

  const activeActivity = ACTIVITY_FACTORS.find(
    (f) => f.value === parseFloat(activity)
  );

  return (
    <section className="bmi-section">
      <div className="bmi-section__inner">

        {/* ── LEFT: Form ── */}
        <div className="bmi-form">

          {/* Title */}
          <div className="bmi-form__title-wrap">
            <span className="bmi-form__title-ghost">BMI</span>
            <h1 className="bmi-form__title">
              <span className="bmi-form__title-plus">+</span>
              INPUT YOUR BMI
            </h1>
          </div>

          <p className="bmi-form__desc">
            Enter your details below to calculate your Body Mass Index and
            Basal Metabolic Rate.
          </p>

          {/* 2-column inputs */}
          <div className="bmi-form__grid">
            <input
              className="bmi-form__input"
              type="number"
              placeholder="Height / cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <input
              className="bmi-form__input"
              type="number"
              placeholder="Weight / kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              className="bmi-form__input"
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            {/* Gender dropdown */}
            <div className="bmi-dropdown">
              <div
                className="bmi-dropdown__trigger"
                onClick={() => { setGenderOpen(!genderOpen); setActivityOpen(false); }}
              >
                <span className={gender ? "bmi-dropdown__value" : "bmi-dropdown__placeholder"}>
                  {gender || "Gender"}
                </span>
                <span className="bmi-dropdown__arrow">▾</span>
              </div>

              {genderOpen && (
                <div className="bmi-dropdown__menu">
                  {["Male", "Female"].map((g) => (
                    <div
                      key={g}
                      className="bmi-dropdown__item"
                      onClick={() => { setGender(g); setGenderOpen(false); }}
                    >
                      {g}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Activity dropdown */}
          <div className="bmi-dropdown bmi-dropdown--activity">
            <div
              className="bmi-dropdown__trigger"
              onClick={() => { setActivityOpen(!activityOpen); setGenderOpen(false); }}
            >
              <span className={activity ? "bmi-dropdown__value" : "bmi-dropdown__placeholder"}>
                {activeActivity?.label ?? "Select an activity factor:"}
              </span>
              <span className="bmi-dropdown__arrow">▾</span>
            </div>

            {activityOpen && (
              <div className="bmi-dropdown__menu">
                {ACTIVITY_FACTORS.map((f) => (
                  <div
                    key={f.value}
                    className="bmi-dropdown__item"
                    onClick={() => { setActivity(String(f.value)); setActivityOpen(false); }}
                  >
                    {f.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calculate */}
          <button className="bmi-form__btn" onClick={calculate}>
            CALCULATE
            <span className="bmi-form__btn-icon">↗</span>
          </button>

          {/* Result */}
          {result && (
            <div className="bmi-result">
              <div className="bmi-result__item">
                <div className="bmi-result__label">BMI</div>
                <div
                  className="bmi-result__value bmi-result__value--colored"
                  style={{ "--status-color": status.color }}
                >
                  {result.bmi}
                </div>
                <div
                  className="bmi-result__sub bmi-result__sub--colored"
                  style={{ "--status-color": status.color }}
                >
                  {status.status}
                </div>
              </div>

              <div className="bmi-result__item">
                <div className="bmi-result__label">BMR</div>
                <div className="bmi-result__value">{result.bmr}</div>
                <div className="bmi-result__sub">kcal / day</div>
              </div>

              <div className="bmi-result__item">
                <div className="bmi-result__label">TDEE</div>
                <div className="bmi-result__value">{result.tdee}</div>
                <div className="bmi-result__sub">kcal / day</div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Circle table ── */}
        <div className="bmi-circle-wrap">
          <div className="bmi-circle">

            <div className="bmi-table__header">
              <div className="bmi-table__head">BMI</div>
              <div className="bmi-table__head">WEIGHT STATUS</div>
            </div>

            {BMI_RANGES.map((row) => {
              const isActive = result && status?.status === row.status;
              const rowClass = [
                "bmi-table__row",
                result ? (isActive ? "bmi-table__row--active" : "bmi-table__row--dimmed") : "",
              ].join(" ");

              return (
                <div key={row.status} className={rowClass}>
                  <div className="bmi-table__range">{row.range}</div>
                  <div
                    className={`bmi-table__status${isActive ? " bmi-table__status--active" : ""}`}
                    style={isActive ? { "--status-color": row.color } : {}}
                  >
                    {row.status}
                  </div>
                </div>
              );
            })}

            <div className="bmi-circle__footer">
              <strong>BMR</strong> Metabolic Rate / <strong>BMI</strong> Body Mass Index
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
