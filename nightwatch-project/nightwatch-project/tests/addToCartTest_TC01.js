module.exports = {
  'TC_05 - Thêm sản phẩm vào giỏ hàng và kiểm tra số lượng': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";
    const password = "0927189745";

    const productUrls = [
      'https://banlinhkien.com/bo-kit-hoc-tap-esp32-iot-maker-blk-p38421358.html',
      'https://banlinhkien.com/bo-kit-hoc-tap-esp32-iot-co-ban-blk-p38420583.html'
    ];

    let initialCartCount = 0;

    browser
      // Bước 1: Mở trang và đăng nhập
      .url('https://banlinhkien.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 10000)

      // Mở form đăng nhập
      .useXpath()
      .waitForElementVisible("//a[contains(text(), 'Đăng nhập')]", 5000)
      .click("//a[contains(text(), 'Đăng nhập')]")
      .useCss()

      .waitForElementVisible('#username', 5000)
      .setValue('#username', email)

      .waitForElementVisible('#password', 5000)
      .setValue('#password', password)

      .waitForElementVisible('#btnSubmit', 5000)
      .click('#btnSubmit')
      .pause(3000)

      // Bước 2: Lấy số lượng sản phẩm hiện có trong giỏ
      .url('https://banlinhkien.com/')
      .waitForElementVisible('p.tracking span.changeICart', 5000)
      .getText('p.tracking span.changeICart', function (result) {
        initialCartCount = parseInt(result.value) || 0;
        console.log("🛒 Số lượng ban đầu trong giỏ:", initialCartCount);
      })

      // Bước 3: Thêm từng sản phẩm vào giỏ
      .perform(() => {
        productUrls.forEach((url, index) => {
          browser
            .url(url)
            .waitForElementVisible('button.insertCart', 5000)
            .click('button.insertCart')
            .pause(1000); // chờ xử lý
        });
      })

      // Bước 4: Kiểm tra lại số lượng giỏ hàng
      .url('https://banlinhkien.com/')
      .waitForElementVisible('p.tracking span.changeICart', 5000)
      .getText('p.tracking span.changeICart', function (result) {
        const finalCartCount = parseInt(result.value) || 0;
        const expectedCount = initialCartCount + productUrls.length;

        console.log(`🧮 Số lượng giỏ hàng sau khi thêm: ${finalCartCount}`);
        browser.assert.strictEqual(
          finalCartCount,
          expectedCount,
          `✅ Đã thêm đúng ${productUrls.length} sản phẩm: Từ ${initialCartCount} → ${finalCartCount}`
        );
      })

      .end();
  }
};
