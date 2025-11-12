export const initializeContact = () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmission);
  }
};

const handleFormSubmission = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // Show success message
  showSuccessMessage();

  // Reset form
  event.target.reset();

  console.log("Contact form submitted:", data);
};

const showSuccessMessage = () => {
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Message Sent!";
  submitBtn.style.background = "var(--secondary)";
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.style.background = "var(--primary)";
    submitBtn.disabled = false;
  }, 3000);
};
