
document.addEventListener('DOMContentLoaded', () =>{
  
// Get the form, resume elements, and buttons
const form = document.getElementById('resume-form') as HTMLFormElement;
const resume = document.getElementById('finalresume') as HTMLDivElement;
const generateResumeBtn = document.querySelector('.button') as HTMLButtonElement;
const printButton = document.querySelector('.print') as HTMLButtonElement;
const editButton = document.querySelector('.edit') as HTMLButtonElement;
const downloadButton = document.querySelector('.download') as HTMLButtonElement;

// Define the resume data interface and initial state
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    objective: string;
    education: string;
    workExperience: string;
    skills: string[];
}

const resumeData: ResumeData = {
    name: '',
    email: '',
    phone: '',
    objective: '',
    education: '',
    workExperience: '',
    skills: [],
};

// Function to validate form data
function validateFormData(data: ResumeData): boolean {
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
    if (!validateFormData(resumeData)) return;

    const skillsList = resumeData.skills.map(skill => `<li>${skill}</li>`).join('');
    const resumeHTML = `
        <h1>${resumeData.name}</h1>
        <p>${resumeData.email} <b>|</b> ${resumeData.phone}</p>
        <h2>Objective</h2>
        <p>${resumeData.objective}</p>
        <h2>Education</h2>
        <p>${resumeData.education}</p>
        <h2>Work Experience</h2>
        <p>${resumeData.workExperience}</p>
        <h2>Skills</h2>
        <ul>${skillsList}</ul>
    `;

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
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get the form data
    const formData = new FormData(form);
    formData.forEach((value, key) => {
        if (key === 'skills') {
            resumeData[key] = value.toString().split(',').filter(skill => skill.trim() !== '');
        } else {
            resumeData[key] = value.toString();
        }
    });
    
    generateResume();
});


    
// });
// Event listener for print button
printButton?.addEventListener('click', () => {
    // Ensure resume is visible before printing
    resume.style.display = 'block';
    form.style.display = 'none';
    printButton.style.display = 'none';
    editButton.style.display = 'none';

    // Delay to ensure content is rendered
    setTimeout(() => {
        window.print();
        
        // Reset display properties after printing
        resume.style.display = 'block';
        form.style.display = 'none';
        printButton.style.display = 'block';
        editButton.style.display = 'block';
    }, 500);
});


// // Event listener for edit button
editButton?.addEventListener('click', handleEdit);



// Print-specific CSS class to hide certain elements
const style = document.createElement('style');
style.textContent = `
    @media print {
        .printing, .printing * {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);
} )