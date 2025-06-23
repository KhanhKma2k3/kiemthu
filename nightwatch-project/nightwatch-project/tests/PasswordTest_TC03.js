module.exports = {
  'TC_03 - Đổi mật khẩu KHÔNG nhập lại mật khẩu mới': function (browser) {
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
      .waitForElementVisible('#oldpassword', 5000)

      .setValue('#oldpassword', password)
      .setValue('#newpassword', newPassword)
      // KHÔNG nhập lại mật khẩu

      .click('#btnSubmit')
      .pause(1000)

      .execute(function () {
        return Array.from(document.querySelectorAll('li')).some(li => li.innerText.includes('Bạn chưa nhập Xác nhận mật khẩu'));
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Hiển thị lỗi: Bạn chưa nhập Xác nhận mật khẩu');
      })

      .end();
  }
};
