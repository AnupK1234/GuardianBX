// components/EmergencySOS.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";

const EmergencySOS = () => {
  const [email, setEmail] = useState("");

  const handleSOS = () => {
    const enteredEmail = prompt("Enter emergency contact email:");

    if (!enteredEmail || !enteredEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    setEmail(enteredEmail);

    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await axios.post("/send-sos", {
            email: enteredEmail,
            lat: latitude,
            lng: longitude,
          });

          const data = res.data;
          if (res.status === 200) {
            alert("SOS message sent to emergency contact.");
          } else {
            alert("Failed to send SOS message: " + data.message);
          }
        } catch (error) {
          console.error(error);
          alert("An error occurred while sending SOS.");
        }
      },
      (error) => {
        alert("Location permission denied or error: " + error.message);
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen z-50">
      <Button onClick={handleSOS} className="bg-red-600 hover:bg-red-700">
        🚨 Emergency SOS
      </Button>
    </div>
  );
};

export default EmergencySOS;
