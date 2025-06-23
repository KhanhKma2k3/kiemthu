module.exports = {
  'TC_01 - Quên mật khẩu gửi yêu cầu thành công': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";

    browser
      .url('https://banlinhkien.com/user/getpassword')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)
      .waitForElementVisible('#newpassword', 5000)
      .setValue('#newpassword', email)
      .waitForElementVisible('#btnSubmit', 5000)
      .click('#btnSubmit')
      .pause(2000)
      .execute(function () {
        return Array.from(document.querySelectorAll('p')).some(p =>
          p.innerText.includes('Mật khẩu tài khoản của bạn đã được reset, vui lòng kiểm tra lại email để lấy mật khẩu mới')
        );
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Gửi yêu cầu quên mật khẩu thành công');
      })
      .end();
  }
};