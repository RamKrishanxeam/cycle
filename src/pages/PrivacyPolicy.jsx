import React from "react";
import Layout from "../layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Privacy Policy</h1>
            <p>
              Welcome to <strong>[Your App Name]</strong>. Your privacy is
              important to us. This Privacy Policy explains how we collect, use,
              and protect your personal information.
            </p>

            <h3 className="mt-4">1. Information We Collect</h3>
            <p>
              We collect information such as your name, email, and usage data to
              improve our services.
            </p>

            <h3 className="mt-4">2. How We Use Your Information</h3>
            <p>
              We use your information to personalize your experience, improve
              our platform, and provide customer support.
            </p>

            <h3 className="mt-4">3. Data Protection</h3>
            <p>
              We implement security measures to protect your personal data from
              unauthorized access.
            </p>

            <h3 className="mt-4">4. Data Deletion</h3>
            <p>
              If you wish to delete your data, contact us at{" "}
              <a href="mailto:support@example.com">support@example.com</a>.
            </p>

            <h3 className="mt-4">5. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a href="mailto:support@example.com">support@example.com</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
