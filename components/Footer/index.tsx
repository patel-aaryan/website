import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  FormHelperText,
  Typography,
  Alert,
  Grid2,
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

function Footer() {
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

  const formClass = "shadow-lg border-2";
  const errorClass = "shadow-lg border-2 mt-1";

  const formStyle =
    theme === "dark"
      ? {
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiFormLabel-root": {
            color: "white",
          },
          "& .MuiFormHelperText-root": {
            color: "red",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
              boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        }
      : null;

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth margin="normal" error={!!errors.name}>
            <TextField
              label="Name"
              name="name"
              className={formClass}
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              sx={formStyle}
              required
            />
            <Fade in={!!errors.name && touched.name} timeout={500}>
              <div>
                {errors.name && touched.name && (
                  <Alert severity="error" className={errorClass}>
                    {errors.name}
                  </Alert>
                )}
              </div>
            </Fade>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth margin="normal" error={!!errors.email}>
            <TextField
              label="Email"
              name="email"
              className={formClass}
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              sx={formStyle}
              required
            />
            <Fade in={!!errors.email && touched.email} timeout={500}>
              <div>
                {errors.email && touched.email && (
                  <Alert severity="error" className={errorClass}>
                    {errors.email}
                  </Alert>
                )}
              </div>
            </Fade>
          </FormControl>
        </Grid2>

        <FormControl fullWidth margin="normal" error={!!errors.subject}>
          <TextField
            label="Subject"
            name="subject"
            className={formClass}
            value={formData.subject}
            onChange={handleChange}
            onBlur={() => handleBlur("subject")}
            sx={formStyle}
            required
          />
          <Fade in={!!errors.subject && touched.subject} timeout={500}>
            <div>
              {errors.subject && touched.subject && (
                <Alert severity="error" className={errorClass}>
                  {errors.subject}
                </Alert>
              )}
            </div>
          </Fade>
        </FormControl>
      </Grid2>

      <FormControl fullWidth margin="normal" error={!!errors.message}>
        <TextField
          label="Message"
          name="message"
          className={formClass}
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
              <Alert severity="error" className={errorClass}>
                {errors.message}
              </Alert>
            )}
          </div>
        </Fade>
      </FormControl>

      <Button
        type="submit"
        className="w-full px-2 py-3"
        variant="contained"
        color="primary"
      >
        <div className="flex justify-between items-center">
          <Typography className="mx-4">Send</Typography>
          <SendIcon />
        </div>
      </Button>

      <Fade in={!!successMessage} timeout={500}>
        <div>
          {successMessage && (
            <Alert severity="success" className={errorClass}>
              {successMessage}
            </Alert>
          )}
        </div>
      </Fade>
    </Box>
  );
}

export default Footer;
