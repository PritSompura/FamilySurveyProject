document.addEventListener("DOMContentLoaded", function () {
  const membersContainer = document.getElementById("membersContainer");
  const addMemberBtn = document.getElementById("addMemberBtn");
  const template = document.getElementById("memberTemplate");
  const form = document.getElementById("surveyForm");

  // ---------------------------------------------------------------
  // Add a new member block (cloned from <template>)
  // ---------------------------------------------------------------
  function addMember() {
    const clone = template.content.cloneNode(true);
    membersContainer.appendChild(clone);
    renumberMembers();
    attachValidationHandlers(membersContainer.lastElementChild);
  }

  function renumberMembers() {
    const cards = membersContainer.querySelectorAll(".member-card");
    cards.forEach((card, idx) => {
      const label = card.querySelector(".memberIndex");
      if (label) label.textContent = idx + 1;
    });
  }

  function removeMember(btn) {
    const card = btn.closest(".member-card");
    const totalCards = membersContainer.querySelectorAll(".member-card").length;
    if (totalCards <= 1) {
      alert("कम से कम एक सदस्य आवश्यक है (At least one member is required).");
      return;
    }
    card.remove();
    renumberMembers();
  }

  membersContainer.addEventListener("click", function (e) {
    const removeBtn = e.target.closest(".removeMemberBtn");
    if (removeBtn) {
      removeMember(removeBtn);
    }
  });

  if (addMemberBtn) {
    addMemberBtn.addEventListener("click", addMember);
  }

  // On the "Add Family" page there are no pre-existing member cards, so
  // start with one empty member block automatically.
  if (membersContainer.querySelectorAll(".member-card").length === 0) {
    addMember();
  }

  // ---------------------------------------------------------------
  // Validation helpers
  // ---------------------------------------------------------------
  const AADHAAR_REGEX = /^\d{12}$/;
  const MOBILE_REGEX = /^[6-9]\d{9}$/;

  function isValidDobOrAge(value) {
    if (!value) return true; // optional
    value = value.trim();
    if (/^\d+$/.test(value)) {
      const age = parseInt(value, 10);
      return age > 0 && age < 120;
    }
    // Accept YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const d = new Date(value);
      return !isNaN(d.getTime());
    }
    return false;
  }

  function validateField(input) {
    let valid = true;

    if (input.classList.contains("aadhaar-field")) {
      valid = input.value.trim() === "" || AADHAAR_REGEX.test(input.value.trim());
    } else if (input.classList.contains("mobile-field")) {
      valid = input.value.trim() === "" || MOBILE_REGEX.test(input.value.trim());
    } else if (input.classList.contains("dob-field")) {
      valid = isValidDobOrAge(input.value);
    } else if (input.hasAttribute("required")) {
      valid = input.value.trim() !== "";
    }

    input.classList.toggle("is-invalid", !valid);
    return valid;
  }

  function attachValidationHandlers(scope) {
    const fields = scope.querySelectorAll(
      ".aadhaar-field, .mobile-field, .dob-field, [required]"
    );
    fields.forEach((field) => {
      field.addEventListener("input", () => validateField(field));
      field.addEventListener("blur", () => validateField(field));
    });
  }

  attachValidationHandlers(membersContainer);

  // ---------------------------------------------------------------
  // Full-form validation before submit
  // ---------------------------------------------------------------
  if (form) {
    form.addEventListener("submit", function (e) {
      let formValid = true;
      const fieldsToCheck = form.querySelectorAll(
        ".aadhaar-field, .mobile-field, .dob-field, [required]"
      );
      fieldsToCheck.forEach((field) => {
        if (!validateField(field)) {
          formValid = false;
        }
      });

      if (!formValid) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        alert("कृपया लाल निशान वाले फ़ील्ड सही करें (Please fix the highlighted fields before submitting).");
      }
    });
  }
});
