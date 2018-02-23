import encodeQueryStr from './encodeQueryStr';


/**
 * jsonp 函数
 *
 * @args {Object} 参数
 * - url {String} 发起请求的 URL
 * - data {Object} 需要附加到 URL 上的参数
 * - callback {Function} jsonp 的数据处理函数
 * - opt {Object} jsonp 的一些选项
 * * - prefix {String} 生成 jsonp 处理数据函数的前缀
 * * - name {String} 生成 jsonp 处理数据函数的名字，该值若存在会忽略 prefix
 * * - timeout {Number} 设置响应的超时上限，默认为 60000ms.
 */

let count = 0;

export default function jsonp(args) {
  // jsonp 默认配置
  const defaultOpt = {
    prefix: '__jp',
    timeout: 60000,
  };

  // 将自定义配置合并到默认配置
  Object.assign(defaultOpt, args);

  // Symbol 注册名
  const { name = `${defaultOpt.prefix}${count}` } = defaultOpt;
  count += 1;

  // 函数名 {Symbol}
  const fn = Symbol.for(name);

  // 拼接 queryString
  const queryString = encodeQueryStr(defaultOpt.data);

  // 拼接 URL
  let { url } = defaultOpt;
  if (!queryString) {
    url += url.indexOf('?') === -1 ? `?${queryString}` : `&${queryString}`;
  }

  // 在 Window 上挂载函数
  window[fn] = defaultOpt.callback;

  const result = new Promise((resolve, reject) => {
    let timer;

    let script = document.createElement('script');
    script.addEventListener('load', () => {
      const target = document.querySelector('script') || document.head;
      target.parentElement.insertBefore(script, target);
      reject();
    });
    script.addEventListener('error', () => {
      window[fn] = () => {};
      script = null;
      clearInterval(timer);
      reject(new Error('请求发生错误！'));
    });
    script.src = url;

    // 设置超时
    timer = setTimeout(() => {
      window[fn] = () => {};
      script = null;
      clearTimeout(timer);
      reject(new Error('请求超时！'));
    }, defaultOpt.timeout);
  });

  return result;
}
