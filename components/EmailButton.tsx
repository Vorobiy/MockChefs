import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  userEmail: string;
  verificationUrl: string;
  companyName?: string; // optional
}

const VerificationEmail = ({
  userEmail,
  verificationUrl,
  companyName = "Our Team",
}: VerificationEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-green-50 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] border border-green-100 bg-white p-[40px] shadow-sm">
            {/* Header */}
            <Section className="mb-[32px] text-center">
              <Text className="m-0 text-[24px] font-bold text-green-800">
                Verify Your Email Address
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="mb-[16px] text-[16px] leading-[24px] text-green-700">
                Hi there!
              </Text>
              <Text className="mb-[16px] text-[16px] leading-[24px] text-green-700">
                Thank you for signing up with {companyName}. To complete your
                registration and start using your account, please verify your
                email address by clicking the button below.
              </Text>
              <Text className="mb-[24px] text-[16px] leading-[24px] text-green-700">
                We sent this verification email to:{" "}
                <strong className="text-green-800">{userEmail}</strong>
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="mb-[32px] text-center">
              <Button
                href={verificationUrl}
                className="box-border inline-block rounded-[8px] bg-green-600 px-[32px] py-[12px] text-[16px] font-semibold text-white no-underline hover:bg-green-700"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="mb-[8px] text-[14px] leading-[20px] text-green-600">
                If the button above doesn&apos;t work, copy and paste this link
                into your browser:
              </Text>
              <Text className="rounded-[4px] bg-green-50 p-[8px] font-mono text-[14px] leading-[20px] break-all text-green-700">
                {verificationUrl}
              </Text>
            </Section>

            <Hr className="my-[24px] border-green-200" />

            {/* Security Notice */}
            <Section className="mb-[24px]">
              <Text className="mb-[8px] text-[14px] leading-[20px] text-green-700">
                <strong className="text-green-800">Security Notice:</strong>
              </Text>
              <Text className="text-[14px] leading-[20px] text-green-600">
                This verification link will expire in 24 hours for security
                reasons. If you didn&apos;t create an account with {companyName}
                , please ignore this email.
              </Text>
            </Section>

            <Hr className="my-[24px] border-green-200" />

            {/* Footer */}
            <Section>
              <Text className="m-0 text-[12px] leading-[16px] text-green-500">
                © 2025 {companyName}. All rights reserved.
              </Text>
              <Text className="m-0 text-[12px] leading-[16px] text-green-500">
                123 Business Street, Toronto, ON M5V 3A1, Canada
              </Text>
              <Text className="m-0 text-[12px] leading-[16px] text-green-500">
                If you have any questions, contact us at support@
                {companyName.toLowerCase().replace(/\s+/g, "")}.com
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;

// Preview inside Resend UI
VerificationEmail.PreviewProps = {
  userEmail: "eugenevorob@gmail.com",
  verificationUrl: "https://yourapp.com/verify?token=abc123xyz789",
  companyName: "MockChefs",
};
