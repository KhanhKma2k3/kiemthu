module.exports = {
  'TC_04 - Đăng nhập sai 5 lần kiểm tra thông báo lỗi': function (browser) {
    const email = "phamxuankhanh9797@gmail.com";
    const wrongPassword = "sai_mat_khau";
    let attempt = 0;

    function tryLogin() {
      browser
        .url('https://banlinhkien.com/')
        .maximizeWindow()
        .waitForElementVisible('body', 10000)
        .useXpath()
        .waitForElementVisible("//a[contains(text(), 'Đăng nhập')]", 5000)
        .click("//a[contains(text(), 'Đăng nhập')]")
        .useCss()
        .waitForElementVisible('#username', 5000)
        .setValue('#username', email)
        .waitForElementVisible('#password', 5000)
        .setValue('#password', wrongPassword)
        .waitForElementVisible('#btnSubmit', 5000)
        .click('#btnSubmit')
        .pause(2000)
        .perform(function () {
          attempt++;
          if (attempt < 5) {
            browser.refresh().pause(2000).perform(tryLogin);
          } else {
            // Sau lần thứ 5, kiểm tra thông báo lỗi thường
            browser.execute(function () {
              return Array.from(document.querySelectorAll('li')).some(li =>
                li.innerText.includes('Tên đăng nhập hoặc mật khẩu không chính xác') ||
                li.innerText.includes('Tài khoản hoặc mật khẩu không đúng')
              );
            }, [], function (result) {
              if (result.value) {
                console.log("Website không có cơ chế bảo mật khi đăng nhập sai nhiều lần (chỉ hiện lỗi thông thường).");
              } else {
                console.log("Có thể có cơ chế bảo mật đặc biệt.");
              }
              browser.end();
            });
          }
        });
    }

    tryLogin();
  }
};
