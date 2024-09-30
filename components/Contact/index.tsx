import { Card, CardContent, Typography, Button } from "@mui/material";
import FooterSocials from "../Socials/footer";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ContactCard() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Card
      className={`${
        theme === "dark" ? "text-white" : "text-black"
      } p-4 rounded-lg w-full h-full flex flex-col`}
      sx={{
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        background: `${theme === "dark" ? "#121313" : "white"}`,
        border:
          theme === "dark"
            ? "1px solid rgba(255, 255, 255, 0.125)"
            : "1px solid rgba(0, 0, 0, 0.15)",
      }}
    >
      <CardContent className="flex-grow">
        <h1>Aaryan Patel</h1>

        <h1 className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
          University of Waterloo
        </h1>
        <h2 className="text-gray-500">
          Computer Science & Artificial Intelligence
        </h2>
        <h2 className="text-gray-500">Minor in Economics</h2>

        <div className="flex justify-center my-4">
          <Image
            className="transition duration-300 ease-out"
            src={"/profile.png"}
            alt="profile"
            width={169}
            height={169}
          />
        </div>
      </CardContent>

      <FooterSocials />
    </Card>
  );
}

export default ContactCard;
