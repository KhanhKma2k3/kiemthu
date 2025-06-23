module.exports = {
  'TC_06 - Đăng ký với số điện thoại đã tồn tại': function (browser) {
    const email = "unique" + Date.now() + "@gmail.com";
    const password = "0927189745";
    const hovaten = "Pham Xuan Khanh";
    const phone = "0927189745"; // SĐT đã đăng ký

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
        // Kiểm tra thông báo lỗi và thông báo thành công
        const hasPhoneError = Array.from(document.querySelectorAll('li,div,span')).some(el =>
          el.innerText.toLowerCase().includes('số điện thoại đã tồn tại') ||
          el.innerText.toLowerCase().includes('số điện thoại này đã được đăng ký')
        );
        const hasSuccess = Array.from(document.querySelectorAll('h3')).some(h3 =>
          h3.innerText.includes('Chúc mừng bạn đã đăng ký thành công')
        );
        return { hasPhoneError, hasSuccess };
      }, [], function (result) {
        if (result.value.hasPhoneError) {
          browser.assert.ok(true, '✅ Có thông báo lỗi số điện thoại đã tồn tại');
        } else if (result.value.hasSuccess) {
          browser.assert.fail('❌ Đăng ký với số điện thoại đã tồn tại nhưng lại báo thành công (BUG)');
        } else {
          browser.assert.fail('❌ Không có thông báo lỗi cũng không có thông báo thành công (BUG)');
        }
        browser.end();
      });
  }
};