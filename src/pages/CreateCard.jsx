


import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import CardStep1 from "../components/cards/CardStep1";
import CardStep2 from "../components/cards/CardStep2";
import CardStep3 from "../components/cards/CardStep3";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../ui/Footer";
import {
  sendAnonymousMessage,
  sendYourselfMessage,
} from "../api/cards";
import "./CreateCard.css";

function CreateCard() {
  const location = useLocation();
  const selectedTemplate = location.state?.template || null;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    template: selectedTemplate,
    isAnonymous: false,
    isSendYourself: false,
  });
  const [submitState, setSubmitState] = useState({
    loading: false,
    message: "",
    error: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: formData,
  });

  useEffect(() => {
    const subscription = watch((values) => {
      setFormData((prev) => ({ ...prev, ...values }));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    reset(formData);
  }, [currentStep]);

  const normalizeImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/")) return `${window.location.origin}${url}`;
    const cleaned = url.replace(/^https?:\/\//i, "").replace(/^\/+/g, "");
    return `https://${cleaned}`;
  };

  const toDataUrl = (fileOrBlob) =>
    new Promise((resolve, reject) => {
      if (!fileOrBlob) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(fileOrBlob);
    });

  const parseBoolean = (value) => value === true || value === "true";

  const steps = [
    { title: "Details", Component: CardStep1 },
    { title: "Info", Component: CardStep2 },
    { title: "Preview Selection", Component: CardStep3 },
  ];

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const buildPayload = async (data) => {
    const payload = {
      recipient_name: data.recipient,
      recipient_email: data.recipientEmail,
      heartfelt_message: data.message,
      nickname: data.quote || "",
      music_url: data.musicUrl || "",
      effect: data.effect || "",
      font_family: data.fontFamily || "",
      font_size: data.fontSize || "",
      text_color: data.textColor || "",
      template_id: data.template?.id,
    };

    const templateImage = data.template?.image || data.template?.preview;
    if (templateImage) {
      payload.card_image = normalizeImageUrl(templateImage);
    }

    if (data.image instanceof File) {
      payload.card_image = await toDataUrl(data.image);
    } else if (!payload.card_image && data.imageUrl) {
      payload.card_image = data.imageUrl;
    }

    if (data.voiceNote instanceof Blob) {
      payload.voice_note = await toDataUrl(data.voiceNote);
    } else if (data.voiceNote) {
      payload.voice_note = data.voiceNote;
    }

    Object.keys(payload).forEach((key) => {
      if (
        payload[key] === "" ||
        payload[key] === undefined ||
        payload[key] === null
      ) {
        delete payload[key];
      }
    });

    return payload;
  };

  const goNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (!isLastStep) setCurrentStep((s) => s + 1);
    else finalize({ ...formData, ...data });
  };

  const goBack = () => setCurrentStep((s) => Math.max(0, s - 1));

  const finalize = async (data) => {
    const finalData = { ...formData, ...data };
    const wantsSendYourself = parseBoolean(finalData.isSendYourself);
    const wantsAnonymous = parseBoolean(finalData.isAnonymous);

    if (!wantsSendYourself && !wantsAnonymous) {
      alert("Please choose to send anonymously or send yourself before finishing.");
      return;
    }

    setSubmitState({ loading: true, message: "", error: "" });
    try {
      const payload = await buildPayload(finalData);
      let response;

      if (wantsSendYourself) {
        payload.send_name = finalData.senderName;
        payload.send_email = finalData.senderEmail;
        response = await sendYourselfMessage(payload);
      } else {
        response = await sendAnonymousMessage(payload);
      }

      const successMessage =
        response?.data?.message || "Your card has been sent successfully.";
      setSubmitState({ loading: false, message: successMessage, error: "" });
      alert(successMessage);

      const resetData = {
        template: selectedTemplate,
        isAnonymous: false,
        isSendYourself: false,
      };
      setFormData(resetData);
      setCurrentStep(0);
      reset(resetData);
    } catch (error) {
      console.error("Error sending card", error);
      const apiError =
        error?.response?.data?.message ||
        error?.message ||
        "We could not send your card. Please try again.";
      setSubmitState({ loading: false, message: "", error: apiError });
      alert(apiError);
    }
  };

  const onNext = () => handleSubmit(goNext)();
  const onFinish = () => handleSubmit(finalize)();

  const { Component } = steps[currentStep];

  return (
    <>
      <Navbar />

      <div className="create-card">
        <div className="create-card-headline">
          <h2>Personalize your card</h2>
          <p>
            Express your emotions through personalized cards with images, music
            and a lot more features to create a special experience
          </p>
        </div>

        <Component
          register={register}
          errors={errors}
          watch={watch}
          formData={formData}
          onNext={onNext}
          onBack={goBack}
          onFinish={onFinish}
          isFirst={isFirstStep}
          isLast={isLastStep}
          setValue={setValue}
          submitState={submitState}
        />
      </div>

      <Footer />
    </>
  );
}

export default CreateCard;
