module.exports = {
  'TC_07 - Đăng ký với email không hợp lệ': function (browser) {
    const email = "phamxuankhanh@@gmail"; // Email không hợp lệ
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
      .pause(1000)
      .execute(function () {
        return Array.from(document.querySelectorAll('li')).some(li =>
          li.innerText.toLowerCase().includes('not a valid hostname for the email address') ||
          li.innerText.toLowerCase().includes('The input does not match the expected structure for a DNS hostname') ||
          li.innerText.toLowerCase().includes('The input appears to be a local network name but local network names are not allowed')
        );
      }, [], function (result) {
        browser.assert.ok(result.value, '✅ Có thông báo lỗi email không hợp lệ');
      })
      .end();
  }
};