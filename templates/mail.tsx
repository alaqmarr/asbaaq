import * as React from "react";

interface EmailTemplateProps {
  name: string;
  its: string;
  email: string;
  verificationToken: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  its,
  email,
  verificationToken,
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
  </div>
);
