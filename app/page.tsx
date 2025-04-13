import {
  Container,
  Typography,
  Box,
  Divider,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import Link from "next/link";
import ImageIcon from "@mui/icons-material/Image";
import InfoSection from "@/components/InfoSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <InfoSection />
    </>
  );
}
