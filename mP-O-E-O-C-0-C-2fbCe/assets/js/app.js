// بيانات وهمية للتجربة (تبدلها بقاعدة بيانات حقيقية)
const users = [];
const clans = [];
const applications = [];
const bans = [];
const notifications = [];
const banAppeals = [];

// تحقق إذا كان المستخدم مسجل
function isLoggedIn(userId) {
  return users.some(user => user.id === userId);
}

// الحصول على بيانات المستخدم
function getUserById(userId) {
  return users.find(user => user.id === userId);
}

// تسجيل مستخدم جديد
function registerUser(username, password, birthDate, email) {
  if (username.length < 4 || username.length > 20) return 'اسم المستخدم لازم يكون بين 4 و20 حرف';
  if (password.length < 8 || password.length > 24) return 'كلمة المرور لازم تكون بين 8 و24 حرف';
  
  const birthYear = new Date(birthDate).getFullYear();
  if (birthYear >= 2014) return 'العمر غير مقبول للتسجيل';
  if (birthYear >= 2010 && birthYear <= 2013) {
    console.log('تنبيه: عمرك صغير جدا على التسجيل');
  } else {
    console.log('مرحباً بك في الموقع!');
  }
  
  if (users.some(u => u.username === username)) return 'اسم المستخدم مأخوذ';
  
  const newUser = {
    id: users.length + 1,
    username,
    password,
    birthDate,
    email,
    subscription: '1', // الافتراضي مجاني
    clanId: null,
  };
  users.push(newUser);
  return newUser;
}

// تسجيل دخول المستخدم
function loginUser(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return 'بيانات الدخول غير صحيحة';
  return user;
}

// إضافة إشعار جديد (عام)
function addNotification(message, days = 1) {
  const expires = Date.now() + days * 24 * 60 * 60 * 1000;
  notifications.push({ message, expires });
}

// التحقق من صلاحية الاشتراك (كمثال)
function checkSubscription(userId) {
  const user = getUserById(userId);
  if (!user) return false;
  // هنا تضيف شروط الاشتراك لو بغيت
  return true;
}

// تحديث بيانات عامة (مكان لتحديث الإعدادات مثلاً)
function updateSettings(newSettings) {
  // settings = {...settings, ...newSettings}; // مثال لو في متغير settings
  return true;
}

// وظائف أخرى عامة ممكن تضيفها هنا...