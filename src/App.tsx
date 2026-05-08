import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import TicTacToe from "./pages/games/TicTacToe.tsx";
import ConnectFour from "./pages/games/ConnectFour.tsx";
import Snake from "./pages/games/Snake.tsx";
import ConnectDots from "./pages/games/ConnectDots.tsx";
import Dino from "./pages/games/Dino.tsx";
import Memory from "./pages/games/Memory.tsx";
import Calendar from "./pages/tools/Calendar.tsx";
import TaxCalc from "./pages/tools/TaxCalc.tsx";
import Finance from "./pages/tools/Finance.tsx";
import Weather from "./pages/tools/Weather.tsx";
import Unicode from "./pages/tools/Unicode.tsx";
import Explorer from "./pages/tools/Explorer.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/games/connect-four" element={<ConnectFour />} />
          <Route path="/games/snake" element={<Snake />} />
          <Route path="/games/connect-dots" element={<ConnectDots />} />
          <Route path="/games/dino" element={<Dino />} />
          <Route path="/games/memory" element={<Memory />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/tax-calculator" element={<TaxCalc />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/tools" element={<Unicode />} />
          <Route path="/explore" element={<Explorer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
