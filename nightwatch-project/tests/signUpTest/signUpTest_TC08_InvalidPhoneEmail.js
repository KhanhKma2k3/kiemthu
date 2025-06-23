module.exports = {
  'TC_08 - Đăng ký với email/số điện thoại có ký tự đặc biệt': function (browser) {
    const email = "phamxuan!@gmail.com"; // Email không hợp lệ
    const password = "0927189745";
    const hovaten = "Pham Xuan Khanh";
    const phone = "09@27189745"; // SĐT không hợp lệ

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
      .pause(1000)
      .execute(function () {
        return Array.from(document.querySelectorAll('li')).some(li =>
          li.innerText.toLowerCase().includes('không hợp lệ') ||
          li.innerText.toLowerCase().includes('sai định dạng') ||
          li.innerText.toLowerCase().includes('số điện thoại không hợp lệ')
        );
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Có thông báo lỗi email/số điện thoại không hợp lệ');
      })
      .end();
  }
};