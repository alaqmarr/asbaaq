"use client";

import BackButton from "./auth/BackButton";
import Header from "./auth/Header";
import Social from "./auth/Social";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButton: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButton,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-fir max-w-[70vw] shadow-md">
      <CardHeader>
        <Header headerLabel={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          backButtonLabel={backButton}
          backButtonHref={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
