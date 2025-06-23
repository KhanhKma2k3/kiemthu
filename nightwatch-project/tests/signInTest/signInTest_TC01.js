module.exports = {
  'TC_01 - Đăng nhập không nhập email': function (browser) {
    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // Vào form đăng nhập
      .useXpath()
      .waitForElementVisible("//a[contains(text(), 'Đăng nhập')]", 5000)
      .click("//a[contains(text(), 'Đăng nhập')]")
      .useCss()

      // Không nhập gì, bấm đăng nhập
      .waitForElementVisible('#btnSubmit', 5000)
      .click('#btnSubmit')
      .pause(1000)

      // Kiểm tra lỗi "Bạn chưa nhập email"
      .execute(function () {
        return Array.from(document.querySelectorAll('li')).some(li => li.innerText.includes('Bạn chưa nhập email'));
      }, [], function (result) {
        browser.assert.ok(result.value, '❌ Không nhập email → báo lỗi đúng');
      })

      .end();
  },

 
};
