
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Map from "./pages/Map";
import ReportDetails from "./pages/ReportDetails";
import Feed from "./pages/Feed";
import MyReports from "./pages/MyReports";
import NotFound from "./pages/NotFound";
import AIMentor from "./components/mentor/AIMentor";
import 'leaflet/dist/leaflet.css';
import EmergencySOS from "./pages/EmergencySOS";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/map" element={<Map />} />
          <Route path="/report/:id" element={<ReportDetails />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/mentor" element={<AIMentor />} />
          <Route path="/sos" element={<EmergencySOS />} />
          <Route path="/my-reports" element={< MyReports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
