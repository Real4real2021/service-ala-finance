const salarySlipButton = document.getElementById('salary-slip-button');
const leavesButton = document.getElementById('leaves-button');
const holidaysButton = document.getElementById('holidays-button');
const mainDiv = document.querySelector('.my-profile');
const paswordEditingDiv = document.querySelector('.password-editing');
const profilePhoto = document.getElementById('profile-photo');

renderProfileInfo();

salarySlipButton.addEventListener('click', ()=>{
    let html = `
    <h1>Salaries</h1>
        <h2>Salary Slips</h2>
        <table>
            <th>SALARY MONTH</th>
            <th>EARNINGS</th>
            <th>DEDUCTIONS</th>
            <th>NET SALARY</th>
            <th>ACTIONS</th>
            <tbody>
                <tr>
                    <td>Apri, 2024</td>
                    <td>58, 000.00</td>
                    <td>5, 510.00</td>
                    <td>52, 490.00</td>
                    <td><input type="button" value="Download"></td>
                </tr>
            </tbody>
        </table>
    `
    mainDiv.innerHTML = html;
});

leavesButton.addEventListener('click', () => {
    let html = `
    <h1>Leaves</h1>
        <h2>Apply for Leave</h2>
        <div class="leave-details-input">
            <label for="leave-subject">Leave Subject:
                <input type="text" id="leave-subject-input">
            </label><br>
            <label for="leaves-dates">Leave Dates:
                <input type="date" id="leaves-dates-input">
            </label><br>
            <label for="leave-message">Leave Message:
                <input type="text" id="leave-message-input">
            </label><br>
            <label for="leave-type">Leave Type:
                <select name="leave-type-selector" id="leave-type-selector">
                    <option value="please-make-a-choice">Please make a choice</option>
                    <option value="casual-leave">Casual Leave</option>
                    <option value="privileged-earned-leave">Privileged/Earned Leave</option>
                    <option value="medical-sick-leave">Medical/Sick Leave</option>
                    <option value="materniry-leave">Maternity Leave</option>
                    <option value="leave-without-pay">Leave Without Pay</option>
                </select><br>
            </label>
            <input type="button" value="Apply for Leave" id="apply-for-leave-button">
        </div>
        <div class="display-leave-details">
            <table>
                <th>SUBJECT</th>
                <th>DATES</th>
                <th>MESSAGE</th>
                <th>TYPE</th>
                <th>STATUS</th>
                <tbody>
                    <tr>
                        <td>Leave for a week</td>
                        <td>04/15/2024 to 04/23/2024</td>
                        <td>Reason for leave</td>
                        <td>Sick Leave</td>
                        <td>Approved</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
    mainDiv.innerHTML = html;
});

holidaysButton.addEventListener('click', () => {
   let html = `
   
        <h1>Holidays</h1>
        <h2>List of Holidays</h2>
        <div class="holidays-table">
            <table>
                <th>HOLIDAY</th>
                <th>HOLIDAY TITLE</th>
                <th>HOLIDAY DESCRIPTION</th>
                <th>HOLIDAY DATE</th>
                <th>HOLIDAY TYPE</th>
            </table>
        </div>
    
   ` 
   mainDiv.innerHTML = html;
});

profilePhoto.addEventListener('click', () => {
    renderProfileInfo();
})

function renderProfileInfo(){

    let mainHTML = `
    <h1>My Profile</h1>
        <h2>Edit Profile Details</h2>
        <div class="edit-details-fields">
            <label for="first-name">First Name:
                <input type="text" id="first-name-input">
            </label>
            <label for="last-name">Last Name:
                <input type="text" id="last-name-input">
            </label>
            <label for="date-of-birth">Date of Birth(MM/DD/YYYY):
                <input type="date" id="date-input">
            </label>
            <label for="gender-selector">Gender:
                <select name="gender-selector" id="gender-selector">
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
            </label><br>
            <label for="address">Address:
                <input type="text" id="address-input">
            </label><br>
            <label for="city">City:
                <input type="text" id="city-input">
            </label>
            <label for="province">Province:
                <input type="text" id="province-input">
            </label>
            <label for="country">Country:
                <input type="text" id="country-input">
            </label>
            <label for="marital-status">Marital Status:
                <select name="marital-status-selector" id="marital-status-selector">
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                </select>
            </label><br>
            <label for="nationality">Nationality:
                <input type="text" id="nationality-input">
            </label>
            <label for="email">Email:
                <input type="text" id="email-input">
            </label>
            <label for="mobile">Mobile:
                <input type="text" id="mobile-input">
            </label>
            <label for="telephone">Telephone:
                <input type="text" id="telephone-input">
            </label><br>
            <label for="identity-document">Identity Document:
                <select name="identity-document-selector" id="identity-document-selector">
                    <option value="id">Id</option>
                    <option value="passporty">Passport</option>
                </select>
            </label>
            <label for="identity-number">Identity Number:
                <input type="text" id="identity-number-input">
            </label>
            <label for="employment-type">Employment Type:
                <input type="text" id="employment-type-input">
            </label>
            <label for="joining-date">Joining Date:
                <input type="date" id="joining-date-input">
            </label><br>
            <label for="blood-group">Blood Group:
                <input type="text" id="blood-group-input">
            </label>
            <label for="designation">Designation:
                <input type="text" id="designation-input">
            </label>
            <label for="department">Department:
                <input type="text" id="department-input">  
            </label><br>
            <label for="bank-name">Bank Name:
                <input type="text" id="bank-name-input">
            </label>
            <label for="bank-ac-no">Bank A/C No:
                <input type="text" id="bank-ac-no-input">
            </label>
        </div>
    `
    let secHTML = `
    <label for="existing-password">Existing Password:
            <input type="text" id="existing-password-input">
        </label><br>
        <label for="new-password">New Password:
            <input type="password" id="new-password-input">
        </label><br>
        <label for="confirm-password">Confirm Password:
            <input type="password" id="confirm-password-input">
        </label>
    `
    mainDiv.innerHTML = mainHTML
    paswordEditingDiv.innerHTML = secHTML
}