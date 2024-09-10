document.addEventListener('DOMContentLoaded', function () {
    // Get the form, resume elements, and buttons
    var form = document.getElementById('resume-form');
    var resume = document.getElementById('finalresume');
    var generateResumeBtn = document.querySelector('.button');
    var printButton = document.querySelector('.print');
    var editButton = document.querySelector('.edit');
    var downloadButton = document.querySelector('.download');
    var resumeData = {
        name: '',
        email: '',
        phone: '',
        objective: '',
        education: '',
        workExperience: '',
        skills: [],
    };
    // Function to validate form data
    function validateFormData(data) {
        if (!data.name || !data.email || !data.phone || !data.objective || !data.education || !data.workExperience || !data.skills.length) {
            alert('Please fill in all the fields');
            return false;
        }
        if (!data.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            alert('Please enter a valid email');
            return false;
        }
        if (!data.phone.match(/^(\+92|03)\d{9}$/)) {
            alert('Please enter a valid phone number');
            return false;
        }
        return true;
    }
    // Function to generate resume HTML
    function generateResume() {
        if (!validateFormData(resumeData))
            return;
        var skillsList = resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('');
        var resumeHTML = "\n        <h1>".concat(resumeData.name, "</h1>\n        <p>").concat(resumeData.email, " <b>|</b> ").concat(resumeData.phone, "</p>\n        <h2>Objective</h2>\n        <p>").concat(resumeData.objective, "</p>\n        <h2>Education</h2>\n        <p>").concat(resumeData.education, "</p>\n        <h2>Work Experience</h2>\n        <p>").concat(resumeData.workExperience, "</p>\n        <h2>Skills</h2>\n        <ul>").concat(skillsList, "</ul>\n    ");
        resume.innerHTML = resumeHTML;
        resume.style.display = 'block';
        form.style.display = 'none';
        printButton.style.display = 'block';
        editButton.style.display = 'block';
    }
    // Function to handle the "Edit" button click
    function handleEdit() {
        resume.style.display = 'none';
        form.style.display = 'block';
        printButton.style.display = 'none';
        editButton.style.display = 'none';
    }
    // Event listener for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Get the form data
        var formData = new FormData(form);
        formData.forEach(function (value, key) {
            if (key === 'skills') {
                resumeData[key] = value.toString().split(',').filter(function (skill) { return skill.trim() !== ''; });
            }
            else {
                resumeData[key] = value.toString();
            }
        });
        generateResume();
    });
    // });
    // Event listener for print button
    printButton === null || printButton === void 0 ? void 0 : printButton.addEventListener('click', function () {
        // Ensure resume is visible before printing
        resume.style.display = 'block';
        form.style.display = 'none';
        printButton.style.display = 'none';
        editButton.style.display = 'none';
        // Delay to ensure content is rendered
        setTimeout(function () {
            window.print();
            // Reset display properties after printing
            resume.style.display = 'block';
            form.style.display = 'none';
            printButton.style.display = 'block';
            editButton.style.display = 'block';
        }, 500);
    });
    // // Event listener for edit button
    editButton === null || editButton === void 0 ? void 0 : editButton.addEventListener('click', handleEdit);
    // Print-specific CSS class to hide certain elements
    var style = document.createElement('style');
    style.textContent = "\n    @media print {\n        .printing, .printing * {\n            display: none !important;\n        }\n    }\n";
    document.head.appendChild(style);
});
