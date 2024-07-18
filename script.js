// script.js

document.addEventListener('DOMContentLoaded', function () {
    const uploadPic = document.getElementById('upload-pic');
    const profilePic = document.getElementById('profile-pic');
    const downloadBtn = document.getElementById('download');
    const resumeWrapper = document.getElementById('resume-wrapper');
    const downloadContainer = document.querySelector('.download-container');

    // Handle profile picture upload
    uploadPic.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle resume download as PDF
    downloadBtn.addEventListener('click', function () {
        downloadContainer.style.display = 'none'; // Hide the download button

        html2canvas(resumeWrapper, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('resume.pdf');
            downloadContainer.style.display = 'block'; // Show the download button again
        });
    });
});
