module.exports = {
  'TC_01 - Đổi mật khẩu KHÔNG nhập mật khẩu cũ': function (browser) {
    const email = 'phamxuankhanh9797@gmail.com';
    const password = '0927189745';
    const newPassword = '12345678';

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
      .waitForElementVisible('#newpassword', 5000)

      // KHÔNG nhập old password
      .setValue('#newpassword', newPassword)
      .setValue('#repassword', newPassword)

      .click('#btnSubmit')
      .pause(1000)

      .execute(function () {
        return Array.from(document.querySelectorAll('li')).some(li => li.innerText.includes('Bạn chưa nhập Mật khẩu cũ'));
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Hiển thị lỗi: Bạn chưa nhập Mật khẩu cũ');
      })

      .end();
  }
};
