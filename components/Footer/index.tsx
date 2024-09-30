import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  Typography,
  Alert,
  Grid2,
  Card,
} from "@mui/material";
import { useTheme } from "next-themes";
import SendIcon from "@mui/icons-material/Send";
import Fade from "@mui/material/Fade";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function Contact() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key in keyof FormData]: boolean }>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string>("");

  const validate = (): boolean => {
    let tempErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = "Name is required.";
      isValid = false;
    }
    if (!formData.email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid.";
      isValid = false;
    }
    if (!formData.subject) {
      tempErrors.subject = "Subject is required.";
      isValid = false;
    }
    if (!formData.message) {
      tempErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: undefined });
    validate();
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched({ ...touched, [name]: true });
    validate();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSuccessMessage("Your message has been sent successfully!");
      setErrors({});
      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false,
      });

      setIsFormValid(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else {
      alert("Error! A problem has occurred while submitting your data.");
    }
  };

  if (!mounted) return null;

  const AlertClass = "shadow-lg border-2 mt-1 rounded-lg";

  const formStyle = {
    "& .MuiInputBase-input": {
      color: theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "inherit",
    },
    "& .MuiFormLabel-root": {
      color: theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "inherit",
    },
    "& .MuiFormHelperText-root": {
      color: "red",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor:
          theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
        borderRadius: "8px",
      },
      "&:hover fieldset": {
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "inherit",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "inherit",
      },
    },
  };

  return (
    <Card
      className="p-8 rounded-lg"
      sx={{
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        background: `${theme === "dark" ? "#121313" : "white"}`,
        border:
          theme === "dark"
            ? "1px solid rgba(255, 255, 255, 0.125)"
            : "1px solid rgba(0, 0, 0, 0.15)",
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth margin="dense" error={!!errors.name}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                sx={formStyle}
                required
              />
              <Fade in={!!errors.name && touched.name} timeout={500}>
                <div>
                  {errors.name && touched.name && (
                    <Alert severity="error" className={AlertClass}>
                      {errors.name}
                    </Alert>
                  )}
                </div>
              </Fade>
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth margin="dense" error={!!errors.email}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                sx={formStyle}
                required
              />
              <Fade in={!!errors.email && touched.email} timeout={500}>
                <div>
                  {errors.email && touched.email && (
                    <Alert severity="error" className={AlertClass}>
                      {errors.email}
                    </Alert>
                  )}
                </div>
              </Fade>
            </FormControl>
          </Grid2>
        </Grid2>

        <FormControl fullWidth margin="normal" error={!!errors.subject}>
          <TextField
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={() => handleBlur("subject")}
            sx={formStyle}
            required
          />
          <Fade in={!!errors.subject && touched.subject} timeout={500}>
            <div>
              {errors.subject && touched.subject && (
                <Alert severity="error" className={AlertClass}>
                  {errors.subject}
                </Alert>
              )}
            </div>
          </Fade>
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.message}>
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={() => handleBlur("message")}
            sx={formStyle}
            multiline
            rows={4}
            required
          />
          <Fade in={!!errors.message && touched.message} timeout={500}>
            <div>
              {errors.message && touched.message && (
                <Alert severity="error" className={AlertClass}>
                  {errors.message}
                </Alert>
              )}
            </div>
          </Fade>
        </FormControl>

        <div className="flex justify-center">
          <Button
            type="submit"
            className={`w-full px-2 py-3 rounded-lg mt-2 text-sm tablet:text-base p-1
            laptop:p-2 m-1 laptop:m-2 transition-all ease-out duration-500 ${
              theme === "dark"
                ? "hover:bg-slate-600 text-white"
                : "hover:bg-slate-100"
            } hover:scale-105 active:scale-100  tablet:first:ml-0 link`}
            variant="contained"
            color="success"
            disabled={!isFormValid}
            sx={{
              "&.Mui-disabled": {
                backgroundColor: "#D32F2F",
                color: "white",
              },
            }}
          >
            <Typography className="mx-4">Send</Typography>
            <SendIcon />
          </Button>
        </div>

        <Fade in={!!successMessage} timeout={500}>
          <div>
            {successMessage && (
              <Alert severity="success" className={AlertClass}>
                {successMessage}
              </Alert>
            )}
          </div>
        </Fade>
      </Box>
    </Card>
  );
}

export default Contact;
