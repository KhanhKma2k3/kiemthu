module.exports = {
  'TC_05 - Đổi mật khẩu mới trùng mật khẩu cũ': function (browser) {
    const email = 'phamxuankhanh9797@gmail.com';
    const password = '0927189745';

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)
      .useXpath()
      .click("//a[contains(text(), 'Đăng nhập')]")
      .useCss()
      .setValue('#username', email)
      .setValue('#password', password)
      .pause(3000)
      .click('#btnSubmit')
      .pause(3000)
      .url('https://banlinhkien.com/profile/changepassword')
      .waitForElementVisible('#oldpassword', 5000)
      .setValue('#oldpassword', password)
      .setValue('#newpassword', password)
      .setValue('#repassword', password)
      .click('#btnSubmit')
      .pause(1000)
      .execute(function () {
        const hasError = Array.from(document.querySelectorAll('li')).some(li =>
          li.innerText.toLowerCase().includes('mật khẩu mới phải khác mật khẩu cũ')
        );
        const hasSuccess = Array.from(document.querySelectorAll('p.message')).some(p =>
          p.innerText.includes('Đổi mật khẩu tài khoản thành công')
        );
        return { hasError, hasSuccess };
      }, [], function (result) {
        if (result.value.hasError) {
          browser.assert.ok(true, '✅ Có thông báo mật khẩu mới phải khác mật khẩu cũ');
        } else if (result.value.hasSuccess) {
          browser.assert.fail('❌ Đổi mật khẩu mới trùng mật khẩu cũ nhưng lại báo thành công (BUG)');
        } else {
          browser.assert.fail('❌ Không có thông báo lỗi cũng không có thông báo thành công (BUG)');
        }
        browser.end();
      });
  }
};