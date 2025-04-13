"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  CloudUpload,
  Collections,
  Visibility,
  Settings,
} from "@mui/icons-material";

const features = [
  {
    icon: <CloudUpload fontSize='large' />,
    title: "Effortless Uploads",
    description:
      "Drag and drop multiple images at once with our intuitive interface. Supporting various formats and sizes.",
    color: "#3b82f6",
  },
  {
    icon: <Collections fontSize='large' />,
    title: "Smart Gallery Layout",
    description:
      "Enjoy a responsive masonry grid that adapts perfectly to any device or screen size.",
    color: "#10b981",
  },
  {
    icon: <Visibility fontSize='large' />,
    title: "Immersive Preview",
    description:
      "Experience your images in a beautiful fullscreen modal with zoom functionality and navigation.",
    color: "#8b5cf6",
  },
  {
    icon: <Settings fontSize='large' />,
    title: "Advanced Management",
    description:
      "Organize, tag, filter and search through your collection with powerful yet simple controls.",
    color: "#f59e0b",
  },
];

export default function FeaturesSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      component='section'
      sx={{
        py: { xs: 8, md: 12 },
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(to bottom, ${theme.palette.background.paper}, #111827)`
            : `linear-gradient(to bottom, #f8fafc, #f1f5f9)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          left: "-10%",
          width: { xs: "150px", md: "300px" },
          height: { xs: "150px", md: "300px" },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0) 70%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: { xs: "200px", md: "400px" },
          height: { xs: "200px", md: "400px" },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0) 70%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "40%",
          left: "10%",
          width: { xs: "100px", md: "200px" },
          height: { xs: "100px", md: "200px" },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0) 70%)",
          zIndex: 0,
        }}
      />

      <Container
        maxWidth={isLargeScreen ? "xl" : "lg"}
        sx={{
          position: "relative",
          zIndex: 1,
          px: { lg: 4 }, // Add extra padding on large screens
        }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Box
            sx={{
              display: "inline-block",
              px: 2,
              py: 1,
              mb: 3,
              borderRadius: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(59,130,246,0.1)"
                  : "rgba(59,130,246,0.08)",
              border: "1px solid",
              borderColor:
                theme.palette.mode === "dark"
                  ? "rgba(59,130,246,0.2)"
                  : "rgba(59,130,246,0.15)",
            }}
          >
            <Typography
              variant='overline'
              component='p'
              sx={{
                color: theme.palette.mode === "dark" ? "#60a5fa" : "#2563eb",
                fontWeight: 600,
                letterSpacing: 1.2,
                fontSize: "0.75rem",
              }}
            >
              DESIGNED FOR CREATORS
            </Typography>
          </Box>

          <Typography
            variant='h2'
            component='h2'
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            Powerful Gallery Features
          </Typography>

          <Typography
            variant='body1'
            sx={{
              maxWidth: "700px",
              mx: "auto",
              color:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.7)"
                  : "rgba(0,0,0,0.6)",
              fontSize: { xs: "1rem", md: "1.125rem" },
              lineHeight: 1.7,
              mb: { xs: 6, md: 8 },
            }}
          >
            Our gallery application provides everything you need to showcase
            your images beautifully with a focus on speed, security, and user
            experience.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: { sm: "wrap", lg: "nowrap" },
            gap: { xs: 3, sm: 4, md: 5 },
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                flex: {
                  xs: "1 0 100%",
                  sm: "0 0 calc(50% - 16px)",
                  lg: "1 1 0",
                },
                minWidth: { lg: 0 }, // Allows flex items to shrink below their content size
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: 0, // Changed from 3 to 0 for square shape
                  position: "relative",
                  isolation: "isolate",
                  transition: "all 0.3s ease-out",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid black", // Changed border color to black
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 4px 20px 0 rgba(0,0,0,0.2)"
                      : "0 4px 20px 0 rgba(0,0,0,0.05)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: 0, // Changed from 3 to 0 for square shape
                    padding: "1px",
                    background: `linear-gradient(135deg, ${feature.color}40, transparent)`,
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    pointerEvents: "none",
                    zIndex: -1,
                  },
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? `0 15px 30px rgba(0,0,0,0.25), 0 0 0 1px black`
                        : `0 15px 30px rgba(0,0,0,0.1), 0 0 0 1px black`,
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 3,
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 0, // Changed from "14px" to 0 for square shape
                    background:
                      theme.palette.mode === "dark"
                        ? `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`
                        : `linear-gradient(135deg, ${feature.color}15, ${feature.color}05)`,
                    color: feature.color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant='h6'
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color:
                      theme.palette.mode === "dark"
                        ? "#fff"
                        : theme.palette.text.primary,
                    mb: 1.5,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    lineHeight: 1.7,
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.7)"
                        : theme.palette.text.secondary,
                    flex: 1,
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
