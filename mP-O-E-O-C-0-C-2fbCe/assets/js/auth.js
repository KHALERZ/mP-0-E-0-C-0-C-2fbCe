// تسجيل الدخول
function login(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    // التوجيه حسب نوع الحساب
    if (user.role === 'founder') {
      window.location.href = '/clans/clan-dashboard.html';
    } else if (user.role === 'admin') {
      window.location.href = '/admin/admin-dashboard.html';
    } else {
      window.location.href = '/auth/user-dashboard.html';
    }
  } else {
    alert('بيانات الدخول غير صحيحة');
  }
}

// تسجيل حساب جديد
function register(username, password, email, birthYear) {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (username.length < 4 || username.length > 20) {
    alert('اسم المستخدم يجب أن يكون بين 4 و 20 حرف');
    return;
  }

  if (password.length < 8 || password.length > 24) {
    alert('كلمة المرور يجب أن تكون بين 8 و 24 حرف');
    return;
  }

  if (birthYear >= 2014) {
    alert('عذراً، عمرك صغير جدًا للتسجيل.');
    return;
  } else if (birthYear >= 2010 && birthYear <= 2013) {
    alert('تنبيه: عمرك صغير جدًا على التسجيل.');
  }

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    alert('اسم المستخدم مستخدم مسبقًا');
    return;
  }

  const newUser = {
    username,
    password,
    email,
    birthYear,
    role: null,
    subscription: 1 // افتراضي: مجاني
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('loggedInUser', JSON.stringify(newUser));

  window.location.href = '/auth/create-profile.html';
}

// تحديد نوع الحساب بعد التسجيل
function setUserRole(role) {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) return;

  user.role = role;
  
  // تحديث البيانات
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const index = users.findIndex(u => u.username === user.username);
  if (index !== -1) {
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  // توجيه للوحة التحكم المناسبة
  if (role === 'founder') {
    window.location.href = '/clans/clan-dashboard.html';
  } else if (role === 'admin') {
    window.location.href = '/admin/admin-dashboard.html';
  } else {
    window.location.href = '/auth/user-dashboard.html';
  }
}

// تسجيل الخروج
function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = '/auth/login.html';
}

// التحقق من حالة الدخول
function isLoggedIn() {
  return !!localStorage.getItem('loggedInUser');
}

// الحصول على المستخدم الحالي
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}