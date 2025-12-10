import axios from "axios";

const API = axios.create({
  baseURL: "https://bestwishes.ng/api/",
  headers: { "Content-Type": "application/json" },
});

// Vendor registration API (uses different base URL)
const VendorAPI = axios.create({
  baseURL: "https://bestwishes.com.ng/api/",
  headers: { "Content-Type": "application/json" },
});

export const signUpUser = (data) => API.post("register.php", data);

export const signInUser = (data) => API.post("login.php", data);

export const registerVendor = (data) => VendorAPI.post("register.php", data);
