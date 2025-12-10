import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../ui/Footer";
import { getCardImages } from "../api/cards";
import "./ScheduleTemplate.css";

function ScheduleTemplate() {
  const navigate = useNavigate();

  // Your template images (in /public/templates/)
  const fallbackTemplates = [
    { id: 1, preview: "/templates/christmas1.webp", category: "Christmas" },
    { id: 2, preview: "/templates/christmas2.webp", category: "Christmas" },
    { id: 3, preview: "/templates/christmas3.webp", category: "Christmas" },
    { id: 4, preview: "/templates/christmas4.webp", category: "Christmas" },
    { id: 5, preview: "/templates/christmas5.webp", category: "Christmas" },
    { id: 6, preview: "/templates/boyfriend1.webp", category: "Boyfriend's Day" },
    { id: 7, preview: "/templates/boyfriend2.webp", category: "Boyfriend's Day" },
    { id: 8, preview: "/templates/boyfriend3.webp", category: "Boyfriend's Day" },
    { id: 9, preview: "/templates/boyfriend4.webp", category: "Boyfriend's Day" },
    { id: 10, preview: "/templates/boyfriend5.webp", category: "Boyfriend's Day" },
    { id: 11, preview: "/templates/easter1.webp", category: "Easter Cards" },
    { id: 12, preview: "/templates/easter2.webp", category: "Easter Cards" },
    { id: 13, preview: "/templates/easter3.webp", category: "Easter Cards" },
    { id: 14, preview: "/templates/easter4.webp", category: "Easter Cards" },
    { id: 15, preview: "/templates/easter5.webp", category: "Easter Cards" },
    { id: 16, preview: "/templates/situationship1.webp", category: "Situationships" },
    { id: 17, preview: "/templates/situationship2.webp", category: "Situationships" },
    { id: 18, preview: "/templates/situationship3.webp", category: "Situationships" },
    { id: 19, preview: "/templates/situationship4.webp", category: "Situationships" },
    { id: 20, preview: "/templates/anniversary1.webp", category: "Anniversary" },
    { id: 21, preview: "/templates/anniversary2.webp", category: "Anniversary" },
    { id: 22, preview: "/templates/anniversary3.webp", category: "Anniversary" },
    { id: 23, preview: "/templates/anniversary4.webp", category: "Anniversary" },
    { id: 24, preview: "/templates/anniversary5.webp", category: "Anniversary" },
    { id: 25, preview: "/templates/anniversary6.webp", category: "Anniversary" },
    { id: 26, preview: "/templates/birthday1.webp", category: "Birthday" },
    { id: 27, preview: "/templates/birthday2.webp", category: "Birthday" },
    { id: 28, preview: "/templates/birthday3.webp", category: "Birthday" },
    { id: 29, preview: "/templates/birthday4.webp", category: "Birthday" },
    { id: 30, preview: "/templates/birthday5.webp", category: "Birthday" },
    { id: 31, preview: "/templates/birthday6.webp", category: "Birthday" },
    
    { id: 32, preview: "/templates/postpartum1.webp", category: "Postpartum" },
    { id: 33, preview: "/templates/postpartum2.webp", category: "Postpartum" },
    { id: 34, preview: "/templates/postpartum3.webp", category: "Postpartum" },
    { id: 35, preview: "/templates/postpartum4.webp", category: "Postpartum" },
    { id: 36, preview: "/templates/postpartum5.webp", category: "Postpartum" },
    { id: 37, preview: "/templates/congrats1.webp", category: "Congratulations" },
    { id: 38, preview: "/templates/congrats2.webp", category: "Congratulations" },
    { id: 39, preview: "/templates/congrats3.webp", category: "Congratulations" },
    { id: 40, preview: "/templates/congrats4.webp", category: "Congratulations" },
    { id: 41, preview: "/templates/congrats5.webp", category: "Congratulations" },
    { id: 42, preview: "/templates/easter6.webp", category: "Easter Cards" },
    { id: 43, preview: "/templates/love1.webp", category: "Love & Romance" },
    { id: 44, preview: "/templates/love2.webp", category: "Love & Romance" },
    { id: 45, preview: "/templates/love3.webp", category: "Love & Romance" },
    { id: 46, preview: "/templates/love4.webp", category: "Love & Romance" },
    { id: 47, preview: "/templates/love5.webp", category: "Love & Romance" },
    { id: 48, preview: "/templates/thanks1.webp", category: "Thank You" },
    { id: 49, preview: "/templates/thanks2.webp", category: "Thank You" },
    { id: 50, preview: "/templates/thanks3.webp", category: "Thank You" },
    { id: 51, preview: "/templates/thanks4.webp", category: "Thank You" },
    { id: 52, preview: "/templates/thanks5.webp", category: "Thank You" },
    { id: 53, preview: "/templates/thanks6.webp", category: "Thank You" },
    { id: 54, preview: "/templates/well1.webp", category: "Get Well Soon" },
    { id: 55, preview: "/templates/well2.webp", category: "Get Well Soon" },
    { id: 56, preview: "/templates/well3.webp", category: "Get Well Soon" },
    { id: 57, preview: "/templates/well4.webp", category: "Get Well Soon" },
    { id: 58, preview: "/templates/well5.webp", category: "Get Well Soon" },
    { id: 59, preview: "/templates/well6.webp", category: "Get Well Soon" },
    { id: 60, preview: "/templates/year1.webp", category: "New Year Cards" },
    { id: 61, preview: "/templates/year2.webp", category: "New Year Cards" },
    { id: 62, preview: "/templates/year3.webp", category: "New Year Cards" },
    { id: 63, preview: "/templates/year4.webp", category: "New Year Cards" },
    { id: 64, preview: "/templates/year5.webp", category: "New Year Cards" },
    { id: 65, preview: "/templates/year6.webp", category: "New Year Cards" },
    { id: 66, preview: "/templates/occasion1.webp", category: "Special Occasion" },
    { id: 67, preview: "/templates/occasion2.webp", category: "Special Occasion" },
    { id: 68, preview: "/templates/occasion3.webp", category: "Special Occasion" },
  ].map((template) => ({ ...template, image: template.preview }));

  const [templates, setTemplates] = useState(fallbackTemplates);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [templateError, setTemplateError] = useState("");

  const normalizeImageUrl = (url) => {
    if (!url) return "";
    const cleaned = url.replace(/^https?:\/\//i, "").replace(/^\/+/g, "");
    return `https://${cleaned}`;
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoadingTemplates(true);
      setTemplateError("");
      try {
        const response = await getCardImages();
        const apiTemplates = response?.data?.data || [];
        if (apiTemplates.length) {
          const mapped = apiTemplates.map((item) => ({
            id: item.id,
            preview: normalizeImageUrl(item.image),
            image: normalizeImageUrl(item.image),
            category: item.label || "Other",
            label: item.label || "Other",
          }));
          setTemplates(mapped);
          return;
        }
      } catch (error) {
        console.error("Failed to load card images", error);
        setTemplateError("Unable to load latest templates. Showing defaults.");
      } finally {
        setLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(templates.map((t) => t.category || "Other"));
    return ["All", ...Array.from(unique)];
  }, [templates]);

  const handleSelect = (template) => {
    navigate("/schedule-card", { state: { template } });
  };

  const filteredTemplates =
    activeCategory === "All"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <>
      <Navbar />

      <div className="create-template">
        <div className="create-template-head">
          <h3>Personalize Your Perfect Card</h3>
          <p>
            Express your emotions through personalized cards with images, <br />{" "}
            music and a lot more features to create a special experience.
          </p>
        </div>

        {templateError && (
          <div className="template-error" role="alert">
            {templateError}
          </div>
        )}
        {loadingTemplates && (
          <div className="template-loading">Loading templates...</div>
        )}

        {/* Category Carousel */}
        <div className="category-carousel">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Templates */}
        <div className="templates">
          {filteredTemplates.map((t) => (
            <div
              key={t.id}
              className="template-card"
              onClick={() => handleSelect(t)}
            >
              <img src={t.preview} alt={t.category} className="template-img" />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ScheduleTemplate;
