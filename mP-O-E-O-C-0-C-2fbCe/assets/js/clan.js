// clan.js

// إنشاء كلان جديد
function createClan(clanData) {
    const clans = getData('clans');
    const users = getData('users');
    const currentUser = getUser();

    if (clans.find(c => c.name.toLowerCase() === clanData.name.toLowerCase())) {
        return alert('اسم الكلان مستخدم مسبقاً.');
    }
    if (clanData.name.toLowerCase() === 'nothing') {
        return alert('اسم الكلان هذا غير مسموح.');
    }
    if (clanData.name.length < 3) {
        return alert('اسم الكلان يجب أن لا يقل عن 3 أحرف.');
    }

    const newClan = {
        id: generateId(),
        name: clanData.name,
        description: clanData.description,
        founder: currentUser.username,
        members: [currentUser.username],
        applications: [],
        bannedUsers: [],
        subscription: 1, // تلقائي اشتراك مجاني
        createdAt: new Date().toISOString()
    };

    clans.push(newClan);
    setData('clans', clans);

    // تحديث حساب المستخدم كمؤسس كلان
    currentUser.clanId = newClan.id;
    setUser(currentUser);

    alert('تم إنشاء الكلان بنجاح!');
    window.location.href = '/clans/clan-dashboard.html';
}

// تعديل بيانات الكلان
function editClan(clanId, newData) {
    const clans = getData('clans');
    const index = clans.findIndex(c => c.id === clanId);
    if (index !== -1) {
        clans[index].name = newData.name;
        clans[index].description = newData.description;
        setData('clans', clans);
        alert('تم تعديل بيانات الكلان.');
    }
}

// حذف الكلان (للمؤسس فقط)
function deleteClan(clanId) {
    let clans = getData('clans');
    clans = clans.filter(c => c.id !== clanId);
    setData('clans', clans);
    alert('تم حذف الكلان.');
    logout(); // يرجع المستخدم للواجهة لأنه لم يعد مؤسس
}

// تقديم طلب للانضمام إلى كلان
function applyToClan(clanId) {
    const clans = getData('clans');
    const currentUser = getUser();
    const clan = clans.find(c => c.id === clanId);

    if (!clan) return alert('الكلان غير موجود.');
    if (clan.bannedUsers.includes(currentUser.username)) {
        return alert('تم حظرك من هذا الكلان.');
    }

    clan.applications.push({
        username: currentUser.username,
        reason: '',
        status: 'pending',
        appliedAt: new Date().toISOString()
    });

    setData('clans', clans);
    alert('تم إرسال طلبك بنجاح.');
}

// قبول طلب انضمام
function acceptApplication(clanId, username) {
    const clans = getData('clans');
    const clan = clans.find(c => c.id === clanId);
    if (!clan) return;

    const appIndex = clan.applications.findIndex(app => app.username === username);
    if (appIndex !== -1) {
        clan.applications[appIndex].status = 'accepted';
        clan.members.push(username);
        setData('clans', clans);
    }
}

// رفض طلب انضمام
function rejectApplication(clanId, username) {
    const clans = getData('clans');
    const clan = clans.find(c => c.id === clanId);
    if (!clan) return;

    const appIndex = clan.applications.findIndex(app => app.username === username);
    if (appIndex !== -1) {
        clan.applications[appIndex].status = 'rejected';
        setData('clans', clans);
    }
}

// توليد ID عشوائي
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// جلب وتحديث البيانات من localStorage
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// استرجاع المستخدم الحالي
function getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}
function setUser(user) {
    const users = getData('users');
    const index = users.findIndex(u => u.username === user.username);
    if (index !== -1) {
        users[index] = user;
        setData('users', users);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}