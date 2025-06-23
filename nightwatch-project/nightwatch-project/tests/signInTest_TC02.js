module.exports = {
  'TC_Thêm sản phẩm đầu tiên sau khi đăng nhập vào yêu thích': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";
    const password = "0927189745";

    browser
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // === Đăng nhập ===
      .useXpath()
      .waitForElementVisible("//a[contains(text(), 'Đăng nhập')]", 5000)
      .click("//a[contains(text(), 'Đăng nhập')]")
      .pause(1000)
      .useCss()
      .waitForElementVisible('#username', 5000)
      .clearValue('#username')
      .setValue('#username', email)
      .waitForElementVisible('#password', 5000)
      .clearValue('#password')
      .setValue('#password', password)
      .waitForElementVisible('#btnSubmit', 5000)
      .click('#btnSubmit')
      .pause(3000)

      // === Kiểm tra đăng nhập thành công ===
      .useXpath()
      .waitForElementVisible("//a[@href='/profile']", 5000)

      // === Click vào sản phẩm đầu tiên (XPath) ===
      .waitForElementVisible('//*[@id="content"]/section/div[1]/h3/a', 10000)
      .click('//*[@id="content"]/section/div[1]/h3/a')
      .pause(3000)
      .useCss()

      // === Thêm vào yêu thích ===
      .waitForElementVisible('p.fav.btnFav', 5000)
      .click('p.fav.btnFav')
      .pause(2000)

      // === Vào mục yêu thích để kiểm tra ===
      .url('https://banlinhkien.com/profile/favorite')
      .waitForElementVisible('body', 5000)
      .elements('css selector', 'div.itemCarts', function (result) {
        const count = result.value.length;
        console.log("🧡 Số sản phẩm trong yêu thích:", count);
        browser.assert.ok(count >= 1, '✅ Có ít nhất 1 sản phẩm trong danh sách yêu thích');
      })

      .end();
  }
};
