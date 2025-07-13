// 引入 axios 库用于发送 HTTP 请求
const axios = require('axios');

// =================================================================
// ========= 配置区域：请根据你的实际情况修改以下内容 =========
// =================================================================

// 1. 目标网站的 API 地址
// !! 重要：请将 'https://your-target-website.com' 替换为真实的目标网站域名
const TARGET_API_URL = 'https://www.moelink.cc/api/v1/passport/auth/register';

// 2. 每次运行时，发送多少个注册请求
const NUMBER_OF_REQUESTS = 10; // 这里设置为10次

// =================================================================
// ============ 核心逻辑区域：一般无需修改以下代码 ============
// =================================================================

/**
 * 生成指定长度的随机字符串 (包含小写字母和数字)
 * @param {number} length - 字符串长度
 * @returns {string} - 生成的随机字符串
 */
function generateRandomString(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 主执行函数
async function main() {
  console.log(`🚀 开始执行注册任务，总共 ${NUMBER_OF_REQUESTS} 个请求...`);

  for (let i = 0; i < NUMBER_OF_REQUESTS; i++) {
    // 1. 生成随机的用户数据
    const randomEmail = `${generateRandomString(12)}@example.com`;
    const randomPassword = generateRandomString(10);

    // 2. 构建请求载荷 (Payload)
    const payload = {
      email: randomEmail,
      password: randomPassword,
    };

    try {
      // 3. 发送 POST 请求
      const response = await axios.post(TARGET_API_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      // 4. 在日志中打印成功信息
      console.log(`✅ [请求 ${i + 1}/${NUMBER_OF_REQUESTS}] 成功:`);
      console.log(`   - 邮箱: ${randomEmail}`);
      console.log(`   - 状态码: ${response.status}`);
      console.log(`   - 返回数据: ${JSON.stringify(response.data)}`);

    } catch (error) {
      // 5. 捕获并打印错误信息
      console.error(`❌ [请求 ${i + 1}/${NUMBER_OF_REQUESTS}] 失败:`);
      console.error(`   - 邮箱: ${randomEmail}`);
      if (error.response) {
        // 请求已发出，但服务器返回了错误状态码
        console.error(`   - 状态码: ${error.response.status}`);
        console.error(`   - 返回错误: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        // 请求已发出，但没有收到响应
        console.error('   - 错误: 未收到服务器响应。');
      } else {
        // 其他错误
        console.error(`   - 错误: ${error.message}`);
      }
    }
  }

  console.log('🏁 所有任务执行完毕。');
}

// 运行主函数
main();
