// Simulated database - In production, this would be API calls
let users = [
  {
    userId: 'IFIC-L-2025-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'learner',
    password: 'P@ssw0rd123',
    createdDate: '2025-10-20',
    emailStatus: 'sent',
    emailSentDate: '2025-10-20 10:30 AM',
    firstLogin: true
  },
  {
    userId: 'IFIC-T-2025-001',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'tutor',
    password: 'Secure#456',
    createdDate: '2025-10-21',
    emailStatus: 'pending',
    emailSentDate: null,
    firstLogin: false
  },
  {
    userId: 'IFIC-L-2025-002',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    role: 'learner',
    password: 'Learn$789',
    createdDate: '2025-10-22',
    emailStatus: 'sent',
    emailSentDate: '2025-10-22 02:15 PM',
    firstLogin: false
  }
];

let userSequence = {
  learner: 3,
  tutor: 2,
  admin: 1
};

// Generate User ID
function generateUserId(role) {
  const year = new Date().getFullYear();
  const roleCode = role === 'learner' ? 'L' : role === 'tutor' ? 'T' : 'A';
  const sequence = String(userSequence[role]).padStart(3, '0');
  userSequence[role]++;
  return `IFIC-${roleCode}-${year}-${sequence}`;
}

// Generate Random Password
function generatePassword() {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  
  // Ensure at least one of each type
  password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
  password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  password += "0123456789"[Math.floor(Math.random() * 10)];
  password += "!@#$%^&*"[Math.floor(Math.random() * 8)];
  
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  
  // Shuffle password
  password = password.split('').sort(() => Math.random() - 0.5).join('');
  
  document.getElementById('userPassword').value = password;
  document.getElementById('userPassword').type = 'text';
  
  setTimeout(() => {
    document.getElementById('userPassword').type = 'password';
  }, 3000);
}

// Create User Form Submission
document.getElementById('createUserForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  const role = document.getElementById('userRole').value;
  let password = document.getElementById('userPassword').value;
  
  // Generate password if empty
  if (!password) {
    password = generateRandomPassword();
  }
  
  // Generate User ID
  const userId = generateUserId(role);
  
  // Create user object
  const newUser = {
    userId: userId,
    name: name,
    email: email,
    role: role,
    password: password,
    createdDate: new Date().toISOString().split('T')[0],
    emailStatus: 'sent',
    emailSentDate: new Date().toLocaleString(),
    firstLogin: false
  };
  
  // Add to users array
  users.push(newUser);
  
  // Display credentials
  displayCredentials(newUser);
  
  // Simulate sending email
  sendCredentialEmail(newUser);
  
  // Update table
  updateUsersTable();
  
  // Reset form
  this.reset();
  
  // Show success message
  showNotification('User created successfully! Credentials sent to ' + email);
});

function generateRandomPassword() {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
  password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  password += "0123456789"[Math.floor(Math.random() * 10)];
  password += "!@#$%^&*"[Math.floor(Math.random() * 8)];
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Display Generated Credentials
function displayCredentials(user) {
  const display = document.getElementById('credentialsDisplay');
  document.getElementById('displayUserId').textContent = user.userId;
  document.getElementById('displayEmail').textContent = user.email;
  document.getElementById('displayPassword').textContent = user.password;
  
  const loginUrl = user.role === 'learner' 
    ? window.location.origin + '/learner-login.html'
    : window.location.origin + '/tutor-login.html';
  document.getElementById('displayLoginUrl').textContent = loginUrl;
  
  display.style.display = 'block';
  display.scrollIntoView({ behavior: 'smooth' });
}

// Send Credential Email (simulated)
function sendCredentialEmail(user) {
  console.log('Sending email to:', user.email);
  console.log('Subject: Your IFIC e-Learning Credentials');
  console.log('Body:', `
    Dear ${user.name},
    
    Your IFIC e-Learning account has been created successfully.
    
    Login Credentials:
    User ID: ${user.userId}
    Password: ${user.password}
    Login URL: ${user.role === 'learner' ? 'learner-login.html' : 'tutor-login.html'}
    
    Please change your password after first login.
    
    Best regards,
    IFIC e-Learning Team
  `);
  
  // In production, this would be an API call to email service
}

// Copy Credentials to Clipboard
function copyCredentials() {
  const userId = document.getElementById('displayUserId').textContent;
  const email = document.getElementById('displayEmail').textContent;
  const password = document.getElementById('displayPassword').textContent;
  const loginUrl = document.getElementById('displayLoginUrl').textContent;
  
  const text = `IFIC e-Learning Credentials\n\nUser ID: ${userId}\nEmail: ${email}\nPassword: ${password}\nLogin URL: ${loginUrl}`;
  
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Credentials copied to clipboard!');
  });
}

// Resend Email
function resendEmail() {
  const email = document.getElementById('displayEmail').textContent;
  showNotification('Credentials resent to ' + email);
}

// Print Credentials as PDF
function printCredentials() {
  window.print();
}

// Update Users Table
function updateUsersTable() {
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = '';
  
  users.forEach(user => {
    const row = createUserRow(user);
    tbody.appendChild(row);
  });
}

function createUserRow(user) {
  const row = document.createElement('tr');
  
  const roleBadgeClass = user.role === 'learner' ? 'learner-badge' : 'tutor-badge';
  const emailStatusClass = user.emailStatus === 'sent' ? 'status-sent' : 'status-pending';
  const firstLoginStatus = user.firstLogin ? 'status-completed' : 'status-pending';
  const firstLoginText = user.firstLogin ? 'Yes' : 'No';
  
  row.innerHTML = `
    <td>${user.userId}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td><span class="role-badge ${roleBadgeClass}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
    <td>${user.createdDate}</td>
    <td><span class="${emailStatusClass}">${user.emailStatus.charAt(0).toUpperCase() + user.emailStatus.slice(1)}</span></td>
    <td><span class="${firstLoginStatus}">${firstLoginText}</span></td>
    <td>
      <button class="btn-icon resend-icon" onclick="resendCredentials('${user.userId}')" title="Resend Credentials">📧</button>
      <button class="btn-icon view-icon" onclick="viewUser('${user.userId}')" title="View Details">👁️</button>
      <button class="btn-icon reset-icon" onclick="resetPassword('${user.userId}')" title="Reset Password">🔒</button>
    </td>
  `;
  
  return row;
}

// Resend Credentials
function resendCredentials(userId) {
  const user = users.find(u => u.userId === userId);
  if (user) {
    sendCredentialEmail(user);
    user.emailStatus = 'sent';
    user.emailSentDate = new Date().toLocaleString();
    updateUsersTable();
    showNotification('Credentials resent to ' + user.email);
  }
}

// View User Details
function viewUser(userId) {
  const user = users.find(u => u.userId === userId);
  if (user) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
      <div class="user-details">
        <p><strong>User ID:</strong> ${user.userId}</p>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Role:</strong> ${user.role}</p>
        <p><strong>Created Date:</strong> ${user.createdDate}</p>
        <p><strong>Email Status:</strong> ${user.emailStatus}</p>
        <p><strong>Email Sent Date:</strong> ${user.emailSentDate || 'N/A'}</p>
        <p><strong>First Login:</strong> ${user.firstLogin ? 'Yes' : 'No'}</p>
        <p><strong>Password:</strong> <span style="filter: blur(5px);">${user.password}</span> <button class="btn-small" onclick="revealPassword('${user.userId}')">Show</button></p>
      </div>
    `;
    document.getElementById('userModal').style.display = 'block';
  }
}

function revealPassword(userId) {
  const user = users.find(u => u.userId === userId);
  if (user) {
    alert('Password: ' + user.password);
  }
}

// Reset Password
function resetPassword(userId) {
  const user = users.find(u => u.userId === userId);
  if (user) {
    const newPassword = generateRandomPassword();
    user.password = newPassword;
    sendCredentialEmail(user);
    showNotification('Password reset for ' + user.name + '. New credentials sent via email.');
  }
}

// Close Modal
function closeModal() {
  document.getElementById('userModal').style.display = 'none';
}

// Upload CSV
function uploadCSV() {
  const fileInput = document.getElementById('csvFile');
  const file = fileInput.files[0];
  
  if (!file) {
    showNotification('Please select a CSV file', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const lines = text.split('\n');
    let created = 0;
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const [name, email, role] = line.split(',').map(s => s.trim());
      
      if (name && email && role) {
        const userId = generateUserId(role.toLowerCase());
        const password = generateRandomPassword();
        
        const newUser = {
          userId: userId,
          name: name,
          email: email,
          role: role.toLowerCase(),
          password: password,
          createdDate: new Date().toISOString().split('T')[0],
          emailStatus: 'sent',
          emailSentDate: new Date().toLocaleString(),
          firstLogin: false
        };
        
        users.push(newUser);
        sendCredentialEmail(newUser);
        created++;
      }
    }
    
    updateUsersTable();
    showNotification(`${created} users created successfully!`);
    fileInput.value = '';
  };
  
  reader.readAsText(file);
}

// Search and Filter
document.getElementById('searchUsers').addEventListener('input', filterUsers);
document.getElementById('filterRole').addEventListener('change', filterUsers);
document.getElementById('filterStatus').addEventListener('change', filterUsers);

function filterUsers() {
  const searchTerm = document.getElementById('searchUsers').value.toLowerCase();
  const roleFilter = document.getElementById('filterRole').value;
  const statusFilter = document.getElementById('filterStatus').value;
  
  const filtered = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm) ||
                         user.email.toLowerCase().includes(searchTerm) ||
                         user.userId.toLowerCase().includes(searchTerm);
    
    const matchesRole = !roleFilter || user.role === roleFilter;
    
    let matchesStatus = true;
    if (statusFilter === 'sent') matchesStatus = user.emailStatus === 'sent';
    if (statusFilter === 'pending') matchesStatus = user.emailStatus === 'pending';
    if (statusFilter === 'first_login') matchesStatus = !user.firstLogin;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = '';
  filtered.forEach(user => {
    tbody.appendChild(createUserRow(user));
  });
}

// Notification System
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('userModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// Initialize on page load
window.addEventListener('load', function() {
  updateUsersTable();
});