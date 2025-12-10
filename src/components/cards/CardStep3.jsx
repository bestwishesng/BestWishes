
import React, { useState, useEffect } from "react";
import "./CardStep3.css";
import MusicCard from "./MusicCard";
import confetti from "canvas-confetti";

function CardStep3({ onFinish, formData, onBack, submitState }) {
  const [showPreview, setShowPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // 0 = gift box, 1–5 = card pages
  const [imagePreview, setImagePreview] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);

  // Create preview URLs for image and audio
  useEffect(() => {
    if (formData.image) {
      setImagePreview(
        formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image
      );
    }
    if (formData.voiceNote) {
      setAudioPreview(
        formData.voiceNote instanceof Blob ? URL.createObjectURL(formData.voiceNote) : formData.voiceNote
      );
    }
  }, [formData.image, formData.voiceNote]);

  const handleLivePreview = () => {
    setShowPreview(true);
    setCurrentPage(0); // always start with box
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setCurrentPage(0);
  };

  const handleTapBox = () => {
    triggerEffect(formData.effect);
    setCurrentPage(1);
  };

  const triggerEffect = (effect) => {
    switch (effect) {
      case "confetti":
        createFloatingElements("🎊", 45, "confetti");
        break;
      case "balloons":
        createFloatingElements("🎈", 25, "balloon");
        break;
      case "fireworks":
        createFloatingElements("🎆", 45, "fireworks");
        break;
      case "petals":
        createFloatingElements("🌸", 30, "petal");
        break;
      case "snow":
        createFloatingElements("❄️", 40, "snowflake");
        break;
      default:
        break;
    }
  };

  const createFloatingElements = (emoji, count, className) => {
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.textContent = emoji;
      el.className = `floating ${className}`;
      el.style.left = Math.random() * 100 + "vw";
      el.style.animationDuration = 4 + Math.random() * 3 + "s";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }
  };

  const nextPage = () => {
    if (currentPage < 5) setCurrentPage((p) => p + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <>
            <img
              src="/Gift Box.png"
              alt="Gift Box"
              className="gift-img"
              onClick={handleTapBox}
            />
            <button
              onClick={handleTapBox}
              style={{
                color: "#fff",
                padding: "10px 30px",
                border: "none",
                backgroundColor: "#d600a3",
                fontWeight: "600",
                fontSize: "1.1rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: '"Life Savers", serif',
              }}
            >
              Tap on the Box
            </button>
          </>
        );

      default:
        return (
          <MusicCard
            formData={{
              ...formData,
              image: imagePreview,
              voiceNote: audioPreview,
            }}
            showTemplateCover={true}
            nextPage={nextPage}
            prevPage={prevPage}
            customStyle={{
              fontFamily: formData.fontFamily || "inherit",
              fontSize: formData.fontSize || "16px",
              color: "#000",
            }}
          />
        );
    }
  };

  return (
    <div>
    
      {/* 🔙 Back Button */}
      <button type="button" className="back-btns" onClick={onBack} aria-label="Back" style={{ display: "flex", alignItems: "center" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon" style={{ width: "2rem" }}>
          <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
        <strong className="step-title">Media</strong>
      </button>

      <div className="preview-container">
        <h2>ADD POP PREVIEW</h2>
        <p>Choose a template below to customize. You can customize every design!</p>

        <div className="templates-grid">
          <div className="template-item">
            <div className="template-preview">
              <img
                src={formData.template?.preview || "/535.png"}
                alt="preview"
              />
            </div>
          </div>
        </div>

        <div className="preview-actions">
          <button type="button" className="save-btn" onClick={handleLivePreview}>
            Live Preview
          </button>
          <button
            type="button"
            onClick={onFinish}
            className="finish-btn"
            disabled={submitState?.loading}
          >
            {submitState?.loading ? "Sending..." : "Send Now"}
          </button>
        </div>
        {submitState?.error && (
          <div className="submit-error" role="alert">
            {submitState.error}
          </div>
        )}
        {submitState?.message && !submitState?.error && (
          <div className="submit-success" role="status">
            {submitState.message}
          </div>
        )}
      </div>

      {showPreview && (
        <div className="preview-overlay">
          <div className="preview-popup">
            <button className="close-btn" onClick={handleClosePreview}>
              ✕
            </button>

            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3rem",
              }}
            >
              {renderPageContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardStep3;
