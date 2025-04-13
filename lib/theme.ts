import { createTheme, alpha } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#3a86ff",
      light: "#60a5fa",
      dark: "#2563eb",
    },
    secondary: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    error: {
      main: "#ef4444",
    },
    grey: {
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.03), 0px 1px 2px rgba(0, 0, 0, 0.04)",
    "0px 4px 8px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 8px 16px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.06), 0px 6px 12px rgba(0, 0, 0, 0.07)",
    "0px 16px 32px rgba(0, 0, 0, 0.07), 0px 8px 16px rgba(0, 0, 0, 0.08)",
    ...Array(19).fill("none"),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: "smooth",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 600,
          boxShadow: "none",
          textTransform: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #3a86ff 0%, #2563eb 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #60a5fa 0%, #3a86ff 100%)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
          },
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        },
        elevation2: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
        },
        elevation3: {
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.07)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          boxShadow: "0px 16px 32px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.25rem",
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
        },
        primary: {
          background: "linear-gradient(135deg, #3a86ff 0%, #2563eb 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #60a5fa 0%, #3a86ff 100%)",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 6,
          backgroundColor: alpha("#3a86ff", 0.12),
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.2s ease, background-color 0.2s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
})

export default theme
