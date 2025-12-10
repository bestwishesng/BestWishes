import axios from "axios";

const cardAPI = axios.create({
  baseURL: "https://bestwishes.com.ng/api/",
  headers: { "Content-Type": "application/json" },
});

export const getCardImages = () => cardAPI.get("get_card_images.php");

export const sendAnonymousMessage = (payload) =>
  cardAPI.post("send_anonymous_message.php", payload);

export const sendYourselfMessage = (payload) =>
  cardAPI.post("send_yourself_message.php", payload);


