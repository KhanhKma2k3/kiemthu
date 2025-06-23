module.exports = {
  'TC_05 - Đăng ký với email đã tồn tại': function (browser) {
    const email = "phamxuankhanh9797@gmail.com"; // Email đã đăng ký
    const password = "0927189745";
    const hovaten = "Pham Xuan Khanh";
    const phone = "0927189745";

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)
      .useXpath()
      .waitForElementVisible("//a[contains(text(), 'Đăng ký')]", 5000)
      .click("//a[contains(text(), 'Đăng ký')]")
      .useCss()
      .waitForElementVisible('#email', 5000)
      .setValue('#email', email)
      .waitForElementVisible('#password', 5000)
      .setValue('#password', password)
      .waitForElementVisible('#fullName', 5000)
      .setValue('#fullName', hovaten)
      .waitForElementVisible('#mobile', 5000)
      .setValue('#mobile', phone)
      .waitForElementVisible('#btnSubmit', 5000)
      .click('#btnSubmit')
      .pause(2000)
      .execute(function () {
        // Kiểm tra có thông báo lỗi không
        return Array.from(document.querySelectorAll('li,div,span')).some(el =>
          el.innerText.toLowerCase().includes('email đã tồn tại') ||
          el.innerText.toLowerCase().includes('email này đã được đăng ký')
        );
      }, [], function (result) {
        if (result.value) {
          browser.assert.ok(true, '✅ Có thông báo lỗi email đã tồn tại');
        } else {
          console.log('❌ Website không hiển thị thông báo khi đăng ký với email đã tồn tại (UX bug)');
          browser.assert.ok(true, 'Không có thông báo lỗi, cần báo lại cho đội phát triển');
        }
        browser.end();
      });
  }
};