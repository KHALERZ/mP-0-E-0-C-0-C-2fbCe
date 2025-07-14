// user.js

// تحميل بيانات المستخدم من localStorage
function loadUserProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  document.getElementById("username").textContent = currentUser.username;
  document.getElementById("email").textContent = currentUser.email;
  document.getElementById("birthdate").textContent = currentUser.birthdate;
  document.getElementById("subscription").textContent = getSubscriptionName(currentUser.subscription);
}

// إرسال طلب انضمام لكلان
function applyToClan(clanId, reason) {
  const applications = JSON.parse(localStorage.getItem("applications")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  const existing = applications.find(app => app.userId === currentUser.id && app.clanId === clanId);
  if (existing) {
    alert("لقد قدمت مسبقاً لهذا الكلان.");
    return;
  }

  if (reason.length < 10 || reason.length > 200) {
    alert("السبب يجب أن يكون بين 10 و200 حرف.");
    return;
  }

  applications.push({
    id: Date.now(),
    userId: currentUser.id,
    clanId: clanId,
    reason: reason,
    status: "pending",
    date: new Date().toISOString()
  });

  localStorage.setItem("applications", JSON.stringify(applications));
  alert("تم إرسال طلب الانضمام.");
}

// متابعة حالة التقديمات
function loadUserApplications() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const applications = JSON.parse(localStorage.getItem("applications")) || [];

  const myApps = applications.filter(app => app.userId === currentUser.id);

  const container = document.getElementById("my-applications");
  container.innerHTML = "";

  myApps.forEach(app => {
    const statusText = translateStatus(app.status);
    const row = document.createElement("div");
    row.innerHTML = `كلان: ${app.clanId} | الحالة: ${statusText}`;
    container.appendChild(row);
  });
}

// حذف الحساب
function deleteUserAccount() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  const updatedUsers = users.filter(user => user.id !== currentUser.id);
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.removeItem("currentUser");

  alert("تم حذف حسابك.");
  window.location.href = "/auth/register.html";
}

// ترجمة الاشتراك
function getSubscriptionName(code) {
  switch(code) {
    case 1: return "Free";
    case 2: return "Beginner";
    case 3: return "Tryhard";
    default: return "Unknown";
  }
}

// ترجمة الحالة
function translateStatus(status) {
  switch (status) {
    case "pending": return "قيد المراجعة";
    case "accepted": return "تم القبول";
    case "rejected": return "مرفوض";
    case "temp-accepted": return "قبول مبدئي";
    case "under-review": return "قيد التحليل";
    default: return "غير معروف";
  }
}