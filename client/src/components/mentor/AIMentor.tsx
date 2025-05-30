import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Avatar2 from "./AIAvatar2/Avatar2";
import { ArrowLeft } from "lucide-react";

const AIMentor = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            🤖 AI Assistant
          </h1>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Avatar2 />
        </div>
      </div>
    </div>
  );
};

export default AIMentor;
