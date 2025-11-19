import { usePageMetadata } from "../hooks/usePageMetadata.js";

export default function CodeOfConductPage() {
  usePageMetadata(
    "Community Code of Conduct | QurioSkill",
    "Community guidelines for QurioSkill learners to ensure respectful, inclusive, and growth-oriented skill training."
  );
  return (
    <div className="page policy-page">
      <p className="eyebrow">Policies</p>
      <h1>Community Code of Conduct</h1>
      <p>
        Welcome to QurioSkill! We are dedicated to fostering a respectful, inclusive, and supportive environment for all members
        of our community. By participating in our services, you agree to abide by this Community Code of Conduct.
      </p>

      <ol className="policy-list">
        <li>
          <h2>1. Respect for Others</h2>
          <ul className="policy-sublist">
            <li>Treat all members with kindness, respect, and professionalism.</li>
            <li>
              Avoid discriminatory, offensive, or inflammatory language, including but not limited to language based on race,
              ethnicity, gender, sexual orientation, religion, disability, or age.
            </li>
            <li>Listen actively and engage in discussions with an open mind.</li>
          </ul>
        </li>

        <li>
          <h2>2. Inclusion and Diversity</h2>
          <ul className="policy-sublist">
            <li>Embrace the diversity of our community by welcoming individuals of all backgrounds and experiences.</li>
            <li>Strive to create an inclusive space where everyone feels valued and heard.</li>
            <li>Avoid behaviours that could exclude or alienate others.</li>
          </ul>
        </li>

        <li>
          <h2>3. Academic Integrity</h2>
          <ul className="policy-sublist">
            <li>Commit to honesty and integrity in your learning journey.</li>
            <li>Do not plagiarize, cheat, or engage in any form of academic dishonesty.</li>
            <li>Respect the intellectual property rights of workshop creators and fellow learners.</li>
          </ul>
        </li>

        <li>
          <h2>4. Constructive Communication</h2>
          <ul className="policy-sublist">
            <li>Engage in discussions and feedback with a constructive, solution-focused mindset.</li>
            <li>Help each other out instead of undermining one another. Constructive feedback is encouraged.</li>
            <li>Respect differing opinions and debate ideas, not individuals.</li>
            <li>Avoid harassment, bullying, or personal attacks.</li>
          </ul>
        </li>

        <li>
          <h2>5. Privacy and Confidentiality</h2>
          <ul className="policy-sublist">
            <li>Respect the privacy of all community members. Do not share personal or sensitive information about others without their consent.</li>
            <li>Keep discussions within the platform confidential unless explicitly stated otherwise.</li>
            <li>Protect your own privacy by being mindful of the information you share.</li>
          </ul>
        </li>

        <li>
          <h2>6. Responsible Use of the Platform</h2>
          <ul className="policy-sublist">
            <li>Use the platform for its intended purpose: to learn, share knowledge, and connect with others.</li>
            <li>Do not engage in spam, unauthorized advertising, or self-promotion outside designated areas.</li>
            <li>Report technical issues or security concerns responsibly through appropriate channels.</li>
          </ul>
        </li>

        <li>
          <h2>7. Enforcement and Accountability</h2>
          <ul className="policy-sublist">
            <li>
              Violations of this Code of Conduct will be evaluated on a case-by-case basis and may result in warnings, suspension,
              or removal from the platform, depending on the severity of the offence.
            </li>
            <li>
              If you witness or experience behaviour that violates this Code, please report it to our support team at{" "}
              <a href="mailto:hello@qurioskill.ca">hello@qurioskill.ca</a>. All reports will be handled with discretion and
              confidentiality.
            </li>
          </ul>
        </li>

        <li>
          <h2>8. Commitment to Growth</h2>
          <ul className="policy-sublist">
            <li>Be open to feedback and continuous improvement, both in your learning and interactions with the community.</li>
            <li>Support others in their growth by sharing resources, encouragement, and constructive advice.</li>
          </ul>
        </li>
      </ol>

      <p>
        By participating in our e-learning platform, you agree to uphold this Community Code of Conduct. Together, we can create a
        positive and enriching learning experience for everyone.
      </p>
      <p>The Code of Conduct is subject to change at any time, and it is your responsibility to review it periodically.</p>
      <p>Thank you for being a valuable member of our community!</p>
    </div>
  );
}
