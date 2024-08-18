let currentSection = document.getElementById('section').value;


function updateSection() {
    currentSection = document.getElementById('section').value;
    document.getElementById('total-classes').textContent = `Total Classes Conducted: ${calculateTotalClasses()}`;
}

function calculateTotalClasses() {
    const startDate = new Date('2024-08-05');
    const today = new Date();
    const dayInMillis = 24 * 60 * 60 * 1000;
    let totalClasses = 0;

    for (let date = startDate; date <= today; date = new Date(date.getTime() + dayInMillis)) {
        const day = date.getDay();
        if (currentSection === 'nwtn' && day !== 0 && day !== 3) { 
            totalClasses += 8;
        } else if (currentSection === 'wtn' && day !== 0) {
            totalClasses += 8;
        }
    }
    return totalClasses;
}
function calculateAttendance() {
    const holidays = parseInt(document.getElementById('holidays').value) || 0;
    const bunkedDays = parseInt(document.getElementById('bunkedDays').value) || 0;
    const bunkedClasses = parseInt(document.getElementById('bunkedClasses').value) || 0;

    if (holidays < 0 || bunkedDays < 0 || bunkedClasses < 0) {
        alert("Please enter positive values.");
        return;
    }

    const totalClasses = calculateTotalClasses();
    const maxPossibleClasses = totalClasses - (holidays * 8);

    if ((bunkedDays * 8 + bunkedClasses) > maxPossibleClasses) {
        alert("Bunked classes exceed the total conducted classes. Please check your input.");
        return;
    }

    const effectiveTotalClasses = maxPossibleClasses;
    const attendedClasses = effectiveTotalClasses - (bunkedDays * 8) - bunkedClasses;
    const percentage = (attendedClasses / effectiveTotalClasses) * 100;

    const resultElement = document.getElementById('result');

    if (percentage >= 75) {
        resultElement.className = 'result pass';
    } else if (percentage >= 50) {
        resultElement.className = 'result warning';
    } else {
        resultElement.className = 'result fail';
    }

    resultElement.textContent = `Your Attendance is ${percentage.toFixed(2)}%`;

    showModal(percentage);
}


function showModal(percentage) {
    const modal = document.getElementById("attendanceModal");
    const modalMessage = document.getElementById("modalMessage");

    if (percentage >= 90) {
        modalMessage.textContent = "Great job! Keep working hard, you will succeed one day!";
    } else if(percentage >= 85){
        modalMessage.textContent = "Your attendance is near to 85%.Be Regular to the classes or else you may be removed from CRT soon.";
    }
    else {
        modalMessage.textContent = "Your attendance is below 85% if it still remains same by the end of the week,sure you will removed from CRT.";
    }

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("attendanceModal").style.display = "none";
}

document.getElementById('total-classes').textContent = `Total Classes Conducted: ${calculateTotalClasses()}`;
